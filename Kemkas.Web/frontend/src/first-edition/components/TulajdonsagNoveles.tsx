import React from "react";
import {
    KarakterTulajdonsagok,
    Modifier,
    Tulajdonsag,
    TulajdonsagIDs,
    TulajdonsagLabel
} from "../domain-models/tulajdonsag";
import {SignedNumberToText} from "../../shared/components/Helpers";

function TulajdonsagNoveles(props: {tulajdonsagok: KarakterTulajdonsagok, szint: number, tulajdonsagNovelesek: Tulajdonsag[], changeTulajdonsagNoveles: (tulajdonsag: Tulajdonsag) => void}) {
    const {tulajdonsagok, szint, tulajdonsagNovelesek, changeTulajdonsagNoveles} = props
    const tulajdonsagNoveles = tulajdonsagNovelesek[(szint / 4)-1]
    return <>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Tulajdonság növelés{' '}</label>
                    <div className='col'>
                        <select className='form-select' value={tulajdonsagNoveles} onChange={(e) => changeTulajdonsagNoveles(e.target.value as Tulajdonsag)}>
                            {TulajdonsagIDs.filter(t => t === tulajdonsagNoveles || tulajdonsagok[t] < 18).map(t => (
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