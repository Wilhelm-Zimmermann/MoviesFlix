import { useNavigate } from "react-router-dom";
import { MoviesResponse } from "../utils/MoviesResponse";
import { Dropdown } from "./Dropdown";
import uuid from "react-uuid";

interface OptionsProps {
    name: string;
    url: string;
}

interface MoviesContainerProps{
    movies: MoviesResponse[] | undefined;
    category: string;
    dropdown: boolean;
    optionsToSelect: OptionsProps[];
}

export function MoviesContainer({ movies, category, optionsToSelect, dropdown } : MoviesContainerProps) {
    const navigate = useNavigate();
    
    const getMovieDetails = (id: number) => {
        navigate(`/movies/details/${id}`);
    }

    return (
        <div className="p-10">
           {dropdown && (<Dropdown category={category} optionsToSelect={optionsToSelect}/>)}

            <div className="flex flex-1 w-full gap-y-12 justify-center sm:justify-between flex-wrap items-center mt-8">
                {movies?.length === 0 && (
                    <h1 className="text-white text-3xl"> No movies to show </h1>
                )}
                {
                    movies?.map((movie, index) => {
                        return(
                            <div onClick={() => getMovieDetails(movie.id)} key={`${uuid()}_${movie.id}`} className="w-[375px] h-[400px] sm:w-60 md:w-80 lg:w-64 cursor-pointer flex flex-col overflow-y-hidden hover:scale-110 hover:transition-transform bg-gray-700 rounded-md">
                                <div className="w-full h-full">
                                    <img src={movie.image.medium} alt="movieImg" className="inline-block w-full h-full object-cover"/>
                                </div>
                            </div>
                        )
                    })
                }                
            </div>
        </div>
    )
}