import { useEffect, useState } from "react"
import { MainForm} from "../containers/MainForm";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { setR, appendPoint } from "../containers/mainSlice";
import { Diagram } from "../containers/Diagram";
import { MainTable } from "../containers/MainTable";
import { MainHeader } from "./MainHeader";

export const MainPage = () => {
    let points = useSelector((state) => state.main.points);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const diagramIns = useRef(null);
    const isMobile = window.matchMedia('(max-width: 818px)').matches;
    const isTab = window.matchMedia('(min-width: 818px) and (max-width: 1220px)').matches;
    const isDesktop = window.matchMedia('(min-width: 1220px)').matches;


    const fillPointsList = async(event)=>{
        const resp = await fetch("http://localhost:8080/laba4_backend-1.0-SNAPSHOT/api/points",{
            method: "GET",
            credentials: 'include',
        })
        if(resp.ok){
            points = await resp.json();
            dispatch(appendPoint(points)); //почитать про redux подробно
        }
        if(resp.status == 403){
            navigate("/");
        }
    }
    //почитать про хуки подробно
    useEffect(()=>{
        fillPointsList();
        dispatch(setR(null));
    }, [])

    if(isDesktop){
        return(
            <div className="main-page">
                <MainHeader />
                <div className="content-container">
                    <MainForm diagram={diagramIns} mobile={false}/>
                    <Diagram ref={diagramIns}/>
                    <MainTable diagram={diagramIns}/>
                </div>
            </div>
        )
    }
    if(isTab){
        return(
            <div className="main-page">
                <MainHeader />
                <div className="tab-content-container">
                    <div className="tab-top-container">
                        <MainForm diagram={diagramIns} mobile={false}/>
                        <Diagram ref={diagramIns}/>
                    </div>
                    <MainTable diagram={diagramIns}/>
                </div>
            </div>
        )
    }
    if(isMobile){
        return(
            <div className="main-page">
                <MainHeader />
                <div className="mobile-content-container">
                    <MainForm diagram={diagramIns} mobile={true}/>
                    <Diagram ref={diagramIns}/>
                    <MainTable diagram={diagramIns}/>
                </div>
            </div>
        )
    }
}