import React from "react";

import {Faj, FajLabel} from "../domain-models/faj";
import {Modifier} from "../domain-models/tulajdonsag";

export function SignedNumberToText(val: number) : string {
    return val > 0 ? '+'+val : val.toString()
}

function fajiModositoText(faj: Faj, szamolas: (f: Faj) => number) : string {
    const mod = szamolas(faj)
    return (mod !== 0) ? SignedNumberToText(mod) + ' (' + FajLabel(faj) + ')' : ''
}

function TulajdonsagInput(props: {
    tulajdonsag: string,
    currentFaj : () => Faj,
    fajiModosito: (faj: Faj) => number,
    register: () => any,
    getCurrentValue: () => number
}) {
    const {tulajdonsag, register, currentFaj, getCurrentValue, fajiModosito} = props;
    return (<div className='row m-2'>
        <label className='col-lg-1 col-sm-2 col-form-label'>{tulajdonsag}</label>
        <div className='col-md-1 col-sm-2 m-2'>
            <input className='form-control' defaultValue={10} type='number' {...register()} />
        </div>
        <span className='col-sm-2 m-2'>
                            {fajiModositoText(currentFaj(), fajiModosito)}
                        </span>
        <span className='col-sm-2 m-2'>
                            Összesen: { (getCurrentValue() + (fajiModosito(currentFaj()))).toString() }
                        </span>
        <span className='col-sm-2 m-2'>
                            Módosító: { SignedNumberToText(Modifier(getCurrentValue() + fajiModosito(currentFaj()))) }
                        </span>
        {getCurrentValue() < 3 && (
            <span className='form-field-error'>Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!</span>)}
        {getCurrentValue() > 18 && (
            <span className='form-field-error'>Szét szakadtak az izmaid!</span>)}
    </div>)
}

export default TulajdonsagInput;