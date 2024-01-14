import {Osztaly2E} from "./osztaly2E";
import {Karakter2E} from "./karakter2E";
import {KarakterTulajdonsagok, TulajdonsagModosito} from "./tulajdonsag2E";

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
    return 2 + Math.floor(szint / 2);
}

export function MasodlagosMento(szint: number): number {
    return Math.floor(szint / 3)
}

export function ElsodlegesMentok(osztaly: Osztaly2E) : MentoTipus[] {
    let t: MentoTipus[] = []
    switch (osztaly){
        case Osztaly2E.Barbar:
        case Osztaly2E.Amazon:
        case Osztaly2E.Ijasz:
        case Osztaly2E.Tengeresz:
        case Osztaly2E.Harcos:
        case Osztaly2E.Vandor:
            t = ['kitartas'];
            break;
        case Osztaly2E.Druida:
        case Osztaly2E.Pap:
            t = ['kitartas', 'akaratero'];
            break;
        case Osztaly2E.Tolvaj:
        case Osztaly2E.Dalnok:
            t = ['reflex'];
            break;
        case Osztaly2E.Varazslo:
        case Osztaly2E.Illuzionista:
            t = ['akaratero']
            break;
        
    }
    return t;
}

export function MentokAlap(osztaly: Osztaly2E, szint: number = 1) {
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

export function MentokTotal(karakter: Pick<Karakter2E, 'osztaly' | 'szint' | 'tulajdonsagok'>) {
    const alap = MentokAlap(karakter.osztaly, karakter.szint)
    const modositok = MentoModositok(TulajdonsagModosito(karakter.tulajdonsagok))
    return {
        kitartas: alap.kitartas + modositok.kitartas,
        reflex: alap.reflex + modositok.reflex,
        akaratero: alap.akaratero + modositok.akaratero,
    }
}