import {d6} from "../../shared/domain-models/kockak";
import {Karakter2E} from "./karakter2E";
import {TulajdonsagokFajjal} from "./faj2E";

export enum Tulajdonsag2E {
    Ero = 't_ero',
    Ugyesseg = 't_ugy',
    Egeszseg = 't_egs',
    Intelligencia = 't_int',
    Bolcsesseg = 't_bol',
    Karizma = 't_kar',
}

export type KarakterTulajdonsagok = Record<Tulajdonsag2E, number>

export const TulajdonsagIDs = [
    Tulajdonsag2E.Ero,
    Tulajdonsag2E.Ugyesseg,
    Tulajdonsag2E.Egeszseg,
    Tulajdonsag2E.Intelligencia,
    Tulajdonsag2E.Bolcsesseg,
    Tulajdonsag2E.Karizma
]

export const TulajdonsagDefaults: KarakterTulajdonsagok = {
    t_ero: 10,
    t_ugy: 10,
    t_egs: 10,
    t_int: 10,
    t_bol: 10,
    t_kar: 10,
}

export function TulajdonsagLabel(tul: Tulajdonsag2E) : string {
    switch (tul) {
        case Tulajdonsag2E.Bolcsesseg: return 'Bölcsesség';
        case Tulajdonsag2E.Ero: return 'Erő';
        case Tulajdonsag2E.Ugyesseg: return 'Ügyesség';
        case Tulajdonsag2E.Egeszseg: return 'Egészség';
        case Tulajdonsag2E.Intelligencia: return 'Intelligencia';
        case Tulajdonsag2E.Karizma: return 'Karizma';
    }
}

function rollAbility() {
    let min = 6;
    let sum = 0;
    let rolls: number[] = []
    for (let i = 0; i < 4; i++) {
        const roll = d6();
        if (roll < min) {
            min = roll;
        }
        sum += roll;
        rolls.push(roll)
    }
    const result = sum - min;
    console.log("Rolled: " + rolls + " got: " + result)
    return result;
}

export function RollAllAbilities() : KarakterTulajdonsagok {
    const response = {...TulajdonsagDefaults}
    for (const key of TulajdonsagIDs) {
        response[key] = rollAbility()
    }
    return response
}

export const Modifier = (val : number) => Math.floor(val / 3) - 3

export function TulajdonsagModosito(tulajdonsagok: KarakterTulajdonsagok): KarakterTulajdonsagok {
    let response: KarakterTulajdonsagok = { ...tulajdonsagok }
    for (const key of TulajdonsagIDs) {
        response[key] = Modifier(tulajdonsagok[key])
    }
    return response
}

export function TulajdonsagokTotal(karakter: Pick<Karakter2E, 'tulajdonsagok' | 'faj' | 'szintlepesek'>): KarakterTulajdonsagok {
    const level1 = TulajdonsagokFajjal(karakter.tulajdonsagok, karakter.faj)
    return {
        t_ero: level1.t_ero + karakter.szintlepesek.filter(s => s.tulajdonsagNoveles === 't_ero').length,
        t_ugy: level1.t_ugy + karakter.szintlepesek.filter(s => s.tulajdonsagNoveles === 't_ugy').length,
        t_egs: level1.t_egs + karakter.szintlepesek.filter(s => s.tulajdonsagNoveles === 't_egs').length,
        t_int: level1.t_int + karakter.szintlepesek.filter(s => s.tulajdonsagNoveles === 't_int').length,
        t_bol: level1.t_bol + karakter.szintlepesek.filter(s => s.tulajdonsagNoveles === 't_bol').length,
        t_kar: level1.t_kar + karakter.szintlepesek.filter(s => s.tulajdonsagNoveles === 't_kar').length,
    }
}