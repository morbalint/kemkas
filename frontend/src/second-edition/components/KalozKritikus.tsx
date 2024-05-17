import React from "react";
import {Osztaly2E} from "../domain-models/osztaly2E";
import {AllowedFegyver} from "../domain-models/allowed-fegyver";
import FegyverSelector from "../display-components/FegyverSelector";

function KalozKritikus(props: {
    kritFegyverId: string,
    existingKrits: (string | undefined)[],
    changeKrit: (krit: string) => void,
    szint: number
}) {
    const {
        kritFegyverId,
        existingKrits,
        changeKrit,
        szint
    } = props
    const fegyverek = AllowedFegyver(Osztaly2E.Tengeresz).filter(f => f.Id === kritFegyverId || existingKrits.filter(x => x === f.Id).length < (szint < 9 ? 1 : 2))

    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Kritikus</label>
            <FegyverSelector
                fegyverek={fegyverek}
                selectedId={kritFegyverId}
                onChange={changeKrit}
                dataTestId={`kaloz-krit-${szint}`}
            />
        </div>
    </>
}

export default KalozKritikus