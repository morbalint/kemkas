import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {SignedNumberToText} from "./Helpers";
import {Karakter} from "../domain-models/karakter";


function MasodlagosErtekek(props: {karakter: Karakter}) {

    const { karakter } = props

    const tooltip = (
        <Tooltip id="tooltip">
            <strong>Hentelési Potenciál</strong>
        </Tooltip>
    );
    const mentok = karakter.MentokTulajdonsaggal(1)

    return <>
        <div className='row'>
            <h5 className='col align-self-center'>Másodlagos értékek</h5>
        </div>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row m-2'>
                        <label className='col-sm-6 col-8 col-form-label'>Életerő{' '}
                            <OverlayTrigger placement='top' overlay={tooltip} delay={0} defaultShow={false} flip={false}>
                                <span>(HP)</span>
                            </OverlayTrigger>
                        </label>
                    <p className='col col-form-label'>{karakter.HP()}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Védekezési Osztály (VO)</label>
                    <p className='col col-form-label'>{karakter.VO()}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Közelharci támadás</label>
                    <p className='col col-form-label'>{SignedNumberToText(karakter.KozelharciTB(1)[0])}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Célzó támadás</label>
                    <p className='col col-form-label'>{SignedNumberToText(karakter.CelzoTB(1)[0])}</p>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Kitartás mentő</label>
                    <p className='col col-form-label'>{SignedNumberToText(mentok.kitartas)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Reflex mentő</label>
                    <p className='col col-form-label'>{SignedNumberToText(mentok.reflex)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Akaraterő mentő </label>
                    <p className='col col-form-label'>{SignedNumberToText(mentok.akaratero)}</p>
                </div>
            </div>
        </div>
    </>
}

export default MasodlagosErtekek