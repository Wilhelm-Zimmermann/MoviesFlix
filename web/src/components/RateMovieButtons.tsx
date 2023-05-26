import { BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";

interface RateMovieButtonsProps{
    rateMovie: (like: number) => void;
}

export function RateMovieButtons({ rateMovie }: RateMovieButtonsProps){
    return (
        <>
        {/* Like and deslike Buttons */}
            <div className="flex justify-around w-32 h-14 items-center bg-gray-700 px-4 bg-opacity-50 rounded-lg">
                {/* Like */}
                <button className="flex-1 border-r-2 border-gray-300">
                    <BsHandThumbsUpFill onClick={() => {rateMovie(10)}} className="text-white text-3xl hover:text-gray-100"/>
                </button>
                {/* Deslike */}
                <button className="flex flex-1 justify-end">
                    <BsHandThumbsDownFill onClick={() => {rateMovie(0)}} className="text-white text-3xl hover:text-gray-100"/>
                </button>
            </div>
        {/* ----------------------- */}
        </>
    )
}