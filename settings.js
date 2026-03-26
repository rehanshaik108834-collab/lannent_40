// ===========================
// STATE MANAGEMENT
// ===========================

const appState = {
    activeTab: 'profile',
    twoFactorEnabled: false,
    profileData: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@lannent.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        bio: 'Product manager with 8+ years of experience building scalable SaaS platforms. Passionate about creating delightful user experiences.',
    },
    companyData: {
        companyName: 'TechCorp Solutions',
        industry: 'Technology',
        website: 'https://techcorp.com',
        companySize: '50-200 employees',
        location: 'San Francisco, CA',
    },
    paymentMethods: [
        { id: '1', type: 'card', name: 'Visa Card', details: '•••• 4242', isPrimary: true },
        { id: '2', type: 'bank', name: 'Bank Account', details: 'Chase •••• 8901', isPrimary: false },
        { id: '3', type: 'paypal', name: 'PayPal', details: 'alex.morgan@email.com', isPrimary: false },
    ],
    notifications: [
        { id: '1', label: 'New Proposals', description: 'When a freelancer submits a proposal to your project', enabled: true },
        { id: '2', label: 'Milestone Submissions', description: 'When a milestone is submitted for review', enabled: true },
        { id: '3', label: 'Escrow Payments', description: 'When escrow funds are released or received', enabled: true },
        { id: '4', label: 'Expert Audit Results', description: 'When an expert reviewer completes an audit', enabled: true },
        { id: '5', label: 'Messages', description: 'When you receive a new message', enabled: true },
    ],
    loginActivities: [
        { id: '1', device: 'MacBook Pro • Chrome', location: 'San Francisco, CA', timestamp: '2 minutes ago', isCurrent: true },
        { id: '2', device: 'iPhone 14 • Safari', location: 'San Francisco, CA', timestamp: '3 hours ago', isCurrent: false },
        { id: '3', device: 'iPad Air • Safari', location: 'Oakland, CA', timestamp: '2 days ago', isCurrent: false },
    ],
};

// ===========================
// DOM ELEMENT REFERENCES
// ===========================

const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');
const paymentMethodsList = document.getElementById('paymentMethodsList');
const notificationsList = document.getElementById('notificationsList');
const loginActivities = document.getElementById('loginActivities');

// Modal references
const addPaymentModal = document.getElementById('addPaymentModal');
const twoFAModal = document.getElementById('twoFAModal');
const addPaymentBtn = document.getElementById('addPaymentBtn');
const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const enable2FABtn = document.getElementById('enable2FABtn');
const closeTwoFABtn = document.getElementById('closeTwoFABtn');
const cancel2FABtn = document.getElementById('cancel2FABtn');
const confirm2FABtn = document.getElementById('confirm2FABtn');
const twoFAStatus = document.getElementById('twoFAStatus');
const cardNumberInput = document.getElementById('cardNumber');
const verificationCodeInput = document.getElementById('verificationCode');

// ===========================
// UTILITY FUNCTIONS
// ===========================

function showNotification(message) {
    console.log('✓ ', message);
    // You can enhance this with a toast notification system
}

function getPaymentIcon(type) {
    const icons = {
        card: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
        bank: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
        paypal: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    };
    return icons[type] || icons.card;
}

function getDeviceIcon(device) {
    if (device.includes('iPhone') || device.includes('iPad')) {
        return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>';
    }
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="17" x2="22" y2="17"></line></svg>';
}

// ===========================
// RENDER FUNCTIONS
// ===========================

function renderPaymentMethods() {
    paymentMethodsList.innerHTML = appState.paymentMethods.map(method => `
        <div class="payment-method-item">
            <div class="payment-method-left">
                <div class="payment-method-icon">
                    ${getPaymentIcon(method.type)}
                </div>
                <div class="payment-method-info">
                    <div class="payment-method-name">
                        ${method.name}
                        ${method.isPrimary ? '<span class="primary-badge">Primary</span>' : ''}
                    </div>
                    <div class="payment-method-details">${method.details}</div>
                </div>
            </div>
            <button class="payment-method-delete" data-payment-id="${method.id}" title="Delete payment method">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        </div>
    `).join('');

    // Add event listeners for delete buttons
    document.querySelectorAll('.payment-method-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const paymentId = e.currentTarget.getAttribute('data-payment-id');
            removePaymentMethod(paymentId);
        });
    });
}

