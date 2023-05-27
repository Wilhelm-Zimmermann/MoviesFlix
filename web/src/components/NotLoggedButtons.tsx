import { IconType } from "react-icons";

interface NotLoggedButtonsProps{
    name: string;
    icon: IconType;
    handleClick: () => void;
    color: string;
}

export function NotLoggedButtons({ name, icon: Icon, handleClick, color }: NotLoggedButtonsProps){
    return( 
        <button onClick={handleClick} className="flex items-center bg-gray-600 p-2 gap-x-1 rounded-md hover:bg-gray-500 transition-colors">
            <Icon className={`text-${color}-400 text-2xl`}/>
            <span className="text-white text-2xl">{name}</span>
        </button>
    )
}