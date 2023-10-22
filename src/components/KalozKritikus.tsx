import React from "react";
import {Osztaly, OsztalyAllowedFegyver} from "../domain-models/osztaly";

function KalozKritikus(props: {
    kritFegyverId: string,
    existingKrits: string[],
    changeKrit: (krit: string) => void,
    szint: number
}) {
    const {
        kritFegyverId,
        existingKrits,
        changeKrit,
        szint
    } = props
    const hasError = existingKrits.filter(x => x === kritFegyverId).length > (szint < 9 ? 1 : 2)
    const fegyverek = OsztalyAllowedFegyver(Osztaly.Kaloz)
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Kritikus</label>
            <select className='col form-select' value={kritFegyverId} onChange={e => changeKrit(e.target.value)}>
            <optgroup label="Közelharci">
                {fegyverek.filter(f => f.Type === 'kozelharci').map(f => <option key={f.Id} value={f.Id}>{f.Name}</option>)}
            </optgroup>
            <optgroup label="Távolsági">
                {fegyverek.filter(f => f.Type === 'lofegyver').map(f => <option key={f.Id} value={f.Id}>{f.Name}</option>)}
            </optgroup>
        </select>
            {hasError && <span className='form-field-error'>Már {szint < 9 ? '' : 'kétszer is'} választottad ezt a fegyvert!</span>}
        </div>
    </>
}

export default KalozKritikus