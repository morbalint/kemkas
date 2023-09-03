import React, {useState} from 'react';
import './CreateCharacter.css'
import {Faj} from "../domain-models/faj";
import {Osztaly} from "../domain-models/osztaly"
import FajSelector from "../components/FajSelector";
import Tulajdonsagok from "../components/Tulajdonsagok";
import OsztalySelector from "../components/OsztalySelector";
import KarakterKepzettsegek from "../components/KarakterKepzettsegek";
import {KarakterTulajdonsagok} from "../domain-models/tulajdonsag";
import MasodlagosErtekek from "../components/MasodlagosErtekek";
import {KepzettsegId} from "../domain-models/kepzettsegek";

const tulajdonsagDefaults: KarakterTulajdonsagok = {
    t_ero: 10,
    t_ugy: 10,
    t_egs: 10,
    t_int: 10,
    t_bol: 10,
    t_kar: 10,
}

function CreateCharacterPage() {

    let [name, changeName] = useState<string>("Névtelen kanadozó")
    let [faj, changeFaj] = useState(Faj.Ember)
    let [tulajdonsagok, changeTulajdonsagok] = useState(tulajdonsagDefaults)
    let [currentOsztaly, changeOsztaly] = useState<Osztaly>(Osztaly.Harcos)
    let [kepzettsegek, changeKepzettsegek] = useState<KepzettsegId[]>([])

    return (
        <div>
            <div className='container-fluid p-5 bg-black text-white text-center'>
                <h1>Karakter létrehozása</h1>
            </div>
            <div className='p-3'>
                <form>
                    <div className='row'>
                        <h5 className='col align-self-center'>Származás</h5>
                    </div>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label' >Név</label>
                        <input className='col form-control'
                               value={name}
                               onChange={(e) => changeName(e.target.value)}/>
                        {!name && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                    </div>
                    <FajSelector
                        changeFaj={changeFaj}
                        faj={faj}
                    />
                    <hr/>
                    <Tulajdonsagok
                        currentFaj={faj}
                        tulajdonsagok={tulajdonsagok}
                        changeTulajdonsagok={changeTulajdonsagok}
                    />
                    <hr />
                    <div className='row'>
                        <h5 className='col align-self-center'>Tanult</h5>
                    </div>
                    <OsztalySelector
                        currentFaj={faj}
                        currentOsztaly={currentOsztaly}
                        changeOsztaly={changeOsztaly}
                    />
                    <KarakterKepzettsegek
                        faj={faj}
                        osztaly={currentOsztaly}
                        t_int={tulajdonsagok.t_int}
                        kepzettsegek={kepzettsegek}
                        changeKepzettsegek={changeKepzettsegek}
                    />

                    <hr />
                    <MasodlagosErtekek osztaly={currentOsztaly} tulajdonsagok={tulajdonsagok} />

                    <div className='d-grid gap-2 m-5'>
                        <button className='btn btn-danger btn-lg' type='submit'>Létrehozás</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
