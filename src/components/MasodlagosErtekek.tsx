import React from "react";
import {Osztaly} from "../domain-models/osztaly";
import {KarakterTulajdonsagok, Modifier} from "../domain-models/tulajdonsag";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {SignedNumberToText} from "./Helpers";

function HP(osztaly: Osztaly, egeszseg: number) {
    let base = 4;
    switch (osztaly){
        case Osztaly.Barbar:
            base = 12
            break;
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            base = 10;
            break
        case Osztaly.Pap:
            base = 8;
            break;
        case Osztaly.Tolvaj:
            base = 6;
            break;
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            base = 4;
            break;
    }
    return base + Modifier(egeszseg)
}

function TamadasBonusz(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            return 2;
        case Osztaly.Pap:
        case Osztaly.Tolvaj:
            return 0;
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 0;
    }
}

function KozelharciTB(osztaly: Osztaly, tulajdonsagok: KarakterTulajdonsagok): number {
    const base = TamadasBonusz(osztaly);
    if (osztaly === Osztaly.Kaloz && tulajdonsagok.t_ugy > tulajdonsagok.t_ero) {
        return base + Modifier(tulajdonsagok.t_ugy)
    }
    return base + Modifier(tulajdonsagok.t_ero)
}

function KitartasMento(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
        case Osztaly.Pap:
            return 2;
        case Osztaly.Tolvaj:
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 0;
    }
}

function ReflexMento(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Tolvaj:
            return 2;
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
        case Osztaly.Pap:
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 0;
    }
}

function AkarateroMento(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Pap:
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 2;
        case Osztaly.Tolvaj:
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            return 0;
    }
}

function MasodlagosErtekek(props: {osztaly: Osztaly, tulajdonsagok: KarakterTulajdonsagok}) {

    const { osztaly, tulajdonsagok } = props;

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
                    <p className='col'>{HP(osztaly, tulajdonsagok.t_egs)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Védekezési Osztály (VO)</label>
                    <p className='col'>{10+Modifier(tulajdonsagok.t_ugy)}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Közelharci támadás</label>
                    <p className='col'>{SignedNumberToText(KozelharciTB(osztaly, tulajdonsagok))}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Célzó támadás</label>
                    <p className='col'>{SignedNumberToText(TamadasBonusz(osztaly) + Modifier(tulajdonsagok.t_ugy))}</p>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Kitartás mentő</label>
                    <p className='col'>{SignedNumberToText(KitartasMento(osztaly) + Modifier(tulajdonsagok.t_egs))}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Reflex mentő</label>
                    <p className='col'>{SignedNumberToText(ReflexMento(osztaly) + Modifier(tulajdonsagok.t_ugy))}</p>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label' >Akaraterő mentő </label>
                    <p className='col'>{SignedNumberToText(AkarateroMento(osztaly) + Modifier(tulajdonsagok.t_bol))}</p>
                </div>
            </div>
        </div>
    </>
}

export default MasodlagosErtekek