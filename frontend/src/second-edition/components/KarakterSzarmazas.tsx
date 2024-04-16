import React from "react";
import {characterSelector, setIsten, setNev} from "../domain-models/characterSlice";
import JellemSelector from "./JellemSelector";
import FajSelector2E from "./FajSelector2E";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";

function KarakterSzarmazas(props: {

}) {
    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Név</label>
            <input className='col form-control'
                   value={karakter.nev}
                   data-testid="nev"
                   onChange={(e) => dispatch(setNev(e.target.value))}/>
            {!karakter.nev &&
                <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
        </div>
        <JellemSelector/>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Választott istenség</label>
            <input className='col form-control'
                   value={karakter.isten}
                   data-testid="isten"
                   onChange={(e) => dispatch(setIsten(e.target.value))}/>
        </div>
        <FajSelector2E/>
    </>
}

export default KarakterSzarmazas;