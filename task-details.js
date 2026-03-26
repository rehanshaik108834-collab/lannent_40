// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    proposalModalOpen: false,
    formData: {
        coverLetter: '',
        bidAmount: '',
        estimatedTimeline: '',
        portfolioLink: ''
    }
};

// Task data
const taskData = {
    id: '1',
    title: 'E-commerce Platform Redesign',
    clientName: 'TechCorp Inc.',
    budget: 5000,
    currency: 'USD',
    deadline: 'Mar 25, 2026',
    category: 'Web Development',
    skills: ['React', 'TypeScript', 'UI Design', 'Figma', 'Tailwind CSS'],
    technicalAudit: true,
    proposalCount: 12,
    proposalDeadlineDays: 3,
    description: {
        overview: "We're looking for an experienced full-stack developer to completely redesign our e-commerce platform. The current system needs a modern UI/UX overhaul while maintaining all existing functionality and improving performance.",
        requirements: [
            '5+ years of experience with React and TypeScript',
            'Strong portfolio showcasing e-commerce projects',
            'Experience with modern state management (Redux, Zustand, etc.)',
            'Expertise in responsive design and mobile-first approach',
            'Understanding of payment gateway integrations',
            'Ability to work with RESTful APIs'
        ],
        deliverables: [
            'Complete UI/UX redesign in Figma',
            'Fully responsive React application',
            'Component library documentation',
            'Performance optimization report',
            'Deployment to production environment'
        ],
        timeline: 'The project is expected to be completed within 8 weeks from the start date. We have weekly milestone reviews and require daily progress updates via our project management tool.'
    },
    milestones: [
        {
            id: 'm1',
            title: 'UI/UX Design & Wireframes',
            description: 'Create complete design system and wireframes in Figma',
            budget: 1200,
            order: 1
        },
        {
            id: 'm2',
            title: 'Frontend Development',
            description: 'Build React components and integrate with existing APIs',
            budget: 2000,
            order: 2
        },
        {
            id: 'm3',
            title: 'Testing & Quality Assurance',
            description: 'Comprehensive testing across devices and browsers',
            budget: 800,
            order: 3
        },
        {
            id: 'm4',
            title: 'Deployment & Documentation',
            description: 'Deploy to production and create technical documentation',
            budget: 1000,
            order: 4
        }
    ],
    client: {
        name: 'TechCorp Inc.',
        rating: 4.8,
        projectsPosted: 24,
        hiringRate: 85,
        memberSince: 'Jan 2024',
        verified: true
    }
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeAnimations();
    initializeForm();
    loadTaskData();
});

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Modal overlay click to close
    const modal = document.getElementById('proposalModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeProposalModal();
            }
        });
    }

    // Form input tracking
    const coverLetterInput = document.getElementById('coverLetter');
    if (coverLetterInput) {
        coverLetterInput.addEventListener('input', function(e) {
            state.formData.coverLetter = e.target.value;
        });
    }

    const bidAmountInput = document.getElementById('bidAmount');
    if (bidAmountInput) {
        bidAmountInput.addEventListener('input', function(e) {
            state.formData.bidAmount = e.target.value;
        });
    }

    const estimatedTimelineInput = document.getElementById('estimatedTimeline');
    if (estimatedTimelineInput) {
        estimatedTimelineInput.addEventListener('input', function(e) {
            state.formData.estimatedTimeline = e.target.value;
        });
    }

    const portfolioLinkInput = document.getElementById('portfolioLink');
    if (portfolioLinkInput) {
        portfolioLinkInput.addEventListener('input', function(e) {
            state.formData.portfolioLink = e.target.value;
        });
    }

    // Form submission
    const proposalForm = document.getElementById('proposalForm');
    if (proposalForm) {
        proposalForm.addEventListener('submit', handleSubmitProposal);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(event) {
    // Close modal on Escape key
    if (event.key === 'Escape' && state.proposalModalOpen) {
        closeProposalModal();
    }

    // Open proposal modal with Ctrl/Cmd + P
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        openProposalModal();
    }
}

