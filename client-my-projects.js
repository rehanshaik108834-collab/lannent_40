// ===========================
// PROJECT DATA
// ===========================

const projectsData = [
    // Open Tasks
    {
        id: "1",
        title: "API Integration Project",
        worker: "Not Assigned",
        workerAvatar: "?",
        progress: 0,
        milestonesCompleted: 0,
        milestonesTotal: 3,
        escrowAmount: "$1,200",
        escrowStatus: "locked",
        deadline: "Mar 18, 2026",
        status: "Open",
        statusColor: "open",
        tab: "open",
    },
    {
        id: "2",
        title: "UI/UX Design for Dashboard",
        worker: "Not Assigned",
        workerAvatar: "?",
        progress: 0,
        milestonesCompleted: 0,
        milestonesTotal: 4,
        escrowAmount: "$2,800",
        escrowStatus: "locked",
        deadline: "Mar 25, 2026",
        status: "Open",
        statusColor: "open",
        tab: "open",
    },
    // Active Tasks
    {
        id: "3",
        title: "E-commerce Website Redesign",
        worker: "Sarah Johnson",
        workerAvatar: "SJ",
        progress: 75,
        milestonesCompleted: 3,
        milestonesTotal: 4,
        escrowAmount: "$2,500",
        escrowStatus: "locked",
        deadline: "Mar 15, 2026",
        status: "In Progress",
        statusColor: "in-progress",
        tab: "active",
    },
    {
        id: "4",
        title: "Mobile App Development",
        worker: "Michael Chen",
        workerAvatar: "MC",
        progress: 45,
        milestonesCompleted: 2,
        milestonesTotal: 5,
        escrowAmount: "$4,800",
        escrowStatus: "pending",
        deadline: "Mar 20, 2026",
        status: "Under Review",
        statusColor: "under-review",
        tab: "active",
    },
    {
        id: "5",
        title: "Content Management System",
        worker: "Emily Rodriguez",
        workerAvatar: "ER",
        progress: 90,
        milestonesCompleted: 4,
        milestonesTotal: 4,
        escrowAmount: "$3,500",
        escrowStatus: "pending",
        deadline: "Mar 12, 2026",
        status: "Under Review",
        statusColor: "under-review",
        tab: "active",
    },
    {
        id: "6",
        title: "Payment Gateway Integration",
        worker: "David Kim",
        workerAvatar: "DK",
        progress: 60,
        milestonesCompleted: 3,
        milestonesTotal: 5,
        escrowAmount: "$3,200",
        escrowStatus: "locked",
        deadline: "Mar 22, 2026",
        status: "In Progress",
        statusColor: "in-progress",
        tab: "active",
    },
    // Completed Tasks
    {
        id: "7",
        title: "Marketing Website Launch",
        worker: "Jessica Lee",
        workerAvatar: "JL",
        progress: 100,
        milestonesCompleted: 5,
        milestonesTotal: 5,
        escrowAmount: "$4,500",
        escrowStatus: "released",
        deadline: "Feb 28, 2026",
        status: "Completed",
        statusColor: "completed",
        tab: "completed",
    },
    {
        id: "8",
        title: "Database Migration",
        worker: "Ryan Park",
        workerAvatar: "RP",
        progress: 100,
        milestonesCompleted: 3,
        milestonesTotal: 3,
        escrowAmount: "$2,100",
        escrowStatus: "released",
        deadline: "Mar 1, 2026",
        status: "Completed",
        statusColor: "completed",
        tab: "completed",
    },
    {
        id: "9",
        title: "SEO Optimization",
        worker: "Amanda Silva",
        workerAvatar: "AS",
        progress: 100,
        milestonesCompleted: 4,
        milestonesTotal: 4,
        escrowAmount: "$1,800",
        escrowStatus: "released",
        deadline: "Feb 25, 2026",
        status: "Completed",
        statusColor: "completed",
        tab: "completed",
    },
    // Disputed Tasks
    {
        id: "10",
        title: "Backend API Development",
        worker: "James Wilson",
        workerAvatar: "JW",
        progress: 50,
        milestonesCompleted: 2,
        milestonesTotal: 4,
        escrowAmount: "$5,200",
        escrowStatus: "locked",
        deadline: "Mar 10, 2026",
        status: "Disputed",
        statusColor: "disputed",
        tab: "disputed",
    },
    {
        id: "11",
        title: "Cloud Infrastructure Setup",
        worker: "Kevin Zhang",
        workerAvatar: "KZ",
        progress: 40,
        milestonesCompleted: 1,
        milestonesTotal: 3,
        escrowAmount: "$3,900",
        escrowStatus: "locked",
        deadline: "Mar 8, 2026",
        status: "Disputed",
        statusColor: "disputed",
        tab: "disputed",
    },
];

