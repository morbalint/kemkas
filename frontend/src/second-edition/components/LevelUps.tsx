import React from "react";
import {ChangeOsztalyAtSzint, Karakter2E} from "../domain-models/karakter2E";
import BasicNewLevel from "./BasicNewLevel";
import TulajdonsagNoveles from "./TulajdonsagNoveles";
import {Tulajdonsag2E, TulajdonsagokTotal} from "../domain-models/tulajdonsag2E";
import {arraySetN} from "../../util";
import {Osztaly2E} from "../domain-models/osztaly2E";
import KalozKritikus from "./KalozKritikus";
import HarcosFegyverSpecializacio from "./HarcosFegyverSpec";

import MultiClassOsztalySelector2E from "./MultiClassOsztalySelector2E";
import {getClassLevels} from "../domain-models/szintlepes";
import KepzettsegSelector from "../display-components/KepzettsegSelector2E";
import {GetAvailableKepzettsegek, Kepzettsegek, KepzettsegId} from "../domain-models/kepzettsegek2E";

function LevelUp(props: {
    szint: number,
    osztaly: Osztaly2E,
    karakter: Karakter2E,
    changeTulajdonsagNoveles: (t: Tulajdonsag2E) => void,
    changeRolledHP: (rolledHP: number) => void,
    changeKalozKritikus: (krit: string) => void,
    changeOsztaly: (osztaly: Osztaly2E) => void,
    changeExtraTolvajKepzettseg: (kepzettseg: KepzettsegId) => void,
}) {
    const {
        szint,
        osztaly,
        karakter,
        changeTulajdonsagNoveles,
        changeRolledHP,
        changeKalozKritikus,
        changeOsztaly,
        changeExtraTolvajKepzettseg
    } = props

    const classLevels = getClassLevels(karakter.szintlepesek)
    
    const harcosSzint = classLevels[Osztaly2E.Harcos]
    const kalozSzint = classLevels[Osztaly2E.Tengeresz]
    const tolvajSzint = classLevels[Osztaly2E.Tolvaj]
    const szintlepes = karakter.szintlepesek[szint-1];
    
    return <div>
        <div className='row mt-3'>
            <h5 className='col align-self-center'>{szint}. Szint</h5>
        </div>
        {osztaly !== Osztaly2E.Druida && 
            <MultiClassOsztalySelector2E 
                faj={karakter.faj} 
                osztaly={osztaly}
                changeOsztaly={changeOsztaly}
                osztalySzint={classLevels[osztaly]}
                dataTestId={`osztaly-${szint}`}
            />}
        {szint % 4 === 0 && 
            <TulajdonsagNoveles
                tulajdonsagok={karakter.tulajdonsagok}
                tulajdonsagNoveles={karakter.szintlepesek[szint-1].tulajdonsagNoveles!}
                changeTulajdonsagNoveles={changeTulajdonsagNoveles}
                dataTestId={`tulajdonsag-${szint}`}
            />}
        <BasicNewLevel
            szint={szint}
            karakter={karakter}
            osztaly={osztaly}
            changeRolledHP={changeRolledHP}
        />
        {osztaly === Osztaly2E.Harcos && harcosSzint % 2 === 1 &&
            <HarcosFegyverSpecializacio
                szint={harcosSzint}
            />
        }
        {osztaly === Osztaly2E.Tengeresz && kalozSzint % 3 === 0 &&
            <KalozKritikus
                kritFegyverId={szintlepes.kalozKritikus!}
                existingKrits={karakter.szintlepesek.map(x => x.kalozKritikus)}
                changeKrit={changeKalozKritikus}
                szint={kalozSzint}
            />
        }
        {osztaly === Osztaly2E.Tolvaj
            && (tolvajSzint === 5 || tolvajSzint === 9)
            && szintlepes.tolvajExtraKepzettseg != null &&
            <div className='row m-2'>
                <label className='col-md-2 col-sm-3 col-form-label'>Extra képzettség</label>
                <KepzettsegSelector
                    selected={Kepzettsegek[szintlepes.tolvajExtraKepzettseg]}
                    kepzettsegek={[Kepzettsegek[szintlepes.tolvajExtraKepzettseg], ...GetAvailableKepzettsegek(karakter)]}
                    dataTestId={`tolvaj-extra-kepzettseg-${szint}`}
                    changeKepzettseg={changeExtraTolvajKepzettseg}
                />
            </div>
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

    const changeExtraTolvajKepzettseg = (szint: number) => {
        return (k: KepzettsegId) => {
            changeKarakter({
                ...karakter,
                szintlepesek: arraySetN(karakter.szintlepesek, szint-1, {
                    ...karakter.szintlepesek[szint-1],
                    tolvajExtraKepzettseg: k,
                })
            })
        }
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
                changeKalozKritikus={changeKalozKritikusAtSzint(szint)}
                changeOsztaly={(o) => changeKarakter(ChangeOsztalyAtSzint(karakter, o, szint))}
                changeExtraTolvajKepzettseg={changeExtraTolvajKepzettseg(szint)}
            />
        )}
    </>
}

export default LevelUps