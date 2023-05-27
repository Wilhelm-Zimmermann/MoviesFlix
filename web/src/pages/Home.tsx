import { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header/Header";
import { MoviesContainer } from "../components/MoviesContainer";
import { api } from "../utils/api";
import { MoviesResponse } from "../utils/MoviesResponse";
import { MoviesContainerLoading } from "../components/MoviesContainerLoading/MoviesContainerLoading";

export function Home(){
    const [movies, setMovies] = useState<MoviesResponse[]>([]);
    const [firstLoading, setFirstLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(0);

    const infiniteScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const getMovies = async () => {
            setLoading(true)
            const {data: moviesFromApi} = await api.get<MoviesResponse[]>(`/movies?page=${pageNumber}`);
    
    
            setMovies(prevMovies => [...prevMovies, ...moviesFromApi])
            setFirstLoading(false);
            setLoading(false);
        }

        getMovies();

        const handleScroll = () => {
            if (
                infiniteScrollRef.current &&
                infiniteScrollRef.current.getBoundingClientRect().bottom <= window.innerHeight
            ) {
                setPageNumber(prevPage => prevPage + 1);
                getMovies();
            }
          };
      
          // Attach the scroll event listener
          window.addEventListener('scroll', handleScroll);
      
          // Clean up the event listener on component unmount
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    }, []);

    console.log(pageNumber)

    return (
        <>
            <Header color="black"/>
            {firstLoading 
                ? <MoviesContainerLoading />
                : (
                    <>
                        <MoviesContainer dropdown category="Todos os filmes" optionsToSelect={[{name: "Avaliados", url: "/movies/rated"}]} movies={movies}/>
                        <div ref={infiniteScrollRef}></div>
                        {loading && <MoviesContainerLoading />}
                    </>
                )
            }
        </>
    )
}