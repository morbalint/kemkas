import React, {ReactNode} from 'react';
import './CreateCharacter.css'
import {useForm} from "react-hook-form";
import {Osztaly, OsztalyLabel} from "../domain-models/enums";
import {randomInt} from "crypto";

function CreateCharacterPage() {
    const { register, handleSubmit, setValue, formState : { errors} } =  useForm()
    const sendForm = (data: any) => console.log(data)

    return (
        <div className='row'>
            <div className='container-fluid p-5 bg-black text-white text-center'>
                <h1>Karakter létrehozása</h1>
            </div>
            <div className='p-3'>
            <form onSubmit={handleSubmit(sendForm)} className='col-12'>
                <div className='row p-3'>
                    <label className='col-sm-4'>Név</label>
                    <input className='col-sm-4' {...register('nev', {required: true})} />
                    {errors.nev && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                </div>
                <div className='row p-3'>
                    <label className='col-sm-4'>Osztály</label>
                    <select className='col-sm-4' {...register('osztaly', {required: true})}>
                        {Object.values(Osztaly).map((oszt) : ReactNode =>
                            (<option key={oszt} value={oszt}>{OsztalyLabel(oszt)}</option>)
                        )}
                    </select>
                </div>
                <hr />
                <p>Tulajdonságok</p>
                <div className='row p-3'>
                    <label className='col-sm-4'>Erő</label>
                    <input className='col-sm-4' {...register('ero', {required: true, min: 1, max: 20, pattern: /[0-9]{1,2}/})} />
                    {errors.ero && (<span className='form-field-error'>Az erődnek 0 és 20 között kell lennie</span>)}
                    <button className='btn btn-secondary, col-sm-4' type='button' onClick={() => setValue('ero', randomInt(1,6))}>Dobás</button>
                </div>

                <div>
                    <button type='submit'>Létrehozás</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
