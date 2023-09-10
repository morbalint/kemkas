import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {SignedNumberToText} from "./Helpers";
import {KarakterMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";


function MasodlagosErtekek(props: {ertekek: KarakterMasodlagosErtekek}) {

    const { ertekek } = props

    const tooltip = (
        <Tooltip id="tooltip">
            <strong>Hentelési Potenciál</strong>
        </Tooltip>
    );

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
                    <p className='col col-form-label'>{ertekek.HP}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Védekezési Osztály (VO)</label>
                    <p className='col col-form-label'>{ertekek.VO}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Közelharci támadás</label>
                    <p className='col col-form-label'>{SignedNumberToText(ertekek.KozelHarciTB)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Célzó támadás</label>
                    <p className='col col-form-label'>{SignedNumberToText(ertekek.CelzoTB)}</p>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Kitartás mentő</label>
                    <p className='col col-form-label'>{SignedNumberToText(ertekek.KitartasMento)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Reflex mentő</label>
                    <p className='col col-form-label'>{SignedNumberToText(ertekek.ReflexMento)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Akaraterő mentő </label>
                    <p className='col col-form-label'>{SignedNumberToText(ertekek.AkarateroMento)}</p>
                </div>
            </div>
        </div>
    </>
}

export default MasodlagosErtekek