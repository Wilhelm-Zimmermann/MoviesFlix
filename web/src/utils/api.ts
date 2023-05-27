import axios, { AxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

const getToken = (): string | null => {
    return localStorage.getItem("@User");
}

api.interceptors.request.use(
    async config => {
        const token = getToken();

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
                
        return config;
    },

    err => {
        return err;
    }
)

api.interceptors.response.use(
    response => {
        return response;
    },

    (err: AxiosError) => {
        if(err.response){
            if(err.response.status >= 500){
                return err;
            }

            if(err.response.status === 401){
                window.location.href = "/forbidden";
            }

            if(err.response.status === 404){
                window.location.href = "/resource/not-found";
            }
        }

        return Promise.reject(err);
    }
)