// ===========================
// STATE MANAGEMENT
// ===========================

const pageState = {
    activeTab: "active",
};

// ===========================
// DOM ELEMENTS
// ===========================

const tabButtons = document.querySelectorAll('.tab-button');
const projectsContainer = document.getElementById('projectsContainer');
const emptyState = document.getElementById('emptyState');

// ===========================
// HELPER FUNCTIONS
// ===========================

function getEscrowBadgeInfo(status) {
    const badges = {
        locked: {
            text: "Escrow Locked",
            icon: "🔒",
            className: "escrow-locked",
        },
        pending: {
            text: "Pending Approval",
            icon: "⏱",
            className: "escrow-pending",
        },
        released: {
            text: "Funds Released",
            icon: "✓",
            className: "escrow-released",
        },
    };
    return badges[status];
}

function getActionButtons(tab, projectId) {
    const buttons = {
        open: `
            <a href="#" class="action-button" data-action="view-details">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>View Details</span>
            </a>
            <a href="#" class="action-button" data-action="view-proposals">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>View Proposals</span>
            </a>
        `,
        active: `
            <a href="#" class="action-button" data-action="milestone-board">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Milestone Board</span>
            </a>
            <a href="#" class="action-button" data-action="workroom">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Workroom</span>
            </a>
        `,
        completed: `
            <a href="#" class="action-button" data-action="view-details">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>View Details</span>
            </a>
            <button class="action-button" data-action="view-summary">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>View Summary</span>
            </button>
        `,
        disputed: `
            <a href="#" class="action-button dispute" data-action="view-dispute">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>View Dispute</span>
            </a>
            <button class="action-button" data-action="contact-support">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Contact Support</span>
            </button>
        `,
    };
    return buttons[tab] || buttons.active;
}

function createProjectCard(project) {
    const escrowBadge = getEscrowBadgeInfo(project.escrowStatus);
    const actionButtons = getActionButtons(project.tab, project.id);

    return `
        <div class="project-card">
            <div class="project-card-header">
                <div class="project-card-info">
                    <h3 class="project-card-title">${project.title}</h3>
                    <div class="project-worker-info">
                        <div class="worker-avatar-small">${project.workerAvatar}</div>
                        <span class="worker-name">${project.worker}</span>
                    </div>
                </div>
                <span class="status-badge-small ${project.statusColor}">${project.status}</span>
            </div>

            <div class="milestone-section">
                <div class="milestone-header">
                    <span class="milestone-label">Milestone Progress</span>
                    <span class="milestone-count">${project.milestonesCompleted}/${project.milestonesTotal} completed</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${project.progress}%"></div>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-box ${escrowBadge.className}">
                    <div class="info-box-header">
                        <span>${escrowBadge.icon}</span>
                        <span class="info-box-label">${escrowBadge.text}</span>
                    </div>
                    <div class="info-box-value">${project.escrowAmount}</div>
                </div>

                <div class="info-box deadline">
                    <div class="info-box-header">
                        <span>📅</span>
                        <span class="info-box-label">Deadline</span>
                    </div>
                    <div class="info-box-value">${project.deadline}</div>
                </div>
            </div>

            <div class="action-buttons">
                ${actionButtons}
            </div>
        </div>
    `;
}

// ===========================
// RENDER FUNCTIONS
// ===========================

function renderProjects(tab) {
    const filteredProjects = projectsData.filter(p => p.tab === tab);

    if (filteredProjects.length === 0) {
        projectsContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    projectsContainer.style.display = 'grid';
    emptyState.style.display = 'none';

    projectsContainer.innerHTML = filteredProjects
        .map(project => createProjectCard(project))
        .join('');

    // Attach action button event listeners
    attachActionListeners();
}

function attachActionListeners() {
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const action = button.getAttribute('data-action');
            handleProjectAction(action);
        });
    });
}

function handleProjectAction(action) {
    const actions = {
        'view-details': () => console.log('View project details'),
        'view-proposals': () => console.log('View worker proposals'),
        'milestone-board': () => console.log('Open milestone board'),
        'workroom': () => console.log('Open project workroom'),
        'view-summary': () => console.log('View project summary'),
        'view-dispute': () => console.log('View dispute details'),
        'contact-support': () => console.log('Contact support'),
    };

    if (actions[action]) {
        actions[action]();
    }
}

// ===========================
// TAB SWITCHING
// ===========================

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');

        // Update active tab styling
        tabButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        // Update state and render
        pageState.activeTab = tab;
        renderProjects(tab);
    });
});

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('My Projects page initialized');
    renderProjects(pageState.activeTab);
});

// ===========================
// HANDLE NAVIGATION
// ===========================

const primaryButtons = document.querySelectorAll('.primary-button');
primaryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Navigate to Post Task');
    });
});