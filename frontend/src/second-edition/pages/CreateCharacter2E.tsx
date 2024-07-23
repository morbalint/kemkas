import React, {useState} from 'react'
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {OverlayTrigger, Spinner, Toast, ToastContainer} from "react-bootstrap";
import {Karakter2E} from "../domain-models/karakter2E";
import Tulajdonsagok2E from "../components/Tulajdonsagok2E";
import OsztalySelector2E from "../components/OsztalySelector2E";
import {Osztaly2E} from "../domain-models/osztaly2E";
import KarakterKepzettsegek from "../components/Kepzettsegek2E";
import MasodlagosErtekek from "../components/MasodlagosErtekek";
import Felszereles from "../components/Felszereles";
import LevelUps from "../components/LevelUps";
import {LevelDown, LevelUp} from "../domain-models/szintlepes";
import HarcosFegyverSpecializacio from "../components/HarcosFegyverSpec";
import saveOverlayTooltip from "../../first-edition/components/SaveOverlayTooltip";
import {StoreNewCharacter2E, UpdateCharacter2E} from "../api/character.api";
import {Faro} from "@grafana/faro-web-sdk";
import {CreatePDF} from "../pdf/character.pdf";
import {KarakterInputToPdfView} from "../pdf/karakter_pdf_view";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {userSelector} from "../../shared/domain-models/userSlice";
import {SaveModal} from "../../shared/components/SaveModal";
import {characterSelector, setCharacter} from "../domain-models/characterSlice";
import Szarmazas from "../components/Szarmazas";
import Varazslatok from "../components/Varazslatok";

