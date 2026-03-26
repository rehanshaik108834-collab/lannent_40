// Milestone data
const milestonesData = [
    {
        id: "1",
        title: "Initial Wireframes & User Flow",
        budget: 800,
        deadline: "Mar 10",
        worker: "Sarah Johnson",
        workerAvatar: "SJ",
        status: "todo",
    },
    {
        id: "2",
        title: "Frontend Component Library",
        budget: 1200,
        deadline: "Mar 12",
        worker: "Michael Chen",
        workerAvatar: "MC",
        status: "in-progress",
    },
    {
        id: "3",
        title: "Backend API Development",
        budget: 1500,
        deadline: "Mar 14",
        worker: "Emily Rodriguez",
        workerAvatar: "ER",
        status: "in-progress",
        technicalAuditRequired: true,
        auditStatus: "pending",
    },
    {
        id: "4",
        title: "Database Schema & Migration",
        budget: 600,
        deadline: "Mar 8",
        worker: "David Kim",
        workerAvatar: "DK",
        status: "submitted",
        technicalAuditRequired: true,
        auditStatus: "passed",
        auditReportId: "audit-001",
    },
    {
        id: "5",
        title: "Authentication System",
        budget: 900,
        deadline: "Mar 9",
        worker: "Sarah Johnson",
        workerAvatar: "SJ",
        status: "submitted",
    },
    {
        id: "8",
        title: "Payment Gateway Integration",
        budget: 1100,
        deadline: "Mar 7",
        worker: "Michael Chen",
        workerAvatar: "MC",
        status: "disputed",
        technicalAuditRequired: true,
        auditStatus: "failed",
        auditReportId: "audit-002",
        disputeReason: "Code quality does not meet requirements. Multiple security vulnerabilities found.",
        disputeRaisedBy: "client",
        disputeStatus: "under-review",
    },
    {
        id: "6",
        title: "Landing Page Design",
        budget: 500,
        deadline: "Mar 5",
        worker: "Michael Chen",
        workerAvatar: "MC",
        status: "completed",
        escrowReleased: true,
    },
    {
        id: "7",
        title: "User Dashboard UI",
        budget: 700,
        deadline: "Mar 6",
        worker: "Emily Rodriguez",
        workerAvatar: "ER",
        status: "completed",
        escrowReleased: true,
    },
];

let milestones = [...milestonesData];
let draggedItem = null;

// DOM Elements
const addMilestoneBtn = document.getElementById('addMilestoneBtn');
const addMilestoneModal = document.getElementById('addMilestoneModal');
const cancelMilestoneBtn = document.getElementById('cancelMilestoneBtn');
const createMilestoneBtn = document.getElementById('createMilestoneBtn');
const reportsBtn = document.getElementById('reportsBtn');

// Status badge configurations
const statusConfig = {
    todo: {
        label: "To Do",
        class: "status-badge-todo",
    },
    'in-progress': {
        label: "In Progress",
        class: "status-badge-in-progress",
    },
    submitted: {
        label: "Submitted",
        class: "status-badge-submitted",
    },
    disputed: {
        label: "Disputed",
        class: "status-badge-disputed",
    },
    completed: {
        label: "Completed",
        class: "status-badge-completed",
    },
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBoard();
    setupEventListeners();
});

