import React from "react";
import {
    KarakterTulajdonsagok,
    Modifier,
    Tulajdonsag2E,
    TulajdonsagIDs,
    TulajdonsagLabel
} from "../domain-models/tulajdonsag2E";
import {SignedNumberToText} from "../../shared/components/Helpers";

function TulajdonsagNoveles(props: {
    tulajdonsagok: KarakterTulajdonsagok,
    tulajdonsagNoveles: Tulajdonsag2E,
    changeTulajdonsagNoveles: (tulajdonsag: Tulajdonsag2E) => void,
    dataTestId?: string
}) {
    const {tulajdonsagok, tulajdonsagNoveles, changeTulajdonsagNoveles, dataTestId} = props
    const selectableTulajdonsagok = TulajdonsagIDs.filter(t => t === tulajdonsagNoveles || tulajdonsagok[t] < 18)
    return <>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Tulajdonság növelés{' '}</label>
                    <div className='col'>
                        <select
                            className='form-select'
                            value={tulajdonsagNoveles}
                            onChange={(e) => changeTulajdonsagNoveles(e.target.value as Tulajdonsag2E)}
                            data-testid={dataTestId}
                        >
                            {selectableTulajdonsagok.map(t => (
                                <option value={t} key={t}>{TulajdonsagLabel(t)}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Új {TulajdonsagLabel(tulajdonsagNoveles)}{' '}</label>
                    <span className='col col-form-label'>{tulajdonsagok[tulajdonsagNoveles]} ({SignedNumberToText(Modifier(tulajdonsagok[tulajdonsagNoveles]))})</span>
                </div>
            </div>
        </div>
    </>
}

export default TulajdonsagNoveles