// ============================================
// MODAL MANAGEMENT
// ============================================

/**
 * Opens the proposal modal
 */
function openProposalModal() {
    const modal = document.getElementById('proposalModal');
    if (modal) {
        modal.style.display = 'flex';
        state.proposalModalOpen = true;
        document.body.style.overflow = 'hidden';

        // Focus on first input for accessibility
        setTimeout(() => {
            const coverLetterInput = document.getElementById('coverLetter');
            if (coverLetterInput) {
                coverLetterInput.focus();
            }
        }, 100);
    }
}

/**
 * Closes the proposal modal
 */
function closeProposalModal() {
    const modal = document.getElementById('proposalModal');
    if (modal) {
        modal.style.display = 'none';
        state.proposalModalOpen = false;
        document.body.style.overflow = 'auto';
        resetForm();
    }
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Initialize form
 */
function initializeForm() {
    const proposalForm = document.getElementById('proposalForm');
    if (proposalForm) {
        proposalForm.addEventListener('submit', handleSubmitProposal);
    }
}

/**
 * Handle form submission
 */
function handleSubmitProposal(event) {
    event.preventDefault();

    // Get form values
    const coverLetter = document.getElementById('coverLetter').value.trim();
    const bidAmount = document.getElementById('bidAmount').value.trim();
    const estimatedTimeline = document.getElementById('estimatedTimeline').value.trim();
    const portfolioLink = document.getElementById('portfolioLink').value.trim();

    // Validation
    const validationResult = validateProposalForm(coverLetter, bidAmount, estimatedTimeline, portfolioLink);
    
    if (!validationResult.isValid) {
        showErrorMessage(validationResult.error);
        return;
    }

    // Prepare proposal data
    const proposalData = {
        coverLetter,
        bidAmount: parseFloat(bidAmount),
        estimatedTimeline,
        portfolioLink,
        submittedAt: new Date().toISOString(),
        taskId: taskData.id,
        clientId: taskData.client.name
    };

    // Simulate API call
    submitProposal(proposalData);
}

/**
 * Validate proposal form
 */
function validateProposalForm(coverLetter, bidAmount, estimatedTimeline, portfolioLink) {
    // Check required fields
    if (!coverLetter) {
        return {
            isValid: false,
            error: 'Cover letter is required'
        };
    }

    if (!bidAmount) {
        return {
            isValid: false,
            error: 'Bid amount is required'
        };
    }

    if (!estimatedTimeline) {
        return {
            isValid: false,
            error: 'Estimated timeline is required'
        };
    }

    // Validate bid amount
    if (isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
        return {
            isValid: false,
            error: 'Please enter a valid bid amount greater than 0'
        };
    }

    // Validate cover letter length
    if (coverLetter.length < 20) {
        return {
            isValid: false,
            error: 'Cover letter must be at least 20 characters long'
        };
    }

    // Validate portfolio link if provided
    if (portfolioLink && !isValidUrl(portfolioLink)) {
        return {
            isValid: false,
            error: 'Please enter a valid portfolio URL'
        };
    }

    return {
        isValid: true,
        error: null
    };
}

/**
 * Submit proposal to server
 */
function submitProposal(proposalData) {
    // Show loading state
    const submitButton = document.querySelector('[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
    }

    // Simulate API call with delay
    setTimeout(() => {
        // Log data (in production, this would be sent to a server via fetch/axios)
        console.log('Proposal submitted:', proposalData);

        // Store in localStorage for demo purposes
        const proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
        proposals.push(proposalData);
        localStorage.setItem('proposals', JSON.stringify(proposals));

        // Show success message
        showSuccessMessage('Proposal submitted successfully!');

        // Close modal and reset form
        closeProposalModal();

        // Reset button state
        if (submitButton) {
            submitButton.textContent = 'Submit Proposal';
            submitButton.disabled = false;
        }
    }, 1500);
}

/**
 * Reset form fields
 */
function resetForm() {
    const form = document.getElementById('proposalForm');
    if (form) {
        form.reset();
    }

    // Reset state
    state.formData = {
        coverLetter: '',
        bidAmount: '',
        estimatedTimeline: '',
        portfolioLink: ''
    };
}

/**
 * Validate URL format
 */
function isValidUrl(urlString) {
    try {
        new URL(urlString);
        return true;
    } catch (_) {
        return false;
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

/**
 * Show success message notification
 */
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

/**
 * Show error message notification
 */
function showErrorMessage(message) {
    showNotification(message, 'error');
}

/**
 * Show warning message notification
 */
function showWarningMessage(message) {
    showNotification(message, 'warning');
}

/**
 * Generic notification function
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications of same type
    const existingNotifications = document.querySelectorAll(`.notification.notification-${type}`);
    existingNotifications.forEach(notif => {
        notif.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Set styles based on type
    const colors = {
        success: {
            bg: '#10b981',
            border: '#059669',
            text: '#ffffff'
        },
        error: {
            bg: '#ef4444',
            border: '#dc2626',
            text: '#ffffff'
        },
        warning: {
            bg: '#f59e0b',
            border: '#d97706',
            text: '#ffffff'
        },
        info: {
            bg: '#3b82f6',
            border: '#2563eb',
            text: '#ffffff'
        }
    };

    const color = colors[type] || colors.info;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${color.bg};
        border: 1px solid ${color.border};
        color: ${color.text};
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        font-size: 0.95rem;
        animation: slideIn 0.3s ease-out forwards;
        max-width: 400px;
        word-wrap: break-word;
    `;

    notification.textContent = message;

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: inherit;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeBtn.onclick = () => removeNotification(notification);

    notification.appendChild(closeBtn);
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    const timeout = setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Store timeout for cleanup
    notification.timeoutId = timeout;
}

/**
 * Remove notification with animation
 */
function removeNotification(notification) {
    if (notification.timeoutId) {
        clearTimeout(notification.timeoutId);
    }

    notification.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Navigate back to browse tasks
 */
function navigateBack() {
    // Check if history is available
    if (window.history && window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback to home or browse tasks page
        console.log('No history available');
        showWarningMessage('No previous page in history');
    }
}

// ============================================
// DATA MANAGEMENT
// ============================================

/**
 * Load and display task data
 */
function loadTaskData() {
    // Data is already in memory, but this could fetch from API
    console.log('Task data loaded:', taskData);

    // Initialize task display
    displayTaskData();
}

/**
 * Display task data on page
 */
function displayTaskData() {
    // Update page title
    document.title = `${taskData.title} - Task Details`;

    // Log loaded data
    console.log('Displaying task:', {
        title: taskData.title,
        budget: taskData.budget,
        proposalCount: taskData.proposalCount,
        deadline: taskData.deadline
    });
}

/**
 * Get saved proposals from localStorage
 */
function getSavedProposals() {
    try {
        const proposals = localStorage.getItem('proposals');
        return proposals ? JSON.parse(proposals) : [];
    } catch (error) {
        console.error('Error reading proposals from localStorage:', error);
        return [];
    }
}

/**
 * Clear all saved proposals
 */
function clearSavedProposals() {
    try {
        localStorage.removeItem('proposals');
        console.log('Proposals cleared');
    } catch (error) {
        console.error('Error clearing proposals:', error);
    }
}

// ============================================
// ANIMATIONS
// ============================================

/**
 * Initialize CSS animations
 */
function initializeAnimations() {
    // Add animation keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        @keyframes scaleUp {
            from {
                transform: scale(0.95);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        @media (max-width: 480px) {
            @keyframes slideIn {
                from {
                    transform: translateY(400px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(400px);
                    opacity: 0;
                }
            }
        }
    `;

    document.head.appendChild(styleSheet);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func.apply(this, args);
            lastCall = now;
        }
    };
}

// ============================================
// EXPORT FOR EXTERNAL USE (Optional)
// ============================================

// If using modules, export these functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openProposalModal,
        closeProposalModal,
        handleSubmitProposal,
        showSuccessMessage,
        showErrorMessage,
        navigateBack,
        getSavedProposals,
        clearSavedProposals
    };
}