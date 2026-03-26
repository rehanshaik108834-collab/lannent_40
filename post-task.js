// ===========================
// SKILL SUGGESTIONS DATA
// ===========================

const skillSuggestions = [
    "JavaScript", "Python", "React", "Node.js", "Angular", "Vue.js",
    "HTML", "CSS", "SQL", "Java", "C#", "PHP", "Ruby", "Swift", "Kotlin",
    "Go", "R", "MATLAB", "TensorFlow", "PyTorch", "Django", "Flask",
    "Express", "Laravel", "Ruby on Rails", "Spring", "Hibernate", "Docker",
    "Kubernetes", "AWS", "Azure", "Google Cloud", "Git", "GitHub", "GitLab",
    "Jenkins", "Travis CI", "CircleCI", "Selenium", "Cypress", "Jest",
    "Mocha", "Chai", "Postman", "Swagger", "GraphQL", "RESTful API",
    "WebSocket", "WebRTC", "Firebase", "MongoDB", "MySQL", "PostgreSQL",
    "SQLite", "Oracle", "Redis", "Elasticsearch", "Kafka", "RabbitMQ",
    "Nginx", "Apache"
];

// ===========================
// STATE MANAGEMENT
// ===========================

const formState = {
    taskTitle: "",
    category: "",
    description: "",
    skills: [],
    deadline: "",
    budget: "",
    currency: "USD",
    auditEnabled: false,
    milestones: [],
};

// ===========================
// DOM ELEMENTS
// ===========================

const taskTitleInput = document.getElementById('taskTitle');
const categorySelect = document.getElementById('category');
const descriptionTextarea = document.getElementById('description');
const skillInput = document.getElementById('skillInput');
const skillSuggestionsDiv = document.getElementById('skillSuggestions');
const skillsContainer = document.getElementById('skillsContainer');
const deadlineInput = document.getElementById('deadline');
const budgetInput = document.getElementById('budget');
const currencySelect = document.getElementById('currency');
const auditToggle = document.getElementById('auditToggle');
const addMilestoneBtn = document.getElementById('addMilestoneBtn');
const milestoneForm = document.getElementById('milestoneForm');
const milestoneTitle = document.getElementById('milestoneTitle');
const milestoneDescription = document.getElementById('milestoneDescription');
const milestoneBudget = document.getElementById('milestoneBudget');
const saveMilestoneBtn = document.getElementById('saveMilestoneBtn');
const cancelMilestoneBtn = document.getElementById('cancelMilestoneBtn');
const milestonesList = document.getElementById('milestonesList');
const budgetCheck = document.getElementById('budgetCheck');

// Summary elements
const summaryBudget = document.getElementById('summaryBudget');
const summaryMilestones = document.getElementById('summaryMilestones');
const summaryAllocated = document.getElementById('summaryAllocated');
const summaryDeadline = document.getElementById('summaryDeadline');
const summaryAuditStatus = document.getElementById('summaryAuditStatus');
const summaryAudit = document.getElementById('summaryAudit');

// ===========================
// HELPER FUNCTIONS
// ===========================

function filterSkillSuggestions(input) {
    if (!input.trim()) return [];
    return skillSuggestions.filter(skill =>
        skill.toLowerCase().includes(input.toLowerCase()) &&
        !formState.skills.includes(skill)
    ).slice(0, 8);
}

function renderSkillSuggestions(filtered) {
    if (filtered.length === 0) {
        skillSuggestionsDiv.style.display = 'none';
        return;
    }

    skillSuggestionsDiv.innerHTML = filtered.map(skill => `
        <button type="button" class="skill-suggestion-item" data-skill="${skill}">
            ${skill}
        </button>
    `).join('');

    skillSuggestionsDiv.style.display = 'block';

    // Add event listeners to suggestion items
    document.querySelectorAll('.skill-suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const skill = item.getAttribute('data-skill');
            addSkill(skill);
        });
    });
}

