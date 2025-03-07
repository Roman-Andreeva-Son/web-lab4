import { useSelector, useDispatch } from "react-redux";
import { setPage } from "./mainSlice";
import { useEffect } from "react";
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import './css/MainTable.css'

export const MainTable = (props) => {
    const points = useSelector((state) => state.main.points);
    const page = useSelector((state) => state.main.page);
    const r = useSelector((state) => state.main.r);
    const dispatch = useDispatch();


    useEffect(() => {
        props.diagram.current.fillCanvas(r);
    }, [page])
    return (
        <div className="table-component-container">
            <table className="result-table">
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Execution Time(ns)</th>
                    </tr>
                </thead>
                <tbody>
                    {points.slice((page-1)*10,page*10).map((point, index) => (
                        <tr key={index}>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                            <td>{point.r}</td>
                            <td>{point.result}</td>
                            <td>{point.executionTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-btn-container">
                <div className="first-pagination-container">
                    <button onClick={()=>{dispatch(setPage(1))}} className="pagination-btn">{'<<'}</button>
                    <button onClick={()=>{
                        if(page > 1){
                            dispatch(setPage(page-1));
                        }
                        }} className="pagination-btn">{'<'}</button>
                </div>

                <p>{page} of {Math.ceil(points.length/10)}</p>
                
                <div className="sec-pagination-container">
                    <button onClick={() => {
                        if(page < Math.ceil(points.length/10)){
                            dispatch(setPage(page+1));
                        }
                    }} className="pagination-btn">{'>'}</button>
                    <button onClick={()=>{dispatch(setPage(Math.ceil(points.length/10)))}} className="pagination-btn">{'>>'}</button>
                </div>
            </div>
        </div>
    )
}