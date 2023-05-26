import { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { MoviesContainer } from "../components/MoviesContainer";
import { api } from "../utils/api";
import { MoviesResponse } from "../utils/MoviesResponse";
import { MoviesContainerLoading } from "../components/MoviesContainerLoading/MoviesContainerLoading";

export function Home(){
    const [movies, setMovies] = useState<MoviesResponse[]>();
    const [loading, setLoading] = useState(false);

    const getMovies = async () => {
        setLoading(true)
        const {data: moviesFromApi} = await api.get<MoviesResponse[]>("/movies");


        setMovies(moviesFromApi);
        setLoading(false);
    }

    useEffect(() => {
        getMovies();        
    }, []);

    if(movies?.length === 0){
        return <h1>não há filmes para mostrar</h1>
    }

    return (
        <>
            <Header color="black"/>
            {loading 
                ? <MoviesContainerLoading />
                : <MoviesContainer category="Todos os filmes" optionsToSelect={[{name: "Avaliados", url: "/movies/rated"}]} movies={movies}/>
            }
        </>
    )
}