function addSkill(skill) {
    if (!formState.skills.includes(skill)) {
        formState.skills.push(skill);
        renderSkills();
        skillInput.value = '';
        skillSuggestionsDiv.style.display = 'none';
        updateSummary();
    }
}

function removeSkill(skill) {
    formState.skills = formState.skills.filter(s => s !== skill);
    renderSkills();
    updateSummary();
}

function renderSkills() {
    skillsContainer.innerHTML = formState.skills.map(skill => `
        <div class="skill-tag">
            ${skill}
            <button type="button" class="skill-remove-btn" data-skill="${skill}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `).join('');

    // Add remove button listeners
    document.querySelectorAll('.skill-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const skill = btn.getAttribute('data-skill');
            removeSkill(skill);
        });
    });
}

function calculateBudgetInfo() {
    const totalBudget = parseFloat(budgetInput.value) || 0;
    const milestoneBudgetTotal = formState.milestones.reduce(
        (sum, m) => sum + (parseFloat(m.budget) || 0),
        0
    );
    return {
        totalBudget,
        milestoneBudgetTotal,
        remaining: totalBudget - milestoneBudgetTotal,
        exceeded: milestoneBudgetTotal > totalBudget,
    };
}

function renderBudgetCheck() {
    const budget = calculateBudgetInfo();

    if (formState.milestones.length === 0 || !budgetInput.value) {
        budgetCheck.style.display = 'none';
        return;
    }

    const currency = currencySelect.value;
    const className = budget.exceeded ? 'error' : 'warning';

    budgetCheck.className = `budget-check ${className}`;
    budgetCheck.style.display = 'block';

    let html = `
        <div class="budget-check-item">
            <span>Milestone Budget Total:</span>
            <span><strong>${currency} ${budget.milestoneBudgetTotal.toFixed(2)}</strong></span>
        </div>
        <div class="budget-check-item">
            <span>Project Budget:</span>
            <span><strong>${currency} ${budget.totalBudget.toFixed(2)}</strong></span>
        </div>
        <div class="budget-check-item" style="border-top: 1px currentColor; padding-top: 12px; margin-top: 12px;">
            <span><strong>${budget.exceeded ? 'Over Budget:' : 'Remaining:'}</strong></span>
            <span><strong>${currency} ${Math.abs(budget.remaining).toFixed(2)}</strong></span>
        </div>
    `;

    if (budget.exceeded) {
        html += `
            <div class="budget-warning">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span><strong>Warning:</strong> Milestone budgets exceed total project budget. Please adjust.</span>
            </div>
        `;
    }

    budgetCheck.innerHTML = html;
}

