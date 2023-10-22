import {BaseHP} from "./masodlagos_ertekek";
import {dAny} from "./kockak";
import {TulajdonsagIDs, TulajdonsagokTotal} from "./tulajdonsag";
import {KarakterInputs} from "./karakter";
import {GetFajDetails} from "./faj";
import {Osztaly} from "./osztaly";


export function LevelUp(karakter: KarakterInputs, changeKarakter: (input: KarakterInputs) => void) {
    const tulajdonsagokTotal = TulajdonsagokTotal(karakter)
    const szint = karakter.szint + 1
    const dice = BaseHP(karakter.osztaly)
    const roll = dAny(dice)
    const hpRolls = [...karakter.hpRolls, roll]
    console.log(`Level ${szint} HP roll on d${dice} is: ${roll}`)
    let tulajdonsagNovelesek = karakter.tulajdonsagNovelesek
    if (szint % 4 === 0) {
        for (const tulajdonsag of TulajdonsagIDs) {
            if (tulajdonsagokTotal[tulajdonsag] < 18) {
                tulajdonsagNovelesek = [...tulajdonsagNovelesek, tulajdonsag]
                break;
            }
        }
    }
    let harcosSpecializaciok = karakter.harcosSpecializaciok
    if(karakter.osztaly === Osztaly.Harcos && szint % 2 === 1) {
        harcosSpecializaciok = [...harcosSpecializaciok, "csatabard"]
    }
    let kalozKritikus = karakter.kalozKritikus
    if(karakter.osztaly === Osztaly.Kaloz && szint % 3 === 0) {
        kalozKritikus = [...kalozKritikus, "szablya"]
    }
    changeKarakter({...karakter, szint, hpRolls, tulajdonsagNovelesek, harcosSpecializaciok, kalozKritikus})
}

export function LevelDown(karakter: KarakterInputs, changeKarakter: (input: KarakterInputs) => void) {
    let tulajdonsagNovelesek = karakter.tulajdonsagNovelesek
    if (karakter.szint % 4 === 0) {
        tulajdonsagNovelesek = tulajdonsagNovelesek.slice(0, -1)
    }
    const szint = karakter.szint - 1
    const hpRolls = karakter.hpRolls.slice(0, -1)
    let harcosSpecializaciok = karakter.harcosSpecializaciok
    if (karakter.osztaly === Osztaly.Harcos && szint % 2 === 0) {
        harcosSpecializaciok = harcosSpecializaciok.slice(0, -1)
    }
    changeKarakter({...karakter, szint, hpRolls, tulajdonsagNovelesek, harcosSpecializaciok})
}

export function CanLevelUp(karakter: Pick<KarakterInputs, 'szint' | 'faj' | 'osztaly'>): boolean {
    return karakter.szint < 10 && karakter.szint < GetFajDetails(karakter.faj).Szintkorlatok[karakter.osztaly]
}