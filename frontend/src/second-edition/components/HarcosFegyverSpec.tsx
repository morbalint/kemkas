import React from "react";
import {GetFegyver} from "../domain-models/felszereles";
import FegyverSelector from "./FegyverSelector";
import {AllowedFegyver} from "../domain-models/allowed-fegyver";
import {Osztaly2E} from "../domain-models/osztaly2E";

function HarcosFegyverSpecializacio(props: {
    specialization: string,
    existingSpecializations: (string | undefined)[],
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
    const availableFegyverek = AllowedFegyver(Osztaly2E.Harcos)
    const pickableFegyverek = availableFegyverek.filter(f => f.Id === specialization || existingSpecializations.filter(x => x === f.Id).length < (szint < 9 ? 1 : 2))

    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label' >Fegyver specializáció</label>
            <FegyverSelector
                fegyverek={pickableFegyverek}
                selectedId={specialization}
                onChange={changeSpecialization}
                dataTestId={"harcos-specialization-" + szint}
            />
            {fegyver == null && <span className='form-field-error'>Ismeretlen fegyver: {specialization}</span>}
        </div>
    </>
}

export default HarcosFegyverSpecializacio
