import React from 'react';
import './CreateCharacter.css'
import {useForm} from "react-hook-form";
import {Faj, FajDescription, FajLabel, FajSpecials} from "../domain-models/faj";
import {RollAllAbilities, Tulajdonsag, TulajdonsagModositokFajokra} from "../domain-models/tulajdonsag";
import {
    Osztaly,
    OsztalyDescription,
    OsztalyLabel,
    OsztalyProperties,
    OsztalySpecialSkills
} from "../domain-models/osztaly"
import TulajdonsagInput from "../components/TulajdonsagInput";

const tulajdonsagDefaultOptions = {
    required: true,
    min: 3,
    max: 18,
};

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
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2 col-form-label'>Faj</label>
                            <select className='col form-select' defaultValue={Faj.Ember} {...register('faj', {required: true})}>
                                <option key={Faj.Ember} value={Faj.Ember}>{FajLabel(Faj.Ember)}</option>
                                <optgroup label='más emberi népek'>
                                    <option key={Faj.Amazon} value={Faj.Amazon}>{FajLabel(Faj.Amazon)}</option>
                                    <option key={Faj.Birodalmi} value={Faj.Birodalmi}>{FajLabel(Faj.Birodalmi)}</option>
                                    <option key={Faj.Eszaki} value={Faj.Eszaki}>{FajLabel(Faj.Eszaki)}</option>
                                    <option key={Faj.Etuniai} value={Faj.Etuniai}>{FajLabel(Faj.Etuniai)}</option>
                                    <option key={Faj.Osember} value={Faj.Osember}>{FajLabel(Faj.Osember)}</option>
                                </optgroup>
                                <optgroup label='nem emberi fajok'>
                                    <option key={Faj.Elf} value={Faj.Elf}>{FajLabel(Faj.Elf)}</option>
                                    <option key={Faj.Felelf} value={Faj.Felelf}>{FajLabel(Faj.Felelf)}</option>
                                    <option key={Faj.Felork} value={Faj.Felork}>{FajLabel(Faj.Felork)}</option>
                                    <option key={Faj.Felszerzet}
                                            value={Faj.Felszerzet}>{FajLabel(Faj.Felszerzet)}</option>
                                    <option key={Faj.Gnom} value={Faj.Gnom}>{FajLabel(Faj.Gnom)}</option>
                                    <option key={Faj.Torpe} value={Faj.Torpe}>{FajLabel(Faj.Torpe)}</option>
                                </optgroup>
                            </select>
                    </div>
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
                    <div className='row'>
                        <h5 className='col-lg-2 col-sm-4 align-self-center'>Tulajdonságok</h5>
                        <div className='col-sm-2 m-2'>
                            <button className='btn btn-dark' type='button'
                                    onClick={() => RollAllAbilities(setValue)}>Dobás
                            </button>
                        </div>
                    </div>
                    <TulajdonsagInput
                        tulajdonsag='Erő'
                        getCurrentValue={() => Number(watch(Tulajdonsag.Ero, 10))}
                        currentFaj={currentFaj}
                        fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Ero)}
                        register={() => register(Tulajdonsag.Ero, tulajdonsagDefaultOptions)}
                    />
                    <TulajdonsagInput
                        tulajdonsag='Ügyesség'
                        getCurrentValue={() => Number(watch(Tulajdonsag.Ugyesseg, 10))}
                        currentFaj={currentFaj}
                        fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Ugyesseg)}
                        register={() => register(Tulajdonsag.Ugyesseg, tulajdonsagDefaultOptions)}
                    />
                    <TulajdonsagInput
                        tulajdonsag='Egészség'
                        getCurrentValue={() => Number(watch(Tulajdonsag.Egeszseg, 10))}
                        currentFaj={currentFaj}
                        fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Egeszseg)}
                        register={() => register(Tulajdonsag.Egeszseg, tulajdonsagDefaultOptions)}
                    />
                    <TulajdonsagInput
                        tulajdonsag='Intelligencia'
                        getCurrentValue={() => Number(watch(Tulajdonsag.Intelligencia, 10))}
                        currentFaj={currentFaj}
                        fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Intelligencia)}
                        register={() => register(Tulajdonsag.Intelligencia, tulajdonsagDefaultOptions)}
                    />
                    <TulajdonsagInput
                        tulajdonsag='Bölcsesség'
                        getCurrentValue={() => Number(watch(Tulajdonsag.Bolcsesseg, 10))}
                        currentFaj={currentFaj}
                        fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Bolcsesseg)}
                        register={() => register(Tulajdonsag.Bolcsesseg, tulajdonsagDefaultOptions)}
                    />
                    <TulajdonsagInput
                        tulajdonsag='Karizma'
                        getCurrentValue={() => Number(watch(Tulajdonsag.Karizma, 10))}
                        currentFaj={currentFaj}
                        fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Karizma)}
                        register={() => register(Tulajdonsag.Karizma, tulajdonsagDefaultOptions)}
                    />
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
