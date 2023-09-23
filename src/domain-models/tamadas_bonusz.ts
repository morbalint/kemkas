import {Osztaly} from "./osztaly";
import TamadasBonuszTabla from "./tamadas_bonus_tabla.json";
import {Modifier} from "./tulajdonsag";
import {KarakterInputs} from "./karakter";

export function TamadasBonusz(osztaly: Osztaly, szint: number = 1) : number[] {
    let base = []
    switch (osztaly){
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            base = TamadasBonuszTabla['elsodleges'];
            break;
        case Osztaly.Pap:
        case Osztaly.Tolvaj:
            base = TamadasBonuszTabla['ketharmados'];
            break;
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            base = TamadasBonuszTabla['feles'];
            break;
    }
    return base[szint-1]
}

export function KozelharciTB(karakter : Pick<KarakterInputs, 'szint' | 'tulajdonsagok' | 'osztaly'>): number[] {
    const base = TamadasBonusz(karakter.osztaly, karakter.szint);
    let modifier = Modifier(karakter.tulajdonsagok.t_ero)
    if (karakter.osztaly === Osztaly.Kaloz && karakter.tulajdonsagok.t_ugy > karakter.tulajdonsagok.t_ero) {
        modifier = Modifier(karakter.tulajdonsagok.t_ugy)
    }
    return base.map(v => v + modifier)
}
export function CelzoTB(karakter : Pick<KarakterInputs, 'szint' | 'tulajdonsagok' | 'osztaly'>): number[] {
    let base = TamadasBonusz(karakter.osztaly, karakter.szint)
    if (karakter.osztaly === Osztaly.Ijasz) {
        base = [base[0], ...base]
    }
    return base.map(v => v + Modifier(karakter.tulajdonsagok.t_ugy))
}