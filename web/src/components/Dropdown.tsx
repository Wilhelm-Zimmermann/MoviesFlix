import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

interface OptionsProps {
    name: string;
    url: string;
}

interface DropdownProps{
    category: string;
    optionsToSelect: OptionsProps[];
}


export function Dropdown({category, optionsToSelect}:DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div className="relative inline-block">
                <button onClick={toggleDropdown} className="flex items-center justify-between gap-x-1 bg-red-500 text-white font-bold py-2 px-4 rounded">
                    {category}
                    <FaArrowDown className="text-white"/>
                </button>
                {isOpen && (
                    <ul className="absolute text-gray-700 pt-1" onClick={() => setIsOpen(false)}>
                    {optionsToSelect.map(option => {
                        return(
                            <li key={option.url}>
                                <a className="rounded-sm bg-red-200 hover:bg-red-400 text-gray-800 py-2 px-4 block whitespace-no-wrap" href={option.url}>
                                {option.name}
                                </a>
                            </li>
                        )
                    })}
                    </ul>
                )}
        </div>
    )
}