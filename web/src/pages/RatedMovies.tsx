import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { api } from "../utils/api";
import { MoviesResponse } from "../utils/MoviesResponse";
import { MoviesContainer } from "../components/MoviesContainer";
import { MoviesContainerLoading } from "../components/MoviesContainerLoading/MoviesContainerLoading";

export function RatedMovies(){
    const [movies, setMovies] = useState<MoviesResponse[]>()
    const [loading, setLoading] = useState(false);

    const getRatedMovies = async () => {
        setLoading(true);
        const { data: ratedMoviesData } = await api.get<MoviesResponse[]>("/movies/rated");
        
        setMovies(ratedMoviesData);
        setLoading(false);
    }

    useEffect(() => {
        getRatedMovies()
    }, [])

    return (
        <>
            <Header color="black"/>
            {loading 
                ? <MoviesContainerLoading />
                : <MoviesContainer category="Todos os filmes" optionsToSelect={[{name: "Todos os filmes", url: "/"}]} movies={movies}/>
            }
        </>
    )
}