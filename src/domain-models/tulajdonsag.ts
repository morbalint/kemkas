import {d6} from "./kockak";
import {Faj} from "./faj";

export enum Tulajdonsag {
    Ero = 't_ero',
    Ugyesseg = 't_ugy',
    Egeszseg = 't_egs',
    Intelligencia = 't_int',
    Bolcsesseg = 't_bol',
    Karizma = 't_kar',
}

export type KarakterTulajdonsagok = Record<Tulajdonsag, number>

export const TulajdonsagDefaults: KarakterTulajdonsagok = {
    t_ero: 10,
    t_ugy: 10,
    t_egs: 10,
    t_int: 10,
    t_bol: 10,
    t_kar: 10,
}

export function TulajdonsagLabel(tul: Tulajdonsag) : string {
    switch (tul) {
        case Tulajdonsag.Bolcsesseg: return 'Bölcsesség';
        case Tulajdonsag.Ero: return 'Erő';
        case Tulajdonsag.Ugyesseg: return 'Ügyesség';
        case Tulajdonsag.Egeszseg: return 'Egészség';
        case Tulajdonsag.Intelligencia: return 'Intelligencia';
        case Tulajdonsag.Karizma: return 'Karizma';
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
    return {
        t_ero: rollAbility(),
        t_ugy: rollAbility(),
        t_egs: rollAbility(),
        t_int: rollAbility(),
        t_bol: rollAbility(),
        t_kar: rollAbility(),
    }
}

export const Modifier = (val : number) => Math.floor(val / 3) - 3

export function TulajdonsagModosito(tulajdonsagok: KarakterTulajdonsagok): KarakterTulajdonsagok {
    let response: KarakterTulajdonsagok = { ...tulajdonsagok }
    const keys = Object.keys(tulajdonsagok) as (keyof KarakterTulajdonsagok)[]
    for (const key of keys) {
        response[key] = Modifier(tulajdonsagok[key])
    }
    return response
}

// noinspection OverlyComplexFunctionJS,FunctionTooLongJS
function tulajdonsagModositokPerFaj(tul: Tulajdonsag, faj: Faj) : number {
    switch (faj) {
        case Faj.Birodalmi: switch (tul) {
            case Tulajdonsag.Egeszseg: return -1;
            case Tulajdonsag.Intelligencia: return +1;
            default: return 0;
        }
        case Faj.Eszaki: switch (tul) {
            case Tulajdonsag.Ero: return +1;
            case Tulajdonsag.Bolcsesseg: return -1;
            default: return 0;
        }
        case Faj.Etuniai: switch (tul) {
            case Tulajdonsag.Egeszseg: return +1;
            case Tulajdonsag.Bolcsesseg: return -1;
            default: return 0
        }
        case Faj.Osember: switch (tul) {
            case Tulajdonsag.Ero: return +1;
            case Tulajdonsag.Egeszseg: return +1;
            case Tulajdonsag.Intelligencia: return -1;
            case Tulajdonsag.Bolcsesseg: return -1;
            default: return 0
        }
        case Faj.Elf: switch (tul) {
            case Tulajdonsag.Egeszseg: return -1;
            case Tulajdonsag.Ugyesseg: return +1;
            default: return 0;
        }
        case Faj.Felork: switch (tul) {
            case Tulajdonsag.Ero: return +1;
            case Tulajdonsag.Egeszseg: return +1;
            case Tulajdonsag.Karizma: return -2;
            default: return 0;
        }
        case Faj.Felszerzet: switch (tul) {
            case Tulajdonsag.Ero: return -1;
            case Tulajdonsag.Ugyesseg: return +1;
            default: return 0;
        }
        case Faj.Gnom: switch (tul) {
            case Tulajdonsag.Ero: return -1;
            case Tulajdonsag.Intelligencia: return +1;
            default: return 0;
        }
        case Faj.Torpe: switch (tul) {
            case Tulajdonsag.Egeszseg: return +1;
            case Tulajdonsag.Karizma: return -1;
            default: return 0;
        }

        default: return 0;
    }
}

export function TulajdonsagModositokFajokra(tul: Tulajdonsag) {
    return (faj: Faj) => tulajdonsagModositokPerFaj(tul, faj);
}

export function FajiTulajdonsagModositok(faj: Faj) : KarakterTulajdonsagok {
    return {
        [Tulajdonsag.Ero]: tulajdonsagModositokPerFaj(Tulajdonsag.Ero, faj),
        [Tulajdonsag.Ugyesseg]: tulajdonsagModositokPerFaj(Tulajdonsag.Ugyesseg, faj),
        [Tulajdonsag.Egeszseg]: tulajdonsagModositokPerFaj(Tulajdonsag.Egeszseg, faj),
        [Tulajdonsag.Intelligencia]: tulajdonsagModositokPerFaj(Tulajdonsag.Intelligencia, faj),
        [Tulajdonsag.Bolcsesseg]: tulajdonsagModositokPerFaj(Tulajdonsag.Bolcsesseg, faj),
        [Tulajdonsag.Karizma]: tulajdonsagModositokPerFaj(Tulajdonsag.Karizma, faj),
    }
}

export function TulajdonsagokFajjal(tulajdonsagok: KarakterTulajdonsagok, faj: Faj): KarakterTulajdonsagok {
    return {
        [Tulajdonsag.Ero]: tulajdonsagok.t_ero + tulajdonsagModositokPerFaj(Tulajdonsag.Ero, faj),
        [Tulajdonsag.Ugyesseg]: tulajdonsagok.t_ugy + tulajdonsagModositokPerFaj(Tulajdonsag.Ugyesseg, faj),
        [Tulajdonsag.Egeszseg]: tulajdonsagok.t_egs + tulajdonsagModositokPerFaj(Tulajdonsag.Egeszseg, faj),
        [Tulajdonsag.Intelligencia]: tulajdonsagok.t_int + tulajdonsagModositokPerFaj(Tulajdonsag.Intelligencia, faj),
        [Tulajdonsag.Bolcsesseg]: tulajdonsagok.t_bol + tulajdonsagModositokPerFaj(Tulajdonsag.Bolcsesseg, faj),
        [Tulajdonsag.Karizma]: tulajdonsagok.t_kar + tulajdonsagModositokPerFaj(Tulajdonsag.Karizma, faj),
    }
}