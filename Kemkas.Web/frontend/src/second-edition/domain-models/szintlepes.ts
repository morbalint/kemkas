import {Tulajdonsag2E, TulajdonsagIDs, TulajdonsagokTotal} from "./tulajdonsag2E";
import {KepzettsegId} from "./kepzettsegek2E";
import {Osztaly2E} from "./osztaly2E";
import {Karakter2E} from "./karakter2E";
import {BaseHP} from "./masodlagos_ertekek";
import {dAny} from "../../shared/domain-models/kockak";
import {AllowedFegyver} from "./allowed-fegyver";

export interface Szintlepes {
    osztaly: Osztaly2E;
    HProll: number;
    tolvajExtraKepzettseg?: KepzettsegId; // only at level 5 and 9
    harcosFegyver?: string; // every 3rd level
    kalozKritikus?: string; // every odd level
    tulajdonsagNoveles?: Tulajdonsag2E;
}

export function PickableSpecializationFilter(existingSpecilizations: (string | undefined)[], szint: number) {
    return (fegyver: {Id: string}) => existingSpecilizations.filter(x => x === fegyver.Id).length < (szint < 9 ? 1 : 2)
}

export function LevelUp(karakter: Karakter2E, changeKarakter: (input: Karakter2E) => void) {
    const tulajdonsagokTotal = TulajdonsagokTotal(karakter)
    const szint = karakter.szint + 1
    const dice = BaseHP(karakter.osztaly)
    const roll = dAny(dice)
    console.log(`Level ${szint} HP roll on d${dice} is: ${roll}`)
    
    const szintlepes: Szintlepes = {
        osztaly: karakter.osztaly,
        HProll: roll
    }
    
    if (szint % 4 === 0) {
        for (const tulajdonsag of TulajdonsagIDs) {
            if (tulajdonsagokTotal[tulajdonsag] < 18) {
                szintlepes.tulajdonsagNoveles = tulajdonsag;
                break;
            }
        }
    }
    if(karakter.osztaly === Osztaly2E.Harcos && szint % 2 === 1) {
        const harcosSpecializaciok = karakter.szintlepesek.map(x => x.harcosFegyver)
        szintlepes.harcosFegyver = AllowedFegyver(Osztaly2E.Harcos).filter(PickableSpecializationFilter(harcosSpecializaciok, karakter.szint))[0].Id
    }
    if(karakter.osztaly === Osztaly2E.Tengeresz && szint % 3 === 0) {
        let kalozKritikus = karakter.szintlepesek.map(x => x.kalozKritikus)
        szintlepes.kalozKritikus = AllowedFegyver(Osztaly2E.Tengeresz).filter(PickableSpecializationFilter(kalozKritikus, szint))[0].Id
    }
    changeKarakter({...karakter, szint, szintlepesek: [...karakter.szintlepesek, szintlepes]})
}

export function LevelDown(karakter: Karakter2E, changeKarakter: (input: Karakter2E) => void) {
    if (karakter.szintlepesek.length > 1) {
        changeKarakter({...karakter, szint: karakter.szint - 1, szintlepesek: karakter.szintlepesek.slice(0, -1)})   
    }
    else {
        console.error(`Can't level down character: ${karakter}`)
    }
}