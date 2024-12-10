// Update the movies data with anime titles
const movies = [
    { 
        id: 1, 
        image: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg', 
        title: 'Attack on Titan',
        category: 'Shonen'
    },
    { 
        id: 2, 
        image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', 
        title: 'Demon Slayer',
        category: 'Shonen'
    },
    {
        id: 3,
        image: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
        title: 'My Hero Academia',
        category: 'Shonen'
    },
    {
        id: 4,
        image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
        title: 'Jujutsu Kaisen',
        category: 'Shonen'
    },
    {
        id: 5,
        image: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
        title: 'One Punch Man',
        category: 'Action'
    },
    {
        id: 6,
        image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
        title: 'Death Note',
        category: 'Psychological'
    }
];

// Create movie element
function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');
    
    // Set background image
    movieElement.style.backgroundImage = `url(${movie.image})`;
    movieElement.style.backgroundSize = 'cover';
    movieElement.style.backgroundPosition = 'center';
    
    // Create movie info
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    movieInfo.innerHTML = `
        <h3>${movie.title}</h3>
        <span>${movie.category}</span>
        <div class="movie-actions">
            <button class="play-small"><i class="fas fa-play"></i></button>
            <button class="add-to-list"><i class="fas fa-plus"></i></button>
        </div>
    `;
    
    // Add click handler for the entire movie card - updated to go to watch.html
    movieElement.addEventListener('click', () => {
        window.location.href = `watch.html?anime=${encodeURIComponent(movie.title)}`;
    });
    
    movieElement.appendChild(movieInfo);
    return movieElement;
}

// Initial population of movies
function populateMovies() {
    const moviesSliders = document.querySelectorAll('.movies-slider');
    
    if (moviesSliders.length === 0) {
        console.error('No movie sliders found');
        return;
    }
    
    moviesSliders.forEach(slider => {
        // Clear existing content
        slider.innerHTML = '';
        
        // Add all movies
        movies.forEach(movie => {
            const movieElement = createMovieElement(movie);
            slider.appendChild(movieElement);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, populating movies...');
    populateMovies();
    
    // Add category pill click handlers
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const category = this.textContent.trim();
            
            // Update active state
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and display movies
            const filteredMovies = category === 'All' 
                ? movies 
                : movies.filter(movie => movie.category === category);
            
            const moviesSliders = document.querySelectorAll('.movies-slider');
            moviesSliders.forEach(slider => {
                slider.innerHTML = '';
                filteredMovies.forEach(movie => {
                    const movieElement = createMovieElement(movie);
                    slider.appendChild(movieElement);
                });
            });
        });
    });
}); 