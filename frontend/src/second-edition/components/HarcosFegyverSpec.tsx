import React from "react";
import {GetFegyver} from "../domain-models/felszereles";
import FegyverSelector from "../display-components/FegyverSelector";
import {AllowedFegyver} from "../domain-models/allowed-fegyver";
import {Osztaly2E} from "../domain-models/osztaly2E";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {characterSelector, setHarcosSpecialization} from "../domain-models/characterSlice";

function HarcosFegyverSpecializacio(props: {
    szint: number
}) {
    const {
        szint
    } = props

    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const character = useSelector.withTypes<RootState>()(characterSelector)
    const specialization = character.szintlepesek[szint-1].harcosFegyver || 'kard_hosszu'
    const existingSpecializations = character.szintlepesek.filter(x => x.harcosFegyver != null).map(x => x.harcosFegyver! as string)
    const changeSpecialization = (specialization: string) => dispatch(setHarcosSpecialization({szint, fegyver: specialization}))

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
