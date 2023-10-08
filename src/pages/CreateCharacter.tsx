import React, {useState} from 'react';
import './CreateCharacter.css'
import {Faj} from "../domain-models/faj";
import {Osztaly} from "../domain-models/osztaly"
import FajSelector from "../components/FajSelector";
import Tulajdonsagok from "../components/Tulajdonsagok";
import OsztalySelector from "../components/OsztalySelector";
import KarakterKepzettsegek from "../components/KarakterKepzettsegek";
import {KarakterTulajdonsagok, TulajdonsagokFajjal} from "../domain-models/tulajdonsag";
import MasodlagosErtekek from "../components/MasodlagosErtekek";
import {
    AvailableKezpettsegList,
    GetKepzettsegListaN,
    GetNumberOfKepzettsegek,
    KepzettsegId,
    SetDefaultKepzettsegek,
    SetDefaultTolvajKepzettsegek,
} from "../domain-models/kepzettsegek";
import {CreatePDF} from "../pdf/character.pdf";
import {KarakterDefaults} from "../domain-models/karakter";
import {CalculateMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";
import {KarakterInputToPdfView} from "../pdf/karakter_pdf_view";
import JellemSelector from "../components/JellemSelector";
import {CanLevelUp, LevelDown, LevelUp} from "../domain-models/level";
import {Card} from "react-bootstrap";
import LevelUps from "../components/LevelUps";
import HarcosFegyverSpecializacio from "../components/HarcosFegyverSpecializacio";

function CreateCharacterPage() {

    let [karakter, changeKarakter] = useState(KarakterDefaults)

    const tulajdonsagokFajjal = TulajdonsagokFajjal(karakter.tulajdonsagok, karakter.faj)

    const changeKepzettseg = (k: KepzettsegId[]) => changeKarakter({...karakter, kepzettsegek: k})
    const changeTolvajKepzettseg = (tk?: KepzettsegId[]) => changeKarakter({...karakter, tolvajKepzettsegek: tk})
    SetDefaultTolvajKepzettsegek(karakter, changeTolvajKepzettseg)
    SetDefaultKepzettsegek({...karakter, tulajdonsagok: tulajdonsagokFajjal}, changeKepzettseg)
    const availableKepzettsegList = AvailableKezpettsegList(karakter.osztaly)

    const levelUp = () => LevelUp(karakter, changeKarakter)
    const levelDown = () => LevelDown(karakter, changeKarakter)

    const canLevelUp = CanLevelUp(karakter)

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
                    <JellemSelector selected={karakter.jellem} changeJellem={(val) => changeKarakter({...karakter, jellem: val})} />
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
                        changeOsztaly={(o: Osztaly) =>
                            changeKarakter({
                                ...karakter,
                                osztaly: o,
                                harcosSpecializaciok: (o === Osztaly.Harcos && karakter.harcosSpecializaciok.length === 0) ? ['Kard'] : karakter.harcosSpecializaciok,
                            })}
                    />
                    {karakter.osztaly === Osztaly.Harcos &&
                        <div className='mb-6'>
                            <HarcosFegyverSpecializacio
                                specialization={karakter.harcosSpecializaciok[0]}
                                existingSpecializations={karakter.harcosSpecializaciok}
                                changeSpecialization={(spec: string) => changeKarakter({...karakter, harcosSpecializaciok: [spec, ...karakter.harcosSpecializaciok.slice(1)]})}
                                szint={1}
                            />
                        </div>}
                    <KarakterKepzettsegek
                        getKepzettsegListaN={GetKepzettsegListaN(karakter)}
                        numberOfKepzettsegek={GetNumberOfKepzettsegek(tulajdonsagokFajjal.t_int, karakter.faj, availableKepzettsegList.length)}
                        kepzettsegek={karakter.kepzettsegek}
                        changeKepzettsegek={changeKepzettseg}
                        tolvajKepzettsegek={karakter.tolvajKepzettsegek || []}
                        changeTolvajKepzettsegek={changeTolvajKepzettseg}
                    />

                    <hr />
                    <MasodlagosErtekek {...CalculateMasodlagosErtekek({...karakter, tulajdonsagok: tulajdonsagokFajjal, szint: 1, hpRolls: []})} />

                    <hr />
                    <LevelUps key={'level-ups'} karakter={karakter} changeKarakter={changeKarakter} />

                    <hr />
                    <div className='d-grid gap-2 m-5'>
                        {canLevelUp && <button className='btn btn-dark btn-lg' type='button' onClick={levelUp}>Szintlépés! ⇧</button> }
                        {!canLevelUp && karakter.szint < 10 &&
                            <Card className='col text-center p-3'>Elérted a fajod szint limitjét</Card>}
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
