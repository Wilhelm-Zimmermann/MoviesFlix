import { AiFillCloseCircle, AiOutlineUpload } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

interface UserOptionsProps{
    toggleIsOpen: () => void;
    logoutUser: () => void;
    handleButtonClick: () => void;
    username?: string;
}

export function UserOptions({ toggleIsOpen, logoutUser, handleButtonClick, username }: UserOptionsProps) {
    return(
        <div onClick={toggleIsOpen} className="absolute w-56 h-60 z-10 top-1 left-0 bg-gray-600 -translate-x-20 md:-translate-x-32 flex flex-wrap justify-start px-3 py-1">
            <button className="self-center justify-self-start py-2 md:self-end"><AiFillCloseCircle className="text-3xl text-red-500"/></button>
            {/* Nome do usuário */}
            <div className="flex py-3 px-2 w-full justify-start items-center hover:text-gray-300 transition-colors">
                <span className="text-white text-xl">@{username}</span>
            </div>

            {/* botão para fazer logout */}
            <div onClick={logoutUser} className="flex py-3 px-2 w-full justify-start items-center gap-x-1 hover:bg-gray-300 transition-colors">
                <button>
                    <BiLogOutCircle className="text-red-500 text-2xl"/>
                </button>
                <span className="text-white text-xl">Logout</span>
            </div>

            {/* botao para upload da foto do usuário */}
            <div className="flex py-3 px-2 w-full items-center gap-x-1 justify-start hover:bg-gray-300 transition-colors">
                <label onClick={handleButtonClick} htmlFor="photo" className="flex items-center gap-x-1 text-white bg-gray text-xl">
                    Change Avatar 
                    <AiOutlineUpload className="text-white text-2xl"/>
                </label>
            </div>
        </div>
    )
}