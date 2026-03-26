// ===========================
// DATA
// ===========================

const balanceStats = {
    availableBalance: 8500,
    escrowLocked: 7000,
    pendingMilestones: 3200,
    totalSpent: 45000,
};

const escrowProjectsData = [
    {
        id: "1",
        project: "E-Commerce Mobile App",
        milestone: "Milestone 2: Payment Integration",
        worker: "Alex Chen",
        workerAvatar: "https://i.pravatar.cc/150?img=12",
        amount: 3500,
        status: "Locked",
        releaseDate: "Mar 15, 2026",
        submittedDate: "Mar 7, 2026",
    },
    {
        id: "2",
        project: "SaaS Dashboard Redesign",
        milestone: "Milestone 1: Wireframes & Design",
        worker: "Sarah Kim",
        workerAvatar: "https://i.pravatar.cc/150?img=45",
        amount: 2000,
        status: "Pending Review",
        releaseDate: "Mar 12, 2026",
        submittedDate: "Mar 6, 2026",
    },
    {
        id: "3",
        project: "API Integration Project",
        milestone: "Milestone 3: Backend Development",
        worker: "Marcus Rodriguez",
        workerAvatar: "https://i.pravatar.cc/150?img=33",
        amount: 1500,
        status: "Locked",
        releaseDate: "Mar 20, 2026",
        submittedDate: null,
    },
];

const paymentMethodsData = [
    {
        id: "1",
        type: "card",
        name: "Visa",
        last4: "3412",
        expiry: "12/27",
        isPrimary: true,
    },
    {
        id: "2",
        type: "bank",
        name: "Bank Account",
        last4: "9281",
        bankName: "Chase Bank",
        isPrimary: false,
    },
];

const transactionsData = [
    {
        id: "1",
        type: "Escrow Lock",
        description: "E-Commerce Mobile App - Milestone 2",
        amount: -3500,
        date: "Mar 7, 2026",
        time: "2:30 PM",
        status: "Completed",
    },
    {
        id: "2",
        type: "Deposit",
        description: "Funds added via Visa ****3412",
        amount: 5000,
        date: "Mar 6, 2026",
        time: "10:15 AM",
        status: "Completed",
    },
    {
        id: "3",
        type: "Escrow Release",
        description: "SaaS Dashboard - Milestone 1 approved",
        amount: -2000,
        date: "Mar 5, 2026",
        time: "4:45 PM",
        status: "Completed",
    },
    {
        id: "4",
        type: "Refund",
        description: "API Integration - Milestone canceled",
        amount: 800,
        date: "Mar 4, 2026",
        time: "11:20 AM",
        status: "Completed",
    },
    {
        id: "5",
        type: "Escrow Lock",
        description: "API Integration Project - Milestone 3",
        amount: -1500,
        date: "Mar 3, 2026",
        time: "9:00 AM",
        status: "Completed",
    },
    {
        id: "6",
        type: "Deposit",
        description: "Funds added via Bank Account",
        amount: 10000,
        date: "Mar 1, 2026",
        time: "3:20 PM",
        status: "Completed",
    },
];

// ===========================
// STATE
// ===========================

const pageState = {
    selectedFilter: "all",
};

// ===========================
// DOM ELEMENTS
// ===========================

const addFundsBtn = document.getElementById('addFundsBtn');
const addPaymentMethodBtn = document.getElementById('addPaymentMethodBtn');
const addPaymentMethodBtn2 = document.getElementById('addPaymentMethodBtn2');
const addFundsModal = document.getElementById('addFundsModal');
const addPaymentMethodModal = document.getElementById('addPaymentMethodModal');
const closeFundsModal = document.getElementById('closeFundsModal');
const closePaymentMethodModal = document.getElementById('closePaymentMethodModal');

const escrowProjects = document.getElementById('escrowProjects');
const filterButtons = document.getElementById('filterButtons');
const transactionsList = document.getElementById('transactionsList');
const paymentMethods = document.getElementById('paymentMethods');

// ===========================
// HELPER FUNCTIONS
// ===========================

function getStatusClass(status) {
    switch (status) {
        case "Locked":
            return "status-locked";
        case "Pending Review":
            return "status-pending";
        case "Released":
            return "status-released";
        default:
            return "status-locked";
    }
}

function getTransactionIcon(type) {
    switch (type) {
        case "Deposit":
            return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8 10 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
        case "Escrow Lock":
            return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
        case "Escrow Release":
            return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8 14 1 7"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
        case "Refund":
            return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8 10 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
        default:
            return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H6"></path></svg>';
    }
}

