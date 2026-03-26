// ===========================
// WORKERS DATA
// ===========================

const workersData = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "SJ",
        specialization: "Full-Stack Developer",
        rating: 4.9,
        reviewCount: 47,
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        projectsCompleted: 52,
        successRate: 98,
        hourlyRate: 85,
        location: "San Francisco, CA",
        availability: "Available",
        experience: "Expert",
        bio: "Full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud infrastructure.",
        portfolio: [
            { title: "E-commerce Platform", description: "Built a full-featured e-commerce platform with React and Node.js" },
            { title: "SaaS Dashboard", description: "Designed and developed a comprehensive analytics dashboard" },
        ],
        reviews: [
            { client: "Michael Chen", rating: 5, comment: "Excellent work! Delivered ahead of schedule.", date: "Feb 15, 2026" },
            { client: "Emily Davis", rating: 5, comment: "Very professional and skilled developer.", date: "Jan 22, 2026" },
        ],
        workHistory: [
            { project: "E-commerce Platform Redesign", role: "Lead Developer", duration: "3 months" },
            { project: "Mobile App Development", role: "Full-Stack Developer", duration: "2 months" },
        ],
    },
    {
        id: "2",
        name: "Michael Chen",
        avatar: "MC",
        specialization: "UI/UX Designer",
        rating: 4.8,
        reviewCount: 35,
        skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
        projectsCompleted: 38,
        successRate: 95,
        hourlyRate: 70,
        location: "New York, NY",
        availability: "Available",
        experience: "Intermediate",
        bio: "Creative UI/UX designer passionate about creating intuitive and beautiful user experiences. 5 years of experience in product design.",
        portfolio: [
            { title: "Mobile Banking App", description: "Complete UI/UX design for a fintech mobile application" },
            { title: "Dashboard Redesign", description: "Modernized enterprise dashboard with improved UX" },
        ],
        reviews: [
            { client: "David Kim", rating: 5, comment: "Beautiful designs and great communication.", date: "Feb 20, 2026" },
            { client: "Lisa Wang", rating: 4, comment: "Good work, would hire again.", date: "Jan 10, 2026" },
        ],
        workHistory: [
            { project: "SaaS Product Redesign", role: "Lead Designer", duration: "4 months" },
            { project: "Landing Page Design", role: "UI Designer", duration: "1 month" },
        ],
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        avatar: "ER",
        specialization: "Backend Engineer",
        rating: 4.9,
        reviewCount: 62,
        skills: ["Python", "Django", "AWS", "Docker"],
        projectsCompleted: 68,
        successRate: 97,
        hourlyRate: 90,
        location: "Austin, TX",
        availability: "Busy",
        experience: "Expert",
        bio: "Senior backend engineer specializing in scalable microservices architecture and cloud infrastructure. 10+ years experience.",
        portfolio: [
            { title: "API Microservices", description: "Built scalable microservices architecture for enterprise client" },
            { title: "Cloud Migration", description: "Migrated monolithic app to AWS serverless architecture" },
        ],
        reviews: [
            { client: "John Smith", rating: 5, comment: "Outstanding technical expertise.", date: "Feb 28, 2026" },
            { client: "Sarah Lee", rating: 5, comment: "Highly recommend for complex backend work.", date: "Feb 5, 2026" },
        ],
        workHistory: [
            { project: "Enterprise API Development", role: "Backend Lead", duration: "6 months" },
            { project: "Database Optimization", role: "Backend Engineer", duration: "2 months" },
        ],
    },
    {
        id: "4",
        name: "David Kim",
        avatar: "DK",
        specialization: "Mobile Developer",
        rating: 4.7,
        reviewCount: 28,
        skills: ["React Native", "Swift", "Kotlin", "Firebase"],
        projectsCompleted: 32,
        successRate: 94,
        hourlyRate: 75,
        location: "Seattle, WA",
        availability: "Available",
        experience: "Intermediate",
        bio: "Mobile developer with expertise in cross-platform development. Delivered 30+ apps to production on iOS and Android.",
        portfolio: [
            { title: "Fitness Tracking App", description: "Cross-platform fitness app with 50k+ downloads" },
            { title: "Social Networking App", description: "Built social features with real-time messaging" },
        ],
        reviews: [
            { client: "Anna Martinez", rating: 5, comment: "Great mobile developer, very responsive.", date: "Mar 1, 2026" },
            { client: "Tom Brown", rating: 4, comment: "Solid work on our mobile app.", date: "Feb 12, 2026" },
        ],
        workHistory: [
            { project: "iOS App Development", role: "Mobile Developer", duration: "3 months" },
            { project: "React Native Migration", role: "Lead Mobile Dev", duration: "4 months" },
        ],
    },
    {
        id: "5",
        name: "Lisa Wang",
        avatar: "LW",
        specialization: "DevOps Engineer",
        rating: 4.8,
        reviewCount: 41,
        skills: ["Kubernetes", "Terraform", "CI/CD", "Linux"],
        projectsCompleted: 45,
        successRate: 96,
        hourlyRate: 95,
        location: "Boston, MA",
        availability: "Available",
        experience: "Expert",
        bio: "DevOps engineer focused on automation, infrastructure as code, and continuous deployment pipelines. 7 years experience.",
        portfolio: [
            { title: "CI/CD Pipeline", description: "Automated deployment pipeline reducing release time by 80%" },
            { title: "Kubernetes Migration", description: "Migrated infrastructure to Kubernetes cluster" },
        ],
        reviews: [
            { client: "Robert Garcia", rating: 5, comment: "Exceptional DevOps skills and automation expertise.", date: "Feb 25, 2026" },
            { client: "Jennifer Lee", rating: 5, comment: "Transformed our deployment process.", date: "Jan 30, 2026" },
        ],
        workHistory: [
            { project: "Infrastructure Automation", role: "DevOps Lead", duration: "5 months" },
            { project: "Cloud Architecture", role: "DevOps Engineer", duration: "3 months" },
        ],
    },
    {
        id: "6",
        name: "James Wilson",
        avatar: "JW",
        specialization: "Data Scientist",
        rating: 4.6,
        reviewCount: 22,
        skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
        projectsCompleted: 25,
        successRate: 92,
        hourlyRate: 100,
        location: "Chicago, IL",
        availability: "Not Available",
        experience: "Expert",
        bio: "Data scientist specializing in machine learning and predictive analytics. PhD in Computer Science with focus on AI.",
        portfolio: [
            { title: "Predictive Model", description: "Built ML model improving accuracy by 40%" },
            { title: "Data Pipeline", description: "Designed ETL pipeline processing 1M+ records daily" },
        ],
        reviews: [
            { client: "Maria Santos", rating: 5, comment: "Brilliant data scientist with deep ML knowledge.", date: "Feb 18, 2026" },
            { client: "Peter Chan", rating: 4, comment: "Strong analytical skills.", date: "Jan 25, 2026" },
        ],
        workHistory: [
            { project: "ML Model Development", role: "Data Scientist", duration: "4 months" },
            { project: "Analytics Dashboard", role: "Data Analyst", duration: "2 months" },
        ],
    },
];

