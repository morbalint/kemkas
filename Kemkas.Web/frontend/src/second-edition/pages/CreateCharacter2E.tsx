import React, {useState} from 'react'
import {useParams} from "react-router-dom";
import {Toast, ToastContainer} from "react-bootstrap";
import {ChangeLvl1Osztaly, DefaultKarakter} from "../domain-models/karakter2E";
import {KarakterTulajdonsagok} from "../domain-models/tulajdonsag2E";
import FajSelector2E from "../components/FajSelector2E";
import Tulajdonsagok2E from "../components/Tulajdonsagok2E";
import OsztalySelector2E from "../components/OsztalySelector2E";
import {Osztaly2E} from "../domain-models/osztaly2E";
import {
    GetKepzettsegListaN,
    GetNumberOfKepzettsegek,
    KepzettsegId, SetDefaultKepzettsegek,
    SetDefaultTolvajKepzettsegek
} from "../domain-models/kepzettsegek2E";
import KarakterKepzettsegek from "../components/KarakterKepzettsegek2E";
import {TulajdonsagokFajjal} from "../domain-models/faj2E";
import JellemSelector from "../components/JellemSelector";
import MasodlagosErtekek from "../components/MasodlagosErtekek";
import {CalculateMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";
import Felszereles from "../components/Felszereles";
import {KarakterFelszereles} from "../domain-models/felszereles";
import LevelUps from "../components/LevelUps";
import {LevelDown, LevelUp} from "../domain-models/szintlepes";
import HarcosFegyverSpecializacio from "../components/HarcosFegyverSpec";
import {arraySetN} from "../../util";

function CreateCharacter2E(props: {}) {

    const { id } = useParams();
    
    const [karakter, setKarakter] = useState(DefaultKarakter)
    const tulajdonsagokFajjal = TulajdonsagokFajjal(karakter.tulajdonsagok, karakter.faj)
    const changeKepzettseg = (k: KepzettsegId[]) => setKarakter({...karakter, kepzettsegek: k})
    const changeTolvajKepzettseg = (tk?: KepzettsegId[]) => setKarakter({...karakter, tolvajKepzettsegek: tk})
    SetDefaultTolvajKepzettsegek(karakter, changeTolvajKepzettseg)
    SetDefaultKepzettsegek({...karakter, tulajdonsagok: tulajdonsagokFajjal}, changeKepzettseg)

    const changeFelszereles = (f: KarakterFelszereles) => setKarakter({...karakter, felszereles: f})
    
    let [showSaved, setShowSaved] = useState(false);
    const hideSaved = () => setShowSaved(false);
    
    return <div>
        <div className='container-fluid p-5 bg-black text-white text-center'>
            <h1>Karakter {!!id ? "szerkesztése" : "létrehozása"}</h1>
        </div>
        <ToastContainer className="position-fixed" position="top-end">
            <Toast show={showSaved} onClose={hideSaved} bg="success">
                <Toast.Header><strong>Karakter mentve!</strong></Toast.Header>
            </Toast>
        </ToastContainer>
        <div className='p-3'>
            <form onSubmit={async (event) => event.preventDefault()}>
                <div className='row'>
                    <h5 className='col align-self-center'>Származás</h5>
                </div>
                <div className='row m-2'>
                    <label className='col-md-2 col-sm-3 col-form-label'>Név</label>
                    <input className='col form-control'
                           value={karakter.name}
                           onChange={(e) => setKarakter({...karakter, name: e.target.value})}/>
                    {!karakter.name &&
                        <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                </div>
                <div className='row m-2'>
                    <label className='col-md-2 col-sm-3 col-form-label'>Nem</label>
                    <input className='col form-control'
                           value={karakter.nem}
                           onChange={(e) => setKarakter({...karakter, nem: e.target.value})}/>
                </div>
                <div className='row m-2'>
                    <label className='col-md-2 col-sm-3 col-form-label'>Kor</label>
                    <input className='col form-control'
                           value={karakter.kor}
                           type={"number"}
                           onChange={(e) => setKarakter({...karakter, kor: Number(e.target.value)})}/>
                </div>
                <JellemSelector selected={karakter.jellem}
                                changeJellem={(val) => setKarakter({...karakter, jellem: val})}/>
                <div className='row m-2'>
                    <label className='col-md-2 col-sm-3 col-form-label'>Választott istenség</label>
                    <input className='col form-control'
                           value={karakter.isten}
                           onChange={(e) => setKarakter({...karakter, isten: e.target.value})}/>
                </div>
                <FajSelector2E
                    changeFaj={faj => setKarakter({...karakter, faj})}
                    faj={karakter.faj}
                />
                <hr/>
                <Tulajdonsagok2E
                    currentFaj={karakter.faj}
                    tulajdonsagok={karakter.tulajdonsagok}
                    changeTulajdonsagok={(tul: KarakterTulajdonsagok) => setKarakter({
                        ...karakter,
                        tulajdonsagok: tul
                    })}
                />
                <hr/>
                <div className='row'>
                    <h5 className='col align-self-center'>Tanult</h5>
                </div>
                <OsztalySelector2E
                    currentFaj={karakter.faj}
                    currentOsztaly={karakter.osztaly}
                    changeOsztaly={o => setKarakter(ChangeLvl1Osztaly(karakter, o))}
                />
                {karakter.szintlepesek[0].osztaly === Osztaly2E.Harcos &&
                    <HarcosFegyverSpecializacio 
                        specialization={karakter.szintlepesek[0].harcosFegyver || 'kard_hosszu'}
                        szint={1}
                        changeSpecialization={(spec) => setKarakter({...karakter, szintlepesek: arraySetN(karakter.szintlepesek, 0, {...karakter.szintlepesek[0], harcosFegyver: spec})})}
                        existingSpecializations={karakter.szintlepesek.map(x => x.harcosFegyver)}
                    />}
                <KarakterKepzettsegek
                    getKepzettsegListaN={GetKepzettsegListaN(karakter)}
                    numberOfKepzettsegek={GetNumberOfKepzettsegek(tulajdonsagokFajjal.t_int, karakter.faj)}
                    kepzettsegek={karakter.kepzettsegek}
                    changeKepzettsegek={changeKepzettseg}
                    tolvajKepzettsegek={karakter.tolvajKepzettsegek || []}
                    changeTolvajKepzettsegek={changeTolvajKepzettseg}
                />
                <hr />
                {/* 1. szinten */}
                <MasodlagosErtekek {...CalculateMasodlagosErtekek({
                    ...karakter,
                    tulajdonsagok: tulajdonsagokFajjal,
                    szint: 1,
                    szintlepesek: karakter.szintlepesek.slice(0,1)
                })} />
                <hr />
                <LevelUps karakter={karakter} changeKarakter={setKarakter}/>
                {karakter.szint > 1 && <hr/>}
                <div className='d-grid gap-2 m-5'>
                    {karakter.szint < 12 &&
                        <button className='btn btn-dark btn-lg' type='button' onClick={() => LevelUp(karakter, setKarakter)}>Szintlépés!
                            ⇧</button>}
                    {karakter.szint > 1 &&
                        <button className='btn btn-dark btn-lg' type='button' onClick={() => LevelDown(karakter, setKarakter)}>Visszalépés!
                            ⇩</button>}
                </div>
                <hr/>
                <Felszereles osztaly={karakter.szintlepesek[0].osztaly} felszereles={karakter.felszereles}
                             changeFelszereles={changeFelszereles}/>

                <hr/>
            </form>
        </div>
        <hr/>
    </div>
}

export default CreateCharacter2E;