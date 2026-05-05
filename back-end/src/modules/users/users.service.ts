import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SEED_USERS, SEED_CLIENTS, SEED_WORKERS, SEED_EXPERTS } from '../seed/seed.data';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * EER Specialization — Users Service
 *
 * Internally maintains 4 arrays (base users + 3 role sub-tables).
 * Externally returns MERGED/FLAT user objects (transparent JOIN).
 * The API response shape is IDENTICAL to the old monolithic approach.
 */
@Injectable()
export class UsersService {
  // ── Internal EER sub-tables ───────────────────────────────────────────────
  private users: any[]   = JSON.parse(JSON.stringify(SEED_USERS));
  private clients: any[] = JSON.parse(JSON.stringify(SEED_CLIENTS));
  private workers: any[] = JSON.parse(JSON.stringify(SEED_WORKERS));
  private experts: any[] = JSON.parse(JSON.stringify(SEED_EXPERTS));
  private counter = 100;

  private generateId(): string {
    return 'u_' + Date.now() + '_' + (this.counter++);
  }

  // ── Merge: base user + role-specific fields → flat object ─────────────────
  private mergeUser(base: any): any {
    if (!base) return null;
    // Start with base user fields
    const merged: any = { ...base };

    // Attach role-specific fields based on role
    if (base.role === 'client') {
      const sub = this.clients.find(c => c.userId === base.id);
      merged.company = sub?.company ?? '';
      merged.location = sub?.location ?? '';
      // Set worker/expert defaults so frontend never sees undefined
      merged.skills = [];
      merged.rating = 0;
      merged.completedProjects = 0;
      merged.specialization = '';
      merged.reviewsDone = 0;
    } else if (base.role === 'worker') {
      const sub = this.workers.find(w => w.userId === base.id);
      merged.location = sub?.location ?? '';
      merged.skills = sub?.skills ?? [];
      merged.rating = sub?.rating ?? 0;
      merged.completedProjects = sub?.completedProjects ?? 0;
      // Set client/expert defaults
      merged.company = '';
      merged.specialization = '';
      merged.reviewsDone = 0;
    } else if (base.role === 'expert') {
      const sub = this.experts.find(e => e.userId === base.id);
      merged.specialization = sub?.specialization ?? '';
      merged.reviewsDone = sub?.reviewsDone ?? 0;
      // Set client/worker defaults
      merged.company = '';
      merged.location = '';
      merged.skills = [];
      merged.rating = 0;
      merged.completedProjects = 0;
    } else {
      // superuser or unknown — set all role-specific fields to defaults
      merged.company = '';
      merged.location = '';
      merged.skills = [];
      merged.rating = 0;
      merged.completedProjects = 0;
      merged.specialization = '';
      merged.reviewsDone = 0;
    }

    return merged;
  }

  // ── Public API (returns merged/flat objects) ──────────────────────────────

  findAll() {
    return this.users.map(u => this.mergeUser(u));
  }

  findById(id: string) {
    const base = this.users.find(u => u.id === id);
    if (!base) throw new NotFoundException(`User with id "${id}" not found`);
    return this.mergeUser(base);
  }

  findByEmail(email: string) {
    const base = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return base ? this.mergeUser(base) : null;
  }

  login(email: string, password: string) {
    const user = this.findByEmail(email);
    if (!user) throw new NotFoundException('No account found with this email address.');
    if (user.password !== password) throw new BadRequestException('Incorrect password. Please try again.');
    if (user.status === 'suspended') throw new BadRequestException('This account has been suspended. Contact support.');

    const session = {
      userId: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      avatarColor: user.avatarColor,
    };
    return { user, session };
  }

