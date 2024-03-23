import React, {useState} from 'react';
import './CreateCharacter.css'
import {Faj, TulajdonsagokFajjal} from "../domain-models/faj";
import {Osztaly, SetFelszerelesForChangedOsztaly} from "../domain-models/osztaly"
import FajSelector from "../components/FajSelector";
import Tulajdonsagok from "../components/Tulajdonsagok";
import OsztalySelector from "../components/OsztalySelector";
import KarakterKepzettsegek from "../components/KarakterKepzettsegek";
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
import {Button, Card, InputGroup, Modal, OverlayTrigger, Toast, ToastContainer} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import LevelUps from "../components/LevelUps";
import HarcosFegyverSpecializacio from "../components/HarcosFegyverSpecializacio";
import Felszereles from '../components/Felszereles';
import { KarakterFelszereles } from '../domain-models/felszereles';
import {Faro} from "@grafana/faro-web-sdk";
import {StoreNewCharacter, UpdateCharacter} from "../api/character.api";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import saveOverlayTooltip from "../components/SaveOverlayTooltip";
import {KarakterTulajdonsagok} from "../domain-models/tulajdonsag";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {userSelector} from "../../shared/domain-models/userSlice";

function CreateCharacterPage(props: {
    faro?: Faro,
}) {
    const {faro} = props

    const loaderData = useLoaderData() as KarakterInputs & { isPublic: boolean } | undefined;
    let initialKarakterInputs = KarakterDefaults;
    if (loaderData != null) {
        const { isPublic: t1, ...t2 } = loaderData;
        initialKarakterInputs = t2
    }
    const { id } = useParams();
    const fetchedUser = useSelector.withTypes<RootState>()(userSelector);
    
    const initialIsPublic = loaderData?.isPublic ?? fetchedUser?.email == null;
    
    const navigate = useNavigate();

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

    let [showSaveModal, setShowSaveModal] = useState(false);
    let [newId, setNewId] = useState(null as string | null)
    
    let [showSaved, setShowSaved] = useState(false);
    let [isPublic, setIsPublic] = useState(initialIsPublic);

    const newCharacterUrl = () => `${window.location.origin}/1e/karakter/${newId}`
    
    const handleSaveModalCopyAndClose = async () => {
        
        await navigator.clipboard.writeText(newCharacterUrl());
        handleSaveModalClose()
    }
    
    const handleSaveModalClose = () => {
        setShowSaveModal(false);
        navigate(`/1e/karakter/${newId}`)
    }
    
    const hideSaved = () => setShowSaved(false);
    const onSaveClicked = async () => {
        faro?.api.pushEvent('character_stored', {
            osztaly: karakter.osztaly,
            szint: karakter.szint.toString(),
            faj: karakter.faj.toString(),
            is_public: isPublic.toString(),
        })
        if (id == null) {
            let recievedId = await StoreNewCharacter(karakter, isPublic);
            setNewId(recievedId)
            setShowSaveModal(true);
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
                <h1>Karakter {!!id ? "szerkesztése" : "létrehozása"}</h1>
            </div>
            <ToastContainer className="position-fixed" position="top-end">
                <Toast show={showSaved} onClose={hideSaved} bg="success">
                    <Toast.Body className="text-light">Karakter mentve!</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal show={showSaveModal} onHide={handleSaveModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Karakter mentve!</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <p>Karaktered az alábbi {isPublic ? 'publikus' : 'privát'} URLen érhető el.</p>
                    <p><a href={newCharacterUrl()}>{newCharacterUrl()}</a></p>
                    <InputGroup className="mb-3">
                        <Form.Control id="input" value={newCharacterUrl()} />
                        <Button variant={"outline-dark"} onClick={() => {
                            let copyText = document.querySelector("#input") as any;
                            copyText?.select()
                            document.execCommand("copy");
                        }}>Másolás</Button>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleSaveModalCopyAndClose}>
                        Másolás és bezárás
                    </Button>
                </Modal.Footer>
            </Modal>
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

                    {fetchedUser.email != null &&
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
                                {fetchedUser.email == null
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
