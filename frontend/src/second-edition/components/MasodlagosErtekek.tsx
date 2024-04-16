import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {SignedNumberToText} from "../../shared/components/Helpers";
import {CalculateMasodlagosErtekek, MasodlagosErtekekView} from "../domain-models/masodlagos_ertekek";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {characterSelector} from "../domain-models/characterSlice";
import {TulajdonsagokTotal} from "../domain-models/tulajdonsag2E";

export function MasodlagosErtekek(props: {szint?: number}) {
    let karakter = useSelector.withTypes<RootState>()(characterSelector);
    if (props.szint !== karakter.szint && props.szint !== undefined) {
        const szintlepesek = karakter.szintlepesek.slice(0, props.szint)
        karakter = {
            ...karakter,
            tulajdonsagok: TulajdonsagokTotal({
                tulajdonsagok: karakter.tulajdonsagok,
                faj: karakter.faj,
                szintlepesek,
            }),
            szint: props.szint,
            szintlepesek,
        }
    }
    const masodlagosErtekek = CalculateMasodlagosErtekek(karakter)
    return <MasodlagosErtekekPresenter {...masodlagosErtekek}/>
}

export function MasodlagosErtekekPresenter(props: MasodlagosErtekekView) {
    const { HP, VO, CelzoTB, Mentok, KozelharciTB } = props

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
                    <p className='col col-form-label'>{HP}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Védekezési Osztály (VO)</label>
                    <p className='col col-form-label'>{VO}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Közelharci támadás</label>
                    <p className='col col-form-label'>{KozelharciTB.map(SignedNumberToText).join(" / ")}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Célzó támadás</label>
                    <p className='col col-form-label'>{CelzoTB.map(SignedNumberToText).join(" / ")}</p>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Kitartás mentő</label>
                    <p className='col col-form-label'>{SignedNumberToText(Mentok.kitartas)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Reflex mentő</label>
                    <p className='col col-form-label'>{SignedNumberToText(Mentok.reflex)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Akaraterő mentő </label>
                    <p className='col col-form-label'>{SignedNumberToText(Mentok.akaratero)}</p>
                </div>
            </div>
        </div>
    </>
}

export default MasodlagosErtekek