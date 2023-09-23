import {Osztaly} from "./osztaly";
import {KarakterTulajdonsagok, TulajdonsagModosito} from "./tulajdonsag";
import {KarakterInputs} from "./karakter";

export interface Mentok {
    kitartas: number
    reflex: number
    akaratero: number
}
export type MentoTipus = keyof Mentok

export function MentoTipusLabel(tipus: MentoTipus): string {
    switch (tipus) {
        case "akaratero":
            return "Akaraterő";
        case "kitartas":
            return  "Kitartás";
        case "reflex":
            return  "Reflex";
    }
}

export function ElsodlegesMento(szint: number): number {
    return Math.min(Math.floor(2 + szint / 2), 10);
}

export function MasodlagosMento(szint: number): number {
    return Math.floor(szint / 3)
}

export function ElsodlegesMentok(osztaly: Osztaly) : MentoTipus[] {
    let t: MentoTipus[] = []
    switch (osztaly){
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            t = ['kitartas'];
            break;
        case Osztaly.Pap:
            t = ['kitartas', 'akaratero'];
            break;
        case Osztaly.Tolvaj:
            t = ['reflex'];
            break;
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            t = ['akaratero']
            break;
    }
    return t
}

export function MentokAlap(osztaly: Osztaly, szint: number = 1) {
    const elsodlegesek = ElsodlegesMentok(osztaly)
    return {
        kitartas: elsodlegesek.includes('kitartas') ? ElsodlegesMento(szint) : MasodlagosMento(szint),
        reflex: elsodlegesek.includes('reflex') ? ElsodlegesMento(szint) : MasodlagosMento(szint),
        akaratero: elsodlegesek.includes('akaratero') ? ElsodlegesMento(szint) : MasodlagosMento(szint),
    }
}

export function MentoModositok(tulajdonsagModositok: KarakterTulajdonsagok) {
    return {
        kitartas: tulajdonsagModositok.t_egs,
        reflex: tulajdonsagModositok.t_ugy,
        akaratero: tulajdonsagModositok.t_bol,
    }
}

export function MentokTotal(karakter: Pick<KarakterInputs, 'osztaly' | 'szint' | 'tulajdonsagok'>) {
    const alap = MentokAlap(karakter.osztaly, karakter.szint)
    const modositok = MentoModositok(TulajdonsagModosito(karakter.tulajdonsagok))
    return {
        kitartas: alap.kitartas + modositok.kitartas,
        reflex: alap.kitartas + modositok.kitartas,
        akaratero: alap.akaratero + modositok.akaratero,
    }
}