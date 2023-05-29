import { BiArrowBack, BiLogInCircle } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { NotLoggedButtons } from "../components/NotLoggedButtons";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export function NotLogged(){
    const navigate = useNavigate();
    const {logout} = useAuth();

    const loginPage = () => {
        navigate("/users/login");
    }

    const signUpPage = () => {
        navigate("/users/create");
    }

    const homePage = () => {
        navigate("/");
    }

    useEffect(() => {
        logout();
    }, []);

    return(
        <>
            <div className="w-full h-screen flex items-center justify-center px-5">
                <div className="w-full py-7 px-5 bg-gray-700 md:w-[600px] h-[330px] flex flex-col justify-between items-center">
                    <NotLoggedButtons name="BACK TO HOME" color="blue" handleClick={homePage} icon={BiArrowBack}/>

                    <h1 className="text-3xl py-5 text-red-400 text-center">You need to be logged to do this action</h1>

                    <div className="flex flex-row justify-center mt-3 w-30 gap-x-2">
                        <NotLoggedButtons name="Login" color="green" handleClick={loginPage} icon={BiLogInCircle}/>
                        <NotLoggedButtons name="Create Account" color="blue" handleClick={signUpPage} icon={CiCirclePlus}/>
                    </div>
                </div>
            </div>
        </>
    )
}