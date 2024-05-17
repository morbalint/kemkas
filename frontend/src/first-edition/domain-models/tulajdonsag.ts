import {TulajdonsagokFajjal} from "./faj";
import {KarakterInputs} from "./karakter";

import {RollAbility} from "../../shared/domain-models/rollAbility";

export enum Tulajdonsag {
    Ero = 't_ero',
    Ugyesseg = 't_ugy',
    Egeszseg = 't_egs',
    Intelligencia = 't_int',
    Bolcsesseg = 't_bol',
    Karizma = 't_kar',
}

export type KarakterTulajdonsagok = Record<Tulajdonsag, number>

export const TulajdonsagIDs = [
    Tulajdonsag.Ero,
    Tulajdonsag.Ugyesseg,
    Tulajdonsag.Egeszseg,
    Tulajdonsag.Intelligencia,
    Tulajdonsag.Bolcsesseg,
    Tulajdonsag.Karizma
]

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

export function RollAllAbilities() : KarakterTulajdonsagok {
    const response = {...TulajdonsagDefaults}
    for (const key of TulajdonsagIDs) {
        response[key] = RollAbility()
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

export function TulajdonsagokTotal(karakter: Pick<KarakterInputs, 'tulajdonsagok' | 'faj' | 'tulajdonsagNovelesek'>): KarakterTulajdonsagok {
    const response = TulajdonsagokFajjal(karakter.tulajdonsagok, karakter.faj)
    for (const tulajdonsag of karakter.tulajdonsagNovelesek) {
        // @ts-ignore // Trust me bro!
        response[tulajdonsag] += 1
    }
    return response
}
