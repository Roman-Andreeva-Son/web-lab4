import { useState } from "react";
import { AuthorizationForm } from "./AuthorizationForm";
import { RegistrationForm } from "./RegistrationForm";
import './css/StartPage.css'

export const StartPage = () => {
    const [auth, setAuth] = useState(true);

    if(auth){
        return(
            <>
                <header className="renessans-header" >
                    <h1>Mishchenko R. A.</h1>
                    <p>626482</p>
                    <p>P3217</p>
                </header>
                <AuthorizationForm key="auth"/>
                <div className="change-authenticate-container">
                    <p className="start-p">Нет аккаунта?</p>
                    <a onClick={()=>setAuth(false)} className="start-a">Регистрация</a>
                </div>
            </>
        )
    }else{
        return(
            <>
                <header className="renessans-header" >
                    <h1>Mishchenko R. A.</h1>
                    <p>626482</p>
                    <p>P3217</p>
                </header>
                <RegistrationForm key="regist"/>
                <div className="change-authenticate-container">
                    <p className="start-p">Уже есть аккаунт?</p>
                    <a onClick={()=>setAuth(true)} className="start-a">Войти</a>
                </div>
            </>
        )
    }
}