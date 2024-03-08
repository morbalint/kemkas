import {Mentok, MentokTotal} from "./mentok";
import {Osztaly2E} from "./osztaly2E";
import {Karakter2E} from "./karakter2E";
import {CelzoTB, KozelharciTB} from "./tamadas_bonusz";
import {Faj2E} from "./faj2E";
import {Modifier} from "./tulajdonsag2E";
import {GetPajzs, GetPancel, MaxAbilityVO} from "./felszereles";

export interface MasodlagosErtekekView {
    HP: number
    VO: number
    KozelharciTB: number[]
    CelzoTB: number[]
    Mentok: Mentok
}

export type KarakterpickForMasodlagosErtekek = Pick<Karakter2E, 'tulajdonsagok' | 'szint' | 'szintlepesek' | 'faj' | 'felszereles'>

export function BaseHP(osztaly: Osztaly2E) {
    let base = 4;
    switch (osztaly){
        case Osztaly2E.Barbar:
            base = 12
            break;
        case Osztaly2E.Amazon:
        case Osztaly2E.Ijasz:
        case Osztaly2E.Tengeresz:
        case Osztaly2E.Harcos:
        case Osztaly2E.Vandor:
            base = 10;
            break
        case Osztaly2E.Pap:
        case Osztaly2E.Druida:
            base = 8;
            break;
        case Osztaly2E.Tolvaj:
        case Osztaly2E.Dalnok:
            base = 6;
            break;
        case Osztaly2E.Varazslo:
        case Osztaly2E.Illuzionista:
            base = 4;
            break;
    }
    return base
}

export function HP(karakter: Pick<Karakter2E, 'tulajdonsagok' | 'szintlepesek'>): number {
    const egeszsegModifier = Modifier(karakter.tulajdonsagok.t_egs)
    return karakter.szintlepesek
        // https://lfg.hu/forum/topic/15079-kard-es-magia/page/219/#comment-2218333
        .map(szint => Math.max(1, szint.HProll + egeszsegModifier))
        .reduce((sum, val) => sum + val, 0)
}

export function VOegyeb(karakter: Pick<Karakter2E, 'faj'| 'szintlepesek'>): number {
    const osztalyok = new Set(karakter.szintlepesek.map(x => x.osztaly))
    let vo = 0;
    if (osztalyok.has(Osztaly2E.Tengeresz)) {
        const kalozSzintek = karakter.szintlepesek.filter(x => x.osztaly === Osztaly2E.Tengeresz).length
        vo += Math.floor(kalozSzintek / 3)
    }
    if (osztalyok.has(Osztaly2E.Amazon)) {
        
        const amazonSzintek = karakter.szintlepesek.filter(x => x.osztaly === Osztaly2E.Amazon).length
        vo += Math.floor(amazonSzintek / 2)
    }
    if (karakter.faj === Faj2E.Felszerzet || karakter.faj === Faj2E.Gnom){
        vo += 1
    }
    return vo;
}

export function VO(karakter: Pick<Karakter2E, 'tulajdonsagok' | 'faj' | 'szintlepesek' | 'szint' | 'felszereles'>): number {
    const osztalyok = new Set(karakter.szintlepesek.map(x => x.osztaly))
    const pancel = GetPancel(karakter.felszereles.pancelID)
    const pancelVO = pancel?.VO ?? 0
    const pajzsVO = GetPajzs(karakter.felszereles.pajzsID)?.VO ?? 0
    let vo = 10 + pajzsVO + pancelVO
    let abilityVO = Modifier(karakter.tulajdonsagok.t_ugy)
    if (pancel) {
        abilityVO = Math.min(MaxAbilityVO(pancel.Type), abilityVO)
    }
    if (osztalyok.has(Osztaly2E.Amazon)){
        if (karakter.tulajdonsagok.t_kar > karakter.tulajdonsagok.t_ugy) {
            abilityVO = Modifier(karakter.tulajdonsagok.t_kar)
        }
    }
    vo += VOegyeb(karakter)
    vo += abilityVO

    return vo
}

export function CalculateMasodlagosErtekek(karakter: KarakterpickForMasodlagosErtekek): MasodlagosErtekekView {
    return {
        HP: HP(karakter),
        VO: VO(karakter),
        CelzoTB: CelzoTB(karakter),
        KozelharciTB: KozelharciTB(karakter),
        Mentok: MentokTotal(karakter)
    }
}