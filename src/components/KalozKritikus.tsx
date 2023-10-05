import React from "react";

function KalozKritikus(props: {
    krit: string,
    existingKrits: string[],
    changeKrit: (specialization: string) => void,
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
            <input className='col form-control'
                   value={krit}
                   onChange={(e) => changeKrit(e.target.value)}/>
            {hasError && <span className='form-field-error'>Már {szint < 9 ? '' : 'kétszer is'} választottad ezt a fegyvert!</span>}
        </div>
    </>
}

export default KalozKritikus