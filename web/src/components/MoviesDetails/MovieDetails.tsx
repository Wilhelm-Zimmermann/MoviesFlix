import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { NotFound } from "../../pages/NotFound";
import { MovieDescription } from "./MovieDescription";
import { Header } from "../Header/Header";
import { Overlay } from "../Overlay";
import { MovieDetailsLoading } from "./MovieDetailsLoading";

interface MovieDetailsProps{
    id: number;
}

interface MovieResponse {
    id: number;
    name: string;
    summary: string;
	averageRate: number;
    image: {
        medium: string;
    };
}

export function MovieDetails({ id }: MovieDetailsProps){
    const [movie, setMovie] = useState<MovieResponse>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getMovie()
    }, [])
    

    const getMovie = async () => {
        setLoading(true);
        const {data: movieData} = await api.get<MovieResponse>(`/movies/details/${id}`);
        
        setMovie(movieData);
        setLoading(false)

    }

    if(!movie)
        return <NotFound />
    
    return(
        <>
            {loading 
                ? <MovieDetailsLoading />
                : 
                (
                <div 
                className="
                flex w-full min-h-screen p-10 bg-gray-900 items-center gap-x-7 justify-between 
                bg-no-repeat bg-right bg-[length:100%_100%]
                relative
                "
                style={{backgroundImage: `url(${movie.image.medium.replace("medium_portrait", "original_untouched")})`}}
                >
                    <div className="absolute left-0 top-0 z-10 w-full">
                        <Header color="transparent"/>
                    </div>
        
                    <Overlay />
                    <div className="z-10 sm:w-[670px] lg:w-[900px] xl:[1200px] xl:mt-40 mt-52">
                        <MovieDescription id={movie.id} name={movie.name} description={movie.summary} averageRate={movie.averageRate} image={movie.image}/>
                    </div>
                </div>
            )}
        </>
    )
}