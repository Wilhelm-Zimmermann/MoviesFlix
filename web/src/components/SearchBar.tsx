import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function SearchBar(){
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    const executeSearchMovie = () => {
        const query = search.replace(" ", "+");
        navigate(`/movies/search?q=${query}`);
    }

    return(
        <div className="flex justify-between items-center">
            <input type="text" className="w-60 h-10 outline-none bg-gray-50 rounded-l-lg px-2" placeholder="Search" onChange={e => setSearch(e.currentTarget.value)}/>
            <button  onClick={executeSearchMovie} className="bg-gray-50 px-2 hover:bg-gray-100 transition-colors rounded-r-lg">
                <BsSearch className="text-gray-700 h-10 w-6"/>
            </button>
        </div>
    )
    }