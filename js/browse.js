document.addEventListener('DOMContentLoaded', function() {
    const headerSearchInput = document.getElementById('headerSearchInput');
    const mainSearchInput = document.querySelector('.search-bar input');
    const animeGrid = document.querySelector('.anime-grid');
    let currentPage = 1;
    
    // Header search handler
    headerSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            } else {
                clearResults();
            }
        }
    });

    // Main search handler
    mainSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
                // Sync the header search input
                headerSearchInput.value = query;
            } else {
                clearResults();
            }
        }
    });

    // Add click handler for search icon
    document.querySelector('.search-bar i').addEventListener('click', function() {
        const query = mainSearchInput.value.trim();
        if (query) {
            performSearch(query);
            headerSearchInput.value = query;
        } else {
            clearResults();
        }
    });

    function showLoadingState() {
        const searchIcon = document.querySelector('.search-bar i');
        searchIcon.classList.add('loading');
        
        // Create loading skeleton
        const loadingHTML = Array(12).fill(`
            <div class="loading-card skeleton"></div>
        `).join('');
        
        animeGrid.innerHTML = `
            <div class="loading-grid">
                ${loadingHTML}
            </div>
        `;
    }

    async function performSearch(query) {
        try {
            showLoadingState();
            
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=24`);
            const data = await response.json();
            
            if (!data.data) {
                throw new Error('No data received');
            }

            let results = filterResults(data.data);
            
            // Add slight delay for smoother transition
            await new Promise(resolve => setTimeout(resolve, 300));
            displayResults(results);

        } catch (error) {
            console.error('Search error:', error);
            animeGrid.innerHTML = '<p class="error">An error occurred while searching. Please try again.</p>';
        } finally {
            // Remove loading state
            const searchIcon = document.querySelector('.search-bar i');
            searchIcon.classList.remove('loading');
        }
    }

    function filterResults(results) {
        const genreFilter = document.querySelector('select.filter-dropdown:nth-child(1)').value;
        const yearFilter = document.querySelector('select.filter-dropdown:nth-child(2)').value;
        const typeFilter = document.querySelector('select.filter-dropdown:nth-child(3)').value;
        const statusFilter = document.querySelector('select.filter-dropdown:nth-child(4)').value;

        return results.filter(anime => {
            const matchesGenre = !genreFilter || (anime.genres && anime.genres.some(g => 
                g.name.toLowerCase() === genreFilter.toLowerCase()
            ));
            const matchesYear = !yearFilter || (anime.aired && anime.aired.prop && 
                anime.aired.prop.year && anime.aired.prop.year.from === parseInt(yearFilter));
            const matchesType = !typeFilter || (anime.type && 
                anime.type.toLowerCase() === typeFilter.toLowerCase());
            const matchesStatus = !statusFilter || (anime.status && 
                anime.status.toLowerCase().includes(statusFilter.toLowerCase()));

            return matchesGenre && matchesYear && matchesType && matchesStatus;
        });
    }

    function displayResults(results) {
        if (!results.length) {
            animeGrid.innerHTML = `
                <p class="no-results">
                    No results found for your search.<br>
                    Try different keywords or filters.
                </p>
            `;
            return;
        }

        animeGrid.innerHTML = results.map((anime, index) => `
            <div class="anime-card" style="animation-delay: ${index * 0.05}s">
                <img src="${anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}" alt="${anime.title}">
                <div class="anime-info">
                    <h3>${anime.title}</h3>
                    <div class="anime-meta">
                        <span>${anime.type || 'TV'}</span>
                        <span>${anime.score ? `★ ${anime.score}` : ''}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function clearResults() {
        animeGrid.innerHTML = `
            <p class="no-results">
                Enter a search term to find anime<br>
                <span style="font-size: 0.9em; opacity: 0.7;">Try searching for your favorite titles!</span>
            </p>
        `;
        headerSearchInput.value = '';
        mainSearchInput.value = '';
    }

    // Add filter change handlers
    document.querySelectorAll('.filter-dropdown').forEach(filter => {
        filter.addEventListener('change', () => {
            const query = mainSearchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
    });

    // Initial state - empty with message
    clearResults();
});
 