import { useNavigate } from "react-router-dom";
import { NotLoggedButtons } from "../components/NotLoggedButtons";
import { BiArrowBack } from "react-icons/bi";

export function ResourceNotFound(){
    const navigate = useNavigate();

    const homePage = () => {
        navigate("/");
    }

    return(
        <div className="w-full h-screen flex flex-col gap-y-3 justify-center items-center">
            <h1 className="text-white text-3xl">
                RESOURCE NOT FOUND
            </h1>
            <NotLoggedButtons name="BACK TO HOME" color="blue" handleClick={homePage} icon={BiArrowBack}/>
        </div>
    )
}