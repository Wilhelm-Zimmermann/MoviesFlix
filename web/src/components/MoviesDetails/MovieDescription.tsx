import { useEffect, useState } from "react";
import { RateMovieButtons } from "../RateMovieButtons";
import { api } from "../../utils/api";

interface MovieDescriptionProps{
    id: number;
    name: string;
    description: string;
    averageRate: number;
    image:{
        medium: string;
    }
}

interface RateMovieDataProps{
    movieUrl: string;
    movieAverageRate: number;
}

export function MovieDescription({id, name, description, averageRate, image }: MovieDescriptionProps){
    const [movieAverateRate, setMovieAverageRate] = useState<number>(averageRate);

    const rateMovie = async (like: number) => {        
        await api.post("/movies/create",
            {
                id,
                name,
                description,
                imageURL: image.medium
            });        

        const {data: rateMovieData} = await api.post<RateMovieDataProps>(`/ratings/${id}`, 
            {
                rate: like
            })

        setMovieAverageRate(rateMovieData.movieAverageRate);
    }


    return(
        <>
        <div>
            <h1 className="text-gray-50 text-5xl font-bold">{name}</h1>

            <div className="text-gray-50 text-xl mt-4" dangerouslySetInnerHTML={{ __html: description }}></div>

            <div className="flex justify-between w-60 items-center mt-4">

                {/* Average Rate Display */}
                <div className="flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-lg w-16 h-14">
                    <h1 className="text-white text-3xl">{movieAverateRate}</h1>
                </div>
                {/* ------------------- */}

                <RateMovieButtons rateMovie={rateMovie}/>
            </div>
        </div>
        </>
    )
}