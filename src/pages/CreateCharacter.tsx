import React from 'react';
import './CreateCharacter.css'
import {useForm} from "react-hook-form";
import {Faj, FajDescription, FajLabel, FajSpecials, Osztaly, OsztalyLabel} from "../domain-models/enums";

function getRandomInt(max: number) {
    return Math.ceil(Math.random() * max);
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

function rollAllAbilities(setValue: (ability: string, value: number) => void) {
    setValue('ero', rollAbility())
    setValue('ugy', rollAbility())
    setValue('egs', rollAbility())
    setValue('int', rollAbility())
    setValue('bol', rollAbility())
    setValue('kar', rollAbility())
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

    return (
        <div className='row'>
            <div className='container-fluid p-5 bg-black text-white text-center'>
                <h1>Karakter létrehozása</h1>
            </div>
            <div className='p-3'>
                <form onSubmit={handleSubmit(sendForm)} className='col-12'>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Név</label>
                        <input className='col'
                               defaultValue='Névtelen Kalandozó' {...register('nev', {required: true})} />
                        {errors.nev && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Faj</label>
                        <div className='col-sm-10'>
                            <select className='row' {...register('faj', {required: true})}>
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
                            <p className='row pt-2'>
                                {FajDescription(currentFaj())}
                            </p>
                            <ul>
                                {FajSpecials(currentFaj()).map(((special) => (<li>{special}</li>)))}
                            </ul>
                        </div>
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Osztály</label>
                        <select className='col' {...register('osztaly', {required: true})}>
                            <optgroup label='Harcos'>
                                <option key={Osztaly.Harcos}
                                        value={Osztaly.Harcos}>{OsztalyLabel(Osztaly.Harcos)}</option>
                                <option key={Osztaly.Amazon}
                                        value={Osztaly.Amazon}>{OsztalyLabel(Osztaly.Amazon)}</option>
                                <option key={Osztaly.Barbar}
                                        value={Osztaly.Barbar}>{OsztalyLabel(Osztaly.Barbar)}</option>
                                <option key={Osztaly.Ijjasz}
                                        value={Osztaly.Ijjasz}>{OsztalyLabel(Osztaly.Ijjasz)}</option>
                                <option key={Osztaly.Kaloz} value={Osztaly.Kaloz}>{OsztalyLabel(Osztaly.Kaloz)}</option>
                            </optgroup>
                            <option key={Osztaly.Pap} value={Osztaly.Pap}>{OsztalyLabel(Osztaly.Pap)}</option>
                            {currentFaj() !== Faj.Amazon && (<option key={Osztaly.Tolvaj}
                                                                     value={Osztaly.Tolvaj}>{OsztalyLabel(Osztaly.Tolvaj)}</option>)}
                            {![Faj.Osember, Faj.Amazon].includes(currentFaj()) && (
                                <optgroup label='Varázsló'>
                                    <option key={Osztaly.Varazslo}
                                            value={Osztaly.Varazslo}>{OsztalyLabel(Osztaly.Varazslo)}</option>
                                    <option key={Osztaly.Illuzionista}
                                            value={Osztaly.Illuzionista}>{OsztalyLabel(Osztaly.Illuzionista)}</option>
                                </optgroup>
                            )}
                        </select>
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
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Erő</label>
                        <input className='col-sm-1 m-2' type='number' {...register('ero', {
                            required: true,
                            min: 3,
                            max: 18,
                        })} />
                        {errors.ero && Number(watch('ero')) < 3 && (
                            <span className='form-field-error'>Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!</span>)}
                        {errors.ero && Number(watch('ero')) > 18 && (
                            <span className='form-field-error'>Szét szakadtak az izmaid!</span>)}
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Ügyesség</label>
                        <input className='col-sm-1 m-2' type='number' {...register('ugy', {
                            required: true,
                            min: 3,
                            max: 18,
                        })} />
                        {errors.ugy && Number(watch('ugy')) < 3 && (
                            <span className='form-field-error'>Orrabuktál jelentkezés helyett!</span>)}
                        {errors.ugy && Number(watch('ugy')) > 18 && (
                            <span className='form-field-error'>Emberfeletti zsonglörködésedre záptojással válaszoltak a helyiek!</span>)}
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Egészség</label>
                        <input className='col-sm-1 m-2' type='number' {...register('egs', {
                            required: true,
                            min: 3,
                            max: 18
                        })} />
                        {errors.egs && Number(watch('egs')) < 3 && (
                            <span className='form-field-error'>Túl beteg vagy ahhoz, hogy kalandozni menj!</span>)}
                        {errors.egs && Number(watch('egs')) > 18 && (
                            <span className='form-field-error'>Kicsattanó egészségedet csak a diambroid állíthatja meg, minő véletlen, hogy pont az arcodba robbant...</span>)}
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Intelligencia</label>
                        <input className='col-sm-1 m-2' type='number' {...register('int', {
                            required: true,
                            min: 3,
                            max: 18
                        })} />
                        {errors.int && Number(watch('int')) < 3 && (
                                <span className='form-field-error'>Elfelejtetted, hogy mikor is kéne kalandozni indulni!</span>)}
                        {errors.int && Number(watch('int')) > 18 && (
                            <span className='form-field-error'>Ilyen tudás és logika birtokában mi szükséged van új információkra? Mindent le tudsz vezetni a már meglévő ismereteidből, és ezt azonnal beláttad.</span>)}
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Bölcsesség</label>
                        <input className='col-sm-1 m-2' type='number' {...register('bol', {
                            required: true,
                            min: 3,
                            max: 18
                        })} />
                        {errors.bol && Number(watch('bol')) < 3 && (
                            <span className='form-field-error'>Nem bírtál ellenállni a kíváncsiságodnak, hogy közelebbről is megvizsgáld a tőr hegyét, nagyon közelről...</span>)}
                        {errors.bol && Number(watch('bol')) > 18 && (
                            <span className='form-field-error'>Hatalmas bölcsességedben beláttad a kalandozás veszélyeit és inkább más tevékenységbe fogtál.</span>)}
                    </div>
                    <div className='row m-2'>
                        <label className='col-lg-1 col-sm-2'>Karizma</label>
                        <input className='col-sm-1 m-2' type='number' {...register('kar', {
                            required: true,
                            min: 3,
                            max: 18,
                        })} />
                        {errors.kar && Number(watch('kar')) < 3 && (
                            <span className='form-field-error'>Mintha taszítanád az embereket, sose sikerült kalandozó csapatot találnod.</span>)}
                        {errors.kar && Number(watch('kar')) > 18 && (
                            <span className='form-field-error'>Az ellenkező nem tagjai nem engedték, hogy útnak indulj.</span>)}
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