function CreateCharacter2E(props: {
    faro?: Faro
}) {
    const {faro} = props
    const { id } = useParams();
    const fetchedUser = useSelector.withTypes<RootState>()(userSelector);
    const loaderData = useLoaderData() as Karakter2E & { isPublic: boolean } | undefined;
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const initialIsPublic = loaderData?.isPublic ?? fetchedUser?.email == null;
    const navigate = useNavigate();

    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const setKarakter = (newState: Karakter2E) => dispatch(setCharacter(newState));

    let [showSaveModal, setShowSaveModal] = useState(false);
    let [newId, setNewId] = useState(null as string | null)
    let [showSaved, setShowSaved] = useState(false);
    let [isPDFRendering, setIsPDFRendering] = useState<boolean>(false)
    let [isSaving, setIsSaving] = useState<boolean>(false)
    let [isPublic, setIsPublic] = useState(initialIsPublic);
    const newCharacterUrl = () => `${window.location.origin}/2e/karakter/${newId}`

    const handleSaveModalCopyAndClose = async () => {
        await navigator.clipboard.writeText(newCharacterUrl());
        handleSaveModalClose()
    }

    const handleSaveModalClose = () => {
        setShowSaveModal(false);
        navigate(`/2e/karakter/${newId}`)
    }
    const hideSaved = () => setShowSaved(false);
    const onSaveClicked = async () => {
        setIsSaving(true);
        faro?.api.pushEvent('character_stored', {
            osztaly: karakter.szintlepesek[0].osztaly.toString(),
            szint: karakter.szint.toString(),
            faj: karakter.faj.toString(),
            is_public: isPublic.toString(),
            edition: "2e",
        })
        if (id == null) {
            let recievedId = await StoreNewCharacter2E(karakter, isPublic);
            setNewId(recievedId)
            setIsSaving(false)
            setShowSaveModal(true);
        } else {
            await UpdateCharacter2E(id, karakter, isPublic);
            setIsSaving(false)
            setShowSaved(true);
            setTimeout(() => {
                hideSaved();
            }, 5000)
        }
    }

    return <div>
        <div className='container-fluid p-5 bg-black text-white text-center'>
            <h1>Karakter {!!id ? "szerkesztése" : "létrehozása"}</h1>
        </div>
        <ToastContainer className="position-fixed" position="top-end">
            <Toast show={showSaved} onClose={hideSaved} bg="success">
                <Toast.Header><strong>Karakter mentve!</strong></Toast.Header>
            </Toast>
        </ToastContainer>
        <SaveModal
            showSaveModal={showSaveModal}
            handleSaveModalClose={handleSaveModalClose}
            isPublic={isPublic}
            newCharacterUrl={newCharacterUrl()}
            handleSaveModalCopyAndClose={handleSaveModalCopyAndClose}
        />
        <div className='p-3'>
            <form onSubmit={async (event) => event.preventDefault()}>
                <div className='row'>
                    <h4 className='col align-self-center'>Származás</h4>
                </div>
                <Szarmazas/>
                <hr/>
                <Tulajdonsagok2E/>
                <hr/>
                <div className='row'>
                    <h4 className='col align-self-center'>Tanult</h4>
                </div>
                <OsztalySelector2E />
                {karakter.szintlepesek[0].osztaly === Osztaly2E.Harcos && <HarcosFegyverSpecializacio szint={1}/>}
                <KarakterKepzettsegek />
                <hr/>
                {/* 1. szinten */}
                <MasodlagosErtekek szint={1} />
                <hr/>
                <LevelUps karakter={karakter} changeKarakter={setKarakter}/>
                {karakter.szint > 1 && <hr/>}
                <div className='d-grid gap-2 m-5'>
                    {karakter.szint < 12 &&
                        <button className='btn btn-dark btn-lg' type='button'
                                onClick={() => LevelUp(karakter, setKarakter)}>Szintlépés!
                            ⇧</button>}
                    {karakter.szint > 1 &&
                        <button className='btn btn-dark btn-lg' type='button'
                                onClick={() => LevelDown(karakter, setKarakter)}>Visszalépés!
                            ⇩</button>}
                </div>
                <hr/>
                <Felszereles />

                <Varazslatok />

                <hr/>
                <div className='row'>
                    <h5 className='col align-self-center'>Véglegesítés</h5>
                </div>

                {fetchedUser.email != null &&
                    <div className='row m-2'>
                        <label className='col-md-2 col-sm-3 col-form-label'>Publikus karakterlap?</label>
                        <select
                            className="col form-select" value={isPublic.toString()}
                            onChange={(event) => setIsPublic(event.target.value === "true")}
                            data-testid={"karakter-publikus"}
                        >
                            <option value="true">Igen</option>
                            <option value="false">Nem</option>
                        </select>
                    </div>
                }
                <div className="row">
                    <div className="col-6">
                        <div className='d-grid gap-2 m-5'>
                            {fetchedUser.email == null
                                ? <OverlayTrigger
                                    placement='top'
                                    overlay={saveOverlayTooltip}
                                    delay={0}
                                    defaultShow={false}
                                    flip={false}
                                >
                                    <button
                                        className='btn btn-danger btn-lg'
                                        type='button'
                                        onClick={onSaveClicked}
                                        disabled={isSaving}
                                    >
                                        Mentés {isSaving ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ""}
                                    </button>
                                </OverlayTrigger>
                                : <button
                                    className='btn btn-danger btn-lg'
                                    type='button'
                                    onClick={onSaveClicked}
                                    disabled={isSaving}
                                >
                                    Mentés {isSaving ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ""}
                                </button>
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='d-grid gap-2 m-5'>
                            <button className='btn btn-danger btn-lg' type='button' disabled={isPDFRendering} onClick={async () => {
                                faro?.api.pushEvent('character_created', {
                                    osztaly: karakter.szintlepesek[0].osztaly,
                                    szint: karakter.szint.toString(),
                                    faj: karakter.faj.toString(),
                                })
                                setIsPDFRendering(true)
                                await CreatePDF(KarakterInputToPdfView(karakter))
                                setIsPDFRendering(false)
                            }}>PDF {isPDFRendering ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ""}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export default CreateCharacter2E;