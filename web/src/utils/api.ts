import axios from "axios";

const getToken = (): string | null => {
    return localStorage.getItem("@User");
}

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

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
)