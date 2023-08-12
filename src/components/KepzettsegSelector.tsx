import React from "react";
import {Kepzettseg} from "../domain-models/kepzettsegek";
import {TulajdonsagLabel} from "../domain-models/tulajdonsag";
import {UseFormRegisterReturn} from "react-hook-form";
import {OsztalyLabel} from "../domain-models/osztaly";

function kepzettsegOptionText(k: Kepzettseg) {
    const osztalyok = k.Osztalyok?.reduce((acc, o) => acc + ' / ' + OsztalyLabel(o), '')?.substring(3)
    return k.Name + ' (' + k.Tulajdonsag.reduce((acc, k) => (acc === '' ? acc : acc + ' / ') + TulajdonsagLabel(k), '') + ')' + (osztalyok == null ? '' : (' - ' + osztalyok));
}

// this is required for render optimization, which happens because selected is not a prop of this component so selecting an item doesn't trigger a rendering of this select field.
function KepzettsegSelect(props: {kepzettsegek: Kepzettseg[], fieldRegistration: UseFormRegisterReturn, defaultValue: Kepzettseg}) {
    const { kepzettsegek, fieldRegistration, defaultValue} = props
    return <div className='row'>
        <select className='form-control'
                defaultValue={defaultValue.Id} {...fieldRegistration}>
            {kepzettsegek.map(k =>(
                <option key={k.Id} value={k.Id}>
                    {kepzettsegOptionText(k)}
                </option>
            ))}
        </select>
    </div>

}

function KepzettsegSelector (props: {kepzettsegek: Kepzettseg[], fieldRegistration: UseFormRegisterReturn, defaultValue: Kepzettseg, selected : Kepzettseg}) {

    const { kepzettsegek, fieldRegistration, defaultValue, selected } = props

    return <>
        <KepzettsegSelect kepzettsegek={kepzettsegek} fieldRegistration={fieldRegistration} defaultValue={defaultValue} />
        <div className='row pt-2'>
            <p className='col'>{selected.Description}</p>
        </div>
    </>
}

export default KepzettsegSelector