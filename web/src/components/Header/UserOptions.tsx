import { AiOutlineUpload } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

interface UserOptionsProps{
    toggleIsOpen: () => void;
    logoutUser: () => void;
    handleButtonClick: () => void;
}

export function UserOptions({ toggleIsOpen, logoutUser, handleButtonClick }: UserOptionsProps) {
    return(
        <div onClick={toggleIsOpen} className="absolute w-56 h-32 top-0 left-0 bg-gray-600 -translate-x-20 md:-translate-x-32 flex flex-col justify-between items-center gap-y-3 px-2 py-4">
            {/* botão para fazer logout */}
            <div onClick={logoutUser} className="flex flex-1 w-full justify-center items-center gap-x-1 hover:bg-gray-300 transition-colors border-b-2 border-b-gray-50">
                <button>
                    <BiLogOutCircle className="text-red-500 text-2xl"/>
                </button>
                <span className="text-white text-xl">Sair</span>
            </div>

            {/* botao para upload da foto do usuário */}
            <div className="flex flex-1 w-full items-center gap-x-1 justify-center hover:bg-gray-300 transition-colors">
                <label onClick={handleButtonClick} htmlFor="photo" className="flex items-center gap-x-1 text-white bg-gray text-xl">
                    Update Photo 
                    <AiOutlineUpload className="text-white text-2xl"/>
                </label>
            </div>
        </div>
    )
}