function renderNotifications() {
    notificationsList.innerHTML = appState.notifications.map(notif => `
        <div class="notification-item">
            <div class="notification-info">
                <span class="notification-label">${notif.label}</span>
                <span class="notification-description">${notif.description}</span>
            </div>
            <button class="toggle-switch ${notif.enabled ? 'active' : ''}" data-notification-id="${notif.id}" title="Toggle notification">
                <div class="toggle-knob"></div>
            </button>
        </div>
    `).join('');

    // Add event listeners for toggle switches
    document.querySelectorAll('.toggle-switch').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const notificationId = e.currentTarget.getAttribute('data-notification-id');
            toggleNotification(notificationId);
        });
    });
}

function renderLoginActivities() {
    loginActivities.innerHTML = appState.loginActivities.map(activity => `
        <div class="login-activity">
            <div class="login-activity-left">
                <div class="login-activity-icon">
                    ${getDeviceIcon(activity.device)}
                </div>
                <div class="login-activity-info">
                    <div class="login-activity-device">
                        ${activity.device}
                        ${activity.isCurrent ? '<span class="login-activity-badge">Current</span>' : ''}
                    </div>
                    <div class="login-activity-details">${activity.location} • ${activity.timestamp}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// ===========================
// ACTION FUNCTIONS
// ===========================

function switchTab(tabId) {
    // Update state
    appState.activeTab = tabId;

    // Hide all panels
    settingsPanels.forEach(panel => panel.classList.remove('active'));

    // Remove active class from all tabs
    settingsTabs.forEach(tab => tab.classList.remove('active'));

    // Show selected panel
    const panelMap = {
        'profile': 'profileTab',
        'company': 'companyTab',
        'payment': 'paymentTab',
        'notifications': 'notificationsTab',
        'security': 'securityTab',
    };

    const selectedPanel = document.getElementById(panelMap[tabId]);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }

    // Add active to selected tab
    const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Render tab-specific content
    renderTabContent();
}

function renderTabContent() {
    if (appState.activeTab === 'payment') {
        renderPaymentMethods();
    } else if (appState.activeTab === 'notifications') {
        renderNotifications();
    } else if (appState.activeTab === 'security') {
        renderLoginActivities();
    }
}

function removePaymentMethod(id) {
    appState.paymentMethods = appState.paymentMethods.filter(method => method.id !== id);
    renderPaymentMethods();
    showNotification('Payment method removed successfully!');
}

function toggleNotification(id) {
    const notification = appState.notifications.find(n => n.id === id);
    if (notification) {
        notification.enabled = !notification.enabled;
    }
    renderNotifications();
}

function updateProfileData() {
    appState.profileData.fullName = document.getElementById('profileFullName').value;
    appState.profileData.email = document.getElementById('profileEmail').value;
    appState.profileData.phone = document.getElementById('profilePhone').value;
    appState.profileData.location = document.getElementById('profileLocation').value;
    appState.profileData.bio = document.getElementById('profileBio').value;
    
    console.log('Profile saved:', appState.profileData);
    showNotification('Profile updated successfully!');
}

function updateCompanyData() {
    appState.companyData.companyName = document.getElementById('companyName').value;
    appState.companyData.industry = document.getElementById('companyIndustry').value;
    appState.companyData.website = document.getElementById('companyWebsite').value;
    appState.companyData.companySize = document.getElementById('companySize').value;
    appState.companyData.location = document.getElementById('companyLocation').value;
    
    console.log('Company data saved:', appState.companyData);
    showNotification('Company details updated successfully!');
}

function updateTwoFAStatus() {
    if (appState.twoFactorEnabled) {
        twoFAStatus.textContent = 'Enabled';
        twoFAStatus.classList.add('enabled');
        enable2FABtn.textContent = 'Manage 2FA';
    } else {
        twoFAStatus.textContent = 'Disabled';
        twoFAStatus.classList.remove('enabled');
        enable2FABtn.textContent = 'Enable 2FA';
    }
}

function toggleTwoFactor() {
    appState.twoFactorEnabled = !appState.twoFactorEnabled;
    updateTwoFAStatus();
}

function openAddPaymentModal() {
    addPaymentModal.style.display = 'flex';
    cardNumberInput.focus();
}

function closeAddPaymentModal() {
    addPaymentModal.style.display = 'none';
    cardNumberInput.value = '';
}

function openTwoFAModal() {
    twoFAModal.style.display = 'flex';
    verificationCodeInput.focus();
}

function closeTwoFAModal() {
    twoFAModal.style.display = 'none';
    verificationCodeInput.value = '';
}

function addPaymentMethod() {
    const cardNumber = cardNumberInput.value.trim();
    
    if (!cardNumber) {
        showNotification('Please enter a card number');
        return;
    }

    const newMethod = {
        id: Date.now().toString(),
        type: 'card',
        name: 'New Visa Card',
        details: '•••• ' + cardNumber.slice(-4),
        isPrimary: false,
    };

    appState.paymentMethods.push(newMethod);
    renderPaymentMethods();
    closeAddPaymentModal();
    showNotification('Payment method added successfully!');
}

function enableTwoFactor() {
    const verificationCode = verificationCodeInput.value.trim();

    if (!verificationCode || verificationCode.length !== 6 || isNaN(verificationCode)) {
        showNotification('Please enter a valid 6-digit code');
        return;
    }

    appState.twoFactorEnabled = true;
    updateTwoFAStatus();
    closeTwoFAModal();
    showNotification('Two-factor authentication enabled successfully!');
}

// ===========================
// EVENT LISTENERS
// ===========================

function setupEventListeners() {
    // Tab switching
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabId = e.currentTarget.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Profile form
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', updateProfileData);
    }

    // Company form
    const saveCompanyBtn = document.getElementById('saveCompanyBtn');
    if (saveCompanyBtn) {
        saveCompanyBtn.addEventListener('click', updateCompanyData);
    }

    // Save notifications
    const saveNotificationsBtn = document.getElementById('saveNotificationsBtn');
    if (saveNotificationsBtn) {
        saveNotificationsBtn.addEventListener('click', () => {
            console.log('Notification preferences saved:', appState.notifications);
            showNotification('Notification preferences saved successfully!');
        });
    }

    // Bio character counter
    const bioInput = document.getElementById('profileBio');
    if (bioInput) {
        const updateCharCount = () => {
            const charCount = bioInput.value.length;
            const charCountEl = document.getElementById('bioCharCount');
            if (charCountEl) {
                charCountEl.textContent = charCount;
            }
        };
        bioInput.addEventListener('input', updateCharCount);
        updateCharCount(); // Initialize on load
    }

    // Change password
    const changePasswordBtn = document.querySelector('#securityTab .btn-secondary');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            showNotification('Password updated successfully!');
        });
    }

    // Logout all devices
    const logoutAllBtn = document.querySelector('.btn-logout-all');
    if (logoutAllBtn) {
        logoutAllBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout all devices?')) {
                console.log('Logging out all devices');
                showNotification('All devices logged out successfully!');
            }
        });
    }

    // Payment Methods Modal
    if (addPaymentBtn) {
        addPaymentBtn.addEventListener('click', openAddPaymentModal);
    }

    if (cancelPaymentBtn) {
        cancelPaymentBtn.addEventListener('click', closeAddPaymentModal);
    }

    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', addPaymentMethod);
    }

    // 2FA Modal
    if (enable2FABtn) {
        enable2FABtn.addEventListener('click', openTwoFAModal);
    }

    if (closeTwoFABtn) {
        closeTwoFABtn.addEventListener('click', closeTwoFAModal);
    }

    if (cancel2FABtn) {
        cancel2FABtn.addEventListener('click', closeTwoFAModal);
    }

    if (confirm2FABtn) {
        confirm2FABtn.addEventListener('click', enableTwoFactor);
    }

    // Close modals on backdrop click
    addPaymentModal.addEventListener('click', (e) => {
        if (e.target === addPaymentModal) {
            closeAddPaymentModal();
        }
    });

    twoFAModal.addEventListener('click', (e) => {
        if (e.target === twoFAModal) {
            closeTwoFAModal();
        }
    });

    // Allow Enter key to submit in modals
    cardNumberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addPaymentMethod();
        }
    });

    verificationCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enableTwoFactor();
        }
    });
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Settings page initialized');
    
    // Setup all event listeners
    setupEventListeners();
    
    // Initialize the page with profile tab
    switchTab('profile');
    
    // Set initial 2FA status
    updateTwoFAStatus();
});