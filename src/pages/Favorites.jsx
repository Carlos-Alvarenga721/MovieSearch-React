import '../css/Favorite.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';


function Favorite(){
    const { favorites } = useMovieContext();

    if(favorites) 
        return (
        <div className="favorites">
            <h2>Your Favorite Movies</h2>
        <div className="movies-grid">
                {favorites.map((movie) => 
                <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>)

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <h2>Start adding movies to your favorites and they will appear here</h2>
        </div>
    );
}

export default Favorite;
