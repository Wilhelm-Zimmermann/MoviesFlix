import { AiFillCloseCircle, AiOutlineUpload } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

interface UserOptionsProps{
    toggleIsOpen: () => void;
    logoutUser: () => void;
    handleButtonClick: () => void;
}

export function UserOptions({ toggleIsOpen, logoutUser, handleButtonClick }: UserOptionsProps) {
    return(
        <div onClick={toggleIsOpen} className="absolute w-56 h-40 z-10 top-1 left-0 bg-gray-600 -translate-x-20 md:-translate-x-32 flex flex-col justify-between items-center px-3 py-1">
            <button className="self-center justify-self-start py-2 md:self-end"><AiFillCloseCircle className="text-3xl text-red-500"/></button>
            {/* botão para fazer logout */}
            <div onClick={logoutUser} className="flex flex-1 w-full justify-center items-center gap-x-1 hover:bg-gray-300 transition-colors border-b-2 border-b-gray-50">
                <button>
                    <BiLogOutCircle className="text-red-500 text-2xl"/>
                </button>
                <span className="text-white text-xl">Logout</span>
            </div>

            {/* botao para upload da foto do usuário */}
            <div className="flex flex-1 w-full items-center gap-x-1 justify-center hover:bg-gray-300 transition-colors">
                <label onClick={handleButtonClick} htmlFor="photo" className="flex items-center gap-x-1 text-white bg-gray text-xl">
                    Change Avatar 
                    <AiOutlineUpload className="text-white text-2xl"/>
                </label>
            </div>
        </div>
    )
}