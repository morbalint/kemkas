import React, {ReactNode} from 'react';
import './CreateCharacter.css'
import {useForm} from "react-hook-form";
import {Faj, FajDescription, FajLabel, FajSpecials, Tulajdonsag} from "../domain-models/faj";
import {Osztaly, OsztalyDescription, OsztalyLabel, OsztalyProperties} from "../domain-models/osztaly"

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max) + 1;
}

function rollAbility() {
    let min = 6;
    let sum = 0;
    let rolls: number[] = []
    for (let i = 0; i < 4; i++) {
        const roll = getRandomInt(6);
        if (roll < min) {
            min = roll;
        }
        sum += roll;
        rolls = [...rolls, roll]
    }
    const result = sum - min;
    console.log("Rolled: " + rolls + " got: " + result)
    return result;
}

const modifier = (val : number) => Math.floor(val / 3) - 3

const fajiEroModosito = (faj: Faj) => [Faj.Felork, Faj.Osember, Faj.Eszaki].includes(faj) ? +1 : [Faj.Gnom, Faj.Felszerzet].includes(faj) ? -1 : 0

const fajiUgyModosito = (faj: Faj) => [Faj.Elf, Faj.Felszerzet].includes(faj) ? +1 : 0

const fajiEgsModosito = (faj: Faj) => [Faj.Etuniai, Faj.Osember, Faj.Felork, Faj.Torpe].includes(faj) ? +1 :
    [Faj.Birodalmi, Faj.Elf].includes(faj) ? -1 : 0

const fajiIntModosito = (faj: Faj) => [Faj.Gnom, Faj.Birodalmi].includes(faj) ? +1 :
    [Faj.Osember].includes(faj) ? -1 : 0

const fajiBolModosito = (faj: Faj) => [Faj.Osember, Faj.Eszaki, Faj.Etuniai].includes(faj) ? -1 : 0

const fajiKarModosito = (faj: Faj) => [Faj.Torpe].includes(faj) ? -1 :
    [Faj.Felork].includes(faj) ? -2 : 0

function signedNumberToText(val: number) : string {
    return val > 0 ? '+'+val : val.toString()
}

function fajiModositoText(faj: Faj, szamolas: (f: Faj) => number) : string {
    const mod = szamolas(faj)
    return (mod !== 0) ? signedNumberToText(mod) + ' (' + FajLabel(faj) + ')' : ''
}

function rollAllAbilities(setValue: (ability: string, value: number) => void) {
    setValue(Tulajdonsag.Ero, rollAbility())
    setValue(Tulajdonsag.Ugyesseg, rollAbility())
    setValue(Tulajdonsag.Egeszseg, rollAbility())
    setValue(Tulajdonsag.Intelligencia, rollAbility())
    setValue(Tulajdonsag.Bolcsesseg, rollAbility())
    setValue(Tulajdonsag.Karizma, rollAbility())
}

const tulajdonsagDefaultOptions = {
    required: true,
    min: 3,
    max: 18,
};

