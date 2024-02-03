document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'a7b500ff37a53fe61622373099b9ce5c';

    // Function to fetch movie data from TMDb
    async function fetchMovies(endpoint, containerId) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);

            if (endpoint.includes('tv')) {
                displayWebSeries(data.results, containerId);
            } else {
                displayMovies(data.results, containerId);
            }
            updateMovieLinks(data.results, containerId);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // Function to update movie links
    function updateMovieLinks(movies, containerId) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;

            // Create anchor tag for each movie or web series
            const movieLink = document.createElement('a');
            movieLink.href = `Movies_Detail.html?id=${movie.id}`; // Pass movie ID as query parameter
            movieLink.appendChild(img);

            movieLink.addEventListener('click', (event) => {
                event.preventDefault; // Prevent default behavior of link click
                window.location.search = movieLink.href; // Redirect to movie detail page
            });

            // Append anchor tag to movie element
            movieElement.appendChild(movieLink);

            // Append movie element to container
            const container = document.getElementById(containerId);
            container.appendChild(movieElement);
        });
    }

    // Function to display movies in the specified container
    function displayMovies(movies, containerId) {
        const movieContainer = document.getElementById(containerId);
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;
            const title = document.createElement('h3');
            title.textContent = movie.title;
            movieElement.appendChild(img);
            movieElement.appendChild(title);
            movieContainer.appendChild(movieElement);
        });
    }

    // Function to display movies in the specified container
    function displayWebSeries(movies, containerId) {
        const movieContainer = document.getElementById(containerId);
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.name;
            const title = document.createElement('h3');
            title.textContent = movie.name;
            movieElement.appendChild(img);
            movieElement.appendChild(title);
            movieContainer.appendChild(movieElement);
        });
    }

    // Fetch featured movies
    fetchMovies('movie/popular', 'featured-movie-list');

    // Fetch trending movies
    fetchMovies('trending/movie/day', 'trending-movie-list');

    // Fetch trending web series
    fetchMovies('trending/tv/day', 'trending-web-series-list');
});

let isSearchOpen = false; // Track if search input is open

function toggleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    if (!isSearchOpen) {
        searchInput.style.display = 'block'; // Show search input
        isSearchOpen = true;
    } else {
        searchInput.style.display = 'none'; // Hide search input
        isSearchOpen = false;
        performSearch(); // Call performSearch() when closing search input
    }
}

// Function to perform search using API
async function performSearch() {
    console.log("Performing Search...");
    document.getElementById('featured-movies').style.display = 'none';
    document.getElementById('trending-movies').style.display = 'none';
    document.getElementById('trending-web-series').style.display = 'none';

    const apiKey = 'a7b500ff37a53fe61622373099b9ce5c';
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.trim(); 

    if (searchText !== '') {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchText)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displaySearchResults(data.results);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    } else {
        console.alert('Please enter a search term.'); 
    }
}

// Function to display search results
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('result');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;

            const title = document.createElement('h3');
            title.textContent = movie.title;

            movieElement.appendChild(img);
            movieElement.appendChild(title);

            searchResultsContainer.appendChild(movieElement);
        });
    } else {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.textContent = 'No results found.';
        searchResultsContainer.appendChild(noResultsMessage);
    }
}

function redirectToHome(){
    window.location.href = "NetflixClone.html";
}
