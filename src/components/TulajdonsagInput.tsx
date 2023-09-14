import React from "react";

import {Faj, FajLabel} from "../domain-models/faj";
import {Modifier} from "../domain-models/tulajdonsag";
import {SignedNumberToText} from "./Helpers";


function fajiModositoText(faj: Faj, szamolas: (f: Faj) => number) : string {
    const mod = szamolas(faj)
    return (mod !== 0) ? SignedNumberToText(mod) + ' (' + FajLabel(faj) + ')' : ''
}

function TulajdonsagInput(props: {
    tulajdonsag: string,
    currentFaj : Faj,
    fajiModosito: (faj: Faj) => number,
    changeValue: (val: number) => void
    currentValue: number
    tooLowError: string,
    tooHighError: string
}) {
    const {
        tulajdonsag,
        changeValue,
        currentFaj,
        currentValue,
        fajiModosito,
        tooLowError,
        tooHighError,
    } = props;
    return (<div className='row m-2'>
        <label className='col-lg-1 col-sm-2 col-form-label'>{tulajdonsag}</label>
        <div className='col-lg-1 col-sm-2 m-2'>
            <input className='form-control' maxLength={2} type='number' value={currentValue} onChange={e => changeValue(Number(e.target.value))} />
        </div>
        <span className='col-sm-2 m-2'>
                            {fajiModositoText(currentFaj, fajiModosito)}
                        </span>
        <span className='col-sm-2 m-2'>
                            Összesen: { (currentValue + (fajiModosito(currentFaj))).toString() }
                        </span>
        <span className='col-sm-2 m-2'>
                            Módosító: { SignedNumberToText(Modifier(currentValue + fajiModosito(currentFaj))) }
                        </span>
        {currentValue < 3 && (
            <span className='form-field-error'>{tooLowError}</span>)}
        {currentValue > 18 && (
            <span className='form-field-error'>{tooHighError}</span>)}
    </div>)
}

export default TulajdonsagInput;