import {KarakterTulajdonsagok, TulajdonsagDefaults} from "./tulajdonsag2E";
import {Faj2E} from "./faj2E";
import {Osztaly2E} from "./osztaly2E";
import {KepzettsegId} from "./kepzettsegek2E";
import {JellemID} from "./jellem";
import {DefaultFelszereles, KarakterFelszereles} from "./felszereles";
import {Szintlepes} from "./szintlepes";
import {AllowedFegyver} from "./allowed-fegyver";
import {BaseHP} from "./masodlagos_ertekek";
import {dAny} from "../../shared/domain-models/kockak";

export interface Karakter2E {
    nev: string,
    nem?: string,
    kor: number,
    isten?: string,
    jellem: JellemID,
    tulajdonsagok: KarakterTulajdonsagok
    faj: Faj2E
    kepzettsegek: KepzettsegId[]
    tolvajKepzettsegek?: KepzettsegId[]
    szint: number,
    felszereles: KarakterFelszereles,
    szintlepesek: Szintlepes[]
}

export const DefaultKarakter: Karakter2E = {
    nev: 'Névtelen Kalandozó',
    kor: 20,
    jellem: 'S',
    tulajdonsagok: TulajdonsagDefaults,
    faj: Faj2E.Ember,
    kepzettsegek: [],
    tolvajKepzettsegek: [],
    szint: 1,
    felszereles: DefaultFelszereles,
    szintlepesek: [{
        osztaly: Osztaly2E.Tengeresz,
        HProll: 10,
    }]
}

function setOsztalyForSzintLepes(szintlepesek: Szintlepes[], osztaly: Osztaly2E, szint: number): Szintlepes[] {
    const prev = szintlepesek.slice(0, szint-1) 
    const current : Szintlepes = {
        ...szintlepesek[szint-1],
        osztaly,
        harcosFegyver: undefined,
        kalozKritikus: undefined
    }
    const tail = szintlepesek.slice(szint).map(x => {return {...x}})

    let harcosSzint = prev.filter(x => x.osztaly === Osztaly2E.Harcos).length
    // TODO: only pick specializations from valid levels
    const harcosSpecializaciok = szintlepesek
        .map(x => x.harcosFegyver)
        .filter(x => x != null)
    const harcosSpecAtSzint = (hSzint: number): (string | undefined) => {
        if (hSzint % 2 === 1) {
            const specIndex = (hSzint+1)/2 -1
            if (harcosSpecializaciok.length > specIndex ) {
                return  harcosSpecializaciok[specIndex]
            } else {
                return  AllowedFegyver(Osztaly2E.Harcos)[specIndex].Id
            }
        }
        else {
            return undefined
        }
    }
    if (osztaly === Osztaly2E.Harcos) {
        harcosSzint += 1
        current.harcosFegyver = harcosSpecAtSzint(harcosSzint)
    }
    for (let i = 0; i < tail.length; i++) {
        if (tail[i].osztaly === Osztaly2E.Harcos) {
            harcosSzint++
            tail[i].harcosFegyver = harcosSpecAtSzint(harcosSzint)
        }
    }

    let kalozSzint = prev.filter(x => x.osztaly === Osztaly2E.Tengeresz).length
    const existingKalozKrits = szintlepesek
        .map(x => x.kalozKritikus)
        .filter(x => x != null)
    const kalozKritAtSzint = (kSzint: number): (string | undefined) => {
        if (kSzint % 3 === 0) {
            const specIndex = kSzint/3 -1
            if (existingKalozKrits.length > specIndex ) {
                return  existingKalozKrits[specIndex]
            } else {
                return  AllowedFegyver(Osztaly2E.Tengeresz)[specIndex].Id
            }
        }
        else {
            return undefined
        }
    }
    if (osztaly === Osztaly2E.Tengeresz) {
        kalozSzint++
        current.kalozKritikus = kalozKritAtSzint(szint)
    }
    for (let i = 0; i < tail.length; i++) {
        if (tail[i].osztaly === Osztaly2E.Tengeresz) {
            kalozSzint++
            tail[i].kalozKritikus = kalozKritAtSzint(kalozSzint)
        }
    }
    
    const HD = BaseHP(osztaly) 
    if (szint === 1) {
        current.HProll = HD
    } else {
        current.HProll = dAny(HD)
        console.log(`Level ${szint} HP roll on d${HD} is: ${current.HProll} due to class change`)
    }
    return [...prev, current, ...tail]
}

export function ChangeLvl1Osztaly(karakter: Karakter2E, osztaly: Osztaly2E): Karakter2E {
    return {
        ...karakter,
        szintlepesek: [{...karakter.szintlepesek[0], osztaly}, ...karakter.szintlepesek.slice(1)]
    }
}

export function ChangeOsztalyAtSzint(karakter: Karakter2E, osztaly: Osztaly2E, szint: number): Karakter2E {
    return {
        ...karakter,
        szintlepesek: setOsztalyForSzintLepes(karakter.szintlepesek, osztaly, szint)
    }
}
