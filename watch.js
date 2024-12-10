document.addEventListener('DOMContentLoaded', function() {
    // Get anime ID from URL and convert to lowercase for consistency
    const urlParams = new URLSearchParams(window.location.search);
    let animeId = urlParams.get('anime');
    
    // Convert spaces to dashes and make lowercase
    if (animeId) {
        animeId = animeId.toLowerCase().replace(/\s+/g, '-');
    } else {
        animeId = 'attack-on-titan'; // default
    }
    
    console.log('Loading anime:', animeId); // Debug log

    const animeDatabase = {
        'attack-on-titan': {
            title: 'Attack on Titan',
            episodes: [
                {
                    id: 1,
                    file: 'https://streamtape.com/e/yj8ZKrVV7qc1qK8/',
                    title: 'To You, in 2000 Years'
                },
                {
                    id: 2,
                    file: 'https://streamtape.com/e/3ByAJZvjZBFdwpz/',
                    title: 'That Day'
                },
                {
                    id: 3,
                    file: 'https://streamtape.com/e/28L73j877DUZyqd/',
                    title: 'A Dim Light Amid Despair'
                },
                {
                    id: 4,
                    file: 'https://streamtape.com/e/rll0PlA84vfbqP1/',
                    title: 'The Night of the Closing Ceremony'
                },
                {
                    id: 5,
                    file: 'https://streamtape.com/e/OoAaoMvjmacZjmv/',
                    title: 'First Battle'
                },
                {
                    id: 6,
                    file: 'https://streamtape.com/e/KPK1kyAkZ9i0RvY/',
                    title: 'The World She Saw'
                },
                {
                    id: 7,
                    file: 'https://streamtape.com/e/LJlD9pMoPGFWvM/',
                    title: 'Small Blade'
                },
                {
                    id: 8,
                    file: 'https://streamtape.com/e/4BKGpJQ3evHKlyd/',
                    title: 'I Can Hear His Heartbeat'
                },
                {
                    id: 9,
                    file: 'https://streamtape.com/e/qgpm2JmQ04Fzd7w/',
                    title: 'Whereabouts of His Left Arm'
                },
                {
                    id: 10,
                    file: 'https://streamtape.com/e/K9jmJrgAbYsDRB/',
                    title: 'Response'
                },
                {
                    id: 11,
                    file: 'https://streamtape.com/e/mDaDzPlJdMuBby/',
                    title: 'Idol'
                },
                {
                    id: 12,
                    file: 'https://streamtape.com/e/KLo96PmR0WI0M6d/',
                    title: 'Wound'
                },
                {
                    id: 13,
                    file: 'https://streamtape.com/e/49JpJPx2wJUpZw/',
                    title: 'Primal Desire'
                },
                {
                    id: 14,
                    file: 'https://streamtape.com/e/d33qpm4d4VtkdPB/',
                    title: 'Can\'t Look into His Eyes Yet'
                },
                {
                    id: 15,
                    file: 'https://streamtape.com/e/2zljrjd4WOHx7r/',
                    title: 'Special Operations Squad'
                },
                {
                    id: 16,
                    file: 'https://streamtape.com/e/yBryoxKkj3tOlb/',
                    title: 'What Needs to be Done Now'
                },
                {
                    id: 17,
                    file: 'https://streamtape.com/e/A2RLdD8GqWTXMOr/',
                    title: 'Female Titan'
                },
                {
                    id: 18,
                    file: 'https://streamtape.com/e/DaKKleWr4RiklpV/',
                    title: 'Forest of Giant Trees'
                },
                {
                    id: 19,
                    file: 'https://streamtape.com/e/mgzaYJZLkqSbAdZ/',
                    title: 'Bite'
                },
                {
                    id: 20,
                    file: 'https://streamtape.com/e/o2ze2oMOQeSJ1lA/',
                    title: 'Erwin Smith'
                },
                {
                    id: 21,
                    file: 'https://streamtape.com/e/kWwgLLzgW8TOdXG/',
                    title: 'Crushing Blow'
                },
                {
                    id: 22,
                    file: 'https://streamtape.com/e/VyDz0RRe1OUKKbq/',
                    title: 'The Defeated'
                },
                {
                    id: 23,
                    file: 'https://streamtape.com/e/k3mMK204WxuPOY/',
                    title: 'Smile'
                },
                {
                    id: 24,
                    file: 'https://streamtape.com/e/K0aV4zJRVOt0qLB/',
                    title: 'Mercy'
                },
                {
                    id: 25,
                    file: 'https://streamtape.com/e/gwWemMbk3MUq2RQ/',
                    title: 'Wall'
                }
            ],
            poster: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
            synopsis: 'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure.',
            year: 2013,
            type: 'TV Series',
            status: 'Completed',
            totalEpisodes: 25,
            duration: '24m per ep',
            quality: 'HD',
            audio: 'English',
            subtitles: 'No subtitles',
            genres: ['Action', 'Dark Fantasy', 'Drama', 'Mystery']
        },
        'demon-slayer': {
            title: 'Demon Slayer',
            episodes: [
                {
                    id: 1,
                    file: 'https://streamtape.com/e/DEMO_SLAYER_EP1.mp4',
                    title: 'Cruelty'
                }
            ],
            poster: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
            synopsis: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.',
            year: 2019,
            type: 'TV Series',
            status: 'Completed',
            totalEpisodes: 26,
            duration: '23m per ep',
            quality: 'HD',
            audio: 'Japanese',
            subtitles: 'English',
            genres: ['Action', 'Supernatural', 'Demons', 'Historical']
        }
    };

    const anime = animeDatabase[animeId];
    
    if (!anime) {
        console.error('Anime not found:', animeId);
        return;
    }

    // Update page title and main title
    document.title = `${anime.title} - AniStream`;
    document.getElementById('anime-title').textContent = `${anime.title} - Episode 1`;

    // Update anime info
    const poster = document.querySelector('.anime-poster');
    poster.src = anime.poster;
    poster.alt = anime.title;

    document.querySelector('.title-section h2').textContent = anime.title;
    
    // Update meta info
    document.querySelector('.type').textContent = anime.type;
    document.querySelector('.year').textContent = anime.year;
    document.querySelector('.status').textContent = anime.status;

    // Update detailed meta info
    const metaValues = document.querySelectorAll('.meta-item .value');
    metaValues[0].textContent = `${anime.episodes.length}/${anime.totalEpisodes}`;
    metaValues[1].textContent = anime.duration;
    metaValues[2].textContent = anime.quality;
    metaValues[3].textContent = anime.audio;
    metaValues[4].textContent = anime.subtitles;

    // Update synopsis
    document.querySelector('.synopsis p').textContent = anime.synopsis;

    // Update genres
    const genresContainer = document.querySelector('.genres');
    genresContainer.innerHTML = anime.genres.map(genre => 
        `<span>${genre}</span>`
    ).join('');

    // Create episode grid
    const episodeGrid = document.querySelector('.episode-grid');
    const buttons = Array.from({length: anime.totalEpisodes}, (_, i) => {
        const epNum = i + 1;
        const episode = anime.episodes.find(ep => ep.id === epNum);
        const isAvailable = episode !== undefined;
        
        return `
            <button class="episode-btn ${isAvailable ? '' : 'disabled'}" 
                    data-episode="${epNum}"
                    ${isAvailable ? '' : 'disabled'}>
                EP ${epNum}
            </button>
        `;
    }).join('');
    
    episodeGrid.innerHTML = buttons;

    // Add episode click handlers
    document.querySelectorAll('.episode-btn:not(.disabled)').forEach(button => {
        button.addEventListener('click', () => {
            const episodeId = parseInt(button.dataset.episode);
            loadEpisode(episodeId);
        });
    });

    function loadEpisode(episodeId) {
        const episode = anime.episodes.find(ep => ep.id === episodeId);
        if (episode) {
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `
                <iframe 
                    src="${episode.file}"
                    width="100%" 
                    height="100%" 
                    frameborder="0" 
                    allowfullscreen
                ></iframe>
            `;
            
            document.getElementById('anime-title').textContent = 
                `${anime.title} - Episode ${episodeId}: ${episode.title}`;

            // Update active state of episode buttons
            document.querySelectorAll('.episode-btn').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.episode) === episodeId);
            });
        }
    }

    // Load first episode by default
    loadEpisode(1);
});