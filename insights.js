// ===========================
// DATA
// ===========================

const overviewStatsData = [
    {
        id: 1,
        label: "Total Projects",
        value: 48,
        trend: "+12%",
        trendUp: true,
        icon: "activity",
        color: "blue",
    },
    {
        id: 2,
        label: "Active Projects",
        value: 16,
        trend: "+8%",
        trendUp: true,
        icon: "clock",
        color: "green",
    },
    {
        id: 3,
        label: "Completed Projects",
        value: 29,
        trend: "+15%",
        trendUp: true,
        icon: "check-circle",
        color: "purple",
    },
    {
        id: 4,
        label: "Delayed Projects",
        value: 3,
        trend: "-3%",
        trendUp: false,
        icon: "alert-circle",
        color: "red",
    },
];

const milestoneVelocityData = [
    { month: "Jan", completed: 12 },
    { month: "Feb", completed: 19 },
    { month: "Mar", completed: 15 },
    { month: "Apr", completed: 24 },
    { month: "May", completed: 31 },
    { month: "Jun", completed: 28 },
];

const revenueData = [
    { month: "Jan", escrow: 45000, released: 38000, pending: 7000 },
    { month: "Feb", escrow: 52000, released: 44000, pending: 8000 },
    { month: "Mar", escrow: 48000, released: 40000, pending: 8000 },
    { month: "Apr", escrow: 61000, released: 53000, pending: 8000 },
    { month: "May", escrow: 68000, released: 59000, pending: 9000 },
    { month: "Jun", escrow: 64000, released: 55000, pending: 9000 },
];

const workerPerformanceData = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "SJ",
        projectsCompleted: 28,
        successRate: 98,
        rating: 4.9,
        onTimeDelivery: 96,
        isTopPerformer: true,
    },
    {
        id: "2",
        name: "Michael Chen",
        avatar: "MC",
        projectsCompleted: 24,
        successRate: 95,
        rating: 4.8,
        onTimeDelivery: 92,
        isTopPerformer: false,
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        avatar: "ER",
        projectsCompleted: 21,
        successRate: 97,
        rating: 4.9,
        onTimeDelivery: 94,
        isTopPerformer: false,
    },
    {
        id: "4",
        name: "David Kim",
        avatar: "DK",
        projectsCompleted: 19,
        successRate: 93,
        rating: 4.7,
        onTimeDelivery: 89,
        isTopPerformer: false,
    },
    {
        id: "5",
        name: "Jessica Lee",
        avatar: "JL",
        projectsCompleted: 17,
        successRate: 96,
        rating: 4.8,
        onTimeDelivery: 91,
        isTopPerformer: false,
    },
];

const projectHealthData = [
    {
        id: "1",
        name: "E-commerce Website Redesign",
        healthScore: 92,
        progress: 75,
        risk: "low",
        worker: "Sarah Johnson",
    },
    {
        id: "2",
        name: "Mobile App Development",
        healthScore: 78,
        progress: 45,
        risk: "medium",
        worker: "Michael Chen",
    },
    {
        id: "3",
        name: "Content Management System",
        healthScore: 95,
        progress: 90,
        risk: "low",
        worker: "Emily Rodriguez",
    },
    {
        id: "4",
        name: "Payment Gateway Integration",
        healthScore: 68,
        progress: 60,
        risk: "high",
        worker: "David Kim",
    },
];

const activityTimelineData = [
    {
        id: "1",
        type: "milestone",
        title: "Milestone Submitted",
        description: "Frontend Component Library submitted by Michael Chen",
        time: "2 hours ago",
        color: "green",
    },
    {
        id: "2",
        type: "hire",
        title: "Worker Hired",
        description: "Sarah Johnson hired for E-commerce Website Redesign",
        time: "5 hours ago",
        color: "blue",
    },
    {
        id: "3",
        type: "escrow",
        title: "Escrow Released",
        description: "$2,100 released for Database Migration project",
        time: "1 day ago",
        color: "purple",
    },
    {
        id: "4",
        type: "audit",
        title: "Expert Audit Completed",
        description: "Technical audit passed with 96/100 score",
        time: "1 day ago",
        color: "orange",
    },
    {
        id: "5",
        type: "milestone",
        title: "Milestone Approved",
        description: "Landing Page Design approved and escrow released",
        time: "2 days ago",
        color: "green",
    },
];

// ===========================
// CHARTS CONFIGURATION
// ===========================

let milestoneChart = null;
let revenueChart = null;

function initCharts() {
    // Milestone Velocity Chart
    const milestoneCtx = document.getElementById('milestoneVelocityChart');
    if (milestoneCtx) {
        milestoneChart = new Chart(milestoneCtx, {
            type: 'line',
            data: {
                labels: milestoneVelocityData.map(d => d.month),
                datasets: [
                    {
                        label: 'Completed',
                        data: milestoneVelocityData.map(d => d.completed),
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.05)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#8b5cf6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)',
                        },
                        ticks: {
                            font: {
                                family: "'Geist', sans-serif",
                                size: 12,
                            },
                            color: '#9ca3af',
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            font: {
                                family: "'Geist', sans-serif",
                                size: 12,
                            },
                            color: '#9ca3af',
                        },
                    },
                },
            },
        });
    }

    // Revenue Analytics Chart
    const revenueCtx = document.getElementById('revenueAnalyticsChart');
    if (revenueCtx) {
        revenueChart = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: revenueData.map(d => d.month),
                datasets: [
                    {
                        label: 'Escrow',
                        data: revenueData.map(d => d.escrow),
                        backgroundColor: '#3b82f6',
                        borderRadius: 4,
                        borderSkipped: false,
                    },
                    {
                        label: 'Released',
                        data: revenueData.map(d => d.released),
                        backgroundColor: '#10b981',
                        borderRadius: 4,
                        borderSkipped: false,
                    },
                    {
                        label: 'Pending',
                        data: revenueData.map(d => d.pending),
                        backgroundColor: '#f59e0b',
                        borderRadius: 4,
                        borderSkipped: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                family: "'Geist', sans-serif",
                                size: 12,
                            },
                            color: '#6b7280',
                            padding: 16,
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)',
                        },
                        ticks: {
                            font: {
                                family: "'Geist', sans-serif",
                                size: 12,
                            },
                            color: '#9ca3af',
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            font: {
                                family: "'Geist', sans-serif",
                                size: 12,
                            },
                            color: '#9ca3af',
                        },
                    },
                },
            },
        });
    }
}

