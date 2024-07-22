import {Osztaly2E} from "./osztaly2E";
import spells from "../data/spells.json";

export interface Cantrip {
    szint: 0,
    id: string,
    nev: string,
    leiras: string,
    megfordithato: boolean,
    variabilis: boolean,
    komponens?: string,
    opcionalis_komponens?: string,
}

export interface MagasabbSzintuVarazslat {
    szint: 1 | 2 | 3 | 4 | 5,
    id: string,
    d100_start: number,
    d100_end: number,
    nev: string,
    leiras: string,
    megfordithato: boolean,
    variabilis: boolean,
    komponens?: string,
    opcionalis_komponens?: string,
}

export type Varazslat = Cantrip | MagasabbSzintuVarazslat;

export interface OsztalyCantrip extends Cantrip {
    Osztaly2E: Osztaly2E
}

export interface OsztalySzintVarazslat extends MagasabbSzintuVarazslat {
    Osztaly2E: Osztaly2E
}

export type OsztalyVarazslat = OsztalyCantrip | OsztalySzintVarazslat;

export interface KarakterVarazslat {
    id: string
    bekeszitve: boolean
}

export function GetCantrips(osztaly: Osztaly2E): Cantrip[] {
    switch (osztaly) {
        case Osztaly2E.Pap:
            return spells.pap.tomor.filter(x => x.szint === 0).map(x => x as Cantrip)
        case Osztaly2E.Dalnok:
            return spells.dalnok.tomor.filter(x => x.szint === 0).map(x => x as Cantrip)
        case Osztaly2E.Druida:
            return spells.druida.tomor.filter(x => x.szint === 0).map(x => x as Cantrip)
        case Osztaly2E.Varazslo:
            return spells.varazslo.tomor.filter(x => x.szint === 0).map(x => x as Cantrip)
        case Osztaly2E.Illuzionista:
            return spells.illuzionista.tomor.filter(x => x.szint === 0).map(x => x as Cantrip)
        default:
            return []
    }
}

export function GetLeveledSpells(osztaly: Osztaly2E): MagasabbSzintuVarazslat[] {
    switch (osztaly) {
        case Osztaly2E.Pap:
            return spells.pap.tomor.filter(x => x.szint > 0).map(x => x as MagasabbSzintuVarazslat)
        case Osztaly2E.Dalnok:
            return spells.dalnok.tomor.filter(x => x.szint > 0).map(x => x as MagasabbSzintuVarazslat)
        case Osztaly2E.Druida:
            return spells.druida.tomor.filter(x => x.szint > 0).map(x => x as MagasabbSzintuVarazslat)
        case Osztaly2E.Varazslo:
            return spells.varazslo.tomor.filter(x => x.szint > 0).map(x => x as MagasabbSzintuVarazslat)
        case Osztaly2E.Illuzionista:
            return spells.illuzionista.tomor.filter(x => x.szint > 0).map(x => x as MagasabbSzintuVarazslat)
        default:
            return []
    }
}