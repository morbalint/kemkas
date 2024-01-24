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
    name: string,
    nem?: string,
    kor: number,
    isten?: string,
    jellem: JellemID,
    tulajdonsagok: KarakterTulajdonsagok
    faj: Faj2E
    osztaly: Osztaly2E
    kepzettsegek: KepzettsegId[]
    tolvajKepzettsegek?: KepzettsegId[]
    szint: number,
    felszereles: KarakterFelszereles,
    szintlepesek: Szintlepes[]
}

export const DefaultKarakter: Karakter2E = {
    name: 'Névtelen Kalandozó',
    kor: 20,
    jellem: 'S',
    tulajdonsagok: TulajdonsagDefaults,
    faj: Faj2E.Ember,
    osztaly: Osztaly2E.Tengeresz,
    kepzettsegek: [],
    tolvajKepzettsegek: [],
    szint: 1,
    felszereles: DefaultFelszereles,
    szintlepesek: [{
        osztaly: Osztaly2E.Tengeresz,
        HProll: 10,
    }]
}

function setOsztalyForSzintLepes(szintlepes: Szintlepes, osztaly: Osztaly2E, szint: number): Szintlepes {
    const base : Szintlepes = {
        ...szintlepes,
        osztaly,
        harcosFegyver: undefined,
        kalozKritikus: undefined
    }
    
    if (osztaly === Osztaly2E.Harcos && szint % 2 === 1) {
        base.harcosFegyver = AllowedFegyver(Osztaly2E.Harcos)[szint].Id
    }
    if (osztaly === Osztaly2E.Tengeresz && szint % 3 === 0) {
        base.kalozKritikus = AllowedFegyver(Osztaly2E.Tengeresz)[szint].Id
    }
    const HD = BaseHP(osztaly) 
    if (szint === 1) {
        base.HProll = HD
    } else {
        base.HProll = dAny(HD)
        console.log(`Level ${szint} HP roll on d${HD} is: ${base.HProll} due to class change`)
    }
    return base
}

export function ChangeLvl1Osztaly(karakter: Karakter2E, osztaly: Osztaly2E): Karakter2E {
    return {
        ...karakter,
        osztaly,
        szintlepesek: karakter.szintlepesek.map((l, idx) => setOsztalyForSzintLepes(l, osztaly, idx +1))
    }
}
