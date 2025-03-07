import { useNavigate } from "react-router-dom";
import { setR } from "./mainSlice";
import { useDispatch } from "react-redux";
import './css/MainHeader.css'

export const MainHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async(event)=>{
        const resp = await fetch("http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/logout",{
            method: "GET",
            credentials: 'include',
        })
        if(resp.ok){
            navigate('/');
            dispatch(setR(null));
            return;
        }
    }

    return (
        <header className="main-header">
            <a onClick={handleLogout} className="logout-a">Выйти</a>
        </header>
    )
}
