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