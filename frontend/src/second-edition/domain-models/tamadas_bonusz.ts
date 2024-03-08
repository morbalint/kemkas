import {Osztaly2E} from "./osztaly2E";
import {Karakter2E} from "./karakter2E";
import {Modifier} from "./tulajdonsag2E";
import {Szintlepes} from "./szintlepes";

/// Finally second edition doesn't mess with the extra attack of high level clerics rouges and wizards!
function ExtraAttack(attack: number): number[] {
    if (attack < 6) {
        return [attack]
    }
    return [Math.min(attack, 10), ...ExtraAttack(attack - 5)]
}

export function TamadasBonuszBase(osztaly: Osztaly2E, szint: number = 1) : number {
    let base = 0
    switch (osztaly){
        case Osztaly2E.Barbar:
        case Osztaly2E.Amazon:
        case Osztaly2E.Ijasz:
        case Osztaly2E.Tengeresz:
        case Osztaly2E.Harcos:
        case Osztaly2E.Vandor:
            base = szint;
            break;
        case Osztaly2E.Pap:
        case Osztaly2E.Tolvaj:
        case Osztaly2E.Dalnok:
        case Osztaly2E.Druida:
            base = Math.floor(szint * 2 / 3);
            break;
        case Osztaly2E.Varazslo:
        case Osztaly2E.Illuzionista:
            base = Math.floor(szint / 2);
            break;
    }
    return base
}

export function TamadasBonusz(osztaly: Osztaly2E, szint: number = 1) : number[] {
    let base = 0
    switch (osztaly){
        case Osztaly2E.Barbar:
        case Osztaly2E.Amazon:
        case Osztaly2E.Ijasz:
        case Osztaly2E.Tengeresz:
        case Osztaly2E.Harcos:
        case Osztaly2E.Vandor:
            base = szint;
            break;
        case Osztaly2E.Pap:
        case Osztaly2E.Tolvaj:
        case Osztaly2E.Dalnok:
        case Osztaly2E.Druida:
            base = Math.floor(szint * 2 / 3);
            break;
        case Osztaly2E.Varazslo:
        case Osztaly2E.Illuzionista:
            base = Math.floor(szint / 2);
            break;
    }
    return ExtraAttack(base)
}


export function MultiClassTamadasBonusz(szintlepesek: Szintlepes[]) : number[]{
    const osztalyok = new Set(szintlepesek.map(x => x.osztaly))
    let TBB = 0
    for (const osztaly of osztalyok) {
        const szint = szintlepesek.filter(x => x.osztaly === osztaly).length
        TBB += TamadasBonuszBase(osztaly, szint)
    }
    return ExtraAttack(TBB)
}

export function KozelharciTB(karakter : Pick<Karakter2E, 'szintlepesek' | 'tulajdonsagok'>): number[] {
    const base = MultiClassTamadasBonusz(karakter.szintlepesek);
    let modifier = Modifier(karakter.tulajdonsagok.t_ero)
    return base.map(v => v + modifier)
}
export function CelzoTB(karakter : Pick<Karakter2E, 'szintlepesek' | 'tulajdonsagok'>): number[] {
    let base = MultiClassTamadasBonusz(karakter.szintlepesek)
    return base.map(v => v + Modifier(karakter.tulajdonsagok.t_ugy))
}