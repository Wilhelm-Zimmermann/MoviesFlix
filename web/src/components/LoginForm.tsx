import { FormEvent, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { InputForm } from "./InputForm";

interface LoginResponse{
    token: string;
}

export function LoginForm(){
    const [userLogin, setUserLogin] = useState({
        email:"",
        password:""
    });
    const [userValid, setUserValid] = useState<boolean>(true);
    const { login } = useAuth();

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const {data: token} = await api.post<LoginResponse>("/users/login", userLogin);
    
            login(token.token);
        }
        catch(err) {
            if(axios.isAxiosError(err)){
                setUserValid(false);
                return;
            }
        }
    }

    console.log(userLogin);

    return (
        <form onSubmit={loginUser} className="flex flex-col justify-between bg-gray-700 rounded px-8 pt-6 pb-8 mb-4 sm:w-[500px] sm:h-[375px] shadow-sm shadow-red-800">
            <h1 className="text-white text-2xl">LOGIN</h1>
            {!userValid && (
                <p className="text-red-400 mb-4">Email/Password might be wrong</p>
            )}
                <InputForm name="Email" id="email" formInfo={userLogin} setFormInfo={setUserLogin} type="text"/>
                <InputForm name="Password" id="password" formInfo={userLogin} setFormInfo={setUserLogin} type="password"/>

                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" href="/users/create">
                        Create an account
                    </a>
                </div>
            </form>
    )
}