function renderMilestones() {
    if (formState.milestones.length === 0) {
        milestonesList.innerHTML = `
            <div class="milestone-empty-state">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <p class="milestone-empty-text">No milestones added yet. Click "Add Milestone" to create one.</p>
            </div>
        `;
        return;
    }

    const currency = currencySelect.value;
    milestonesList.innerHTML = formState.milestones.map((milestone, index) => `
        <div class="milestone-item">
            <div class="milestone-item-header">
                <div style="display: flex; gap: 12px; flex: 1;">
                    <div class="milestone-item-number">${index + 1}</div>
                    <div class="milestone-item-content">
                        <div class="milestone-item-title">${milestone.title}</div>
                        ${milestone.description ? `<div class="milestone-item-description">${milestone.description}</div>` : ''}
                        <div class="milestone-item-budget">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H6"></path>
                            </svg>
                            ${currency} ${milestone.budget}
                        </div>
                    </div>
                </div>
                <button type="button" class="milestone-remove-btn" data-id="${milestone.id}">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // Add remove listeners
    document.querySelectorAll('.milestone-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            removeMilestone(id);
        });
    });

    renderBudgetCheck();
}

function addMilestone() {
    if (!milestoneTitle.value || !milestoneBudget.value) {
        alert('Please fill in milestone title and budget');
        return;
    }

    formState.milestones.push({
        id: Date.now().toString(),
        title: milestoneTitle.value,
        description: milestoneDescription.value,
        budget: milestoneBudget.value,
    });

    resetMilestoneForm();
    renderMilestones();
    updateSummary();
}

function removeMilestone(id) {
    formState.milestones = formState.milestones.filter(m => m.id !== id);
    renderMilestones();
    updateSummary();
}

function resetMilestoneForm() {
    milestoneTitle.value = '';
    milestoneDescription.value = '';
    milestoneBudget.value = '';
    milestoneForm.style.display = 'none';
}

function updateSummary() {
    const budget = calculateBudgetInfo();
    const currency = currencySelect.value;

    summaryBudget.textContent = `${currency} ${budgetInput.value || '0'}`;
    summaryMilestones.textContent = formState.milestones.length;

    if (formState.milestones.length > 0) {
        summaryAllocated.textContent = `Allocated: ${currency} ${budget.milestoneBudgetTotal.toFixed(2)}`;
    } else {
        summaryAllocated.textContent = '';
    }

    summaryDeadline.textContent = deadlineInput.value || 'Not set';

    const auditClass = formState.auditEnabled ? '' : 'disabled';
    summaryAudit.className = `summary-item audit ${auditClass}`;
    summaryAuditStatus.textContent = formState.auditEnabled ? 'Enabled' : 'Disabled';
}

// ===========================
// EVENT LISTENERS
// ===========================

// Task Title
taskTitleInput.addEventListener('change', (e) => {
    formState.taskTitle = e.target.value;
});

// Category
categorySelect.addEventListener('change', (e) => {
    formState.category = e.target.value;
});

// Description
descriptionTextarea.addEventListener('change', (e) => {
    formState.description = e.target.value;
});

// Skills Input
skillInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const filtered = filterSkillSuggestions(value);
    renderSkillSuggestions(filtered);
});

skillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const value = skillInput.value.trim();
        if (value) {
            addSkill(value);
        }
    }
});

skillInput.addEventListener('focus', () => {
    const filtered = filterSkillSuggestions(skillInput.value);
    if (filtered.length > 0) {
        renderSkillSuggestions(filtered);
    }
});

skillInput.addEventListener('blur', () => {
    setTimeout(() => {
        skillSuggestionsDiv.style.display = 'none';
    }, 200);
});

// Deadline
deadlineInput.addEventListener('change', (e) => {
    formState.deadline = e.target.value;
    updateSummary();
});

// Budget
budgetInput.addEventListener('change', (e) => {
    formState.budget = e.target.value;
    updateSummary();
    renderBudgetCheck();
});

// Currency
currencySelect.addEventListener('change', (e) => {
    formState.currency = e.target.value;
    updateSummary();
    renderBudgetCheck();
    renderMilestones();
});

// Audit Toggle
auditToggle.addEventListener('click', () => {
    formState.auditEnabled = !formState.auditEnabled;
    auditToggle.setAttribute('data-enabled', formState.auditEnabled);
    updateSummary();
});

// Milestone Management
addMilestoneBtn.addEventListener('click', () => {
    milestoneForm.style.display = 'flex';
    milestoneTitle.focus();
});

saveMilestoneBtn.addEventListener('click', () => {
    addMilestone();
});

cancelMilestoneBtn.addEventListener('click', () => {
    resetMilestoneForm();
});

// Form Actions
document.querySelector('.btn-draft').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Save draft:', formState);
    alert('Draft saved successfully');
});

document.querySelector('.btn-publish').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Validation
    if (!formState.taskTitle || !formState.category || !formState.description || !formState.deadline || !formState.budget) {
        alert('Please fill in all required fields');
        return;
    }

    console.log('Publish task:', formState);
    alert('Task published successfully');
});

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Post Task page initialized');
    updateSummary();
    renderMilestones();
});