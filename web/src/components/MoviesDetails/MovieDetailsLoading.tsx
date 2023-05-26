import { Header } from "../Header/Header"

export function MovieDetailsLoading() {
    return (
        <div 
        className="
        flex w-full min-h-screen p-10 bg-gray-900 items-center gap-x-7 justify-between relative 
        "
        >
            {/* Header */}
            <div className="absolute left-0 top-0 z-10 w-full">
                <Header color="transparent"/>
            </div>

            {/* Movie Description */}
            <div className="w-[300px] h-[300px] sm:w-[670px] lg:w-[900px] xl:[1200px] xl:mt-40 mt-52 bg-gray-800 px-3 py-7 animate-pulse">
                <div>
                    <h1 className="w-52 h-8 bg-gray-700 animate-pulse"></h1>

                    <div className="mt-4">
                        <p className="w-full h-4 bg-gray-700 mt-2 animate-pulse"></p>
                        <p className="w-full h-4 bg-gray-700 mt-2 animate-pulse"></p>
                        <p className="w-full h-4 bg-gray-700 mt-2 animate-pulse"></p>
                        <p className="w-full h-4 bg-gray-700 mt-2 animate-pulse"></p>
                        <p className="w-full h-4 bg-gray-700 mt-2 animate-pulse"></p>
                        <p className="w-full h-4 bg-gray-700 mt-2 animate-pulse"></p>

                    </div>

                    <div className="flex justify-between w-60 items-center mt-4">

                        {/* Average Rate Display */}
                        <div className="flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-lg w-16 h-14 animate-pulse">
                            <h1 className="text-white text-3xl"></h1>
                        </div>
                        {/* ------------------- */}

                    </div>
                </div>
            </div>
        </div>
    )
}