import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { VerifyFields } from "../utils/formValidations";
import { InputForm } from "./InputForm";

interface LoginResponse{
    token: string;
}

export function SignUpForm(){
    const [formInfo, setFormInfo] = useState({
        username: "",
        email: "",
        password:"",
        passwordMatch: "",
    })
    const [emailTaken, setEmailTaken] = useState("");
    const [isValid, setIsValid] = useState<boolean>(true);

    const { login } = useAuth();

    const isValidToSend = () => {
        const {email, password, username, passwordMatch} = formInfo;
        const fieldsValidation = VerifyFields(email, username, password, passwordMatch);
        setIsValid(fieldsValidation);
    }

    const createUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!isValid)
            return;

        const {email, password, username} = formInfo;

        await api.post("/users/create", {
            email,
            name: username,
            password
        }).then(data => setEmailTaken("")).catch(err => {
            setEmailTaken(err.response.data.error);
        })

        try{
            const {data: token} = await api.post<LoginResponse>("/users/login", {
                email,
                password
            });
    
            login(token.token)
        }catch (err){
            return;
        }
    }

    return(
        <form onSubmit={createUser} className="flex flex-col justify-between bg-gray-700 w-80 rounded px-8 pt-6 pb-8 mb-4 sm:w-[500px] shadow-sm shadow-red-800">
            <h1 className="text-white text-2xl mb-2">SIGN UP</h1>
            {emailTaken !== "" && (
                <p className="text-red-500">{emailTaken}</p>
            )}

            {!isValid && (
                <ul className="text-red-500 mt-1 flex my-2 gap-y-1 flex-col list-disc list-inside">
                    <li>Email must have "@" e ".com"</li>
                    <li>Passwords needs to match</li>
                    <li>Password needs to have at leat 8 characters and must have, numbers[0,9], letters[aA-zZ], and special characters[@#$%&*]</li>
                    <li>Username needs to have at least 3 characters</li>
                </ul>
            )}

                <InputForm name="Email" id="email" setFormInfo={setFormInfo} formInfo={formInfo} type="text"/>
                <InputForm name="Username" id="username" setFormInfo={setFormInfo} formInfo={formInfo} type="text"/>
                <InputForm name="Password" id="password" setFormInfo={setFormInfo} formInfo={formInfo} type="password"/>
                <InputForm name="Confirm Password" id="passwordMatch" setFormInfo={setFormInfo} formInfo={formInfo} type="password"/>

                <div className="flex items-center justify-between">
                    <button onClick={isValidToSend} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Create
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" href="/users/login">
                        Already have an account?
                    </a>
                </div>

            </form>
    )
}