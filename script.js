// ===========================
// APP STATE
// ===========================

const appState = {
    sidebarCollapsed: false,
    notificationsOpen: false,
    userMenuOpen: false,
};

// ===========================
// DOM ELEMENTS
// ===========================

const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');
const mainWrapper = document.querySelector('.main-wrapper');
const topNavbar = document.querySelector('.top-navbar');
const sidebarItems = document.querySelectorAll('.sidebar-item');

// ===========================
// SIDEBAR COLLAPSE TOGGLE
// ===========================

collapseBtn.addEventListener('click', () => {
    appState.sidebarCollapsed = !appState.sidebarCollapsed;

    if (appState.sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainWrapper.classList.add('collapsed');
        topNavbar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
        mainWrapper.classList.remove('collapsed');
        topNavbar.classList.remove('collapsed');
    }
});

// ===========================
// NOTIFICATION DROPDOWN
// ===========================

notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    appState.notificationsOpen = !appState.notificationsOpen;

    if (appState.notificationsOpen) {
        notificationDropdown.classList.add('show');
        // Close user menu if open
        if (appState.userMenuOpen) {
            userDropdown.classList.remove('show');
            appState.userMenuOpen = false;
        }
    } else {
        notificationDropdown.classList.remove('show');
    }
});

// ===========================
// USER MENU DROPDOWN
// ===========================

userMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    appState.userMenuOpen = !appState.userMenuOpen;

    if (appState.userMenuOpen) {
        userDropdown.classList.add('show');
        // Close notifications if open
        if (appState.notificationsOpen) {
            notificationDropdown.classList.remove('show');
            appState.notificationsOpen = false;
        }
    } else {
        userDropdown.classList.remove('show');
    }
});

// ===========================
// CLOSE DROPDOWNS ON OUTSIDE CLICK
// ===========================

document.addEventListener('click', (e) => {
    // Close notification dropdown
    if (appState.notificationsOpen && !notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
        notificationDropdown.classList.remove('show');
        appState.notificationsOpen = false;
    }

    // Close user menu dropdown
    if (appState.userMenuOpen && !userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('show');
        appState.userMenuOpen = false;
    }
});

// ===========================
// SIDEBAR NAVIGATION
// ===========================

sidebarItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        // Prevent default link behavior for demo
        e.preventDefault();

        // Remove active class from all items
        sidebarItems.forEach((i) => i.classList.remove('active'));

        // Add active class to clicked item
        item.classList.add('active');

        // Here you would typically navigate to the page
        const page = item.getAttribute('data-page');
        console.log(`Navigating to: ${page}`);
    });
});

// ===========================
// MARK ALL NOTIFICATIONS AS READ
// ===========================

const markAllReadBtn = document.querySelector('.mark-all-read');

if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
        console.log('All notifications marked as read');
        // Here you would typically send a request to the server
    });
}

// ===========================
// SEARCH FUNCTIONALITY
// ===========================

const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length > 0) {
            console.log(`Searching for: ${query}`);
            // Here you would typically perform a search
        }
    });
}

// ===========================
// QUICK ACTION LINKS
// ===========================

const quickActionCards = document.querySelectorAll('.quick-action-card');

quickActionCards.forEach((card) => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const title = card.querySelector('h3').textContent;
        console.log(`Quick action clicked: ${title}`);
        // Here you would typically navigate to the corresponding page
    });
});

// ===========================
// VIEW DETAILS LINKS
// ===========================

const viewDetailsLinks = document.querySelectorAll('.view-details-link');

viewDetailsLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectName = link.closest('.project-card').querySelector('.project-name').textContent;
        console.log(`Viewing details for: ${projectName}`);
        // Here you would typically navigate to the project details page
    });
});

// ===========================
// PRIMARY BUTTON
// ===========================

const primaryButton = document.querySelector('.primary-button');

if (primaryButton) {
    primaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Post new task clicked');
        // Here you would typically open a modal or navigate to the post task page
    });
}

// ===========================
// VIEW ALL BUTTONS
// ===========================

const viewAllBtns = document.querySelectorAll('.view-all-btn');

viewAllBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View all clicked');
        // Here you would typically navigate to a full list page
    });
});

// ===========================
// INITIALIZE APP
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard initialized');

    // Set first sidebar item as active by default
    if (sidebarItems.length > 0) {
        sidebarItems[0].classList.add('active');
    }

    // Initialize notification items with click handlers
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach((item) => {
        item.addEventListener('click', () => {
            console.log('Notification clicked');
            // Mark as read, navigate, etc.
        });
    });

    // Initialize user menu items with click handlers
    const userMenuItems = document.querySelectorAll('.user-menu-item');
    userMenuItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            const text = item.textContent.trim();
            console.log(`User menu item clicked: ${text}`);
            // Close menu after click
            if (!item.classList.contains('logout')) {
                appState.userMenuOpen = false;
                userDropdown.classList.remove('show');
            }
        });
    });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Function to close all dropdowns
function closeAllDropdowns() {
    notificationDropdown.classList.remove('show');
    userDropdown.classList.remove('show');
    appState.notificationsOpen = false;
    appState.userMenuOpen = false;
}

// Function to toggle sidebar collapse on smaller screens
function updateSidebarForScreen() {
    const width = window.innerWidth;
    if (width < 768 && !appState.sidebarCollapsed) {
        // Auto-collapse on smaller screens
        appState.sidebarCollapsed = true;
        sidebar.classList.add('collapsed');
        mainWrapper.classList.add('collapsed');
        topNavbar.classList.add('collapsed');
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    updateSidebarForScreen();
});

// Initialize sidebar state based on screen size
updateSidebarForScreen();