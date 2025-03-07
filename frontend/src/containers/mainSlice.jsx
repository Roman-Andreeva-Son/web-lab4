import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    r: null,
    points: [],
    page: 1
}

//почитать про слайсы, зачем их ввели
export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setR: (state, action)=>{
            state.r = action.payload;
        },
        appendPoint: (state, action)=>{
            state.points = action.payload;
        },
        setPage: (state, action)=>{
            state.page = action.payload;
        }
    }
})

export const {setR, appendPoint, setPage} = mainSlice.actions;