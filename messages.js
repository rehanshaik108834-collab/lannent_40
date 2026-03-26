// ===========================
// DATA
// ===========================

const conversationsData = [
    {
        id: "1",
        userId: "user1",
        userName: "Sarah Chen",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        projectName: "E-Commerce Platform Redesign",
        lastMessage: "I've completed the homepage mockups. Ready for review!",
        timestamp: "2m ago",
        unread: 3,
        online: true,
    },
    {
        id: "2",
        userId: "user2",
        userName: "Marcus Rodriguez",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        projectName: "Mobile App Development",
        lastMessage: "Can we schedule a call to discuss the API integration?",
        timestamp: "1h ago",
        unread: 1,
        online: true,
    },
    {
        id: "3",
        userId: "user3",
        userName: "Emily Watson",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        projectName: "Marketing Website",
        lastMessage: "Thanks for the feedback. I'll implement the changes today.",
        timestamp: "3h ago",
        unread: 0,
        online: false,
    },
    {
        id: "4",
        userId: "user4",
        userName: "David Park",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        projectName: "Dashboard Analytics Feature",
        lastMessage: "The milestone is submitted for your review.",
        timestamp: "5h ago",
        unread: 0,
        online: false,
    },
    {
        id: "5",
        userId: "user5",
        userName: "Jessica Lee",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        projectName: "Content Management System",
        lastMessage: "I have a question about the database schema.",
        timestamp: "Yesterday",
        unread: 0,
        online: false,
    },
];

const messagesData = [
    {
        id: "1",
        senderId: "user1",
        senderName: "Sarah Chen",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "Hi! I wanted to update you on the progress. I've finished the initial designs for the homepage.",
        timestamp: "10:30 AM",
        isCurrentUser: false,
    },
    {
        id: "2",
        senderId: "currentUser",
        senderName: "You",
        senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        content: "That's great! Can you share the mockups?",
        timestamp: "10:32 AM",
        isCurrentUser: true,
    },
    {
        id: "3",
        senderId: "user1",
        senderName: "Sarah Chen",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "Of course! Here are the designs. I've created both desktop and mobile versions.",
        timestamp: "10:35 AM",
        isCurrentUser: false,
        attachments: [
            {
                id: "att1",
                name: "homepage-desktop.png",
                type: "image",
                url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
                size: "2.4 MB",
            },
            {
                id: "att2",
                name: "homepage-mobile.png",
                type: "image",
                url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
                size: "1.8 MB",
            },
        ],
    },
    {
        id: "4",
        senderId: "currentUser",
        senderName: "You",
        senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        content: "These look fantastic! I love the color scheme and layout. Just one small change - can we make the CTA button slightly larger?",
        timestamp: "10:40 AM",
        isCurrentUser: true,
    },
    {
        id: "5",
        senderId: "user1",
        senderName: "Sarah Chen",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "Absolutely! I'll make that adjustment and upload the updated version by end of day.",
        timestamp: "10:42 AM",
        isCurrentUser: false,
    },
    {
        id: "6",
        senderId: "currentUser",
        senderName: "You",
        senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        content: "Perfect! Looking forward to it. 👍",
        timestamp: "10:43 AM",
        isCurrentUser: true,
    },
    {
        id: "7",
        senderId: "user1",
        senderName: "Sarah Chen",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "I've completed the homepage mockups. Ready for review!",
        timestamp: "2:15 PM",
        isCurrentUser: false,
    },
];

const projectContext = {
    projectName: "E-Commerce Platform Redesign",
    milestone: "Homepage Design",
    status: "In Progress",
    deadline: "March 15, 2026",
    budget: "$5,000",
};

// ===========================
// STATE MANAGEMENT
// ===========================

const pageState = {
    selectedConversationId: "1",
    searchQuery: "",
};

// ===========================
// DOM ELEMENTS
// ===========================

const searchInput = document.getElementById('searchInput');
const conversationsList = document.getElementById('conversationsList');
const chatHeader = document.getElementById('chatHeader');
const messagesArea = document.getElementById('messagesArea');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const contextDetails = document.getElementById('contextDetails');

// ===========================
// HELPER FUNCTIONS
// ===========================

function renderConversations() {
    const filtered = conversationsData.filter(conv =>
        conv.userName.toLowerCase().includes(pageState.searchQuery.toLowerCase()) ||
        conv.projectName.toLowerCase().includes(pageState.searchQuery.toLowerCase())
    );

    conversationsList.innerHTML = filtered.map(conv => `
        <button class="conversation-item ${conv.id === pageState.selectedConversationId ? 'selected' : ''}" data-conversation-id="${conv.id}">
            <div class="conversation-item-header">
                <div class="conversation-avatar-wrapper">
                    <img src="${conv.userAvatar}" alt="${conv.userName}" class="conversation-avatar">
                    ${conv.online ? '<div class="online-indicator"></div>' : ''}
                </div>
                <div class="conversation-info">
                    <p class="conversation-name">${conv.userName}</p>
                    <p class="conversation-project">${conv.projectName}</p>
                </div>
            </div>
            <div class="conversation-footer">
                <p class="conversation-message">${conv.lastMessage}</p>
                <span class="conversation-timestamp">${conv.timestamp}</span>
                ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
            </div>
        </button>
    `).join('');

    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', () => {
            const conversationId = item.getAttribute('data-conversation-id');
            selectConversation(conversationId);
        });
    });
}

