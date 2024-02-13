import React from "react";
import {ChangeOsztalyAtSzint, Karakter2E} from "../domain-models/karakter2E";
import BasicNewLevel from "./BasicNewLevel";
import TulajdonsagNoveles from "./TulajdonsagNoveles";
import {Tulajdonsag2E, TulajdonsagokTotal} from "../domain-models/tulajdonsag2E";
import {arraySetN} from "../../util";
import {Osztaly2E} from "../domain-models/osztaly2E";
import KalozKritikus from "./KalozKritikus";
import HarcosFegyverSpecializacio from "./HarcosFegyverSpec";
import {BasicOsztalySelector2E} from "./OsztalySelector2E";

function LevelUp(props: {
    szint: number,
    osztaly: Osztaly2E,
    karakter: Karakter2E,
    changeTulajdonsagNoveles: (t: Tulajdonsag2E) => void,
    changeRolledHP: (rolledHP: number) => void,
    changeHarcosSpec: (spec: string) => void,
    changeKalozKritikus: (krit: string) => void,
    changeOsztaly: (osztaly: Osztaly2E) => void
}) {
    const {
        szint,
        osztaly,
        karakter,
        changeTulajdonsagNoveles,
        changeRolledHP,
        changeHarcosSpec,
        changeKalozKritikus,
        changeOsztaly
    } = props

    const harcosSzint = karakter.szintlepesek.filter(x => x.osztaly === Osztaly2E.Harcos).length
    const kalozSzint = karakter.szintlepesek.filter(x => x.osztaly === Osztaly2E.Tengeresz).length
    const specialization = karakter.szintlepesek[szint-1].harcosFegyver
    const krit = karakter.szintlepesek[szint-1].kalozKritikus

    return <div>
        <div className='row mt-3'>
            <h5 className='col align-self-center'>{szint}. Szint</h5>
        </div>
        <BasicOsztalySelector2E faj={karakter.faj} osztaly={osztaly} changeOsztaly={changeOsztaly} />
        {szint % 4 === 0 
            && <TulajdonsagNoveles
            tulajdonsagok={karakter.tulajdonsagok}
            tulajdonsagNoveles={karakter.szintlepesek[szint-1].tulajdonsagNoveles!}
            changeTulajdonsagNoveles={changeTulajdonsagNoveles}
        />}
        <BasicNewLevel
            szint={szint}
            karakter={karakter}
            osztaly={osztaly}
            changeRolledHP={changeRolledHP}
        />
        {osztaly === Osztaly2E.Harcos && harcosSzint % 2 === 1 &&
            <HarcosFegyverSpecializacio
                specialization={specialization!}
                existingSpecializations={karakter.szintlepesek.map(x => x.harcosFegyver)}
                changeSpecialization={changeHarcosSpec}
                szint={harcosSzint}
            />
        }
        {osztaly === Osztaly2E.Tengeresz && kalozSzint % 3 === 0 && !!krit &&
            <KalozKritikus
                kritFegyverId={krit}
                existingKrits={karakter.szintlepesek.map(x => x.kalozKritikus)}
                changeKrit={changeKalozKritikus}
                szint={kalozSzint}
            />
        }
    </div>
}

export function LevelUps(props: {karakter: Karakter2E, changeKarakter: (inputs: Karakter2E) => void}){
    const {karakter, changeKarakter} = props;

    const tulajdonsagokAtSzint = (szint: number) => TulajdonsagokTotal({...karakter, szintlepesek: karakter.szintlepesek.slice(0, szint)})

    const changeRolledHPAtSzint = (szint: number) => (newHProll: number) => {
        changeKarakter({...karakter, szintlepesek: arraySetN(karakter.szintlepesek, szint-1, {...karakter.szintlepesek[szint-1], HProll: newHProll})})
        console.log(karakter)
    }
    const changeTulajdonsagNovelesAtSzint = (szint: number) => {
        return (t: Tulajdonsag2E) => {
            changeKarakter({...karakter,
                szintlepesek: arraySetN(karakter.szintlepesek, szint-1, {
                    ...karakter.szintlepesek[szint-1],
                    tulajdonsagNoveles: t
                })
            })
        };
    }

    const changeHarcosSpecializacioAtSzint = (szint: number) => {
        return (spec: string) => {
            changeKarakter({
                ...karakter,
                szintlepesek: arraySetN(karakter.szintlepesek, szint-1, {
                    ...karakter.szintlepesek[szint-1],
                    harcosFegyver: spec
                })
            })
        };
    }

    const changeKalozKritikusAtSzint = (szint: number) => {
        return (krit: string) => {
            changeKarakter({
                ...karakter, 
                szintlepesek: arraySetN(karakter.szintlepesek, szint-1, {
                    ...karakter.szintlepesek[szint-1],
                        kalozKritikus: krit
                })
            })
        };
    }

    const levels = karakter.szintlepesek.map((_, i) => i+1);

    return <>
        {levels.slice(1).map(szint =>
            <LevelUp
                key={`level-up-${szint}`}
                szint={szint}
                osztaly={karakter.szintlepesek[szint-1].osztaly}
                karakter={{...karakter, szintlepesek: karakter.szintlepesek.slice(0, szint) ,tulajdonsagok: tulajdonsagokAtSzint(szint)}}
                changeTulajdonsagNoveles={changeTulajdonsagNovelesAtSzint(szint)}
                changeRolledHP={changeRolledHPAtSzint(szint)}
                changeHarcosSpec={changeHarcosSpecializacioAtSzint(szint)}
                changeKalozKritikus={changeKalozKritikusAtSzint(szint)}
                changeOsztaly={(o) => changeKarakter(ChangeOsztalyAtSzint(karakter, o, szint))}
            />
        )}
    </>
}

export default LevelUps