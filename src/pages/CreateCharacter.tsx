import React from 'react';
import './CreateCharacter.css'
import {useForm} from "react-hook-form";
import {Faj, FajDescription, FajLabel, FajSpecials} from "../domain-models/faj";
import {
    Osztaly,
    OsztalyDescription,
    OsztalyLabel,
    OsztalyProperties,
    OsztalySpecialSkills
} from "../domain-models/osztaly"
import FajSelector from "../components/FajSelector";
import Tulajdonsagok from "../components/Tulajdonsagok";

function CreateCharacterPage() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors}
    } = useForm()
    const sendForm = (data: any) => console.log(data)

    const currentFaj = () => watch().faj || Faj.Ember

    const currentOsztaly = () => watch().osztaly || Osztaly.Harcos

    return (
        <div className='row'>
            <div className='container-fluid p-5 bg-black text-white text-center'>
                <h1>Karakter létrehozása</h1>
            </div>
            <div className='p-3'>
                <form onSubmit={handleSubmit(sendForm)} className='col-12'>
                    <div className='row'>
                        <h5 className='col-lg-2 col-sm-4 align-self-center'>Származás</h5>
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2 col-form-label' >Név</label>
                        <input className='col form-control'
                               defaultValue='Névtelen Kalandozó' {...register('nev', {required: true})} />
                        {errors.nev && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                    </div>
                    <FajSelector register={() => register('faj', {required: true})} />
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2 form-label'></label>
                        <div className='col'>
                            <p className='row pt-2'>
                                {FajDescription(currentFaj())}
                            </p>
                            <ul>
                                {FajSpecials(currentFaj()).map(((special, i) => (<li key={currentFaj()+i}>{special}</li>)))}
                            </ul>
                        </div>
                    </div>
                    <hr/>
                    <Tulajdonsagok currentFaj={currentFaj} watch={watch} setValue={setValue} register={register} />
                    <hr />
                    <div className='row'>
                        <h5 className='col-lg-2 col-sm-4 align-self-center'>Tanult</h5>
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2 col-form-label'>Osztály</label>
                        <select className="col form-select" defaultValue={Osztaly.Harcos} {...register('osztaly', {required: true})}>
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

                    <div className='d-grid gap-2'>
                        <button className='btn btn-danger btn-lg' type='submit'>Létrehozás</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
