import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import './css/Form.css'

export const AuthorizationForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const params = new URLSearchParams();
        params.append('name', name);
        params.append('password', password);

        try{
            const resp = await fetch("http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/login",{
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            })

            console.log(resp.status);

            if(resp.ok){ 
                navigate('/main');
                return;
            }
            if(resp.status == 403){
                setErr("Введено неправильное имя пользователя или пароль!");
                event.target.elements.password.className = 'warning-input';
                return;
            }

            setErr("Smth went wrong!\nstatus: " + resp.status);
            return;
        }catch(err){
            setErr("Smth went wrong!");
        }
    }

    return(
        <Card title="Авторизация" className="renaissance-form-container">
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="username">Имя пользователя</label>
                    <InputText 
                        id="username" 
                        name="username" 
                        value={name} 
                        onChange={(e) => {setName(e.target.value); setErr('')}} 
                        required 
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Пароль</label>
                    <Password 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => {setPassword(e.target.value); setErr('')}} 
                        toggleMask 
                        required 
                    />
                </div>
                <Button label="Войти" type="submit" />
            </form>
        </Card>
    )
}
