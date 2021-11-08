import React, {useEffect, useState} from 'react';
import axios from './axios';  //renamed instance as axios because it was a default export
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import SkeletonRow from './skeleton/skeletonRow';


const base_url = "https://image.tmdb.org/t/p/original/";    //url for image poster

export default function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        async function fetchData() {
            setLoading(true);
            const response = await axios.get(fetchUrl);     //e.g https://api.themoviedb.org/3/{fetchUrl} 
            setMovies(response.data.results);
            setLoading(false);
            return response;
        }
        fetchData();
    }, [fetchUrl]);

    // console.log(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
            .then((url) => {
                //e.g https://www.youtube.com/watch?v=XtMThy8QKqU
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
    };

    console.log("movie trailer>>>",trailerUrl);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        src={`${base_url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}