const availableSkills = [
    "React", "Node.js", "TypeScript", "Python", "Django", "AWS",
    "Docker", "Kubernetes", "Figma", "UI Design", "PostgreSQL",
    "MongoDB", "React Native", "Swift", "Machine Learning"
];

const myProjects = [
    { id: "1", name: "E-commerce Platform Redesign" },
    { id: "2", name: "Mobile App Development" },
    { id: "3", name: "Dashboard Analytics Tool" },
];

// ===========================
// STATE MANAGEMENT
// ===========================

const pageState = {
    searchQuery: "",
    selectedSkills: [],
    selectedExperience: [],
    hourlyRateRange: 200,
    selectedRating: 0,
    selectedAvailability: [],
    selectedWorker: null,
    inviteWorker: null,
    inviteMessage: "",
    selectedProject: "",
};

// ===========================
// DOM ELEMENTS
// ===========================

const searchQueryInput = document.getElementById('searchQuery');
const skillsFilterContainer = document.getElementById('skillsFilter');
const rateSlider = document.getElementById('rateSlider');
const rateMin = document.getElementById('rateMin');
const rateMax = document.getElementById('rateMax');
const workersContainer = document.getElementById('workersContainer');
const resultsHeader = document.getElementById('resultsHeader');
const emptyState = document.getElementById('emptyState');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const clearFiltersEmptyBtn = document.getElementById('clearFiltersEmptyBtn');

