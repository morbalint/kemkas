import React from "react";
import {Osztaly} from "../domain-models/osztaly";
import {AllowedFegyver} from "../domain-models/allowed-fegyver";

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
    const fegyverek = AllowedFegyver(Osztaly.Kaloz, []).filter(f => f.Id === kritFegyverId || existingKrits.filter(x => x === f.Id).length < (szint < 9 ? 1 : 2))

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
        </div>
    </>
}

export default KalozKritikus