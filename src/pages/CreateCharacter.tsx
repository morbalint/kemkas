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
import {AvailableKezpettsegList, TolvajKepzettsegList} from "../domain-models/kepzettsegek";
import {CreatePDF} from "../pdf/character.pdf";
import {KarakterClass, KarakterInputs} from "../domain-models/karakter";
import Level2 from "../components/Level2";
import {getRandomInt} from "../domain-models/kockak";

const tulajdonsagDefaults: KarakterTulajdonsagok = {
    t_ero: 10,
    t_ugy: 10,
    t_egs: 10,
    t_int: 10,
    t_bol: 10,
    t_kar: 10,
}

const karakterDefaults: KarakterInputs = {
    name: "Névtelen Kalandozó",
    faj: Faj.Ember,
    kor: 20,
    tulajdonsagok: tulajdonsagDefaults,
    osztaly: Osztaly.Harcos,
    kepzettsegek: [],
    szint: 1,
    HProlls: [],
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

    let [karakter, changeKarakter] = useState(karakterDefaults)
    const karakterClass = new KarakterClass(karakter)

    const availableKepzettsegList = AvailableKezpettsegList(karakter.osztaly)

    if (karakter.osztaly !== Osztaly.Tolvaj && karakter.tolvajKepzettsegek != null) {
        changeKarakter({...karakter, tolvajKepzettsegek: undefined})
    }
    if (karakter.osztaly === Osztaly.Tolvaj && (karakter.tolvajKepzettsegek == null || karakter.tolvajKepzettsegek.length === 0)) {
        const tolvajKepzettsegek = TolvajKepzettsegList.slice(0, 4).map(x => x.Id)
        changeKarakter({...karakter, tolvajKepzettsegek: tolvajKepzettsegek})
    }

    function levelUp() {
        const dice = karakterClass.baseHP()
        const roll = getRandomInt(dice)
        console.log(`Level 2 HP roll on d${dice} is: ${roll}`)
        changeKarakter({...karakter, szint: karakter.szint + 1, HProlls: [...karakter.HProlls, roll]})
    }

    function levelDown() {
        changeKarakter({...karakter, szint: karakter.szint - 1, HProlls: karakter.HProlls.slice(0, -1)})
    }

    function chageLevel2HProll(newHProll: number) {
        changeKarakter({...karakter, HProlls: [newHProll, ...karakter.HProlls.slice(1)]})
        console.log(karakter)
    }

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
                               value={karakter.name}
                               onChange={(e) => changeKarakter({...karakter, name: e.target.value})}/>
                        {!karakter.name && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                    </div>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label' >Nem</label>
                        <input className='col form-control'
                               value={karakter.nem}
                               onChange={(e) => changeKarakter({...karakter, nem: e.target.value})}/>
                    </div>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label' >Kor</label>
                        <input className='col form-control'
                               value={karakter.kor}
                               type={"number"}
                               onChange={(e) => changeKarakter({...karakter, kor: Number(e.target.value)})}/>
                    </div>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label' >Választott istenség</label>
                        <input className='col form-control'
                               value={karakter.isten}
                               onChange={(e) => changeKarakter({...karakter, isten: e.target.value})}/>
                    </div>
                    <FajSelector
                        changeFaj={(faj: Faj) => changeKarakter({...karakter, faj: faj})}
                        faj={karakter.faj}
                    />
                    <hr/>
                    <Tulajdonsagok
                        currentFaj={karakter.faj}
                        tulajdonsagok={karakter.tulajdonsagok}
                        changeTulajdonsagok={(tul: KarakterTulajdonsagok) => changeKarakter({...karakter, tulajdonsagok: tul})}
                    />
                    <hr />
                    <div className='row'>
                        <h5 className='col align-self-center'>Tanult</h5>
                    </div>
                    <OsztalySelector
                        currentFaj={karakter.faj}
                        currentOsztaly={karakter.osztaly}
                        changeOsztaly={(o: Osztaly) => changeKarakter({...karakter, osztaly: o})}
                    />
                    <KarakterKepzettsegek
                        availableKepzettsegList={availableKepzettsegList}
                        numberOfKepzettsegek={getNumberOfKepzettsegek(karakter.tulajdonsagok.t_int, karakter.faj, availableKepzettsegList.length)}
                        kepzettsegek={karakter.kepzettsegek}
                        changeKepzettsegek={(ks) => changeKarakter({...karakter, kepzettsegek: ks}) }
                        tolvajKepzettsegek={karakter.tolvajKepzettsegek || []}
                        changeTolvajKepzettsegek={(tks) => changeKarakter({...karakter, tolvajKepzettsegek: tks})}
                    />

                    <hr />
                    <MasodlagosErtekek karakter={karakterClass} />

                    {karakter.szint > 1 && <Level2 karakter={{...karakter}} rolledHP={karakter.HProlls[0]} changeRolledHP={chageLevel2HProll} /> }

                    <div className='d-grid gap-2 m-5'>
                        {karakter.szint < 2 && <button className='btn btn-dark btn-lg' type='button' onClick={levelUp}>Szintlépés! ⇧</button> }
                        {karakter.szint > 1 && <button className='btn btn-dark btn-lg' type='button' onClick={levelDown}>Visszalépés! ⇩</button> }
                    </div>

                    <div className='d-grid gap-2 m-5'>
                        <button className='btn btn-danger btn-lg' type='button' onClick={async () =>  await CreatePDF(karakterClass)}>Létrehozás</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
