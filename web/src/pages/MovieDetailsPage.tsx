import { useParams } from "react-router-dom"
import { MovieDetails } from "../components/MoviesDetails/MovieDetails"

export function MovieDetailsPage(){
    const { id } = useParams()

    return(
        <div className="flex min-h-screen flex-col">
            <MovieDetails id={Number(id)}/>
        </div>
    )
}