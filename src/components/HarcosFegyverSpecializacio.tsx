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
    const pickableFegyverek = fegyverek.data.filter(f => f.Id === specialization || existingSpecializations.filter(x => x === f.Id).length < (szint < 9 ? 1 : 2))
    const kozelharciPickable = pickableFegyverek.filter(f => f.Type === 'kozelharci')
    const tavolsagiPickable = pickableFegyverek.filter(f => f.Type === 'lofegyver')

    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label' >Fegyver specializáció</label>
            <select className='col form-select' value={fegyver?.Id || defaultFegyverID} onChange={e => changeSpecialization(e.target.value)}>
                <optgroup label="Közelharci">
                    {kozelharciPickable.map(f => <option key={`spec-${szint}-${f.Id}`} value={f.Id}>{f.Name}</option>)}
                </optgroup>
                <optgroup label="Távolsági">
                    {tavolsagiPickable.map(f => <option key={`spec-${szint}-${f.Id}`} value={f.Id}>{f.Name}</option>)}
                </optgroup>
            </select>
            {fegyver == null && <span className='form-field-error'>Ismeretlen fegyver: {specialization}</span>}
        </div>
    </>
}

export default HarcosFegyverSpecializacio
