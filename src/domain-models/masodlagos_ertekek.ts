import {Mentok, MentokTotal} from "./mentok";
import {Osztaly} from "./osztaly";
import {KarakterInputs} from "./karakter";
import {Modifier} from "./tulajdonsag";
import {CelzoTB, KozelharciTB} from "./tamadas_bonusz";
import {Faj} from "./faj";
import { GetPajzs, GetPancel, MaxAbilityVO } from "./felszereles";

export interface MasodlagosErtekekView {
    HP: number
    VO: number
    KozelharciTB: number[]
    CelzoTB: number[]
    Mentok: Mentok
}

export type KarakterpickForMasodlagosErtekek = Pick<KarakterInputs, 'osztaly' | 'hpRolls' | 'tulajdonsagok' | 'szint' | 'faj' | 'felszereles'>

export function BaseHP(osztaly: Osztaly) {
    let base = 4;
    switch (osztaly){
        case Osztaly.Barbar:
            base = 12
            break;
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            base = 10;
            break
        case Osztaly.Pap:
            base = 8;
            break;
        case Osztaly.Tolvaj:
            base = 6;
            break;
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            base = 4;
            break;
    }
    return base
}

export function HP(karakter: Pick<KarakterInputs, 'osztaly' | 'tulajdonsagok' | 'hpRolls'>): number {
    const egeszsegModifier = Modifier(karakter.tulajdonsagok.t_egs)
    return BaseHP(karakter.osztaly) + egeszsegModifier + karakter.hpRolls
        // https://lfg.hu/forum/topic/15079-kard-es-magia/page/219/#comment-2218333
        .map(hp => Math.max(1, hp + egeszsegModifier))
        .reduce((sum, val) => sum + val, 0)
}

export function VO(karakter: Pick<KarakterInputs, 'tulajdonsagok' | 'faj' | 'osztaly' | 'szint' | 'felszereles'>): number {
    const pancel = GetPancel(karakter.felszereles.pancelID)
    const pancelVO = pancel?.VO ?? 0
    const pajzsVO = GetPajzs(karakter.felszereles.pajzsID)?.VO ?? 0
    let vo = 10 + pajzsVO + pancelVO
    let abilityVO = Modifier(karakter.tulajdonsagok.t_ugy)
    if (karakter.osztaly === Osztaly.Kaloz) {
        vo += Math.floor(karakter.szint / 3)
    }
    if (karakter.osztaly === Osztaly.Amazon) {
        if (karakter.tulajdonsagok.t_kar > karakter.tulajdonsagok.t_ugy) {
            abilityVO = Modifier(karakter.tulajdonsagok.t_kar)
        }
        vo += Math.floor(karakter.szint / 2)
    }
    if (karakter.faj === Faj.Felszerzet){
        vo += 1
    }
    if (pancel) {
        abilityVO = Math.min(MaxAbilityVO(pancel.Type), abilityVO)
    }
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