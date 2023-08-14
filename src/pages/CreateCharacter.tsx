import React from 'react';
import './CreateCharacter.css'
import {useForm} from "react-hook-form";
import {Faj} from "../domain-models/faj";
import {Osztaly} from "../domain-models/osztaly"
import FajSelector from "../components/FajSelector";
import Tulajdonsagok from "../components/Tulajdonsagok";
import OsztalySelector from "../components/OsztalySelector";
import KarakterKepzettsegek from "../components/KarakterKepzettsegek";
import {Tulajdonsag} from "../domain-models/tulajdonsag";
import MasodlagosErtekek from "../components/MasodlagosErtekek";

const FAJ_FIELD_NAME = 'faj'
const OSZTALY_FIELD_NAME = 'osztaly'

function CreateCharacterPage() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors}
    } = useForm()
    const sendForm = (data: any) => console.log(data)

    const currentFaj = () => watch(FAJ_FIELD_NAME, Faj.Ember)

    const currentOsztaly = () => watch(OSZTALY_FIELD_NAME, Osztaly.Harcos)

    return (
        <div>
            <div className='container-fluid p-5 bg-black text-white text-center'>
                <h1>Karakter létrehozása</h1>
            </div>
            <div className='p-3'>
                <form onSubmit={handleSubmit(sendForm)}>
                    <div className='row'>
                        <h5 className='col align-self-center'>Származás</h5>
                    </div>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label' >Név</label>
                        <input className='col form-control'
                               defaultValue='Névtelen Kalandozó' {...register('nev', {required: true})} />
                        {errors.nev && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                    </div>
                    <FajSelector
                        register={() => register(FAJ_FIELD_NAME, {required: true})}
                        currentFaj={currentFaj}
                    />
                    <hr/>
                    <Tulajdonsagok
                        currentFaj={currentFaj}
                        watch={watch}
                        setValue={setValue}
                        register={register}
                    />
                    <hr />
                    <div className='row'>
                        <h5 className='col align-self-center'>Tanult</h5>
                    </div>
                    <OsztalySelector
                        currentFaj={currentFaj}
                        currentOsztaly={currentOsztaly}
                        register={() => register(OSZTALY_FIELD_NAME, {required: true})}
                    />
                    <KarakterKepzettsegek
                        faj={currentFaj()}
                        osztaly={currentOsztaly()}
                        t_int={watch(Tulajdonsag.Intelligencia, 10)}
                        register={(fieldName: string) => register(fieldName, {required: true})}
                        watch={watch}
                    />

                    <hr />
                    <MasodlagosErtekek osztaly={currentOsztaly()} tulajdonsagok={() => watch('tul', {})} />

                    <div className='d-grid gap-2 m-5'>
                        <button className='btn btn-danger btn-lg' type='submit'>Létrehozás</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
