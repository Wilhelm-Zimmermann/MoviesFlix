import { useAuth } from "../../contexts/AuthContext";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { api } from "../../utils/api";
import { UserOptions } from "./UserOptions";

export function Profile() {
    const { getUserProfile,userProfile, userProfilePhoto, logout } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    const uploadUserProfilePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files;

        if(!file)
            return
        
        const formData = new FormData();
        formData.append("profilePhoto", file[0])
    
        await api.patch("/users/upload", formData);
        getUserProfile();
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const logoutUser = () => {
        logout();
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    return (
        <>
        <div onClick={toggleIsOpen} className="w-full h-full flex items-center relative">
            <div>
                <img src={userProfilePhoto} alt="user_" className="w-20 h-20 object-cover rounded-full"/>
            </div>
            {/* Coloquei o input aqui, pois se colocar dentro da condicional "isOpen" ele não funciona corretamente */}
            <input ref={fileInputRef} type="file" id="photo" name="userPhoto" accept="image/*" onChange={uploadUserProfilePhoto} className="w-0 h-0 invisible"/>
            {
                isOpen && (
                    <UserOptions toggleIsOpen={toggleIsOpen} handleButtonClick={handleButtonClick} logoutUser={logoutUser} />
                )
            }
        </div>
        </>
    )
}