import React from "react";
import {Kepzettseg} from "../domain-models/kepzettsegek";
import {TulajdonsagLabel} from "../domain-models/tulajdonsag";
import {UseFormRegisterReturn} from "react-hook-form";

function kepzettsegOptionText(k: Kepzettseg) {
    return k.Name + ' (' + k.Tulajdonsag.reduce((acc, k) => (acc === '' ? acc : acc + ' / ') + TulajdonsagLabel(k), '') + ')';
}

function KepzettsegSelector (props: {kepzettsegek: Kepzettseg[], fieldRegistration: UseFormRegisterReturn, selected : Kepzettseg}) {

    const { kepzettsegek, fieldRegistration, selected } = props

    return <>
        <div className='row'>
            <select className='form-control'
                    defaultValue={selected.Id} {...fieldRegistration}>
                {kepzettsegek.map(k =>(
                    <option key={k.Id} value={k.Id}>
                        {kepzettsegOptionText(k)}
                    </option>
                ))}
            </select>
        </div>
        <div className='row pt-2'>
            <p className='col'>{selected.Description}</p>
        </div>
    </>
}

export default KepzettsegSelector