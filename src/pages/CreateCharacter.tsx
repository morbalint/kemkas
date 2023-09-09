import React, {useState} from 'react';
import './CreateCharacter.css'
import {Faj} from "../domain-models/faj";
import {Osztaly} from "../domain-models/osztaly"
import FajSelector from "../components/FajSelector";
import Tulajdonsagok from "../components/Tulajdonsagok";
import OsztalySelector from "../components/OsztalySelector";
import KarakterKepzettsegek from "../components/KarakterKepzettsegek";
import {KarakterTulajdonsagok, Modifier} from "../domain-models/tulajdonsag";
import MasodlagosErtekek from "../components/MasodlagosErtekek";
import {AvailableKezpettsegList, Kepzettsegek, KepzettsegId, TolvajKepzettsegList} from "../domain-models/kepzettsegek";
import {CalculateMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";
import {CreatePDF} from "../pdf/character.pdf";
import {KarakterClass} from "../domain-models/karakter";

const tulajdonsagDefaults: KarakterTulajdonsagok = {
    t_ero: 10,
    t_ugy: 10,
    t_egs: 10,
    t_int: 10,
    t_bol: 10,
    t_kar: 10,
}

function getNumberOfKepzettsegek(t_int: number, faj: Faj, max: number) {
    let numberOfKepzettseg = 3 + Modifier(t_int) + (faj === Faj.Ember ? 1 : 0)
    console.log('Raw Number of Kepzetsegek = ', numberOfKepzettseg)

    if (numberOfKepzettseg < 1) {
        numberOfKepzettseg = 1
    }
    if (numberOfKepzettseg > max) {
        numberOfKepzettseg = max
    }
    console.log('Adjusted Number of Kepzetsegek = ', numberOfKepzettseg)
    return numberOfKepzettseg;
}

function CreateCharacterPage() {

    let [name, changeName] = useState<string>("Névtelen kalandozó")
    let [faj, changeFaj] = useState(Faj.Ember)
    let [tulajdonsagok, changeTulajdonsagok] = useState(tulajdonsagDefaults)
    let [osztaly, changeOsztaly] = useState<Osztaly>(Osztaly.Harcos)
    let [kepzettsegek, changeKepzettsegek] = useState<KepzettsegId[]>([])
    let [tolvajKepzettsegek, changeTolvajKepzettsegek] = useState<KepzettsegId[]>([])

    const availableKepzettsegList = AvailableKezpettsegList(osztaly)

    if (osztaly !== Osztaly.Tolvaj && tolvajKepzettsegek.length > 0) {
        tolvajKepzettsegek = []
        changeTolvajKepzettsegek([])
    }
    if (osztaly === Osztaly.Tolvaj && tolvajKepzettsegek.length === 0) {
        tolvajKepzettsegek = TolvajKepzettsegList.slice(0, 4).map(x => x.Id)
        changeTolvajKepzettsegek(tolvajKepzettsegek)
    }

    const karakter = () => new KarakterClass(
        name,
        faj,
        osztaly,
        tulajdonsagok,
        kepzettsegek.map(k => Kepzettsegek[k]),
        osztaly === Osztaly.Tolvaj ? tolvajKepzettsegek.map(k => Kepzettsegek[k]) : []
    )

    return (
        <div>
            <div className='container-fluid p-5 bg-black text-white text-center'>
                <h1>Karakter létrehozása</h1>
            </div>
            <div className='p-3'>
                <form onSubmit={ async (event) => event.preventDefault() }>
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
                        currentOsztaly={osztaly}
                        changeOsztaly={changeOsztaly}
                    />
                    <KarakterKepzettsegek
                        availableKepzettsegList={availableKepzettsegList}
                        numberOfKepzettsegek={getNumberOfKepzettsegek(tulajdonsagok.t_int, faj, availableKepzettsegList.length)}
                        kepzettsegek={kepzettsegek}
                        changeKepzettsegek={changeKepzettsegek}
                        tolvajKepzettsegek={tolvajKepzettsegek}
                        changeTolvajKepzettsegek={changeTolvajKepzettsegek}
                    />

                    <hr />
                    <MasodlagosErtekek ertekek={CalculateMasodlagosErtekek(osztaly, tulajdonsagok)} />

                    <div className='d-grid gap-2 m-5'>
                        <button className='btn btn-danger btn-lg' type='button' onClick={async () =>  await CreatePDF(karakter())}>Létrehozás</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