// Modal elements
const profileModal = document.getElementById('profileModal');
const inviteModal = document.getElementById('inviteModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCloseInviteBtn = document.getElementById('modalCloseInviteBtn');
const btnCloseProfile = document.getElementById('btnCloseProfile');
const btnInviteProfile = document.getElementById('btnInviteProfile');
const btnCancelInvite = document.getElementById('btnCancelInvite');
const btnSendInvite = document.getElementById('btnSendInvite');
const inviteMessage = document.getElementById('inviteMessage');
const projectSelect = document.getElementById('projectSelect');

// ===========================
// HELPER FUNCTIONS
// ===========================

function getAvailabilityColor(availability) {
    const colors = {
        "Available": "availability-available",
        "Busy": "availability-busy",
        "Not Available": "availability-not-available",
    };
    return colors[availability] || "availability-available";
}

function renderSkillsFilter() {
    skillsFilterContainer.innerHTML = availableSkills.map(skill => `
        <label class="filter-label">
            <input type="checkbox" class="filter-checkbox" data-filter="skills" value="${skill}" />
            <span>${skill}</span>
        </label>
    `).join('');

    // Add listeners
    document.querySelectorAll('[data-filter="skills"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterWorkers();
        });
    });
}

function filterWorkers() {
    // Get filter values
    pageState.selectedSkills = Array.from(document.querySelectorAll('[data-filter="skills"]:checked')).map(cb => cb.value);
    pageState.selectedExperience = Array.from(document.querySelectorAll('[data-filter="experience"]:checked')).map(cb => cb.value);
    pageState.selectedAvailability = Array.from(document.querySelectorAll('[data-filter="availability"]:checked')).map(cb => cb.value);
    pageState.selectedRating = parseFloat(document.querySelector('[data-filter="rating"]:checked').value) || 0;

    const query = searchQueryInput.value.toLowerCase();
    const filtered = workersData.filter(worker => {
        // Search query
        if (query) {
            const matchesSearch =
                worker.name.toLowerCase().includes(query) ||
                worker.specialization.toLowerCase().includes(query) ||
                worker.skills.some(skill => skill.toLowerCase().includes(query));
            if (!matchesSearch) return false;
        }

        // Skills filter
        if (pageState.selectedSkills.length > 0) {
            const hasSkill = pageState.selectedSkills.some(skill => worker.skills.includes(skill));
            if (!hasSkill) return false;
        }

        // Experience filter
        if (pageState.selectedExperience.length > 0) {
            if (!pageState.selectedExperience.includes(worker.experience)) return false;
        }

        // Hourly rate filter
        if (worker.hourlyRate > pageState.hourlyRateRange) {
            return false;
        }

        // Rating filter
        if (pageState.selectedRating > 0 && worker.rating < pageState.selectedRating) {
            return false;
        }

        // Availability filter
        if (pageState.selectedAvailability.length > 0) {
            if (!pageState.selectedAvailability.includes(worker.availability)) return false;
        }

        return true;
    });

    renderWorkers(filtered);
}

