import React from "react";
import {Kepzettseg, KepzettsegLista} from "../domain-models/kepzettsegek";
import {TulajdonsagLabel} from "../domain-models/tulajdonsag";
import {Osztaly} from "../domain-models/osztaly";
import {UseFormRegisterReturn} from "react-hook-form";

function kepzettsegOptionText(k: Kepzettseg) {
    return k.Name + ' (' + k.Tulajdonsag.reduce((acc, k) => (acc === '' ? acc : acc + ' / ') + TulajdonsagLabel(k), '') + ')';
}

function KepzettsegSelector (props: {osztaly: Osztaly, fieldRegistration: UseFormRegisterReturn, selected : Kepzettseg}) {

    const { osztaly, fieldRegistration, selected } = props

    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label' >Képzettségek</label>
            <div className='col'>
            <select className='form-control'
                    defaultValue={selected.Id} {...fieldRegistration}>
                {KepzettsegLista.filter(k => k.Osztalyok == null || k.Osztalyok.includes(osztaly)).map(k =>(
                    <option key={k.Id} value={k.Id} className='text-body-emphasis'>
                        {kepzettsegOptionText(k)}
                    </option>
                ))}
            </select>
            </div>
        </div>
        <div className='row m-2 pt-2'>
            <label className='col-md-2 col-sm-3 col-form-label' />
            <p className='col'>{selected.Description}</p>
        </div>
    </>
}

export default KepzettsegSelector