function selectConversation(conversationId) {
    pageState.selectedConversationId = conversationId;
    renderConversations();
    renderChatHeader();
    renderMessages();
}

function renderChatHeader() {
    const conversation = conversationsData.find(c => c.id === pageState.selectedConversationId);

    chatHeader.innerHTML = `
        <div class="chat-header-left">
            <div class="chat-header-avatar">
                <img src="${conversation.userAvatar}" alt="${conversation.userName}">
                ${conversation.online ? '<div class="online-indicator"></div>' : ''}
            </div>
            <div class="chat-header-info">
                <p class="chat-header-name">${conversation.userName}</p>
                <p class="chat-header-status">${conversation.online ? 'Online' : 'Offline'}</p>
            </div>
        </div>
        <button class="chat-header-menu" title="More options">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
            </svg>
        </button>
    `;
}

function renderMessages() {
    messagesArea.innerHTML = messagesData.map(message => `
        <div class="message-group ${message.isCurrentUser ? 'sent' : 'received'}">
            <img src="${message.senderAvatar}" alt="${message.senderName}" class="message-avatar">
            <div class="message-content">
                <div class="message-bubble">${escapeHtml(message.content)}</div>
                ${message.attachments && message.attachments.length > 0 ? `
                    <div class="message-attachments">
                        ${message.attachments.map(att => {
                            if (att.type === 'image') {
                                return `
                                    <div class="attachment">
                                        <img src="${att.url}" alt="${att.name}" class="attachment-image">
                                        <div class="attachment-image-info">
                                            <div class="attachment-image-left">
                                                <svg class="attachment-icon icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                    <polyline points="21 15 16 10 5 21"></polyline>
                                                </svg>
                                                <span class="attachment-name">${att.name}</span>
                                            </div>
                                            <span class="attachment-size">${att.size}</span>
                                        </div>
                                    </div>
                                `;
                            } else {
                                return `
                                    <div class="attachment">
                                        <div class="attachment-file">
                                            <div class="attachment-file-icon">
                                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                </svg>
                                            </div>
                                            <div class="attachment-file-info">
                                                <p class="attachment-file-name">${att.name}</p>
                                                <p class="attachment-file-size">${att.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('')}
                    </div>
                ` : ''}
                <span class="message-time">${message.timestamp}</span>
            </div>
        </div>
    `).join('');

    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function renderContextDetails() {
    const statusClass = {
        "In Progress": "status-in-progress",
        "Review": "status-review",
        "Completed": "status-completed",
    }[projectContext.status] || "status-in-progress";

    contextDetails.innerHTML = `
        <div class="detail-item">
            <label class="detail-label">Project Name</label>
            <p class="detail-value">${projectContext.projectName}</p>
        </div>

        <div class="detail-item">
            <label class="detail-label">Milestone</label>
            <p class="detail-value">${projectContext.milestone}</p>
        </div>

        <div class="detail-item">
            <label class="detail-label">Status</label>
            <div class="detail-status ${statusClass}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${projectContext.status}</span>
            </div>
        </div>

        <div class="detail-item">
            <label class="detail-label">Deadline</label>
            <div class="detail-with-icon">
                <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <p class="detail-value">${projectContext.deadline}</p>
            </div>
        </div>

        <div class="detail-item">
            <label class="detail-label">Budget</label>
            <p class="detail-value">${projectContext.budget}</p>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function handleSendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add new message to array (in real app, would send to server)
    const newMessage = {
        id: (messagesData.length + 1).toString(),
        senderId: "currentUser",
        senderName: "You",
        senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
    };

    messagesData.push(newMessage);
    messageInput.value = '';
    sendBtn.disabled = true;
    renderMessages();
}

// ===========================
// EVENT LISTENERS
// ===========================

searchInput.addEventListener('input', (e) => {
    pageState.searchQuery = e.target.value;
    renderConversations();
});

messageInput.addEventListener('input', () => {
    sendBtn.disabled = !messageInput.value.trim();
});

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

sendBtn.addEventListener('click', handleSendMessage);

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Messages page initialized');
    
    renderConversations();
    renderChatHeader();
    renderMessages();
    renderContextDetails();
    
    sendBtn.disabled = true;
});