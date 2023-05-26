export function EmailVerify(email: string): string{
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if(!emailRegex.test(email))
        return "Email inválido";

    return "";
}

export function UserVerify(username: string){
    if(username.length < 3){
        return "Username must be greater than 3 characteres"
    }

    return "";
}


export function PasswordVerify(password: string){
    if(password.length < 3){
        return "Password must be greater than 3 characteres"
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if(!passwordRegex.test(password))
        return "Password must contain especial characters[@#$], numbers and letters";

    return "";
}


export function VerifyFields(emailVerify: string, usernameVerify: string, passwordVerify: string, passwordMatch: string){
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if(usernameVerify.length < 3)
        return false;

    if(!passwordRegex.test(passwordVerify))
        return false;

    if(!emailRegex.test(emailVerify))
        return false;

    if(passwordMatch !== passwordVerify)
        return false;

    return true;
}
