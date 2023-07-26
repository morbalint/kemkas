import React from "react";
import {
    Osztaly,
    OsztalyDescription,
    OsztalyLabel,
    OsztalyProperties,
    OsztalySpecialSkills
} from "../domain-models/osztaly";
import {Faj} from "../domain-models/faj";
import {UseFormRegisterReturn} from "react-hook-form";

function OsztalySelector(props: {currentFaj: () => Faj, currentOsztaly: () => Osztaly, register: () => UseFormRegisterReturn}) {
    const {currentFaj, currentOsztaly, register} = props;

    return <>
        <div className='row m-2'>
            <label className='col-lg-1 col-sm-2 col-form-label'>Osztály</label>
            <select className="col form-select" defaultValue={Osztaly.Harcos} {...register()}>
                <optgroup label='Harcos'>
                    <option value={Osztaly.Harcos}>{OsztalyLabel(Osztaly.Harcos)}</option>
                    {currentFaj() === Faj.Amazon && (
                        <option value={Osztaly.Amazon}>{OsztalyLabel(Osztaly.Amazon)}</option>) }
                    <option value={Osztaly.Barbar}>{OsztalyLabel(Osztaly.Barbar)}</option>
                    <option value={Osztaly.Ijasz}>{OsztalyLabel(Osztaly.Ijasz)}</option>
                    <option value={Osztaly.Kaloz}>{OsztalyLabel(Osztaly.Kaloz)}</option>
                </optgroup>
                <option value={Osztaly.Pap}>{OsztalyLabel(Osztaly.Pap)}</option>
                {currentFaj() !== Faj.Amazon && (<option value={Osztaly.Tolvaj}>{OsztalyLabel(Osztaly.Tolvaj)}</option>)}
                {![Faj.Osember, Faj.Amazon].includes(currentFaj()) && (
                    <optgroup label='Varázsló'>
                        <option value={Osztaly.Varazslo}>{OsztalyLabel(Osztaly.Varazslo)}</option>
                        <option value={Osztaly.Illuzionista}>{OsztalyLabel(Osztaly.Illuzionista)}</option>
                    </optgroup>
                )}
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-lg-1 col-sm-2 form-label'></label>
            <div className='col' >
                <p className='row pt-2'>
                    {OsztalyDescription(currentOsztaly())}
                </p>
                <ul>
                    {OsztalyProperties(currentOsztaly()).map(((special, i) => (<li key={currentOsztaly() + i}>{special}</li>)))}
                </ul>
                <p className='d-inline-flex gap-1'>
                    {OsztalySpecialSkills(currentOsztaly()).map(skill => (
                        <button
                            key={'btn' + skill.Id}
                            className='btn btn-outline-dark'
                            type='button'
                            data-bs-toggle="collapse"
                            data-bs-target={"#collapse-"+skill.Id}
                            aria-expanded="false"
                            aria-controls="collapseExample"
                        >
                            {skill.Name}
                        </button>
                    ))}
                </p>
                {OsztalySpecialSkills(currentOsztaly()).map(skill => (
                    <div key={'collapse'+skill.Id} className="collapse" id={'collapse-' + skill.Id}>
                        <div className="card card-body">
                            {skill.Description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default OsztalySelector;