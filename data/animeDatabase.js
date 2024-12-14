const animeDatabase = {
    // Each anime has a unique slug as its key
    'attack-on-titan': {
        id: 'attack-on-titan',
        title: 'Attack on Titan',
        japaneseTitle: 'Shingeki no Kyojin',
        seasons: [
            {
                id: 'attack-on-titan',
                number: 1,
                title: 'Attack on Titan',
                year: 2013,
                episodes: [
                    {
                        number: 1,
                        title: 'To You, in 2000 Years',
                        file: 'https://streamtape.com/e/yj8ZKrVV7qc1qK8/'
                    },
                    // ... more episodes
                ]
            },
            {
                id: 'attack-on-titan-2',
                number: 2,
                title: 'Attack on Titan Season 2',
                year: 2017,
                episodes: [
                    // ... season 2 episodes
                ]
            }
        ],
        genres: ['Action', 'Dark Fantasy', 'Drama', 'Mystery'],
        status: 'Completed',
        synopsis: 'Centuries ago, mankind was slaughtered...',
        poster: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
        banner: 'path/to/banner.jpg',
        rating: 9.1,
        malId: 16498  // MyAnimeList ID for API integration
    },
    // Add more anime entries
};

export default animeDatabase; 