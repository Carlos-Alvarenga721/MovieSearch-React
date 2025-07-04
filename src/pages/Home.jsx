import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import '../css/Home.css';
import {searchMovies, getPopularMovies} from "../services/api";


function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => { 
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to fetch popular movies. Please try again later.");
                console.error("Error fetching popular movies: ", error);
            } finally {
                setLoading(false);
            }
         }

        loadPopularMovies();

        }, [])

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) return
        if(loading) return; // Prevent search while loading
        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null); // Clear any previous errors
            
        } catch (error) {
            setError("Failed to fetch search results. Please try again later.");
            console.error("Error fetching search results: ", error);    
        }finally {
            setLoading(false);
        }
    };


    return (
    
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading movies...</div> : <div className="movies-grid">
                {movies.map((movie) => movie.title.toLowerCase().startsWith(searchQuery) && 
                <MovieCard movie={movie} key={movie.id}/>)}
            </div>
            }
        </div>
    );
}

export default Home;
