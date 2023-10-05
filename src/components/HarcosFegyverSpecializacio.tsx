import React from "react";

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
    const hasError =  existingSpecializations.filter(x => x === specialization).length > (szint < 9 ? 1 : 2)
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label' >Fegyver specializáció</label>
            <input className='col form-control'
                   value={specialization}
                   onChange={(e) => changeSpecialization(e.target.value)}/>
            {hasError && <span className='form-field-error'>Már {szint < 9 ? '' : 'kétszer is'} választottad ezt a fegyvert!</span>}
        </div>
    </>
}

export default HarcosFegyverSpecializacio