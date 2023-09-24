import React, {useState} from 'react';
import './CreateCharacter.css'
import {Faj} from "../domain-models/faj";
import {Osztaly} from "../domain-models/osztaly"
import FajSelector from "../components/FajSelector";
import Tulajdonsagok from "../components/Tulajdonsagok";
import OsztalySelector from "../components/OsztalySelector";
import KarakterKepzettsegek from "../components/KarakterKepzettsegek";
import {
    KarakterTulajdonsagok,
    Tulajdonsag,
    TulajdonsagIDs,
    TulajdonsagokFajjal,
    TulajdonsagokTotal
} from "../domain-models/tulajdonsag";
import MasodlagosErtekek from "../components/MasodlagosErtekek";
import {
    AvailableKezpettsegList,
    GetNumberOfKepzettsegek, KepzettsegId, SetDefaultKepzettsegek,
    SetDefaultTolvajKepzettsegek,
} from "../domain-models/kepzettsegek";
import {CreatePDF} from "../pdf/character.pdf";
import {KarakterDefaults} from "../domain-models/karakter";
import BasicNewLevel from "../components/BasicNewLevel";
import {dAny} from "../domain-models/kockak";
import {BaseHP, CalculateMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";
import {KarakterInputToPdfView} from "../pdf/karakter_pdf_view";
import {arraySetN} from "../util";
import TulajdonsagNoveles from "../components/TulajdonsagNoveles";

function CreateCharacterPage() {

    let [karakter, changeKarakter] = useState(KarakterDefaults)

    const tulajdonsagokFajjal = TulajdonsagokFajjal(karakter.tulajdonsagok, karakter.faj)
    const tulajdonsagokTotal = TulajdonsagokTotal(karakter)

    const changeKepzettseg = (k: KepzettsegId[]) => changeKarakter({...karakter, kepzettsegek: k})
    const changeTolvajKepzettseg = (tk?: KepzettsegId[]) => changeKarakter({...karakter, tolvajKepzettsegek: tk})
    SetDefaultTolvajKepzettsegek(karakter, changeTolvajKepzettseg)
    SetDefaultKepzettsegek({...karakter, tulajdonsagok: tulajdonsagokFajjal}, changeKepzettseg)
    const availableKepzettsegList = AvailableKezpettsegList(karakter.osztaly)

    function levelUp() {
        const szint = karakter.szint + 1
        const dice = BaseHP(karakter.osztaly)
        const roll = dAny(dice)
        const hpRolls = [...karakter.hpRolls, roll]
        console.log(`Level ${szint} HP roll on d${dice} is: ${roll}`)
        let tulajdonsagNovelesek = karakter.tulajdonsagNovelesek
        if (szint % 4 === 0) {
            for (const tulajdonsag of TulajdonsagIDs) {
                if (tulajdonsagokTotal[tulajdonsag] < 18) {
                    tulajdonsagNovelesek = [...tulajdonsagNovelesek, tulajdonsag]
                    break;
                }
            }
        }
        changeKarakter({...karakter, szint, hpRolls, tulajdonsagNovelesek})
    }

    function levelDown() {
        let tulajdonsagNovelesek = karakter.tulajdonsagNovelesek
        if (karakter.szint % 4 === 0) {
           tulajdonsagNovelesek = tulajdonsagNovelesek.slice(0, -1)
        }
        const szint = karakter.szint - 1
        const hpRolls = karakter.hpRolls.slice(0, -1)
        changeKarakter({...karakter, szint, hpRolls, tulajdonsagNovelesek})
    }

    const changeHProllAtSzint = (szint: number) => (newHProll: number) => {
        changeKarakter({...karakter, hpRolls: arraySetN(karakter.hpRolls, szint-2, newHProll)})
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
                        numberOfKepzettsegek={GetNumberOfKepzettsegek(tulajdonsagokFajjal.t_int, karakter.faj, availableKepzettsegList.length)}
                        kepzettsegek={karakter.kepzettsegek}
                        changeKepzettsegek={changeKepzettseg}
                        tolvajKepzettsegek={karakter.tolvajKepzettsegek || []}
                        changeTolvajKepzettsegek={changeTolvajKepzettseg}
                    />

                    <hr />
                    <MasodlagosErtekek {...CalculateMasodlagosErtekek({...karakter, tulajdonsagok: tulajdonsagokFajjal, szint: 1, hpRolls: []})} />

                    {karakter.hpRolls.map((_, i) => i+2).map(szint => <>
                        <BasicNewLevel
                            key={`level-${szint}`}
                            szint={szint}
                            karakter={karakter}
                            changeRolledHP={changeHProllAtSzint(szint)}
                        />
                        {szint % 4 === 0 && <TulajdonsagNoveles
                            key={`tulajdonsag-noveles-${szint}`}
                            tulajdonsagok={tulajdonsagokTotal}
                            szint={szint}
                            tulajdonsagNovelesek={karakter.tulajdonsagNovelesek}
                            changeTulajdonsagNoveles={(t: Tulajdonsag) => { changeKarakter({...karakter, tulajdonsagNovelesek: arraySetN(karakter.tulajdonsagNovelesek, Math.floor((szint / 4)-1), t)}) }}
                        />}
                        </>
                    )}

                    <div className='d-grid gap-2 m-5'>
                        {karakter.szint < 10 && <button className='btn btn-dark btn-lg' type='button' onClick={levelUp}>Szintlépés! ⇧</button> }
                        {karakter.szint > 1 && <button className='btn btn-dark btn-lg' type='button' onClick={levelDown}>Visszalépés! ⇩</button> }
                    </div>

                    <div className='d-grid gap-2 m-5'>
                        <button className='btn btn-danger btn-lg' type='button' onClick={async () =>  await CreatePDF(KarakterInputToPdfView(karakter))}>Létrehozás</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
