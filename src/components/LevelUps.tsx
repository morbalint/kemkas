import React from "react";
import {KarakterInputs} from "../domain-models/karakter";
import BasicNewLevel from "./BasicNewLevel";
import TulajdonsagNoveles from "./TulajdonsagNoveles";
import {Tulajdonsag, TulajdonsagokTotal} from "../domain-models/tulajdonsag";
import {arraySetN} from "../util";
import {Osztaly} from "../domain-models/osztaly";
import HarcosFegyverSpecializacio from "./HarcosFegyverSpecializacio";
import KalozKritikus from "./KalozKritikus";

function kalozKritIndex(szint: number) {
    return Math.floor(szint/3)-1
}

function LevelUp(props: {
    szint: number,
    karakter: KarakterInputs,
    changeTulajdonsagNoveles: (t: Tulajdonsag) => void,
    changeRolledHP: (rolledHP: number) => void,
    changeHarcosSpec: (spec: string) => void,
    changeKalozKritikus: (krit: string) => void,
}) {
    const {
        szint,
        karakter,
        changeTulajdonsagNoveles,
        changeRolledHP,
        changeHarcosSpec,
        changeKalozKritikus,
    } = props

    const specializationIndex = Math.floor((szint-1) / 2)
    const specialization = karakter.harcosSpecializaciok[specializationIndex]
    const kritIndex = kalozKritIndex(szint)
    const krit = karakter.kalozKritikus[kritIndex]

    return <div key={`level-up-${szint}`}>
        <div className='row mt-3'>
            <h5 className='col align-self-center'>{szint}. Szint</h5>
        </div>
        {szint % 4 === 0 && <TulajdonsagNoveles
            tulajdonsagok={karakter.tulajdonsagok}
            szint={szint}
            tulajdonsagNovelesek={karakter.tulajdonsagNovelesek}
            changeTulajdonsagNoveles={changeTulajdonsagNoveles}
        />}
        <BasicNewLevel
            szint={szint}
            karakter={karakter}
            changeRolledHP={changeRolledHP}
        />
        {karakter.osztaly === Osztaly.Harcos && szint % 2 === 1 &&
            <HarcosFegyverSpecializacio
                specialization={specialization}
                existingSpecializations={karakter.harcosSpecializaciok}
                changeSpecialization={changeHarcosSpec}
                szint={szint}
            />
        }
        {karakter.osztaly === Osztaly.Kaloz && szint % 3 === 0 && !!krit &&
            <KalozKritikus
                kritFegyverId={krit}
                existingKrits={karakter.kalozKritikus}
                changeKrit={changeKalozKritikus}
                szint={szint}
            />
        }
    </div>
}

export function LevelUps(props: {karakter: KarakterInputs, changeKarakter: (inputs: KarakterInputs) => void}){
    const {karakter, changeKarakter} = props;

    const tulajdonsagokAtSzint = (szint: number) => TulajdonsagokTotal({...karakter, tulajdonsagNovelesek: karakter.tulajdonsagNovelesek.slice(0, Math.floor(szint / 4))})

    const changeRolledHPAtSzint = (szint: number) => (newHProll: number) => {
        changeKarakter({...karakter, hpRolls: arraySetN(karakter.hpRolls, szint-2, newHProll)})
        console.log(karakter)
    }
    const changeTulajdonsagNovelesAtSzint = (szint: number) => (t: Tulajdonsag) => { changeKarakter({...karakter, tulajdonsagNovelesek: arraySetN(karakter.tulajdonsagNovelesek, Math.floor((szint / 4)-1), t)}) }

    const changeHarcosSpecializacioAtSzint = (szint: number) => (spec: string) => {
        changeKarakter({...karakter, harcosSpecializaciok: arraySetN(karakter.harcosSpecializaciok, Math.floor((szint-1) / 2), spec)})
    }

    const changeKalozKritikusAtSzint = (szint: number) => (krit: string) => {
        changeKarakter({...karakter, kalozKritikus: arraySetN(karakter.kalozKritikus, kalozKritIndex(szint), krit)})
    }

    return <>
        {karakter.hpRolls.map((_, i) => i+2).map(szint => <>
            <LevelUp
                key={`level-up-${szint}`}
                szint={szint}
                karakter={{...karakter, tulajdonsagok: tulajdonsagokAtSzint(szint)}}
                changeTulajdonsagNoveles={changeTulajdonsagNovelesAtSzint(szint)}
                changeRolledHP={changeRolledHPAtSzint(szint)}
                changeHarcosSpec={changeHarcosSpecializacioAtSzint(szint)}
                changeKalozKritikus={changeKalozKritikusAtSzint(szint)}
            />
            </>
        )}
    </>
}

export default LevelUps