function renderWorkers(workers) {
    resultsHeader.textContent = `${workers.length} freelancer${workers.length !== 1 ? 's' : ''} found`;

    if (workers.length === 0) {
        workersContainer.style.display = 'none';
        emptyState.style.display = 'grid';
        return;
    }

    workersContainer.style.display = 'grid';
    emptyState.style.display = 'none';

    workersContainer.innerHTML = workers.map(worker => `
        <div class="worker-card">
            <div class="worker-card-header">
                <div class="worker-avatar-large">${worker.avatar}</div>
                <div class="worker-header-info">
                    <h3 class="worker-name">${worker.name}</h3>
                    <p class="worker-specialization">${worker.specialization}</p>
                    <div class="worker-rating">
                        <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
                        </svg>
                        <span class="rating-value">${worker.rating}</span>
                        <span class="review-count">(${worker.reviewCount})</span>
                    </div>
                </div>
                <span class="availability-badge ${getAvailabilityColor(worker.availability)}">
                    ${worker.availability}
                </span>
            </div>

            <div class="worker-skills">
                ${worker.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>

            <div class="worker-stats">
                <div class="worker-stat">
                    <div class="stat-value">${worker.projectsCompleted}</div>
                    <div class="stat-label">Projects</div>
                </div>
                <div class="worker-stat" style="border-right: 1px solid var(--border-color);">
                    <div class="stat-value success">${worker.successRate}%</div>
                    <div class="stat-label">Success</div>
                </div>
                <div class="worker-stat">
                    <div class="stat-value">$${worker.hourlyRate}/hr</div>
                    <div class="stat-label">Rate</div>
                </div>
            </div>

            <div class="worker-location">
                <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span class="location-text">${worker.location}</span>
            </div>

            <div class="worker-actions">
                <button class="btn-view-profile" data-worker-id="${worker.id}">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View Profile
                </button>
                <button class="btn-invite" data-worker-id="${worker.id}">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Invite
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.btn-view-profile').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const workerId = btn.getAttribute('data-worker-id');
            openProfileModal(workerId);
        });
    });

    document.querySelectorAll('.btn-invite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const workerId = btn.getAttribute('data-worker-id');
            const worker = workersData.find(w => w.id === workerId);
            openInviteModal(worker);
        });
    });
}

function openProfileModal(workerId) {
    const worker = workersData.find(w => w.id === workerId);
    pageState.selectedWorker = worker;

    // Render header
    const headerContent = document.getElementById('modalHeaderContent');
    headerContent.innerHTML = `
        <div class="modal-profile-header">
            <div class="modal-avatar">${worker.avatar}</div>
            <div class="modal-profile-info">
                <h2 class="profile-name">${worker.name}</h2>
                <p class="profile-specialization">${worker.specialization}</p>
                <div class="profile-rating">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <div style="display: flex; gap: 4px;">
                            ${Array.from({ length: 5 }).map((_, i) => `
                                <svg class="star-icon" style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="${i < Math.floor(worker.rating) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                    <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
                                </svg>
                            `).join('')}
                        </div>
                        <span>${worker.rating}</span>
                        <span style="color: var(--text-secondary);">(${worker.reviewCount} reviews)</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center; color: var(--text-secondary); margin-top: 8px;">
                        <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${worker.location}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Render body
    const modalBodyContent = document.getElementById('modalBody');
    modalBodyContent.innerHTML = `
        <div class="profile-bio">
            <h3 class="profile-bio-title">About</h3>
            <p class="profile-bio-text">${worker.bio}</p>
        </div>

        <div class="profile-stats">
            <div class="profile-stat-card">
                <div class="stat-card-label">
                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 4V2m-8 2V2"></path>
                    </svg>
                    Projects
                </div>
                <div class="stat-card-value">${worker.projectsCompleted}</div>
            </div>
            <div class="profile-stat-card">
                <div class="stat-card-label">
                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Success
                </div>
                <div class="stat-card-value success">${worker.successRate}%</div>
            </div>
            <div class="profile-stat-card">
                <div class="stat-card-label">
                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H6"></path>
                    </svg>
                    Rate
                </div>
                <div class="stat-card-value">$${worker.hourlyRate}/hr</div>
            </div>
            <div class="profile-stat-card">
                <div class="stat-card-label">
                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Level
                </div>
                <div class="stat-card-value">${worker.experience}</div>
            </div>
        </div>

        <div class="profile-section">
            <h3 class="section-title">Skills</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${worker.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>
        </div>

        <div class="profile-section">
            <h3 class="section-title">Portfolio</h3>
            <div>
                ${worker.portfolio.map(item => `
                    <div class="section-item">
                        <h4 class="section-item-title">${item.title}</h4>
                        <p class="section-item-description">${item.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="profile-section">
            <h3 class="section-title">Work History</h3>
            <div>
                ${worker.workHistory.map(work => `
                    <div class="section-item">
                        <div class="review-header">
                            <h4 class="section-item-title">${work.project}</h4>
                            <span class="review-date">${work.duration}</span>
                        </div>
                        <p class="section-item-description">${work.role}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="profile-section">
            <h3 class="section-title">Client Reviews</h3>
            <div>
                ${worker.reviews.map(review => `
                    <div class="section-item">
                        <div class="review-header">
                            <div>
                                <p class="review-author">${review.client}</p>
                                <div class="review-rating">
                                    ${Array.from({ length: review.rating }).map(() => `
                                        <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                            <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
                                        </svg>
                                    `).join('')}
                                </div>
                            </div>
                            <span class="review-date">${review.date}</span>
                        </div>
                        <p class="section-item-description">${review.comment}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    profileModal.style.display = 'flex';
}

function openInviteModal(worker) {
    pageState.inviteWorker = worker;
    pageState.inviteMessage = `Hi ${worker.name},\n\nI'd love to collaborate with you on this project. Your expertise in ${worker.skills[0]} would be a perfect fit.`;

    // Update title
    document.getElementById('inviteModalTitle').textContent = `Invite ${worker.name}`;

    // Render worker summary
    const workerSummary = document.getElementById('workerSummary');
    workerSummary.innerHTML = `
        <div class="summary-avatar">${worker.avatar}</div>
        <div class="summary-info">
            <p class="summary-name">${worker.name}</p>
            <p class="summary-details">${worker.specialization} • $${worker.hourlyRate}/hr</p>
        </div>
        <div class="summary-rating">
            <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
            </svg>
            <span>${worker.rating}</span>
        </div>
    `;

    // Update textarea
    inviteMessage.value = pageState.inviteMessage;

    // Populate projects
    projectSelect.innerHTML = `<option value="">Choose a project...</option>` + myProjects.map(project => `
        <option value="${project.id}">${project.name}</option>
    `).join('');

    inviteModal.style.display = 'flex';
}

function closeModals() {
    profileModal.style.display = 'none';
    inviteModal.style.display = 'none';
    pageState.selectedWorker = null;
    pageState.inviteWorker = null;
    pageState.inviteMessage = "";
    pageState.selectedProject = "";
    projectSelect.value = "";
}

function clearAllFilters() {
    searchQueryInput.value = "";
    pageState.searchQuery = "";
    pageState.selectedSkills = [];
    pageState.selectedExperience = [];
    pageState.selectedAvailability = [];
    pageState.selectedRating = 0;
    pageState.hourlyRateRange = 200;

    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('[data-filter="rating"]').forEach(rb => rb.checked = rb.value === "0");
    rateSlider.value = 200;
    rateMax.textContent = "$200+";

    filterWorkers();
}

// ===========================
// EVENT LISTENERS
// ===========================

searchQueryInput.addEventListener('input', (e) => {
    pageState.searchQuery = e.target.value;
    filterWorkers();
});

rateSlider.addEventListener('input', (e) => {
    pageState.hourlyRateRange = parseInt(e.target.value);
    rateMax.textContent = `$${pageState.hourlyRateRange}+`;
    filterWorkers();
});

document.querySelectorAll('[data-filter="experience"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        filterWorkers();
    });
});

document.querySelectorAll('[data-filter="rating"]').forEach(radio => {
    radio.addEventListener('change', () => {
        filterWorkers();
    });
});

document.querySelectorAll('[data-filter="availability"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        filterWorkers();
    });
});

