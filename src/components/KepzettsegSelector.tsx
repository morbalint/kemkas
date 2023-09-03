import React from "react";
import {Kepzettseg} from "../domain-models/kepzettsegek";
import {TulajdonsagLabel} from "../domain-models/tulajdonsag";
import {UseFormRegisterReturn} from "react-hook-form";
import {OsztalyLabel} from "../domain-models/osztaly";

function kepzettsegOptionText(k: Kepzettseg) {
    const osztalyok = k.Osztalyok?.reduce((acc, o) => acc + ' / ' + OsztalyLabel(o), '')?.substring(3)
    return k.Name + ' (' + k.Tulajdonsag.reduce((acc, k) => (acc === '' ? acc : acc + ' / ') + TulajdonsagLabel(k), '') + ')' + (osztalyok == null ? '' : (' - ' + osztalyok));
}

function KepzettsegSelector (props: {kepzettsegek: Kepzettseg[], fieldRegistration: UseFormRegisterReturn, selected : Kepzettseg}) {

    const { kepzettsegek, fieldRegistration, selected } = props

    return <>
        <div className='row'>
            <select className='form-control'
                    value={selected.Id} {...fieldRegistration}>
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