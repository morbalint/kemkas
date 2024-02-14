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
    const osztaly = karakter.szintlepesek[0].osztaly 
    const tulajdonsagokTotal = TulajdonsagokTotal(karakter)
    const szint = karakter.szint + 1
    const dice = BaseHP(osztaly)
    const roll = dAny(dice)
    console.log(`Level ${szint} HP roll on d${dice} is: ${roll}`)
    
    const szintlepes: Szintlepes = {
        osztaly: osztaly,
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
    if(osztaly === Osztaly2E.Harcos) {
        const harcosSzint = karakter.szintlepesek.filter(x => x.osztaly === Osztaly2E.Harcos).length + 1
        if (harcosSzint % 2 === 1) {
            const harcosSpecializaciok = karakter.szintlepesek.map(x => x.harcosFegyver)
            let specializationFilter = PickableSpecializationFilter(harcosSpecializaciok, harcosSzint)
            szintlepes.harcosFegyver = AllowedFegyver(Osztaly2E.Harcos).filter(specializationFilter)[0].Id
        }
    }
    if(osztaly === Osztaly2E.Tengeresz) {
        const kalozSzint = karakter.szintlepesek.filter(x => x.osztaly === Osztaly2E.Tengeresz).length + 1
        if (kalozSzint % 3 === 0) {
            let kalozKritikus = karakter.szintlepesek.map(x => x.kalozKritikus)
            let specializationFilter = PickableSpecializationFilter(kalozKritikus, kalozSzint)
            szintlepes.kalozKritikus = AllowedFegyver(Osztaly2E.Tengeresz).filter(specializationFilter)[0].Id
        }
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

export type ClassLevels = {
    [key in Osztaly2E]: number;
};

const defaultClassLevels: ClassLevels = {
    [Osztaly2E.Amazon]: 0,
    [Osztaly2E.Barbar]: 0,
    [Osztaly2E.Ijasz]: 0,
    [Osztaly2E.Harcos]: 0,
    [Osztaly2E.Tengeresz]: 0,
    
    [Osztaly2E.Tolvaj]: 0,
    [Osztaly2E.Pap]: 0,

    [Osztaly2E.Varazslo]: 0,
    [Osztaly2E.Illuzionista]: 0,

    [Osztaly2E.Dalnok]: 0,
    [Osztaly2E.Druida]: 0,
    [Osztaly2E.Vandor]: 0,
}

export function getClassLevels(szintlepesek: Szintlepes[]) : ClassLevels {
    return szintlepesek.map(x => x.osztaly).reduce((classLevels, osztaly) => {
        classLevels[osztaly]++
        return classLevels
    }, {...defaultClassLevels})
}