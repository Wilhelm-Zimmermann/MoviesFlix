import { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { MoviesContainer } from "../components/MoviesContainer";
import { api } from "../utils/api";
import { MoviesResponse } from "../utils/MoviesResponse";
import { useLocation } from "react-router-dom";

export function SearchMovies(){
    const [movies, setMovies] = useState<MoviesResponse[]>();
    const location = useLocation();

    const getMovies = async () => {
        const query = new URLSearchParams(location.search);
        const params = Object.fromEntries(query.entries());
        const queryToSearch = params.q.replace(" ", "+");

        const {data: moviesFromApi} = await api.get<MoviesResponse[]>(`/movies/search?q=${queryToSearch}`);


        setMovies(moviesFromApi);
    }

    useEffect(() => {
        getMovies();        
    }, [location]);

    if(movies?.length === 0){
        return <h1>não há filmes para mostrar</h1>
    }

    return (
        <>
            <Header color="black"/>
            <MoviesContainer category="Todos os filmes" optionsToSelect={[{name: "Avaliados", url: "/movies/rated"}]} movies={movies}/>
        </>
    )
}