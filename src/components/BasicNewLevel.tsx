import React from "react";
import {KarakterInputs} from "../domain-models/karakter";
import {SignedNumberToText} from "./Helpers";
import {Mentok, MentoTipus, MentoTipusLabel, MentokTotal} from "../domain-models/mentok";
import {BaseHP, HP} from "../domain-models/masodlagos_ertekek";
import {TamadasBonusz} from "../domain-models/tamadas_bonusz";

function MentoNovekedes(props : {tipus: MentoTipus, ujMentok: Mentok, regiMentok: Mentok}) {
    const {tipus, ujMentok, regiMentok} = props
    if (ujMentok[tipus] === regiMentok[tipus]) {
        return null
    }
    return <div className='row m-2'>
        <label className='col-sm-6 col-8 col-form-label'>{MentoTipusLabel(tipus)} mentő növekedés{' '}</label>
        <span className='col col-form-label'>{SignedNumberToText(ujMentok[tipus] - regiMentok[tipus])}</span>
    </div>;
}

function UjMento(props : {tipus: MentoTipus, ujMentok: Mentok, regiMentok: Mentok}) {
    const {tipus, ujMentok, regiMentok} = props
    if (ujMentok[tipus] === regiMentok[tipus]) {
        return null
    }
    return <div className='row m-2'>
        <label className='col-sm-6 col-8 col-form-label'>{MentoTipusLabel(tipus)} mentő új értéke{' '}</label>
        <span className='col col-form-label'>{SignedNumberToText(ujMentok[tipus])}</span>
    </div>;
}

function BasicNewLevel(props: {
    karakter: Pick<KarakterInputs, 'osztaly' | 'tulajdonsagok' | 'hpRolls'>
    szint: number
    changeRolledHP: (hp: number) => void,
}) {
    const {karakter, szint, changeRolledHP} = props
    const regiMentok = MentokTotal({...karakter, szint: szint - 1})
    const ujMentok = MentokTotal({...karakter, szint: szint})

    const regiTB = TamadasBonusz(karakter.osztaly, szint-1)
    const ujTB = TamadasBonusz(karakter.osztaly, szint)
    if (regiTB.length < ujTB.length) {
        regiTB.push(0)
    }
    const TBdiff = ujTB.map((x, i) => x - regiTB[i])
    const isTBincreased = TBdiff.length > 0 && TBdiff.some(x => x > 0)

    return <>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Plusz dobott HP (d{BaseHP(karakter.osztaly)}){' '}</label>
                    <div className='col-sm-2 col'>
                        <input
                            className='form-control'
                            maxLength={2}
                            type='number'
                            value={karakter.hpRolls[szint-2] || 1}
                            min={1}
                            max={12}
                            onChange={e => changeRolledHP(Number(e.target.value))} />
                    </div>
                </div>
                { isTBincreased && <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Támadás bónusz növekedés{' '}</label>
                    <span className='col col-form-label'>{TBdiff.map(SignedNumberToText).join(" / ")}</span>
                </div>}
                <MentoNovekedes tipus={'kitartas'} ujMentok={ujMentok} regiMentok={regiMentok} />
                <MentoNovekedes tipus={'reflex'} ujMentok={ujMentok} regiMentok={regiMentok} />
                <MentoNovekedes tipus={'akaratero'} ujMentok={ujMentok} regiMentok={regiMentok} />
            </div>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Új HP{' '}</label>
                    <span className='col col-form-label'>{HP({...karakter, hpRolls: karakter.hpRolls.slice(0, szint-1)})}</span>
                </div>
                {isTBincreased && <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Új Támadás bónusz{' '}</label>
                    <span className='col col-form-label'>{ujTB.map(SignedNumberToText).join(" / ")}</span>
                </div>}
                <UjMento tipus={'kitartas'} ujMentok={ujMentok} regiMentok={regiMentok} />
                <UjMento tipus={'reflex'} ujMentok={ujMentok} regiMentok={regiMentok} />
                <UjMento tipus={'akaratero'} ujMentok={ujMentok} regiMentok={regiMentok} />
            </div>
        </div>
    </>
}

export default BasicNewLevel