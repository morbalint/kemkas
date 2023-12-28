import React, {useContext, useState} from 'react';
import './CreateCharacter.css'
import {Faj} from "../domain-models/faj";
import {Osztaly, SetFelszerelesForChangedOsztaly} from "../domain-models/osztaly"
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
import {KarakterDefaults, KarakterInputs} from "../domain-models/karakter";
import {CalculateMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";
import {KarakterInputToPdfView} from "../pdf/karakter_pdf_view";
import JellemSelector from "../components/JellemSelector";
import {CanLevelUp, LevelDown, LevelUp} from "../domain-models/level";
import {Card, OverlayTrigger, Toast, ToastContainer} from "react-bootstrap";
import LevelUps from "../components/LevelUps";
import HarcosFegyverSpecializacio from "../components/HarcosFegyverSpecializacio";
import Felszereles from '../components/Felszereles';
import { KarakterFelszereles } from '../domain-models/felszereles';
import {Faro} from "@grafana/faro-web-sdk";
import {StoreNewCharacter, UpdateCharacter} from "../api/character.api";
import {useLoaderData, useParams} from "react-router-dom";
import saveOverlayTooltip from "../components/SaveOverlayTooltip";
import {UserContext} from "../../shared/contexts/UserContext";

function CreateCharacterPage(props: {
    faro?: Faro,
}) {
    const {faro} = props

    const loaderData = useLoaderData() as KarakterInputs & { isPublic: boolean } | undefined;
    const initialIsPublic = loaderData?.isPublic ?? false;
    let initialKarakterInputs = KarakterDefaults;
    if (loaderData != null) {
        const { isPublic: t1, ...t2 } = loaderData;
        initialKarakterInputs = t2
    }
    const { id } = useParams();
    const fetchedUser = useContext(UserContext);

    let [karakter, changeKarakter] = useState(initialKarakterInputs)

    const tulajdonsagokFajjal = TulajdonsagokFajjal(karakter.tulajdonsagok, karakter.faj)

    const changeKepzettseg = (k: KepzettsegId[]) => changeKarakter({...karakter, kepzettsegek: k})
    const changeTolvajKepzettseg = (tk?: KepzettsegId[]) => changeKarakter({...karakter, tolvajKepzettsegek: tk})
    SetDefaultTolvajKepzettsegek(karakter, changeTolvajKepzettseg)
    SetDefaultKepzettsegek({...karakter, tulajdonsagok: tulajdonsagokFajjal}, changeKepzettseg)
    const availableKepzettsegList = AvailableKezpettsegList(karakter.osztaly)
    const setFelszereles = (f: KarakterFelszereles) => changeKarakter({...karakter, felszereles: f})
    SetFelszerelesForChangedOsztaly(karakter.osztaly, karakter.felszereles, setFelszereles)

    const levelUp = () => LevelUp(karakter, changeKarakter)
    const levelDown = () => LevelDown(karakter, changeKarakter)

    const canLevelUp = CanLevelUp(karakter)
    
    let [showSaved, setShowSaved] = useState(false);
    let [isPublic, setIsPublic] = useState(initialIsPublic);
    
    const hideSaved = () => setShowSaved(false);
    const onSaveClicked = async () => {
        faro?.api.pushEvent('character_stored', {
            osztaly: karakter.osztaly,
            szint: karakter.szint.toString(),
            faj: karakter.faj.toString(),
            is_public: isPublic.toString(),
        })
        if (id == null) {
            let newId = await StoreNewCharacter(karakter, isPublic);
            const win = window.open(`/${newId}`, '_blank');
            if (win != null) {
                win.focus();
            }
        } else {
            await UpdateCharacter(id, karakter, isPublic);
            setShowSaved(true);
            setTimeout(() => {
                hideSaved();
            }, 5000)
        }
    }

    return (
        <div>
            <div className='container-fluid p-5 bg-black text-white text-center'>
                <h1>Karakter {initialKarakterInputs ? "szerkesztése" : "létrehozása"}</h1>
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
                               onChange={(e) => changeKarakter({...karakter, name: e.target.value})}/>
                        {!karakter.name && <span className='form-field-error'>A karaktered nem mászkálhat névtelenül a világban!</span>}
                    </div>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label'>Nem</label>
                        <input className='col form-control'
                               value={karakter.nem}
                               onChange={(e) => changeKarakter({...karakter, nem: e.target.value})}/>
                    </div>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label'>Kor</label>
                        <input className='col form-control'
                               value={karakter.kor}
                               type={"number"}
                               onChange={(e) => changeKarakter({...karakter, kor: Number(e.target.value)})}/>
                    </div>
                    <JellemSelector selected={karakter.jellem}
                                    changeJellem={(val) => changeKarakter({...karakter, jellem: val})}/>
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label'>Választott istenség</label>
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
                        changeTulajdonsagok={(tul: KarakterTulajdonsagok) => changeKarakter({
                            ...karakter,
                            tulajdonsagok: tul
                        })}
                    />
                    <hr/>
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
                                harcosSpecializaciok: (o === Osztaly.Harcos && karakter.harcosSpecializaciok.length === 0) ? ['hosszu_kard'] : karakter.harcosSpecializaciok,
                            })}
                    />
                    {karakter.osztaly === Osztaly.Harcos &&
                        <div className='mb-6'>
                            <HarcosFegyverSpecializacio
                                specialization={karakter.harcosSpecializaciok[0]}
                                existingSpecializations={karakter.harcosSpecializaciok}
                                changeSpecialization={(spec: string) => changeKarakter({
                                    ...karakter,
                                    harcosSpecializaciok: [spec, ...karakter.harcosSpecializaciok.slice(1)]
                                })}
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

                    <hr/>
                    <MasodlagosErtekek {...CalculateMasodlagosErtekek({
                        ...karakter,
                        tulajdonsagok: tulajdonsagokFajjal,
                        szint: 1,
                        hpRolls: []
                    })} />

                    <hr/>

                    <LevelUps key={'level-ups'} karakter={karakter} changeKarakter={changeKarakter}/>

                    {karakter.szint > 1 && <hr/>}
                    <div className='d-grid gap-2 m-5'>
                        {canLevelUp &&
                            <button className='btn btn-dark btn-lg' type='button' onClick={levelUp}>Szintlépés!
                                ⇧</button>}
                        {!canLevelUp && karakter.szint < 10 &&
                            <Card className='col text-center p-3'>Elérted a fajod szint limitjét</Card>}
                        {karakter.szint > 1 &&
                            <button className='btn btn-dark btn-lg' type='button' onClick={levelDown}>Visszalépés!
                                ⇩</button>}
                    </div>


                    <hr/>

                    <Felszereles osztaly={karakter.osztaly} felszereles={karakter.felszereles}
                                 changeFelszereles={setFelszereles} harcosSpec={karakter.harcosSpecializaciok}/>

                    <hr/>
                    <div className='row'>
                        <h5 className='col align-self-center'>Véglegesítés</h5>
                    </div>

                    {fetchedUser.data != null &&
                        <div className='row m-2'>
                            <label className='col-md-2 col-sm-3 col-form-label'>Publikus karakterlap?</label>
                            <select className="col form-select" value={isPublic.toString()}
                                    onChange={(event) => setIsPublic(event.target.value === "true")}>
                                <option value="true">Igen</option>
                                <option value="false">Nem</option>
                            </select>
                        </div>
                    }
                    <div className="row">
                        <div className="col-6">
                            <div className='d-grid gap-2 m-5'>
                                {fetchedUser.data == null
                                    ? <OverlayTrigger placement='top' overlay={saveOverlayTooltip} delay={0}
                                                      defaultShow={false} flip={false}>
                                        <button className='btn btn-danger btn-lg' type='button'
                                                onClick={onSaveClicked}>Mentés
                                        </button>
                                    </OverlayTrigger>
                                    : <button className='btn btn-danger btn-lg' type='button'
                                              onClick={onSaveClicked}>Mentés</button>
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className='d-grid gap-2 m-5'>
                                <button className='btn btn-danger btn-lg' type='button' onClick={async () => {
                                    faro?.api.pushEvent('character_created', {
                                        osztaly: karakter.osztaly,
                                        szint: karakter.szint.toString(),
                                        faj: karakter.faj.toString(),
                                    })
                                    await CreatePDF(KarakterInputToPdfView(karakter))
                                }}>PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacterPage;
