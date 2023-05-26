import { FormEvent, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

interface LoginInfoRequest {
    email: string | undefined;
    password: string | undefined;
}

interface LoginResponse{
    token: string;
}

export function LoginForm(){
    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [userValid, setUserValid] = useState<boolean>(true);
    const { login } = useAuth();

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginInfo: LoginInfoRequest = {
            email,
            password
        }
        
        try{
            const {data: token} = await api.post<LoginResponse>("/users/login", loginInfo);
    
            login(token.token);
        }
        catch(err) {
            if(axios.isAxiosError(err)){
                setUserValid(false);
                return;
            }
        }
    }

    return (
        <form onSubmit={loginUser} className="flex flex-col justify-between bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-[500px] sm:h-[375px] shadow-sm shadow-red-800">
            <h1 className="text-white text-2xl">LOGIN</h1>
            {!userValid && (
                <p className="text-red-400 mb-4">Email/Password might be wrong</p>
            )}
                <div className="mb-4">
                    <label className="block text-gray-50 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input onChange={e => setEmail(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Address"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-50 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onChange={e => setPassword(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                </div>
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