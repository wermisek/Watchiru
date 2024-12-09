// Sample movie data
const movies = [
    { id: 1, image: 'movie1.jpg', title: 'Movie 1' },
    { id: 2, image: 'movie2.jpg', title: 'Movie 2' },
    // Add more movies as needed
];

// Populate movies slider
function populateMovies() {
    const moviesSlider = document.querySelector('.movies-slider');
    
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');
        movieElement.style.backgroundImage = `url(${movie.image})`;
        movieElement.style.backgroundSize = 'cover';
        movieElement.style.backgroundPosition = 'center';
        
        moviesSlider.appendChild(movieElement);
    });
}

// Add scroll behavior for navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = '#141414';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateMovies();
}); 