// Modal controls
modalCloseBtn.addEventListener('click', closeModals);
modalCloseInviteBtn.addEventListener('click', closeModals);
btnCloseProfile.addEventListener('click', closeModals);
btnCancelInvite.addEventListener('click', closeModals);
clearFiltersBtn.addEventListener('click', clearAllFilters);
clearFiltersEmptyBtn.addEventListener('click', clearAllFilters);

btnInviteProfile.addEventListener('click', () => {
    if (pageState.selectedWorker) {
        openInviteModal(pageState.selectedWorker);
        profileModal.style.display = 'none';
    }
});

projectSelect.addEventListener('change', (e) => {
    pageState.selectedProject = e.target.value;
    btnSendInvite.disabled = !pageState.selectedProject;
});

inviteMessage.addEventListener('input', (e) => {
    pageState.inviteMessage = e.target.value;
});

btnSendInvite.addEventListener('click', () => {
    if (pageState.selectedProject && pageState.inviteWorker) {
        alert(`Invitation sent to ${pageState.inviteWorker.name} for project!`);
        closeModals();
    }
});

// Close modals on backdrop click
profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) closeModals();
});

inviteModal.addEventListener('click', (e) => {
    if (e.target === inviteModal) closeModals();
});

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Hire Gig Workers page initialized');
    renderSkillsFilter();
    filterWorkers();
});