function renderEscrowProjects() {
    escrowProjects.innerHTML = escrowProjectsData.map(project => `
        <div class="escrow-item">
            <div class="escrow-item-top">
                <div class="escrow-item-info">
                    <p class="escrow-project-name">${project.project}</p>
                    <p class="escrow-milestone">${project.milestone}</p>
                </div>
                <span class="status-badge ${getStatusClass(project.status)}">
                    ${project.status}
                </span>
            </div>

            <div class="escrow-item-details">
                <div class="detail-box">
                    <p class="detail-label">Worker</p>
                    <div class="worker-info">
                        <img src="${project.workerAvatar}" alt="${project.worker}" class="worker-avatar">
                        <p class="detail-value">${project.worker}</p>
                    </div>
                </div>

                <div class="detail-box">
                    <p class="detail-label">Amount</p>
                    <p class="detail-value">$${project.amount.toLocaleString()}</p>
                </div>

                <div class="detail-box">
                    <p class="detail-label">Release Date</p>
                    <p class="detail-value">${project.releaseDate}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFilterButtons() {
    const filters = ["all", "deposit", "escrow", "refund"];
    filterButtons.innerHTML = filters.map(filter => `
        <button class="filter-btn ${filter === pageState.selectedFilter ? 'active' : 'inactive'}" data-filter="${filter}">
            ${filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
    `).join('');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            pageState.selectedFilter = btn.getAttribute('data-filter');
            renderFilterButtons();
            renderTransactions();
        });
    });
}

function getFilteredTransactions() {
    if (pageState.selectedFilter === 'all') return transactionsData;
    
    if (pageState.selectedFilter === 'deposit') {
        return transactionsData.filter(t => t.type === 'Deposit');
    }
    if (pageState.selectedFilter === 'escrow') {
        return transactionsData.filter(t => t.type.includes('Escrow'));
    }
    if (pageState.selectedFilter === 'refund') {
        return transactionsData.filter(t => t.type === 'Refund');
    }
    
    return transactionsData;
}

function renderTransactions() {
    const filtered = getFilteredTransactions();
    transactionsList.innerHTML = filtered.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-left">
                <div class="transaction-icon">
                    ${getTransactionIcon(transaction.type)}
                </div>
                <div class="transaction-info">
                    <p class="transaction-type">${transaction.type}</p>
                    <p class="transaction-description">${transaction.description}</p>
                </div>
            </div>
            <div class="transaction-right">
                <p class="transaction-amount ${transaction.amount > 0 ? 'positive' : ''}">
                    ${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toLocaleString()}
                </p>
                <p class="transaction-date">${transaction.date}</p>
            </div>
        </div>
    `).join('');
}

function renderPaymentMethods() {
    paymentMethods.innerHTML = paymentMethodsData.map(method => `
        <div class="payment-method">
            <div class="payment-method-top">
                <div style="display: flex; align-items: flex-start; gap: 12px; flex: 1;">
                    <div class="payment-method-icon">
                        ${method.type === 'card' ? 
                            '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>' : 
                            '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l0 6a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2l0 -6"></path><path d="M3 9c0 -1 .895 -2 2 -2h14c1.105 0 2 1 2 2"></path><path d="M7 14h10"></path></svg>'
                        }
                    </div>
                    <div class="payment-method-details">
                        <p class="payment-method-name">${method.name} ****${method.last4}</p>
                        <p class="payment-method-info">
                            ${method.type === 'card' ? `Expires ${method.expiry}` : method.bankName}
                        </p>
                    </div>
                </div>
                <button class="payment-method-menu">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </button>
            </div>
            ${method.isPrimary ? `
                <div class="primary-badge">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span class="primary-badge-text">Primary</span>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function openAddFundsModal() {
    addFundsModal.style.display = 'flex';
}

function closeAddFundsModalHandler() {
    addFundsModal.style.display = 'none';
}

function openAddPaymentMethodModal() {
    addPaymentMethodModal.style.display = 'flex';
}

function closeAddPaymentMethodModalHandler() {
    addPaymentMethodModal.style.display = 'none';
}

// ===========================
// EVENT LISTENERS
// ===========================

addFundsBtn.addEventListener('click', openAddFundsModal);
addPaymentMethodBtn.addEventListener('click', openAddPaymentMethodModal);
addPaymentMethodBtn2.addEventListener('click', openAddPaymentMethodModal);

closeFundsModal.addEventListener('click', closeAddFundsModalHandler);
closePaymentMethodModal.addEventListener('click', closeAddPaymentMethodModalHandler);

// Close modals when clicking on backdrop
addFundsModal.addEventListener('click', (e) => {
    if (e.target === addFundsModal) {
        closeAddFundsModalHandler();
    }
});

addPaymentMethodModal.addEventListener('click', (e) => {
    if (e.target === addPaymentMethodModal) {
        closeAddPaymentMethodModalHandler();
    }
});

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Wallet page initialized');
    
    renderEscrowProjects();
    renderFilterButtons();
    renderTransactions();
    renderPaymentMethods();
});