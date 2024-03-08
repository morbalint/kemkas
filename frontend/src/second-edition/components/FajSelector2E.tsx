import React from "react";
import {Faj2E, FajDescription, FajLabel, FajSpecials} from "../domain-models/faj2E";

function FajSelector2E(props: { faj: Faj2E, changeFaj: (val: Faj2E) => void }) {
    const {faj, changeFaj} = props
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Faj</label>
            <select className='col form-select' value={faj} onChange={e => changeFaj(e.target.value as Faj2E)}>
                <option key={Faj2E.Ember} value={Faj2E.Ember}>{FajLabel(Faj2E.Ember)}</option>
                <optgroup label='más emberi népek'>
                    <option key={Faj2E.Amazon} value={Faj2E.Amazon}>{FajLabel(Faj2E.Amazon)}</option>
                    <option key={Faj2E.Birodalmi} value={Faj2E.Birodalmi}>{FajLabel(Faj2E.Birodalmi)}</option>
                    <option key={Faj2E.Eszaki} value={Faj2E.Eszaki}>{FajLabel(Faj2E.Eszaki)}</option>
                    <option key={Faj2E.Nomad} value={Faj2E.Nomad}>{FajLabel(Faj2E.Nomad)}</option>
                    <option key={Faj2E.Osember} value={Faj2E.Osember}>{FajLabel(Faj2E.Osember)}</option>
                </optgroup>
                <optgroup label='nem emberi fajok'>
                    <option key={Faj2E.Elf} value={Faj2E.Elf}>{FajLabel(Faj2E.Elf)}</option>
                    <option key={Faj2E.Felelf} value={Faj2E.Felelf}>{FajLabel(Faj2E.Felelf)}</option>
                    <option key={Faj2E.Felork} value={Faj2E.Felork}>{FajLabel(Faj2E.Felork)}</option>
                    <option key={Faj2E.Felszerzet}
                            value={Faj2E.Felszerzet}>{FajLabel(Faj2E.Felszerzet)}</option>
                    <option key={Faj2E.Gnom} value={Faj2E.Gnom}>{FajLabel(Faj2E.Gnom)}</option>
                    <option key={Faj2E.Torpe} value={Faj2E.Torpe}>{FajLabel(Faj2E.Torpe)}</option>
                </optgroup>
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 form-label'></label>
            <div className='col'>
                <p className='row pt-2'>
                    {FajDescription(faj)}
                </p>
                <ul>
                    {FajSpecials(faj).map(((special, i) => (<li key={faj + i}>{special}</li>)))}
                </ul>
            </div>
        </div>
    </>
}

export default FajSelector2E