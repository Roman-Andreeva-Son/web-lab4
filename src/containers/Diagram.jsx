import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appendPoint, setPage } from "./mainSlice";
import { useNavigate } from "react-router-dom";

export const Diagram = forwardRef((props, ref)=>{
    const canvasRef = useRef(null);
    let r = parseFloat(useSelector((state) => state.main.r));
    let page = useSelector((state) => state.main.page)
    let t_body = useSelector((state) => state.main.points).slice((page-1)*10, page*10);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function makeDiagram(canvas){
        canvas.strokeStyle = "#3b2d2c";
        canvas.beginPath();
        canvas.clearRect(0,0,400,400);

        canvas.moveTo(0,200);
        canvas.lineTo(400,200);

        canvas.moveTo(200,0);
        canvas.lineTo(200,400);

        canvas.moveTo(195,10);
        canvas.lineTo(200,0);
        canvas.lineTo(205,10);
        canvas.lineTo(195,10);

        canvas.moveTo(390,195);
        canvas.lineTo(400,200);
        canvas.lineTo(390,205);
        canvas.lineTo(390,195);
    
        canvas.font="16px Fantasy";
    
        canvas.fillText("y",207,10);
        canvas.fillText("x",393,212);
    
        canvas.closePath();
        canvas.fillStyle = "#3b2d2c";
        canvas.stroke();
        canvas.fill();
    }

    const drawDots = (canvas)=>{
            if(t_body.length>0) {
                console.log('Рисую точки...');
                for (let i = 0; i < t_body.length; i++) {
                    let xInTable = t_body[i].x;
                    let yInTable = t_body[i].y;
        
                    let xCoordinate = 200 + (xInTable/5)*160;
                    let yCoordinate = 200 + ((-1)*(yInTable/5)*160);
        
                    canvas.beginPath();
                    canvas.arc(xCoordinate, yCoordinate, 5, 0, Math.PI * 2);
                    canvas.closePath();
                    if(t_body[i].result === "попал") {
                        canvas.fillStyle = "green";
                        canvas.fill();
                    }else {
                        canvas.fillStyle = "red";
                        canvas.fill();
                    }
                }
            }
    }

    const fillDiagram = (canvas, r)=>{
        if(r === null || Number.isNaN(r))
            return;
        const localR = r/5
            
        canvas.beginPath();
        canvas.clearRect(0,0,400,400);
        makeDiagram(canvas);
        drawDots(canvas);
        canvas.closePath();

        canvas.beginPath();
        canvas.fillStyle = "#f5deb3";
        canvas.strokeStyle = "#f5deb3";
        
        canvas.moveTo(200+160*localR,197);
        canvas.lineTo(200+160*localR,203);
        canvas.moveTo(200+80*localR,197);
        canvas.lineTo(200+80*localR,203);
        canvas.moveTo(200-160*localR,197);
        canvas.lineTo(200-160*localR,203);
        canvas.moveTo(200-80*localR,197);
        canvas.lineTo(200-80*localR,203);
    
            //отметки на вертикальной линии
        canvas.moveTo(197,200-160*localR);
        canvas.lineTo(203,200-160*localR);
        canvas.moveTo(197,200-80*localR);
        canvas.lineTo(203,200-80*localR);
        canvas.moveTo(197,200+80*localR);
        canvas.lineTo(203,200+80*localR);
        canvas.moveTo(197,200+160*localR);
        canvas.lineTo(203,200+160*localR);
    

        canvas.font="{16*r}px Fantasy";
    
        canvas.fillText("R",200+160*localR-3,193);
        canvas.strokeText("R/2",200+80*localR-3,193);
        canvas.strokeText("-R/2",200-80*localR-3,193);
        canvas.strokeText("-R",200-160*localR-3,193)
    
        canvas.strokeText("R",207,200-160*localR-3);
        canvas.strokeText("R/2",207,200-80*localR-3);
        canvas.strokeText("-R/2",207,200+80*localR-3);
        canvas.strokeText("-R",207,200+160*localR-3);
        canvas.stroke();
    
        canvas.rect(120+80*(1-localR),40+160*(1-localR),localR*80,localR*160);
            //треугольник в 4-й четверти
        canvas.moveTo(201,199-160*localR); //самая верхняя точка
        canvas.lineTo(200+80*localR,201); //самая правая точка
        canvas.lineTo(201,201); //
        canvas.lineTo(201,199-160*localR); //закрываемся в верхней точке
        console.log(`r: `+localR);
    
        canvas.moveTo(199,199);
        canvas.arc(199,199,160*localR,Math.PI/2,Math.PI,false);
        canvas.lineTo(199,199);
    
        canvas.closePath();
        canvas.fillStyle = "rgba(255, 215, 0, 0.4)";
    
        canvas.fill();
        
    }

    async function sendPointCoordinates(x, y, canvas){
        if(r==null || Number.isNaN(r))
            return;
        let params = new URLSearchParams();
        params.append('x',x);
        params.append('y',y);
        params.append('r',r);

        const resp = await fetch('http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/points',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        })
        console.log(`Отправляю запрос...`)

        if(resp.ok){
            const resp2 = await fetch("http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/points",{
                method: "GET",
                credentials: 'include',
            })
            console.log('Получаю новые точки...')

            const points = await resp2.json();
            dispatch(appendPoint(points));

            if(points.length%10==1)
                dispatch(setPage(page+1));

            if(page < Math.ceil(points.length/10))
                dispatch(setPage(Math.ceil(points.length/10)))
        }
        if(resp.status == 403){
            navigate('/')
        }
    }

    const mouseDownHandler = (evt) => {
        const canvas = evt.target;
        const rect = canvas.getBoundingClientRect();
        let zeroedX = rect.left + 200;
        let zeroedY = rect.top + 200;

        let x = Math.round(((evt.clientX - zeroedX) / 160) * 5 * 1000) / 1000;
        let y = Math.round(((-(evt.clientY - zeroedY)) / 160) * 5 * 1000) / 1000;
        console.log(`x: ${x}, y: ${y}`)
        sendPointCoordinates(x,y,canvas);
    }

    useEffect(() => {
        let canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        makeDiagram(ctx);
    }, [])

    useEffect(() => {
        let canvas = canvasRef.current;
        fillDiagram(canvas.getContext('2d'), r);
    }, [page, t_body])

    useImperativeHandle(ref, ()=>({
        fillCanvas: (r)=>{
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            fillDiagram(ctx, r);
        }
    }));

    return(
        <canvas ref={canvasRef} width={400} height={400} onMouseDown={mouseDownHandler}></canvas>
    )
})
