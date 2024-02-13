import {Osztaly2E} from "./osztaly2E";
import {Karakter2E} from "./karakter2E";
import {KarakterTulajdonsagok, TulajdonsagModosito} from "./tulajdonsag2E";
import {Szintlepes} from "./szintlepes";

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

export function MultiClassMentokAlap(szintlepesek: Szintlepes[]) : Mentok {
    const osztalyok = new Set(szintlepesek.map(x => x.osztaly))
    let mentok = {
        kitartas: 0,
        reflex: 0,
        akaratero: 0
    }
    for (const osztaly of osztalyok) {
        const szint = szintlepesek.filter(x => x.osztaly === osztaly).length
        const uj_mentok = MentokAlap(osztaly, szint)
        mentok.akaratero += uj_mentok.akaratero
        mentok.reflex += uj_mentok.reflex
        mentok.kitartas += uj_mentok.kitartas
    }
    
    return mentok
}

export function MentokTotal(karakter: Pick<Karakter2E, 'szintlepesek' | 'tulajdonsagok'>) {
    const alap = MultiClassMentokAlap(karakter.szintlepesek)
    const modositok = MentoModositok(TulajdonsagModosito(karakter.tulajdonsagok))
    return {
        kitartas: alap.kitartas + modositok.kitartas,
        reflex: alap.reflex + modositok.reflex,
        akaratero: alap.akaratero + modositok.akaratero,
    }
}