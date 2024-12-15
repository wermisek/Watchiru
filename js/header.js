document.addEventListener('DOMContentLoaded', function() {
    const headerSearchInput = document.getElementById('headerSearchInput');
    const searchIcon = document.querySelector('.header-search-container i');

    // Search input handler
    headerSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                window.location.href = `browse.html?q=${encodeURIComponent(query)}`;
            }
        }
    });

    // Search icon click handler
    searchIcon.addEventListener('click', function() {
        const query = headerSearchInput.value.trim();
        if (query) {
            window.location.href = `browse.html?q=${encodeURIComponent(query)}`;
        }
    });
});

// Header scroll effect
window.onscroll = function() {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const searchContainer = document.querySelector('.header-search-container');
const searchIcon = document.querySelector('.header-search-container i');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    searchContainer.classList.remove('active');
});

searchIcon.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        searchContainer.classList.toggle('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu and search when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu-btn') && 
        !e.target.closest('.header-search-container')) {
        navLinks.classList.remove('active');
        searchContainer.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        searchContainer.classList.remove('active');
    }
});

// GitHub Commit Notification
const notificationIcon = document.querySelector('.notification-icon');
const notificationDropdown = document.createElement('div');
notificationDropdown.className = 'notification-dropdown';
notificationDropdown.innerHTML = `
    <div class="notification-header">
        <h3>Latest Updates</h3>
        <i class="fas fa-code-commit"></i>
    </div>
    <div class="notification-content">
        <div class="notification-item loading">
            <div class="notification-icon-wrapper">
                <i class="fas fa-sync fa-spin"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">Loading...</div>
                <div class="notification-message">Fetching latest commit...</div>
            </div>
        </div>
    </div>
`;
notificationIcon.appendChild(notificationDropdown);

// Fetch latest commit
async function fetchLatestCommit() {
    try {
        const response = await fetch('https://api.github.com/repos/wermisek/Watchiru/commits');
        const commits = await response.json();
        const latestCommit = commits[0];
        
        const commitDate = new Date(latestCommit.commit.author.date);
        const timeAgo = getTimeAgo(commitDate);
        
        notificationDropdown.querySelector('.notification-content').innerHTML = `
            <div class="notification-item">
                <div class="notification-icon-wrapper">
                    <i class="fas fa-code-commit"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">Latest Update</div>
                    <div class="notification-message">${latestCommit.commit.message}</div>
                    <div class="notification-time">${timeAgo}</div>
                </div>
            </div>
        `;
    } catch (error) {
        notificationDropdown.querySelector('.notification-content').innerHTML = `
            <div class="notification-item">
                <div class="notification-icon-wrapper">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">Error</div>
                    <div class="notification-message">Could not fetch latest commit</div>
                </div>
            </div>
        `;
    }
}

// Helper function to format time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + ' years ago';
    if (interval === 1) return '1 year ago';
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + ' months ago';
    if (interval === 1) return '1 month ago';
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + ' days ago';
    if (interval === 1) return '1 day ago';
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + ' hours ago';
    if (interval === 1) return '1 hour ago';
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + ' minutes ago';
    if (interval === 1) return '1 minute ago';
    
    if (seconds < 10) return 'just now';
    
    return Math.floor(seconds) + ' seconds ago';
}

// Toggle notification dropdown
notificationIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationDropdown.classList.toggle('active');
    if (notificationDropdown.classList.contains('active')) {
        fetchLatestCommit();
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!notificationIcon.contains(e.target)) {
        notificationDropdown.classList.remove('active');
    }
});

// Initial fetch
fetchLatestCommit(); 