  create(dto: CreateUserDto) {
    const existing = this.findByEmail(dto.email);
    if (existing) throw new BadRequestException('A user with this email already exists.');

    const initials = dto.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const colors = [
      'linear-gradient(135deg,#6366f1,#4f46e5)',
      'linear-gradient(135deg,#10b981,#059669)',
      'linear-gradient(135deg,#a855f7,#7c3aed)',
      'linear-gradient(135deg,#ec4899,#be185d)',
    ];

    const id = this.generateId();

    // ── Insert into base USERS table ────────────────────────────────────
    const baseUser: any = {
      id,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
      avatar: dto.avatar || initials,
      avatarColor: dto.avatarColor || colors[Math.floor(Math.random() * colors.length)],
      status: 'active',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      walletBalance: 0,
    };
    this.users.push(baseUser);

    // ── Insert into role-specific sub-table ──────────────────────────────
    if (dto.role === 'client') {
      this.clients.push({
        userId: id,
        company: dto.company || '',
        location: dto.location || '',
      });
    } else if (dto.role === 'worker') {
      this.workers.push({
        userId: id,
        location: dto.location || '',
        skills: dto.skills || [],
        rating: 0,
        completedProjects: 0,
      });
    } else if (dto.role === 'expert') {
      this.experts.push({
        userId: id,
        specialization: dto.specialization || '',
        reviewsDone: 0,
      });
    }

    // Return merged flat object (same shape as before)
    return this.mergeUser(baseUser);
  }

  update(id: string, dto: UpdateUserDto) {
    const baseIdx = this.users.findIndex(u => u.id === id);
    if (baseIdx === -1) throw new NotFoundException(`User with id "${id}" not found`);

    const base = this.users[baseIdx];

    // ── Update base USERS fields ────────────────────────────────────────
    if (dto.name !== undefined) base.name = dto.name;
    if (dto.email !== undefined) base.email = dto.email;
    if (dto.password !== undefined) base.password = dto.password;
    if (dto.role !== undefined) base.role = dto.role;
    if (dto.avatar !== undefined) base.avatar = dto.avatar;
    if (dto.avatarColor !== undefined) base.avatarColor = dto.avatarColor;
    if (dto.status !== undefined) base.status = dto.status;
    if (dto.walletBalance !== undefined) base.walletBalance = dto.walletBalance;

    // ── Update role-specific sub-table fields ───────────────────────────
    if (base.role === 'client') {
      let sub = this.clients.find(c => c.userId === id);
      if (!sub) { sub = { userId: id, company: '', location: '' }; this.clients.push(sub); }
      if (dto.company !== undefined) sub.company = dto.company;
      if (dto.location !== undefined) sub.location = dto.location;
    } else if (base.role === 'worker') {
      let sub = this.workers.find(w => w.userId === id);
      if (!sub) { sub = { userId: id, location: '', skills: [], rating: 0, completedProjects: 0 }; this.workers.push(sub); }
      if (dto.location !== undefined) sub.location = dto.location;
      if (dto.skills !== undefined) sub.skills = dto.skills;
      if (dto.rating !== undefined) sub.rating = dto.rating;
      if (dto.completedProjects !== undefined) sub.completedProjects = dto.completedProjects;
    } else if (base.role === 'expert') {
      let sub = this.experts.find(e => e.userId === id);
      if (!sub) { sub = { userId: id, specialization: '', reviewsDone: 0 }; this.experts.push(sub); }
      if (dto.specialization !== undefined) sub.specialization = dto.specialization;
      if (dto.reviewsDone !== undefined) sub.reviewsDone = dto.reviewsDone;
    }

    return this.mergeUser(base);
  }

  delete(id: string) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`User with id "${id}" not found`);

    // Remove from base table
    this.users.splice(idx, 1);

    // Remove from role sub-tables (CASCADE equivalent)
    this.clients = this.clients.filter(c => c.userId !== id);
    this.workers = this.workers.filter(w => w.userId !== id);
    this.experts = this.experts.filter(e => e.userId !== id);

    return { deleted: true };
  }

  deductFromWallet(id: string, amount: number) {
    const base = this.users.find(u => u.id === id);
    if (!base) throw new NotFoundException(`User with id "${id}" not found`);
    if (base.walletBalance < amount) throw new BadRequestException('Insufficient wallet balance.');
    base.walletBalance -= amount;
    return this.mergeUser(base);
  }

  addToWallet(id: string, amount: number) {
    const base = this.users.find(u => u.id === id);
    if (!base) throw new NotFoundException(`User with id "${id}" not found`);
    base.walletBalance += amount;
    return this.mergeUser(base);
  }

  // ── Reset all 4 arrays to seed data ───────────────────────────────────────
  resetToSeed() {
    this.users   = JSON.parse(JSON.stringify(SEED_USERS));
    this.clients = JSON.parse(JSON.stringify(SEED_CLIENTS));
    this.workers = JSON.parse(JSON.stringify(SEED_WORKERS));
    this.experts = JSON.parse(JSON.stringify(SEED_EXPERTS));
  }
}