function setupEventListeners() {
    addMilestoneBtn.addEventListener('click', () => {
        addMilestoneModal.classList.add('active');
    });

    cancelMilestoneBtn.addEventListener('click', () => {
        addMilestoneModal.classList.remove('active');
    });

    createMilestoneBtn.addEventListener('click', createNewMilestone);

    addMilestoneModal.addEventListener('click', (e) => {
        if (e.target === addMilestoneModal) {
            addMilestoneModal.classList.remove('active');
        }
    });

    reportsBtn.addEventListener('click', () => {
        window.location.href = '/milestone-reports';
    });

    // Kanban column drag and drop
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const columns = document.querySelectorAll('.kanban-column');

    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    if (e.currentTarget === e.target) {
        e.currentTarget.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const data = e.dataTransfer.getData('application/json');
    if (!data) return;

    const { id, fromStatus } = JSON.parse(data);
    const toStatus = e.currentTarget.dataset.status;

    if (fromStatus !== toStatus) {
        updateMilestoneStatus(id, toStatus);
    }
}

function createNewMilestone() {
    const title = document.getElementById('milestoneTitle').value.trim();
    const budget = parseFloat(document.getElementById('milestoneBudget').value);
    const deadline = document.getElementById('milestoneDeadline').value;
    const worker = document.getElementById('milestoneWorker').value;

    if (!title || !budget || !deadline || !worker) {
        alert('Please fill in all fields');
        return;
    }

    const newMilestone = {
        id: Date.now().toString(),
        title,
        budget,
        deadline: formatDate(deadline),
        worker,
        workerAvatar: worker.split(' ').map(n => n[0]).join(''),
        status: 'todo',
    };

    milestones.push(newMilestone);

    // Reset form
    document.getElementById('milestoneTitle').value = '';
    document.getElementById('milestoneBudget').value = '';
    document.getElementById('milestoneDeadline').value = '';
    document.getElementById('milestoneWorker').value = '';

    addMilestoneModal.classList.remove('active');
    renderBoard();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function updateMilestoneStatus(id, newStatus) {
    const milestone = milestones.find(m => m.id === id);
    if (milestone) {
        milestone.status = newStatus;
        renderBoard();
    }
}

function approveMilestone(id) {
    const milestone = milestones.find(m => m.id === id);
    if (milestone) {
        milestone.status = 'completed';
        milestone.escrowReleased = true;
        renderBoard();
    }
}

function requestChanges(id) {
    const milestone = milestones.find(m => m.id === id);
    if (milestone) {
        milestone.status = 'in-progress';
        renderBoard();
    }
}

function getStatusIcon(status) {
    const icons = {
        todo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;"><circle cx="12" cy="12" r="1"></circle><polyline points="12 6 12 12 16 14"></polyline><circle cx="12" cy="12" r="9"></circle></svg>`,
        'in-progress': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="12" x2="15" y2="15"></line></svg>`,
        submitted: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        disputed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        completed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;"><polyline points="20 6 9 17 4 12"></polyline><circle cx="12" cy="12" r="10"></circle></svg>`,
    };
    return icons[status] || '';
}

function renderBoard() {
    // Clear all containers
    ['todo', 'in-progress', 'submitted', 'disputed', 'completed'].forEach(status => {
        const container = document.getElementById(`col-${status}`);
        if (container) container.innerHTML = '';
    });

    // Render milestones
    milestones.forEach(milestone => {
        const container = document.getElementById(`col-${milestone.status}`);
        if (container) {
            container.appendChild(createMilestoneCard(milestone));
        }
    });

    // Update column counts
    updateColumnCounts();
    updateStats();
    setupDragAndDrop();
}

function createMilestoneCard(milestone) {
    const card = document.createElement('div');
    card.className = 'milestone-card';
    card.draggable = true;
    card.dataset.milestoneId = milestone.id;

    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/json', JSON.stringify({
            id: milestone.id,
            fromStatus: milestone.status
        }));
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    // Header
    const header = document.createElement('div');
    header.className = 'card-header';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = milestone.title;
    header.appendChild(title);

    const statusBadge = document.createElement('div');
    statusBadge.className = `status-badge ${statusConfig[milestone.status].class}`;
    statusBadge.innerHTML = getStatusIcon(milestone.status) + `<span>${statusConfig[milestone.status].label}</span>`;
    header.appendChild(statusBadge);

    card.appendChild(header);

    // Info Grid
    const infoGrid = document.createElement('div');
    infoGrid.className = 'card-info-grid';

    const budgetItem = document.createElement('div');
    budgetItem.className = 'info-item';
    budgetItem.innerHTML = `
        <svg class="info-icon info-icon-dollar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        <div class="info-text">
            <p class="info-label">Budget</p>
            <p class="info-value">$${milestone.budget.toLocaleString()}</p>
        </div>
    `;
    infoGrid.appendChild(budgetItem);

    const deadlineItem = document.createElement('div');
    deadlineItem.className = 'info-item';
    deadlineItem.innerHTML = `
        <svg class="info-icon info-icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <div class="info-text">
            <p class="info-label">Deadline</p>
            <p class="info-value">${milestone.deadline}</p>
        </div>
    `;
    infoGrid.appendChild(deadlineItem);

    card.appendChild(infoGrid);

    // Worker
    const worker = document.createElement('div');
    worker.className = 'card-worker';
    worker.innerHTML = `
        <div class="worker-avatar">${milestone.workerAvatar}</div>
        <div class="worker-info">
            <p class="worker-label">Assigned to</p>
            <p class="worker-name">${milestone.worker}</p>
        </div>
    `;
    card.appendChild(worker);

    // Technical Audit Section
    if (milestone.technicalAuditRequired) {
        const auditSection = document.createElement('div');
        auditSection.className = 'audit-section';

        const auditHeader = document.createElement('div');
        auditHeader.className = 'audit-header';
        auditHeader.innerHTML = `
            <svg class="audit-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            </svg>
            <p class="audit-header-text">Technical Audit Required</p>
        `;
        auditSection.appendChild(auditHeader);

        if (milestone.auditStatus) {
            const auditStatus = document.createElement('div');
            auditStatus.className = 'audit-status';

            const label = document.createElement('p');
            label.className = 'audit-status-label';
            label.textContent = 'Audit Status:';
            auditStatus.appendChild(label);

            const badge = document.createElement('span');
            badge.className = `audit-status-badge audit-status-${milestone.auditStatus}`;
            badge.textContent = milestone.auditStatus.charAt(0).toUpperCase() + milestone.auditStatus.slice(1);
            auditStatus.appendChild(badge);

            auditSection.appendChild(auditStatus);

            if (milestone.auditReportId) {
                const reportBtn = document.createElement('button');
                reportBtn.className = 'audit-report-btn';
                reportBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <line x1="14" y1="2" x2="14" y2="8"></line>
                        <line x1="9" y1="13" x2="15" y2="13"></line>
                        <line x1="9" y1="17" x2="15" y2="17"></line>
                    </svg>
                    View Audit Report
                `;
                reportBtn.addEventListener('click', () => {
                    window.location.href = `/technical-audit-report?id=${milestone.auditReportId}`;
                });
                auditSection.appendChild(reportBtn);
            }
        }

        card.appendChild(auditSection);
    } else if (milestone.status === 'submitted') {
        const noAuditSection = document.createElement('div');
        noAuditSection.className = 'no-audit-section';
        noAuditSection.innerHTML = '<p class="no-audit-text">Technical Audit: Not Required</p>';
        card.appendChild(noAuditSection);
    }

    // Dispute Section
    if (milestone.status === 'disputed') {
        const disputeSection = document.createElement('div');
        disputeSection.className = 'dispute-section';

        const disputeHeader = document.createElement('div');
        disputeHeader.className = 'dispute-header';
        disputeHeader.innerHTML = `
            <svg class="dispute-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <p class="dispute-header-text">Dispute Raised</p>
        `;
        disputeSection.appendChild(disputeHeader);

        if (milestone.disputeRaisedBy) {
            const disputeInfo = document.createElement('div');
            disputeInfo.className = 'dispute-info';

            const raisedBy = document.createElement('div');
            raisedBy.className = 'dispute-raised-by';

            const raisedByLabel = document.createElement('p');
            raisedByLabel.className = 'dispute-raised-by-label';
            raisedByLabel.textContent = 'Raised By:';
            raisedBy.appendChild(raisedByLabel);

            const raisedByValue = document.createElement('span');
            raisedByValue.className = 'dispute-raised-by-value';
            raisedByValue.textContent = milestone.disputeRaisedBy;
            raisedBy.appendChild(raisedByValue);

            disputeInfo.appendChild(raisedBy);

            if (milestone.disputeReason) {
                const reason = document.createElement('p');
                reason.className = 'dispute-reason';
                reason.textContent = milestone.disputeReason;
                disputeInfo.appendChild(reason);
            }

            disputeSection.appendChild(disputeInfo);
        }

        const disputeStatus = document.createElement('div');
        disputeStatus.className = 'dispute-status';
        disputeStatus.textContent = 'Status: Under Expert Review';
        disputeSection.appendChild(disputeStatus);

        card.appendChild(disputeSection);
    }

    // Submitted Actions
    if (milestone.status === 'submitted') {
        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const reviewBtn = document.createElement('button');
        reviewBtn.className = 'review-btn';
        reviewBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Review Deliverable
        `;
        reviewBtn.addEventListener('click', () => {
            window.location.href = `/review-deliverable/${milestone.id}`;
        });
        actions.appendChild(reviewBtn);

        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';

        const changesBtn = document.createElement('button');
        changesBtn.className = 'action-btn request-changes-btn';
        changesBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            Changes
        `;
        changesBtn.addEventListener('click', () => requestChanges(milestone.id));
        actionButtons.appendChild(changesBtn);

        const approveBtn = document.createElement('button');
        approveBtn.className = 'action-btn approve-btn';
        approveBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Approve
        `;
        approveBtn.addEventListener('click', () => approveMilestone(milestone.id));
        actionButtons.appendChild(approveBtn);

        actions.appendChild(actionButtons);
        card.appendChild(actions);
    }

    // Approved Indicators
    if (milestone.status === 'completed') {
        const approvedSection = document.createElement('div');
        approvedSection.className = 'approved-section';

        const indicator = document.createElement('div');
        indicator.className = 'approved-indicator';
        indicator.innerHTML = `
            <svg class="approved-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 12 15 15 12"></polyline>
            </svg>
            <div class="approved-content">
                <p class="approved-label">Escrow Released</p>
                <p class="approved-text">Funds transferred to worker</p>
            </div>
        `;
        approvedSection.appendChild(indicator);
        card.appendChild(approvedSection);
    }

    return card;
}

function updateColumnCounts() {
    const statuses = ['todo', 'in-progress', 'submitted', 'disputed', 'completed'];
    
    statuses.forEach(status => {
        const column = document.querySelector(`.kanban-column[data-status="${status}"]`);
        if (column) {
            const count = milestones.filter(m => m.status === status).length;
            const countElement = column.querySelector('.column-count');
            if (countElement) {
                countElement.textContent = count;
            }
        }
    });
}

function updateStats() {
    const totalCount = milestones.length;
    const inProgressCount = milestones.filter(m => m.status === 'in-progress').length;
    const submittedCount = milestones.filter(m => m.status === 'submitted').length;
    const completedCount = milestones.filter(m => m.status === 'completed').length;

    const totalElement = document.getElementById('totalMilestones');
    const inProgressElement = document.getElementById('inProgressCount');
    const submittedElement = document.getElementById('submittedCount');
    const completedElement = document.getElementById('completedCount');

    if (totalElement) totalElement.textContent = totalCount;
    if (inProgressElement) inProgressElement.textContent = inProgressCount;
    if (submittedElement) submittedElement.textContent = submittedCount;
    if (completedElement) completedElement.textContent = completedCount;
}