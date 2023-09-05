import {Osztaly} from "./osztaly";
import {KarakterTulajdonsagok, Modifier} from "./tulajdonsag";

export interface KarakterMasodlagosErtekek {
    HP: number
    VO: number
    CelzoTB: number
    KozelHarciTB: number
    KitartasMento: number
    ReflexMento: number
    AkarateroMento: number
}

export function CalculateMasodlagosErtekek(osztaly: Osztaly, tulajdonsagok: KarakterTulajdonsagok) : KarakterMasodlagosErtekek {
    return {
        HP: HP(osztaly, tulajdonsagok.t_egs),
        VO: 10 + Modifier(tulajdonsagok.t_ugy),
        KozelHarciTB: KozelharciTB(osztaly, tulajdonsagok),
        CelzoTB: TamadasBonusz(osztaly) + Modifier(tulajdonsagok.t_ugy),

        KitartasMento: KitartasMento(osztaly) + Modifier(tulajdonsagok.t_egs),
        ReflexMento: ReflexMento(osztaly) + Modifier(tulajdonsagok.t_ugy),
        AkarateroMento: AkarateroMento(osztaly) + Modifier(tulajdonsagok.t_bol),
    }
}

function HP(osztaly: Osztaly, egeszseg: number) {
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
    return base + Modifier(egeszseg)
}

function TamadasBonusz(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            return 2;
        case Osztaly.Pap:
        case Osztaly.Tolvaj:
            return 0;
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 0;
    }
}

function KozelharciTB(osztaly: Osztaly, tulajdonsagok: KarakterTulajdonsagok): number {
    const base = TamadasBonusz(osztaly);
    if (osztaly === Osztaly.Kaloz && tulajdonsagok.t_ugy > tulajdonsagok.t_ero) {
        return base + Modifier(tulajdonsagok.t_ugy)
    }
    return base + Modifier(tulajdonsagok.t_ero)
}

function KitartasMento(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
        case Osztaly.Pap:
            return 2;
        case Osztaly.Tolvaj:
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 0;
    }
}

function ReflexMento(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Tolvaj:
            return 2;
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
        case Osztaly.Pap:
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 0;
    }
}

function AkarateroMento(osztaly: Osztaly) : number {
    switch (osztaly){
        case Osztaly.Pap:
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista:
            return 2;
        case Osztaly.Tolvaj:
        case Osztaly.Barbar:
        case Osztaly.Amazon:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
        case Osztaly.Harcos:
            return 0;
    }
}
