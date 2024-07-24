import {Osztaly2E} from "./osztaly2E";
import spells from "../data/spells.json";
import spell_details from "../data/spell_details.json"

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
    osztaly: Osztaly2E
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

export function ClassSpells(osztaly: Osztaly2E): Varazslat[] {
    switch (osztaly) {
        case Osztaly2E.Vandor:
        case Osztaly2E.Varazslo:
            return spells.varazslo.tomor as Varazslat[]
        case Osztaly2E.Illuzionista:
            return spells.illuzionista.tomor as Varazslat[]
        case Osztaly2E.Dalnok:
            return spells.dalnok.tomor as Varazslat[]
        case Osztaly2E.Druida:
            return spells.druida.tomor as Varazslat[]
        case Osztaly2E.Pap:
            return spells.pap.tomor as Varazslat[]
        default:
            return [];
    }
}

export interface VarazslatOsztalySzint {
    osztaly: Osztaly2E,
    szint: number,
}

export interface SpellDetails {
    id: string,
    nev: string,
    megfordithato: boolean,
    kell_komponens: boolean,
    extra_komponens: boolean,
    variabilis: boolean,
    osztaly_szint: VarazslatOsztalySzint[],
    tavolsag: string,
    hatoido: string,
    terulet: string,
    mentodobas: string,
    leiras: string[],
    tablazat: string[][],
}

export function GetSpellDetails(id: string): SpellDetails | undefined {
    return spell_details.details.find(x => x.id === id) as SpellDetails | undefined
}
