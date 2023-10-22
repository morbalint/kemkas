import React from "react";
import fegyverek from "../domain-models/fegyver.json"
import {defaultFegyverID, GetFegyver} from "../domain-models/felszereles";

function HarcosFegyverSpecializacio(props: {
    specialization: string,
    existingSpecializations: string[],
    changeSpecialization: (specialization: string) => void
    szint: number
}) {
    const {
        specialization,
        existingSpecializations,
        changeSpecialization,
        szint
    } = props
    const fegyver = GetFegyver(specialization)
    const hasError = existingSpecializations.filter(x => x === specialization).length > (szint < 9 ? 1 : 2)
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label' >Fegyver specializáció</label>
            <select className='col form-select' value={fegyver?.ID || defaultFegyverID} onChange={e => changeSpecialization(e.target.value)}>
                <optgroup label="Közelharci">
                    {fegyverek.data.filter(f => f.Type === 'kozelharci').map(f => <option key={f.ID} value={f.ID}>{f.Name}</option>)}
                </optgroup>
                <optgroup label="Távolsági">
                    {fegyverek.data.filter(f => f.Type === 'lofegyver').map(f => <option key={f.ID} value={f.ID}>{f.Name}</option>)}
                </optgroup>
            </select>
            {fegyver == null && <span className='form-field-error'>Ismeretlen fegyver: {specialization}</span>}
            {hasError && <span className='form-field-error'>Már {szint < 9 ? '' : 'kétszer is'} választottad ezt a fegyvert!</span>}
        </div>
    </>
}

export default HarcosFegyverSpecializacio
