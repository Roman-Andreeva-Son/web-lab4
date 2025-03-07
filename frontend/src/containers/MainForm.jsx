import { useRef, useState } from "react";
import { setR, appendPoint, setPage } from "./mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Card} from 'primereact/card'
import {Checkbox} from 'primereact/checkbox'
import {Slider} from 'primereact/slider'
import './css/MainForm.css'
import { Button } from "primereact/button";

export const MainForm = (props) => {
    const [x, setX] = useState([]);
    // const [r, setR] = useState([]);
    const [y, setY] = useState(0);
    const [localR, setLocalR] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = useSelector((state) => state.main.page);

    const handleSubmit = async (event)=>{
        event.preventDefault();

        let rValid = true;
        for(let rVal of localR){
            if(rVal < 0){
                rValid = false;
                break;
            }
        }

        if(!rValid){
            setError('Радиус должен быть неотрицательным')
            event.target.elements.r.className = 'warning-input';
            return;
        }

        let params = new URLSearchParams();
        params.append('x',x.join(','));
        params.append('y', y);
        params.append('r',localR);

        console.log(params.get(x));

        const resp = await fetch('http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/points', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        })

        if(resp.ok){
            const resp2 = await fetch("http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/points",{
            method: "GET",
            credentials: 'include',
            })

            const points = await resp2.json();
            dispatch(appendPoint(points));

            if(points.length%10==1)
            dispatch(setPage(page+1));
        }
        if(resp.status==403){
            navigate('/')
            return;
        }
    }
    const handleSetRBtn = (e) => {
        setError(null);
        console.log(localR);
        if(localR.length == 0){
            setError('Выберите значение r')
            return;
        }
        if(localR.length > 1){
            setError('Для отрисовки нужно задать ровно 1 значение r');
            return;
        }
        if(localR[0] < 0){
            setError('Радиус должен быть неотрицательным')
            return;
        }

        console.log(typeof localR[0])
        dispatch(setR(localR[0]));
        props.diagram.current.fillCanvas(localR[0]);
    }

    const handleAddX = (e) => {
        let selectedX = [...x]
        if(e.checked)
            selectedX.push(e.value);
        else
            selectedX.splice(selectedX.indexOf(e.value), 1);

        setX(selectedX);
    }

    const handleAddR = (e) => {
        let selectedR = [...localR]
        if(e.checked)
            selectedR.push(e.value);
        else
            selectedR.splice(selectedR.indexOf(e.value), 1);

        setLocalR(selectedR);
    }

    return(
        <Card className="prime-main-form">
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="x">Координата X</label>
                    <div id="x" className="x-options-container">
                        <div className="x-option">
                            <label htmlFor="cb1" className="p-checkbox-label">-3</label>
                            <Checkbox inputId="cb1" value={-3} onChange={handleAddX} checked={x.includes(-3)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb2" className="p-checkbox-label">-2</label>
                            <Checkbox inputId="cb2" value={-2} onChange={handleAddX} checked={x.includes(-2)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb3" className="p-checkbox-label">-1</label>
                            <Checkbox inputId="cb3" value={-1} onChange={handleAddX} checked={x.includes(-1)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb4" className="p-checkbox-label">0</label>
                            <Checkbox inputId="cb4" value={0} onChange={handleAddX} checked={x.includes(0)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb5" className="p-checkbox-label">1</label>
                            <Checkbox inputId="cb5" value={1} onChange={handleAddX} checked={x.includes(1)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb6" className="p-checkbox-label">2</label>
                            <Checkbox inputId="cb6" value={2} onChange={handleAddX} checked={x.includes(2)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb7" className="p-checkbox-label">3</label>
                            <Checkbox inputId="cb7" value={3} onChange={handleAddX} checked={x.includes(3)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb8" className="p-checkbox-label">4</label>
                            <Checkbox inputId="cb8" value={4} onChange={handleAddX} checked={x.includes(4)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb9" className="p-checkbox-label">5</label>
                            <Checkbox inputId="cb9" value={5} onChange={handleAddX} checked={x.includes(5)}/>
                        </div>
                    </div>
                </div>

                <div className="p-field">
                    <label htmlFor="y">Координата Y</label>
                    <p>{y}</p>
                    <Slider id="y" value={y} min={-3} max={5} step={0.01} onChange={(e) =>  setY(e.value)}/>
                </div>

                <div className="p-field">
                    <label htmlFor="r">Радиус R</label>
                    <div id="r" className="x-options-container">
                        <div className="x-option">
                            <label htmlFor="cb1" className="p-checkbox-label">-3</label>
                            <Checkbox inputId="cb1" value={-3} onChange={handleAddR} checked={localR.includes(-3)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb2" className="p-checkbox-label">-2</label>
                            <Checkbox inputId="cb2" value={-2} onChange={handleAddR} checked={localR.includes(-2)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb3" className="p-checkbox-label">-1</label>
                            <Checkbox inputId="cb3" value={-1} onChange={handleAddR} checked={localR.includes(-1)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb4" className="p-checkbox-label">0</label>
                            <Checkbox inputId="cb4" value={0} onChange={handleAddR} checked={localR.includes(0)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb5" className="p-checkbox-label">1</label>
                            <Checkbox inputId="cb5" value={1} onChange={handleAddR} checked={localR.includes(1)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb6" className="p-checkbox-label">2</label>
                            <Checkbox inputId="cb6" value={2} onChange={handleAddR} checked={localR.includes(2)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb7" className="p-checkbox-label">3</label>
                            <Checkbox inputId="cb7" value={3} onChange={handleAddR} checked={localR.includes(3)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb8" className="p-checkbox-label">4</label>
                            <Checkbox inputId="cb8" value={4} onChange={handleAddR} checked={localR.includes(4)}/>
                        </div>

                        <div className="x-option">
                            <label htmlFor="cb9" className="p-checkbox-label">5</label>
                            <Checkbox inputId="cb9" value={5} onChange={handleAddR} checked={localR.includes(5)}/>
                        </div>
                        <div className="x-option">
                            <Button className="draw-button" type="button" onClick={handleSetRBtn}>Нарисовать</Button>
                        </div>
                    </div>
                </div>
                <div className="p-field">
                    <p className="r-error-message">{error}</p>
                </div>
                <div className="p-field">
                    <Button type="submit" id="submit-btn-main">Отправить</Button>
                </div>
            </form>
        </Card>
    )
}