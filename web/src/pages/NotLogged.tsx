import { Header } from "../components/Header/Header";

export function NotLogged(){
    return(
        <>
            <Header color="black"/>
            <h1 className="text-white">Você precisa fazer login para acessar esta página</h1>
        </>
    )
}