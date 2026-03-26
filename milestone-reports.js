// Mock data - reports
const reportsData = [
  {
    id: "1",
    milestoneName: "Database Schema & Migration",
    reportType: "technical-audit",
    reviewer: "Dr. James Wilson",
    reviewerAvatar: "JW",
    date: "Mar 8, 2026",
    status: "completed",
  },
  {
    id: "2",
    milestoneName: "Payment Gateway Integration",
    reportType: "technical-audit",
    reviewer: "Dr. James Wilson",
    reviewerAvatar: "JW",
    date: "Mar 7, 2026",
    status: "completed",
  },
  {
    id: "3",
    milestoneName: "Payment Gateway Integration",
    reportType: "dispute-resolution",
    reviewer: "Expert Panel",
    reviewerAvatar: "EP",
    date: "Mar 7, 2026",
    status: "in-progress",
  },
  {
    id: "4",
    milestoneName: "Backend API Development",
    reportType: "technical-audit",
    reviewer: "Dr. Sarah Mitchell",
    reviewerAvatar: "SM",
    date: "Mar 6, 2026",
    status: "pending",
  },
];

// State
let state = {
  selectedMilestone: "all",
  selectedReportType: "all",
  selectedDateRange: "all",
};

// DOM Elements
const milestoneFilter = document.getElementById("milestoneFilter");
const reportTypeFilter = document.getElementById("reportTypeFilter");
const dateRangeFilter = document.getElementById("dateRangeFilter");
const reportsContainer = document.getElementById("reportsContainer");
const emptyState = document.getElementById("emptyState");
const reportCount = document.getElementById("reportCount");
const backBtn = document.getElementById("backBtn");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderReports();
});

// Event Listeners
function setupEventListeners() {
  milestoneFilter.addEventListener("change", (e) => {
    state.selectedMilestone = e.target.value;
    renderReports();
  });

  reportTypeFilter.addEventListener("change", (e) => {
    state.selectedReportType = e.target.value;
    renderReports();
  });

  dateRangeFilter.addEventListener("change", (e) => {
    state.selectedDateRange = e.target.value;
    renderReports();
  });

  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}

// Filter reports based on selected filters
function getFilteredReports() {
  return reportsData.filter((report) => {
    if (
      state.selectedMilestone !== "all" &&
      report.milestoneName !== state.selectedMilestone
    ) {
      return false;
    }
    if (
      state.selectedReportType !== "all" &&
      report.reportType !== state.selectedReportType
    ) {
      return false;
    }
    // Date range filtering would require comparing dates
    // For now, we'll just filter by milestone and report type
    return true;
  });
}

// Get status badge styles
function getStatusBadgeClass(status) {
  switch (status) {
    case "completed":
      return {
        class: "badge-completed",
        label: "Completed",
      };
    case "in-progress":
      return {
        class: "badge-in-progress",
        label: "In Progress",
      };
    case "pending":
      return {
        class: "badge-pending",
        label: "Pending",
      };
    default:
      return {
        class: "badge",
        label: status,
      };
  }
}

// Get report type icon SVG
function getReportTypeIcon(type) {
  if (type === "technical-audit") {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 21H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l4-4h4a2 2 0 0 1 2 2v5m-2 16v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5m6-6v2"/>
    </svg>`;
  } else {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`;
  }
}

// Render reports
function renderReports() {
  const filteredReports = getFilteredReports();

  // Update report count
  reportCount.textContent = filteredReports.length;

  // Clear container
  reportsContainer.innerHTML = "";

  if (filteredReports.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  // Render each report
  filteredReports.forEach((report) => {
    const statusBadge = getStatusBadgeClass(report.status);
    const reportTypeIcon = getReportTypeIcon(report.reportType);
    const reportTypeBadgeClass =
      report.reportType === "technical-audit"
        ? "badge-technical-audit"
        : "badge-dispute-resolution";
    const reportTypeLabel =
      report.reportType === "technical-audit"
        ? "Technical Audit Report"
        : "Dispute Resolution Report";

    const reportHTML = `
      <div class="report-card">
        <div class="report-card-content">
          <!-- Left Section -->
          <div class="report-left-section">
            <!-- Milestone Name -->
            <div>
              <h3 class="report-milestone-name">${escapeHtml(report.milestoneName)}</h3>
              <div class="report-badges">
                <div class="badge ${reportTypeBadgeClass}">
                  ${reportTypeIcon}
                  <span>${reportTypeLabel}</span>
                </div>
                <div class="badge ${statusBadge.class}">
                  <span>${statusBadge.label}</span>
                </div>
              </div>
            </div>

            <!-- Reviewer & Date -->
            <div class="report-details">
              <div class="report-detail-item">
                <svg class="report-detail-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <div class="report-detail-content">
                  <span class="report-detail-label">Reviewer</span>
                  <span class="report-detail-value">${escapeHtml(report.reviewer)}</span>
                </div>
              </div>
              <div class="report-detail-item">
                <svg class="report-detail-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <div class="report-detail-content">
                  <span class="report-detail-label">Date</span>
                  <span class="report-detail-value">${escapeHtml(report.date)}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section - Actions -->
          <div class="report-right-section">
            <button class="action-button btn-view-report" onclick="viewReport('${report.id}', '${report.reportType}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              View Full Report
            </button>
            <button class="action-button btn-download-pdf" onclick="downloadPDF('${report.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    `;

    reportsContainer.insertAdjacentHTML("beforeend", reportHTML);
  });
}

// View report handler
function viewReport(reportId, reportType) {
  // In a real application, this would navigate to the report page
  if (reportType === "technical-audit") {
    window.location.href = `/technical-audit-report?id=${reportId}`;
  } else if (reportType === "dispute-resolution") {
    window.location.href = `/dispute-resolution-report?id=${reportId}`;
  }
  console.log(`Viewing report ${reportId} of type ${reportType}`);
}

// Download PDF handler
function downloadPDF(reportId) {
  // In a real application, this would trigger a PDF download
  console.log(`Downloading PDF for report ${reportId}`);
  alert(`PDF download initiated for report ${reportId}`);
}

// Utility function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}