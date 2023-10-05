import React from "react";

function HarcosFegyverSpecializacio(props: {specialization: string, existingSpecializations: string[], changeSpecialization: (specialization: string) => void }) {
    const {specialization, existingSpecializations, changeSpecialization} = props
    const hasError = existingSpecializations.filter(x => x === specialization).length > 1
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label' >Fegyver specializáció</label>
            <input className='col form-control'
                   value={specialization}
                   onChange={(e) => changeSpecialization(e.target.value)}/>
            {hasError && <span className='form-field-error'>Már választottad ezt a specializaciót!</span>}
        </div>
    </>
}

export default HarcosFegyverSpecializacio