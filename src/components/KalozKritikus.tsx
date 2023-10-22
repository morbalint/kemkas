import React from "react";
import fegyverek from "../domain-models/fegyver.json"

function KalozKritikus(props: {
    krit: string,
    existingKrits: string[],
    changeKrit: (krit: string) => void,
    szint: number
}) {
    const {
        krit,
        existingKrits,
        changeKrit,
        szint
    } = props
    const hasError = existingKrits.filter(x => x === krit).length > (szint < 9 ? 1 : 2)
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Kritikus</label>
            <select className='col form-select' value={krit} onChange={e => changeKrit(e.target.value)}>
            <optgroup label="Közelharci">
                {fegyverek.data.filter(f => f.Type === 'kozelharci').map(f => <option key={f.ID} value={f.ID}>{f.Name}</option>)}
            </optgroup>
            <optgroup label="Távolsági">
                {fegyverek.data.filter(f => f.Type === 'lofegyver').map(f => <option key={f.ID} value={f.ID}>{f.Name}</option>)}
            </optgroup>
        </select>
            {hasError && <span className='form-field-error'>Már {szint < 9 ? '' : 'kétszer is'} választottad ezt a fegyvert!</span>}
        </div>
    </>
}

export default KalozKritikus