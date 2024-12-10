// Episode data with 6 episodes
const episodes = [
    { id: 1, file: 'vid/S1 - 01.mp4', title: 'To You, in 2000 Years' },
    { id: 2, file: 'vid/S1 - 02.mp4', title: 'That Day' },
    { id: 3, file: 'vid/S1 - 03.mp4', title: 'A Dim Light Amid Despair' },
    { id: 4, file: 'vid/S1 - 04.mp4', title: 'The Night of the Closing Ceremony' },
    { id: 5, file: 'vid/S1 - 05.mp4', title: 'First Battle' },
    { id: 6, file: 'vid/S1 - 06.mp4', title: 'The World the Girl Saw' }
];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeTitle = urlParams.get('anime') || 'Attack on Titan';
    
    // Update page title and heading
    document.title = `Watch ${animeTitle} - AniStream`;
    document.getElementById('anime-title').textContent = animeTitle;
    
    // Get video player element
    const video = document.getElementById('anime-player');
    if (!video) {
        console.error('Video player not found!');
        return;
    }

    // Populate episode grid
    const episodeGrid = document.querySelector('.episode-grid');
    episodeGrid.innerHTML = episodes.map(ep => `
        <button class="episode-btn ${ep.id === 1 ? 'active' : ''}" data-episode="${ep.id}">
            EP ${ep.id}
        </button>
    `).join('');

    // Function to load episode
    function loadEpisode(episodeId) {
        const episode = episodes.find(ep => ep.id === episodeId);
        if (episode) {
            console.log('Loading episode:', episode.file);
            video.src = episode.file;
            video.load();
            
            // Update episode buttons
            document.querySelectorAll('.episode-btn').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.episode) === episodeId);
            });
            
            // Update episode title
            document.getElementById('anime-title').textContent = 
                `${animeTitle} - Episode ${episodeId}: ${episode.title}`;
            
            // Play video
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play prevented:", error);
                });
            }
        }
    }

    // Add click handlers for episode buttons
    document.querySelectorAll('.episode-btn').forEach(button => {
        button.addEventListener('click', () => {
            const episodeId = parseInt(button.dataset.episode);
            loadEpisode(episodeId);
        });
    });

    // Video error handling
    video.addEventListener('error', (e) => {
        console.error('Video error:', video.error);
    });

    // Load first episode by default
    loadEpisode(1);
});