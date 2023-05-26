import { createContext, useState, useContext } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface UserProfile{
    name: string;
    profileImageUrl: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    userProfile: UserProfile | undefined;
    userProfilePhoto: string | undefined;   
    login: (token: string) => void;
    logout: () => void;
    getUserProfile: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    userProfilePhoto: "",
    userProfile: {
        name: "",
        profileImageUrl: ""
    },
    login: (token: string) => {},
    logout: () => {},
    getUserProfile: () => {}
});

interface AuthProviderProps{
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [userProfilePhoto, setUserProfilePhoto] = useState<string>();
    const navigate = useNavigate();
    const tokenKey = "@User";

    const login = (token: string) => {
        localStorage.setItem(tokenKey, token);
        setIsAuthenticated(true);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem(tokenKey);
        setIsAuthenticated(false);
        navigate("/users/login");
    };

    const getUserProfile = async () => {
        const {data: user} = await api.get<UserProfile>("/users/get-profile")

        setUserProfile(user);
        setUserProfilePhoto(user.profileImageUrl);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getUserProfile, userProfile, userProfilePhoto }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    return context;
}