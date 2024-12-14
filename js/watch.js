// Move urlParams to global scope
let urlParams;

document.addEventListener('DOMContentLoaded', async function() {
    urlParams = new URLSearchParams(window.location.search);
    const malId = urlParams.get('anime');
    const episodeNumber = parseInt(urlParams.get('ep')) || 1;

    if (!malId) {
        window.location.href = 'browse.html';
        return;
    }

    try {
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Fetch anime details and related anime (seasons)
        const [animeResponse, relatedResponse] = await Promise.all([
            fetch(`https://api.jikan.moe/v4/anime/${malId}`),
            fetch(`https://api.jikan.moe/v4/anime/${malId}/relations`)
        ]);

        const [animeData, relatedData] = await Promise.all([
            animeResponse.json(),
            relatedResponse.json()
        ]);
        
        if (!animeData.data) {
            throw new Error('Anime not found');
        }

        const anime = animeData.data;
        const seasons = getSeasons(relatedData.data, malId);
        console.log('Loaded anime data:', anime);
        console.log('Seasons:', seasons);
        
        updatePageContent(anime, episodeNumber, seasons);

    } catch (error) {
        console.error('Error loading anime:', error);
        document.querySelector('.watch-container').innerHTML = `
            <div class="error-message" style="color: white; text-align: center; padding: 2rem;">
                <h2>Error loading anime</h2>
                <p>Please try again later</p>
                <p style="color: #ff6b6b;">${error.message}</p>
            </div>
        `;
    }
});

function getSeasons(relations, currentMalId) {
    const seasons = [];
    
    // Add current season
    seasons.push({
        mal_id: currentMalId,
        title: 'Season 1',
        number: 1
    });

    // Process related anime to find other seasons
    if (relations) {
        relations.forEach(relation => {
            if (relation.relation === 'Sequel' || relation.relation === 'Prequel') {
                const seasonNumber = extractSeasonNumber(relation.entry[0].name);
                if (seasonNumber) {
                    seasons.push({
                        mal_id: relation.entry[0].mal_id,
                        title: relation.entry[0].name,
                        number: seasonNumber
                    });
                }
            }
        });
    }

    // Sort seasons by number
    return seasons.sort((a, b) => a.number - b.number);
}

function extractSeasonNumber(title) {
    // Common patterns for season numbers in anime titles
    const patterns = [
        /Season (\d+)/i,
        /S(\d+)/i,
        /(\d+)nd Season/i,
        /(\d+)rd Season/i,
        /(\d+)th Season/i,
        /Part (\d+)/i
    ];

    for (const pattern of patterns) {
        const match = title.match(pattern);
        if (match) {
            return parseInt(match[1]);
        }
    }

    return null;
}

function updatePageContent(anime, episodeNumber, seasons) {
    console.log('Updating page content...'); // Debug log

    // Update page title and main title
    document.title = `${anime.title} - Watchiru`;
    const titleElement = document.getElementById('anime-title');
    if (titleElement) {
        titleElement.textContent = `${anime.title} - Episode ${episodeNumber}`;
    }

    // Update anime info
    const poster = document.querySelector('.anime-poster');
    if (poster) {
        poster.src = anime.images.jpg.image_url;
        poster.alt = anime.title;
    }

    // Update title section
    const titleSection = document.querySelector('.title-section h2');
    if (titleSection) {
        titleSection.textContent = anime.title;
    }

    // Update title meta
    const titleMeta = document.querySelector('.title-meta');
    if (titleMeta) {
        titleMeta.innerHTML = `
            <span class="type">${anime.type || 'TV'}</span>
            <span class="year">${anime.aired?.prop?.year?.from || 'N/A'}</span>
            <span class="status">${anime.status || 'Unknown'}</span>
        `;
    }

    // Update meta info
    const metaItems = document.querySelectorAll('.meta-item .value');
    if (metaItems.length >= 5) {
        metaItems[0].textContent = `${anime.episodes || '?'}/${anime.episodes || '?'}`;
        metaItems[1].textContent = anime.duration || 'Unknown';
        metaItems[2].textContent = anime.rating || 'HD';
        metaItems[3].textContent = anime.source || 'Japanese';
        metaItems[4].textContent = 'English';
    }

    // Update genres
    const genresContainer = document.querySelector('.genres');
    if (genresContainer && anime.genres) {
        genresContainer.innerHTML = anime.genres.map(genre => 
            `<span>${genre.name}</span>`
        ).join('');
    }

    // Update synopsis
    const synopsis = document.querySelector('.synopsis p');
    if (synopsis) {
        synopsis.textContent = anime.synopsis || 'No synopsis available.';
    }

    // Generate episode list
    const episodeGrid = document.querySelector('.episode-grid');
    if (episodeGrid && anime.episodes) {
        episodeGrid.innerHTML = Array.from({ length: anime.episodes }, (_, i) => {
            const epNum = i + 1;
            return `
                <button class="episode-btn ${epNum === episodeNumber ? 'active' : ''}" 
                        onclick="window.location.href='watch.html?anime=${anime.mal_id}&ep=${epNum}'">
                    EP ${epNum}
                </button>
            `;
        }).join('');
    }

    // Update video player
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
        videoContainer.innerHTML = `
            <div class="video-placeholder" style="
                background: #000;
                color: white;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 2rem;
            ">
                <h3>${anime.title}</h3>
                <p>Episode ${episodeNumber}</p>
                <p style="color: #aaa; margin-top: 1rem;">Video player placeholder</p>
            </div>
        `;
    }

    // Update season selector
    const seasonSelector = document.querySelector('.season-selector');
    if (seasonSelector && seasons.length > 0) {
        seasonSelector.innerHTML = seasons.map(season => `
            <button class="season-btn ${season.mal_id === anime.mal_id ? 'active' : ''}"
                    onclick="window.location.href='watch.html?anime=${season.mal_id}&ep=1'">
                Season ${season.number}
            </button>
        `).join('');
    } else if (seasonSelector) {
        // If no seasons found, hide the selector
        seasonSelector.style.display = 'none';
    }
}

function updateRecommendations(recommendations) {
    const recommendationsContainer = document.querySelector('.anime-recommendations');
    if (recommendationsContainer && recommendations.length > 0) {
        recommendationsContainer.innerHTML = recommendations.slice(0, 5).map(rec => `
            <a href="watch.html?anime=${rec.mal_id}&ep=1" class="recommendation-item">
                <img src="${rec.images.jpg.image_url}" alt="${rec.title}">
                <div class="recommendation-info">
                    <h4>${rec.title}</h4>
                    <div class="rec-meta">
                        <span>${rec.type}</span>
                        <span>${rec.aired?.year || 'N/A'}</span>
                    </div>
                </div>
            </a>
        `).join('');
    }
}