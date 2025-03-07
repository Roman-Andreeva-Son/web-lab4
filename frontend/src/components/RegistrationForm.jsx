import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';

export const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password !== repPassword){
            setErr("Введите одинаковый пароль!")
            return;
        }else
            setErr(null);

        const params = new URLSearchParams();
        params.append('name', name);
        params.append('password', password);

        try{
            const resp = await fetch("http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/register",{
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            })

            setName('');
            setPassword('');
            setRepPassword('');
            if(resp.ok){
                navigate('/main')
                return;
            }
            if(resp.status == 409){
                setErr("Такое имя уже существует, выберите другое!");
                return;
            }


            
            setErr("Smth went wrong!\nstatus: " + resp.status);
            return;
        }catch(err){
            setErr("Smth went wrong!");
        }
    }

    return(
        <Card title="Регистрация" className="renaissance-form-container">
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
        <div className="p-field">
          <label htmlFor="password">Пароль</label>
          <Password
            id="password"
            name="password"
            value={repPassword}
            onChange={(e)=> {setRepPassword(e.target.value); setErr('')}}
            toggleMask
            required
          />
        </div>
        <div className="p-field">
          <p>{err}</p>
        </div>
        <Button label="Зарегистрироваться" type="submit" />
      </form>
    </Card>)
}
