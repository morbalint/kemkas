import React from "react";
import {Faj, FajDescription, FajLabel, FajSpecials} from "../domain-models/faj";
import {UseFormRegisterReturn} from "react-hook-form";

function FajSelector(props: { register: () => UseFormRegisterReturn, currentFaj: () => Faj }) {
    const {register, currentFaj} = props
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Faj</label>
            <select className='col form-select' defaultValue={Faj.Ember} {...register()}>
                <option key={Faj.Ember} value={Faj.Ember}>{FajLabel(Faj.Ember)}</option>
                <optgroup label='más emberi népek'>
                    <option key={Faj.Amazon} value={Faj.Amazon}>{FajLabel(Faj.Amazon)}</option>
                    <option key={Faj.Birodalmi} value={Faj.Birodalmi}>{FajLabel(Faj.Birodalmi)}</option>
                    <option key={Faj.Eszaki} value={Faj.Eszaki}>{FajLabel(Faj.Eszaki)}</option>
                    <option key={Faj.Etuniai} value={Faj.Etuniai}>{FajLabel(Faj.Etuniai)}</option>
                    <option key={Faj.Osember} value={Faj.Osember}>{FajLabel(Faj.Osember)}</option>
                </optgroup>
                <optgroup label='nem emberi fajok'>
                    <option key={Faj.Elf} value={Faj.Elf}>{FajLabel(Faj.Elf)}</option>
                    <option key={Faj.Felelf} value={Faj.Felelf}>{FajLabel(Faj.Felelf)}</option>
                    <option key={Faj.Felork} value={Faj.Felork}>{FajLabel(Faj.Felork)}</option>
                    <option key={Faj.Felszerzet}
                            value={Faj.Felszerzet}>{FajLabel(Faj.Felszerzet)}</option>
                    <option key={Faj.Gnom} value={Faj.Gnom}>{FajLabel(Faj.Gnom)}</option>
                    <option key={Faj.Torpe} value={Faj.Torpe}>{FajLabel(Faj.Torpe)}</option>
                </optgroup>
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 form-label'></label>
            <div className='col'>
                <p className='row pt-2'>
                    {FajDescription(currentFaj())}
                </p>
                <ul>
                    {FajSpecials(currentFaj()).map(((special, i) => (<li key={currentFaj() + i}>{special}</li>)))}
                </ul>
            </div>
        </div>
    </>
}

export default FajSelector