// ===========================
// RENDER FUNCTIONS
// ===========================

function getIconSVG(type) {
    const icons = {
        activity: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
        clock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
        'check-circle': '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        'alert-circle': '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    };
    return icons[type] || '';
}

function renderOverviewCards() {
    const container = document.getElementById('overviewCards');
    container.innerHTML = overviewStatsData.map(stat => `
        <div class="overview-card">
            <div class="card-top">
                <div class="card-icon ${stat.color}">
                    ${getIconSVG(stat.icon)}
                </div>
                <div class="trend-indicator ${stat.trendUp ? 'trend-up' : 'trend-down'}">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${stat.trendUp ?
                        '<polyline points="23 6 13.5 15.5 8 10 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline>' :
                        '<polyline points="23 18 13.5 8.5 8 14 1 7"></polyline><polyline points="17 18 23 18 23 12"></polyline>'
                    }
                    </svg>
                    <span>${stat.trend}</span>
                </div>
            </div>
            <p class="card-label">${stat.label}</p>
            <p class="card-value">${stat.value}</p>
        </div>
    `).join('');
}

function renderWorkerPerformanceTable() {
    const tbody = document.getElementById('performanceTableBody');
    tbody.innerHTML = workerPerformanceData.map((worker, index) => `
        <tr>
            <td class="col-worker">
                <div class="worker-cell">
                    <div class="worker-avatar">${worker.avatar}</div>
                    <div class="worker-info">
                        <div class="worker-name">${worker.name}</div>
                        ${worker.isTopPerformer ? `
                            <div class="worker-badge">
                                <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2m-4-3V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2m0 0H4m16 0h2"></path>
                                </svg>
                                Top Performer
                            </div>
                        ` : ''}
                    </div>
                </div>
            </td>
            <td class="col-projects stat-center">${worker.projectsCompleted}</td>
            <td class="col-success stat-center">
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${worker.successRate}%"></div>
                    </div>
                    <span>${worker.successRate}%</span>
                </div>
            </td>
            <td class="col-rating stat-center">
                <div class="rating-cell">
                    <svg class="star-icon" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
                    </svg>
                    <span>${worker.rating}</span>
                </div>
            </td>
            <td class="col-ontime stat-center">${worker.onTimeDelivery}%</td>
        </tr>
    `).join('');
}

function getHealthScoreColor(score) {
    if (score >= 90) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
}

function getRiskClass(risk) {
    return `risk-${risk}`;
}

function getRiskIcon() {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
}

function renderProjectHealth() {
    const container = document.getElementById('healthProjects');
    container.innerHTML = projectHealthData.map(project => `
        <div class="health-item">
            <div class="health-item-top">
                <div class="health-item-info">
                    <h3 class="health-project-name">${project.name}</h3>
                    <p class="health-worker">${project.worker}</p>
                </div>
                <div class="risk-badge ${getRiskClass(project.risk)}">
                    ${getRiskIcon()}
                    <span>${project.risk.charAt(0).toUpperCase() + project.risk.slice(1)} Risk</span>
                </div>
            </div>

            <div class="health-metrics">
                <div class="health-metric">
                    <div class="metric-label">
                        <span>Health Score</span>
                        <span class="metric-value ${getHealthScoreColor(project.healthScore)}">${project.healthScore}/100</span>
                    </div>
                    <div class="metric-bar">
                        <div class="metric-fill health-score-fill" style="width: ${project.healthScore}%"></div>
                    </div>
                </div>

                <div class="health-metric">
                    <div class="metric-label">
                        <span>Progress</span>
                        <span class="metric-value">${project.progress}%</span>
                    </div>
                    <div class="metric-bar">
                        <div class="metric-fill progress-fill-gradient" style="width: ${project.progress}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getTimelineIconColor(color) {
    const colorMap = {
        'green': 'green',
        'blue': 'blue',
        'purple': 'purple',
        'orange': 'orange',
    };
    return colorMap[color] || 'blue';
}

function getTimelineIcon(type) {
    const icons = {
        milestone: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        hire: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        escrow: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H6"></path></svg>',
        audit: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    };
    return icons[type] || icons.milestone;
}

function renderActivityTimeline() {
    const container = document.getElementById('activityTimeline');
    container.innerHTML = activityTimelineData.map(activity => `
        <div class="timeline-item">
            <div class="timeline-icon ${getTimelineIconColor(activity.color)}">
                ${getTimelineIcon(activity.type)}
            </div>
            <div class="timeline-content">
                <h4 class="timeline-title">${activity.title}</h4>
                <p class="timeline-description">${activity.description}</p>
                <p class="timeline-time">${activity.time}</p>
            </div>
        </div>
    `).join('');
}

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Project Insights page initialized');
    
    renderOverviewCards();
    renderWorkerPerformanceTable();
    renderProjectHealth();
    renderActivityTimeline();
    
    // Initialize charts after DOM is ready
    setTimeout(() => {
        initCharts();
    }, 100);
});