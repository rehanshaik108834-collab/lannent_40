// ===========================
// PROJECTS DATA
// ===========================

const projectsData = [
    {
        id: "1",
        title: "E-commerce Website Redesign",
        budget: "$2,500",
        deadline: "Mar 15, 2026",
        description: "Need a complete redesign of our e-commerce platform with modern UI/UX",
        postedDate: "Mar 1, 2026",
        proposalCount: 12,
    },
    {
        id: "2",
        title: "Mobile App UI Design",
        budget: "$3,200",
        deadline: "Mar 20, 2026",
        description: "Looking for an experienced UI designer to create a modern mobile app interface",
        postedDate: "Mar 3, 2026",
        proposalCount: 7,
    },
    {
        id: "3",
        title: "AI Chatbot Development",
        budget: "$5,000",
        deadline: "Apr 1, 2026",
        description: "Build an intelligent chatbot with natural language processing capabilities",
        postedDate: "Feb 28, 2026",
        proposalCount: 5,
    },
];

const proposalsData = [
    // E-commerce proposals
    {
        id: "1",
        projectId: "1",
        workerName: "Sarah Johnson",
        workerAvatar: "SJ",
        rating: 4.9,
        reviewCount: 127,
        location: "San Francisco, CA",
        bidPrice: "$2,400",
        timeline: "2 weeks",
        coverLetter: "I have over 5 years of experience in e-commerce design. I've successfully completed 50+ similar projects with a 98% client satisfaction rate. I would love to bring your vision to life with a modern, conversion-optimized design.",
        skills: ["React", "Figma", "UI/UX Design", "E-commerce", "Responsive Design"],
        completedProjects: 89,
        successRate: 98,
        hourlyRate: "$85/hr",
        responseTime: "Within 2 hours",
        portfolioItems: [
            { title: "Fashion E-commerce Platform", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", description: "Complete redesign with 40% conversion increase" },
            { title: "Electronics Store Redesign", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400", description: "Modern UI with seamless checkout experience" },
        ],
        reviews: [
            { clientName: "Michael Chen", rating: 5, comment: "Excellent work! Sarah delivered beyond expectations and was very professional throughout.", date: "Feb 20, 2026" },
            { clientName: "Emily Rodriguez", rating: 5, comment: "Outstanding designer with great communication. Highly recommend!", date: "Jan 15, 2026" },
        ],
    },
    {
        id: "2",
        projectId: "1",
        workerName: "Michael Chen",
        workerAvatar: "MC",
        rating: 4.8,
        reviewCount: 94,
        location: "New York, NY",
        bidPrice: "$2,600",
        timeline: "3 weeks",
        coverLetter: "As a full-stack developer with design expertise, I can create a stunning e-commerce experience that not only looks great but performs exceptionally well. My approach focuses on user psychology and conversion optimization.",
        skills: ["React", "Node.js", "UI/UX", "Shopify", "Conversion Optimization"],
        completedProjects: 72,
        successRate: 96,
        hourlyRate: "$90/hr",
        responseTime: "Within 1 hour",
        portfolioItems: [
            { title: "Luxury Brand E-commerce", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400", description: "Premium shopping experience with 3D product views" },
        ],
        reviews: [
            { clientName: "David Kim", rating: 5, comment: "Michael is a true professional. Delivered on time and exceeded all requirements.", date: "Feb 28, 2026" },
        ],
    },
    {
        id: "3",
        projectId: "1",
        workerName: "Emily Rodriguez",
        workerAvatar: "ER",
        rating: 4.7,
        reviewCount: 68,
        location: "Austin, TX",
        bidPrice: "$2,200",
        timeline: "2.5 weeks",
        coverLetter: "I specialize in creating beautiful, conversion-focused e-commerce experiences. With a background in both design and marketing, I understand how to create designs that drive sales.",
        skills: ["Figma", "Adobe XD", "Webflow", "E-commerce", "Branding"],
        completedProjects: 56,
        successRate: 94,
        hourlyRate: "$75/hr",
        responseTime: "Within 3 hours",
        portfolioItems: [
            { title: "Beauty Products Store", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", description: "Elegant design with seamless mobile experience" },
        ],
        reviews: [
            { clientName: "Jessica Lee", rating: 5, comment: "Emily is creative and detail-oriented. Great to work with!", date: "Mar 1, 2026" },
        ],
    },
    {
        id: "4",
        projectId: "1",
        workerName: "David Kim",
        workerAvatar: "DK",
        rating: 4.9,
        reviewCount: 143,
        location: "Seattle, WA",
        bidPrice: "$2,800",
        timeline: "2 weeks",
        coverLetter: "I'm a senior UX designer with 8+ years of experience in e-commerce. I've helped companies increase their conversion rates by an average of 35% through strategic design improvements.",
        skills: ["UI/UX", "Conversion Rate Optimization", "A/B Testing", "React", "Analytics"],
        completedProjects: 112,
        successRate: 99,
        hourlyRate: "$95/hr",
        responseTime: "Within 1 hour",
        portfolioItems: [
            { title: "Multi-vendor Marketplace", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400", description: "Complex platform with intuitive vendor management" },
        ],
        reviews: [
            { clientName: "Amanda Silva", rating: 5, comment: "Best designer I've worked with. Results speak for themselves!", date: "Feb 25, 2026" },
        ],
    },
    // Mobile App proposals
    {
        id: "5",
        projectId: "2",
        workerName: "Alex Martinez",
        workerAvatar: "AM",
        rating: 4.8,
        reviewCount: 89,
        location: "Los Angeles, CA",
        bidPrice: "$3,000",
        timeline: "3 weeks",
        coverLetter: "Mobile UI is my passion! I've designed 40+ mobile apps across iOS and Android, specializing in intuitive user experiences that drive engagement and retention.",
        skills: ["Figma", "UI/UX", "Mobile Design", "iOS", "Android"],
        completedProjects: 67,
        successRate: 97,
        hourlyRate: "$80/hr",
        responseTime: "Within 2 hours",
        portfolioItems: [
            { title: "Fitness Tracking App", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400", description: "Award-winning mobile app with 500K+ downloads" },
        ],
        reviews: [
            { clientName: "Robert Chang", rating: 5, comment: "Alex created a beautiful, intuitive interface. Highly professional!", date: "Mar 2, 2026" },
        ],
    },
    {
        id: "6",
        projectId: "2",
        workerName: "Lisa Thompson",
        workerAvatar: "LT",
        rating: 4.9,
        reviewCount: 112,
        location: "Portland, OR",
        bidPrice: "$3,200",
        timeline: "2 weeks",
        coverLetter: "I'm a mobile-first designer with expertise in creating delightful user experiences. My designs have helped apps achieve 4.5+ star ratings on app stores.",
        skills: ["Sketch", "Figma", "Mobile UX", "Prototyping", "User Research"],
        completedProjects: 84,
        successRate: 98,
        hourlyRate: "$88/hr",
        responseTime: "Within 1 hour",
        portfolioItems: [
            { title: "Social Networking App", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400", description: "Modern social app with seamless animations" },
        ],
        reviews: [
            { clientName: "Sarah Williams", rating: 5, comment: "Lisa's designs exceeded all expectations. True professional!", date: "Feb 25, 2026" },
        ],
    },
    // AI Chatbot proposals
    {
        id: "7",
        projectId: "3",
        workerName: "Dr. James Wilson",
        workerAvatar: "JW",
        rating: 5.0,
        reviewCount: 76,
        location: "Boston, MA",
        bidPrice: "$4,800",
        timeline: "4 weeks",
        coverLetter: "PhD in AI/ML with 10+ years building intelligent conversational systems. I've developed chatbots for Fortune 500 companies with 95%+ accuracy rates.",
        skills: ["Python", "NLP", "Machine Learning", "TensorFlow", "Dialogflow"],
        completedProjects: 45,
        successRate: 100,
        hourlyRate: "$120/hr",
        responseTime: "Within 3 hours",
        portfolioItems: [
            { title: "Enterprise Customer Support Bot", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400", description: "AI chatbot handling 10K+ queries/day" },
        ],
        reviews: [
            { clientName: "Tech Corp Inc", rating: 5, comment: "Dr. Wilson delivered an exceptional AI solution. Worth every penny!", date: "Feb 15, 2026" },
        ],
    },
    {
        id: "8",
        projectId: "3",
        workerName: "Nina Patel",
        workerAvatar: "NP",
        rating: 4.9,
        reviewCount: 58,
        location: "San Jose, CA",
        bidPrice: "$5,000",
        timeline: "3 weeks",
        coverLetter: "AI engineer specializing in conversational AI and NLP. I build chatbots that understand context and deliver human-like interactions.",
        skills: ["Python", "OpenAI", "LangChain", "React", "API Integration"],
        completedProjects: 38,
        successRate: 99,
        hourlyRate: "$110/hr",
        responseTime: "Within 2 hours",
        portfolioItems: [
            { title: "Healthcare Assistant Chatbot", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400", description: "HIPAA-compliant medical assistant bot" },
        ],
        reviews: [
            { clientName: "HealthTech Solutions", rating: 5, comment: "Nina built exactly what we needed. Excellent communication!", date: "Mar 1, 2026" },
        ],
    },
];

// ===========================
// STATE MANAGEMENT
// ===========================

const appState = {
    selectedProjectId: "1",
    selectedProposalId: "1",
    showHireModal: false,
    searchQuery: "",
};

// ===========================
// DOM ELEMENTS
// ===========================

const projectSelectorBtn = document.getElementById('projectSelectorBtn');
const projectDropdown = document.getElementById('projectDropdown');
const dropdownOverlay = document.getElementById('dropdownOverlay');
const projectSearchInput = document.getElementById('projectSearchInput');
const projectList = document.getElementById('projectList');
const dropdownChevron = document.getElementById('dropdownChevron');

const selectedProjectTitle = document.getElementById('selectedProjectTitle');
const selectedProjectProposals = document.getElementById('selectedProjectProposals');
const projectSummaryTitle = document.getElementById('projectSummaryTitle');
const projectSummaryDescription = document.getElementById('projectSummaryDescription');
const projectSummaryStats = document.getElementById('projectSummaryStats');

const proposalsCountTitle = document.getElementById('proposalsCountTitle');
const proposalsList = document.getElementById('proposalsList');

const workerProfileSection = document.getElementById('workerProfileSection');
const profileName = document.getElementById('profileName');
const profileAvatar = document.getElementById('profileAvatar');
const starContainer = document.getElementById('starContainer');
const ratingText = document.getElementById('ratingText');
const profileLocation = document.getElementById('profileLocation');
const bidPrice = document.getElementById('bidPrice');
const bidTimeline = document.getElementById('bidTimeline');
const profileStats = document.getElementById('profileStats');
const coverLetterContent = document.getElementById('coverLetterContent');
const skillsContainer = document.getElementById('skillsContainer');
const portfolioGrid = document.getElementById('portfolioGrid');
const reviewsContainer = document.getElementById('reviewsContainer');

const acceptBtn = document.getElementById('acceptBtn');
const hireModal = document.getElementById('hireModal');
const cancelHireBtn = document.getElementById('cancelHireBtn');
const confirmHireBtn = document.getElementById('confirmHireBtn');
const modalWorkerName = document.getElementById('modalWorkerName');
const modalBidPrice = document.getElementById('modalBidPrice');

// ===========================
// HELPER FUNCTIONS
// ===========================

function renderProjectSelector() {
    const project = projectsData.find(p => p.id === appState.selectedProjectId);
    selectedProjectTitle.textContent = project.title;
    selectedProjectProposals.textContent = `${project.proposalCount} proposals`;
}

function renderProjectDropdown() {
    const filtered = projectsData.filter(p =>
        p.title.toLowerCase().includes(appState.searchQuery.toLowerCase())
    );

    projectList.innerHTML = filtered.map(project => `
        <button class="project-item ${project.id === appState.selectedProjectId ? 'selected' : ''}" data-project-id="${project.id}">
            <div class="project-item-icon ${project.id === appState.selectedProjectId ? 'selected' : ''}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
            </div>
            <div class="project-item-content">
                <p class="project-item-title">${project.title}</p>
                <p class="project-item-proposals">${project.proposalCount} proposals</p>
            </div>
            ${project.id === appState.selectedProjectId ? `
                <svg class="project-item-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            ` : ''}
        </button>
    `).join('');

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const projectId = item.getAttribute('data-project-id');
            selectProject(projectId);
        });
    });
}

function selectProject(projectId) {
    appState.selectedProjectId = projectId;
    appState.selectedProposalId = null;

    renderProjectSelector();
    renderProjectDropdown();
    renderProjectSummary();
    renderProposalsList();
    closeProjectDropdown();

    // Auto-select first proposal
    const proposals = proposalsData.filter(p => p.projectId === projectId);
    if (proposals.length > 0) {
        selectProposal(proposals[0].id);
    }
}

function renderProjectSummary() {
    const project = projectsData.find(p => p.id === appState.selectedProjectId);

    projectSummaryTitle.textContent = project.title;
    projectSummaryDescription.textContent = project.description;

    const stats = [
        { icon: 'dollar', label: 'Budget', value: project.budget, color: 'green' },
        { icon: 'users', label: 'Proposals', value: project.proposalCount, color: 'blue' },
        { icon: 'clock', label: 'Deadline', value: project.deadline, color: 'orange' },
        { icon: 'calendar', label: 'Posted', value: project.postedDate, color: 'purple' },
    ];

    const iconMap = {
        dollar: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H6"></path>',
        users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
        clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
    };

    const colorMap = {
        green: 'green',
        blue: 'blue',
        orange: 'orange',
        purple: 'purple',
    };

    projectSummaryStats.innerHTML = stats.map(stat => `
        <div class="summary-stat">
            <div class="summary-stat-icon" style="background-color: ${
                stat.color === 'green' ? '#dcfce7' :
                stat.color === 'blue' ? '#dbeafe' :
                stat.color === 'orange' ? '#fed7aa' : '#f3e8ff'
            }; border-color: ${
                stat.color === 'green' ? '#bbf7d0' :
                stat.color === 'blue' ? '#bfdbfe' :
                stat.color === 'orange' ? '#fdba74' : '#e9d5ff'
            };">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: ${
                    stat.color === 'green' ? '#16a34a' :
                    stat.color === 'blue' ? '#2563eb' :
                    stat.color === 'orange' ? '#ea580c' : '#9333ea'
                };">
                    ${iconMap[stat.icon]}
                </svg>
            </div>
            <div class="summary-stat-content">
                <p class="summary-stat-label">${stat.label}</p>
                <p class="summary-stat-value">${stat.value}</p>
            </div>
        </div>
    `).join('');
}

function renderProposalsList() {
    const proposals = proposalsData.filter(p => p.projectId === appState.selectedProjectId);
    proposalsCountTitle.textContent = `Proposals (${proposals.length})`;

    proposalsList.innerHTML = proposals.map(proposal => `
        <div class="proposal-item ${proposal.id === appState.selectedProposalId ? 'selected' : ''}" data-proposal-id="${proposal.id}">
            <div class="proposal-header">
                <div class="proposal-avatar">${proposal.workerAvatar}</div>
                <div class="proposal-info">
                    <h4 class="proposal-name">${proposal.workerName}</h4>
                    <div class="proposal-rating">
                        <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
                        </svg>
                        <span class="proposal-rating-value">${proposal.rating}</span>
                        <span class="proposal-rating-count">(${proposal.reviewCount})</span>
                    </div>
                    <div class="proposal-location">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${proposal.location}</span>
                    </div>
                </div>
            </div>

            <div class="proposal-bid-info">
                <div class="proposal-bid-box">
                    <p class="proposal-bid-label">Bid Price</p>
                    <p class="proposal-bid-value">${proposal.bidPrice}</p>
                </div>
                <div class="proposal-bid-box">
                    <p class="proposal-bid-label">Timeline</p>
                    <p class="proposal-bid-value">${proposal.timeline}</p>
                </div>
            </div>

            <p class="proposal-letter-preview">${proposal.coverLetter}</p>
        </div>
    `).join('');

    document.querySelectorAll('.proposal-item').forEach(item => {
        item.addEventListener('click', () => {
            const proposalId = item.getAttribute('data-proposal-id');
            selectProposal(proposalId);
        });
    });
}

function selectProposal(proposalId) {
    appState.selectedProposalId = proposalId;
    const proposal = proposalsData.find(p => p.id === proposalId);

    if (proposal) {
        renderWorkerProfile(proposal);
        document.querySelectorAll('.proposal-item').forEach(item => {
            item.classList.remove('selected');
        });
        document.querySelector(`[data-proposal-id="${proposalId}"]`)?.classList.add('selected');
        workerProfileSection.style.display = 'flex';
    }
}

function renderWorkerProfile(proposal) {
    profileName.textContent = proposal.workerName;
    profileAvatar.textContent = proposal.workerAvatar;
    profileLocation.textContent = proposal.location;
    bidPrice.textContent = proposal.bidPrice;
    bidTimeline.textContent = `in ${proposal.timeline}`;

    // Stars
    starContainer.innerHTML = Array.from({ length: 5 }).map((_, i) => `
        <svg class="star-icon" viewBox="0 0 24 24" fill="${i < Math.floor(proposal.rating) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
        </svg>
    `).join('');

    ratingText.innerHTML = `
        <span class="rating-value">${proposal.rating}</span>
        <span class="review-count">(${proposal.reviewCount} reviews)</span>
    `;

    // Stats
    profileStats.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon-container">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
            </div>
            <p class="stat-value">${proposal.completedProjects}</p>
            <p class="stat-label">Projects</p>
        </div>

        <div class="stat-card">
            <div class="stat-icon-container">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 6 13.5 15.5 8 10 1 17"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
            </div>
            <p class="stat-value">${proposal.successRate}%</p>
            <p class="stat-label">Success Rate</p>
        </div>

        <div class="stat-card">
            <div class="stat-icon-container">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H6"></path>
                </svg>
            </div>
            <p class="stat-value">${proposal.hourlyRate}</p>
            <p class="stat-label">Hourly Rate</p>
        </div>

        <div class="stat-card">
            <div class="stat-icon-container">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </div>
            <p class="stat-value">${proposal.responseTime}</p>
            <p class="stat-label">Response</p>
        </div>
    `;

    // Cover Letter
    coverLetterContent.textContent = proposal.coverLetter;

    // Skills
    skillsContainer.innerHTML = proposal.skills.map(skill => `
        <span class="skill-badge">${skill}</span>
    `).join('');

    // Portfolio
    portfolioGrid.innerHTML = proposal.portfolioItems.map(item => `
        <div class="portfolio-item">
            <img src="${item.image}" alt="${item.title}" class="portfolio-image">
            <div class="portfolio-content">
                <h4 class="portfolio-title">${item.title}</h4>
                <p class="portfolio-description">${item.description}</p>
            </div>
        </div>
    `).join('');

    // Reviews
    reviewsContainer.innerHTML = proposal.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="review-author-section">
                    <p class="review-author">${review.clientName}</p>
                    <div class="review-stars">
                        ${Array.from({ length: 5 }).map((_, i) => `
                            <svg class="star-icon" viewBox="0 0 24 24" fill="${i < review.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 10.26 24 10.5 18 16.16 20.09 24.5 12 20.16 3.91 24.5 6 16.16 0 10.5 8.91 10.26 12 2"></polygon>
                            </svg>
                        `).join('')}
                    </div>
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-comment">${review.comment}</p>
        </div>
    `).join('');
}

function openProjectDropdown() {
    projectDropdown.style.display = 'block';
    dropdownOverlay.style.display = 'block';
    projectSelectorBtn.classList.add('active');
    renderProjectDropdown();
}

function closeProjectDropdown() {
    projectDropdown.style.display = 'none';
    dropdownOverlay.style.display = 'none';
    projectSelectorBtn.classList.remove('active');
    projectSearchInput.value = '';
    appState.searchQuery = '';
}

function openHireModal() {
    const proposal = proposalsData.find(p => p.id === appState.selectedProposalId);
    if (proposal) {
        modalWorkerName.textContent = proposal.workerName;
        modalBidPrice.textContent = proposal.bidPrice;
        hireModal.style.display = 'flex';
    }
}

function closeHireModal() {
    hireModal.style.display = 'none';
}

// ===========================
// EVENT LISTENERS
// ===========================

projectSelectorBtn.addEventListener('click', () => {
    if (projectDropdown.style.display === 'block') {
        closeProjectDropdown();
    } else {
        openProjectDropdown();
    }
});

dropdownOverlay.addEventListener('click', closeProjectDropdown);

projectSearchInput.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value;
    renderProjectDropdown();
});

acceptBtn.addEventListener('click', openHireModal);

cancelHireBtn.addEventListener('click', closeHireModal);

confirmHireBtn.addEventListener('click', () => {
    const proposal = proposalsData.find(p => p.id === appState.selectedProposalId);
    alert(`Successfully hired ${proposal.workerName}!`);
    closeHireModal();
});

hireModal.addEventListener('click', (e) => {
    if (e.target === hireModal) {
        closeHireModal();
    }
});

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Worker Applications page initialized');
    renderProjectSelector();
    renderProjectSummary();
    renderProposalsList();
    selectProposal('1');
});