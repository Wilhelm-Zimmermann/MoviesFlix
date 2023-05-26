import { useNavigate } from "react-router-dom";
import { Profile } from "./Profile";
import { SearchBar } from "../SearchBar";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
    color: string;
}

export function Header({color}: HeaderProps){
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const goToHome = () => {
        navigate("/");
    }

    return (
        <div className={`flex w-full justify-between items-center flex-col gap-y-2 z-10 bg-${color} px-7 py-5 md:flex-row`}>
            <div onClick={goToHome} className="cursor-pointer">
                <h1 className="text-gray-50 text-3xl hover:text-gray-100"> GIOVANELLA <span className="text-red-700 hover:text-red-600">FLIX</span></h1>
            </div>
            <div>
                <SearchBar />
            </div>

            <div className="flex w-20 h-20 rounded-full">
                {isAuthenticated ? <Profile /> : <h1 className="text-white">Não logado</h1>}
                
            </div>            
        </div>
    )
}