function displayAbilityInput(tulajdonsag: string, currentFaj : () => Faj, fajiModosito: (faj: Faj) => number, register: () => any, getCurrentValue: () => number) : ReactNode {
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
                            Módosító: { signedNumberToText(modifier(getCurrentValue() + fajiModosito(currentFaj()))) }
                        </span>
        {getCurrentValue() < 3 && (
            <span className='form-field-error'>Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!</span>)}
        {getCurrentValue() > 18 && (
            <span className='form-field-error'>Szét szakadtak az izmaid!</span>)}
    </div>)
}

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
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2 col-form-label' >Név</label>
                        <input className='col form-control'
                               defaultValue='Névtelen Kalandozó' {...register('nev', {required: true})} />
                        {errors.nev && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2 col-form-label'>Faj</label>
                            <select className='col form-select' {...register('faj', {required: true})}>
                                <option key={Faj.Ember} selected={true} value={Faj.Ember}>{FajLabel(Faj.Ember)}</option>
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
                                {FajSpecials(currentFaj()).map(((special) => (<li>{special}</li>)))}
                            </ul>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <h5 className='col-lg-2 col-sm-4 text-center align-self-center'>Tulajdonságok</h5>
                        <div className='col-sm-2 m-2'>
                            <button className='btn btn-dark' type='button'
                                    onClick={() => rollAllAbilities(setValue)}>Dobás
                            </button>
                        </div>
                    </div>
                    {displayAbilityInput(
                        'Erő',
                        currentFaj,
                        fajiEroModosito,
                        () => register(Tulajdonsag.Ero, tulajdonsagDefaultOptions),
                        () => Number(watch(Tulajdonsag.Ero, 10))
                    )}
                    {displayAbilityInput(
                        'Ügyesség',
                        currentFaj,
                        fajiUgyModosito,
                        () => register(Tulajdonsag.Ugyesseg, tulajdonsagDefaultOptions),
                        () => Number(watch(Tulajdonsag.Ugyesseg, 10))
                    )}
                    {displayAbilityInput(
                        'Egészség',
                        currentFaj,
                        fajiEgsModosito,
                        () => register(Tulajdonsag.Egeszseg, tulajdonsagDefaultOptions),
                        () => Number(watch(Tulajdonsag.Egeszseg, 10))
                    )}
                    {displayAbilityInput(
                        'Intelligencia',
                        currentFaj,
                        fajiIntModosito,
                        () => register(Tulajdonsag.Intelligencia, tulajdonsagDefaultOptions),
                        () => Number(watch(Tulajdonsag.Intelligencia, 10))
                    )}
                    {displayAbilityInput(
                        'Bölcsesség',
                        currentFaj,
                        fajiBolModosito,
                        () => register(Tulajdonsag.Bolcsesseg, tulajdonsagDefaultOptions),
                        () => Number(watch(Tulajdonsag.Bolcsesseg, 10))
                    )}
                    {displayAbilityInput(
                        'Karizma',
                        currentFaj,
                        fajiKarModosito,
                        () => register(Tulajdonsag.Karizma, tulajdonsagDefaultOptions),
                        () => Number(watch(Tulajdonsag.Karizma, 10))
                    )}
                    <hr />
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2 col-form-label'>Osztály</label>
                        <select className="col form-select" defaultValue={Osztaly.Harcos} {...register('osztaly', {required: true})}>
                            <optgroup label='Harcos'>
                                <option key={Osztaly.Harcos} selected={true} value={Osztaly.Harcos}>{OsztalyLabel(Osztaly.Harcos)}</option>
                                {currentFaj() === Faj.Amazon && (
                                    <option key={Osztaly.Amazon}  value={Osztaly.Amazon}>{OsztalyLabel(Osztaly.Amazon)}</option>) }
                                <option key={Osztaly.Barbar} value={Osztaly.Barbar}>{OsztalyLabel(Osztaly.Barbar)}</option>
                                <option key={Osztaly.Ijjasz} value={Osztaly.Ijjasz}>{OsztalyLabel(Osztaly.Ijjasz)}</option>
                                <option key={Osztaly.Kaloz} value={Osztaly.Kaloz}>{OsztalyLabel(Osztaly.Kaloz)}</option>
                            </optgroup>
                            <option key={Osztaly.Pap} value={Osztaly.Pap}>{OsztalyLabel(Osztaly.Pap)}</option>
                            {currentFaj() !== Faj.Amazon && (<option key={Osztaly.Tolvaj}
                                                                     value={Osztaly.Tolvaj}>{OsztalyLabel(Osztaly.Tolvaj)}</option>)}
                            {![Faj.Osember, Faj.Amazon].includes(currentFaj()) && (
                                <optgroup label='Varázsló'>
                                    <option key={Osztaly.Varazslo} value={Osztaly.Varazslo}>{OsztalyLabel(Osztaly.Varazslo)}</option>
                                    <option key={Osztaly.Illuzionista} value={Osztaly.Illuzionista}>{OsztalyLabel(Osztaly.Illuzionista)}</option>
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
                                {OsztalyProperties(currentOsztaly()).map(((special) => (<li>{special}</li>)))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <button className='btn btn-danger' type='submit'>Létrehozás</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
