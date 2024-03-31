import {createSlice} from "@reduxjs/toolkit";
import {RollAllAbilities, TulajdonsagDefaults} from "./tulajdonsag2E";

export const tulajdonsagSlice = createSlice({
    name: "tulajdonsag2E",
    initialState: TulajdonsagDefaults,
    reducers: {
        rollAbilities: (state) => {
            state = RollAllAbilities()
            return state;
        },
        setEro: (state, action: {payload: number}) => {
            state.t_ero = action.payload;
        },
        setUgyesseg: (state, action: {payload: number}) => {
            state.t_ugy = action.payload;
        },
        setEgeszseg: (state, action: {payload: number}) => {
            state.t_egs = action.payload;
        },
        setIntelligencia: (state, action: {payload: number}) => {
            state.t_int = action.payload;
        },
        setBolcsesseg: (state, action: {payload: number}) => {
            state.t_bol = action.payload;
        },
        setKarizma: (state, action: {payload: number}) => {
            state.t_kar = action.payload;
        },
    },
})

export const { rollAbilities, setEro, setUgyesseg, setEgeszseg, setIntelligencia, setBolcsesseg, setKarizma } = tulajdonsagSlice.actions

export const tulajdonsagSelector = tulajdonsagSlice.selectSlice;

export default tulajdonsagSlice.reducer