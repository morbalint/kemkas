import React from "react";
import {Karakter2E} from "../domain-models/karakter2E";
import BasicNewLevel from "./BasicNewLevel";
import TulajdonsagNoveles from "./TulajdonsagNoveles";
import {Tulajdonsag2E, TulajdonsagokTotal} from "../domain-models/tulajdonsag2E";
import {arraySetN} from "../../util";
import {Osztaly2E} from "../domain-models/osztaly2E";
import KalozKritikus from "./KalozKritikus";
import HarcosFegyverSpecializacio from "./HarcosFegyverSpec";

function LevelUp(props: {
    szint: number,
    karakter: Karakter2E,
    changeTulajdonsagNoveles: (t: Tulajdonsag2E) => void,
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

    const specialization = karakter.szintlepesek[szint-1].harcosFegyver
    const krit = karakter.szintlepesek[szint-1].kalozKritikus

    return <div>
        <div className='row mt-3'>
            <h5 className='col align-self-center'>{szint}. Szint</h5>
        </div>
        {szint % 4 === 0 
            && <TulajdonsagNoveles
            tulajdonsagok={karakter.tulajdonsagok}
            tulajdonsagNoveles={karakter.szintlepesek[szint-1].tulajdonsagNoveles!}
            changeTulajdonsagNoveles={changeTulajdonsagNoveles}
        />}
        <BasicNewLevel
            szint={szint}
            karakter={karakter}
            changeRolledHP={changeRolledHP}
        />
        {karakter.osztaly === Osztaly2E.Harcos && szint % 2 === 1 &&
            <HarcosFegyverSpecializacio
                specialization={specialization!}
                existingSpecializations={karakter.szintlepesek.map(x => x.harcosFegyver)}
                changeSpecialization={changeHarcosSpec}
                szint={szint}
            />
        }
        {karakter.osztaly === Osztaly2E.Tengeresz && szint % 3 === 0 && !!krit &&
            <KalozKritikus
                kritFegyverId={krit}
                existingKrits={karakter.szintlepesek.map(x => x.kalozKritikus)}
                changeKrit={changeKalozKritikus}
                szint={szint}
            />
        }
    </div>
}

export function LevelUps(props: {karakter: Karakter2E, changeKarakter: (inputs: Karakter2E) => void}){
    const {karakter, changeKarakter} = props;

    const tulajdonsagokAtSzint = (szint: number) => TulajdonsagokTotal({...karakter, szintlepesek: karakter.szintlepesek.slice(0, szint - 1)})

    const changeRolledHPAtSzint = (szint: number) => (newHProll: number) => {
        changeKarakter({...karakter, szintlepesek: arraySetN(karakter.szintlepesek, szint-2, {...karakter.szintlepesek[szint-2], HProll: newHProll})})
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
                karakter={{...karakter, tulajdonsagok: tulajdonsagokAtSzint(szint)}}
                changeTulajdonsagNoveles={changeTulajdonsagNovelesAtSzint(szint)}
                changeRolledHP={changeRolledHPAtSzint(szint)}
                changeHarcosSpec={changeHarcosSpecializacioAtSzint(szint)}
                changeKalozKritikus={changeKalozKritikusAtSzint(szint)}
            />
        )}
    </>
}

export default LevelUps