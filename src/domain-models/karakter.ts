import {Faj} from "./faj";
import {Osztaly} from "./osztaly";
import {KarakterTulajdonsagok, TulajdonsagDefaults} from "./tulajdonsag";
import {KepzettsegId} from "./kepzettsegek";

export interface KarakterInputs {
    name: string,
    nem?: string,
    kor: number,
    isten?: string,
    faj: Faj,
    osztaly: Osztaly,
    tulajdonsagok: KarakterTulajdonsagok,
    kepzettsegek: KepzettsegId[],
    tolvajKepzettsegek?: KepzettsegId[]
    szint: number
    HProlls: number[],
}

export const KarakterDefaults: KarakterInputs = {
    name: "Névtelen Kalandozó",
    faj: Faj.Ember,
    kor: 20,
    tulajdonsagok: TulajdonsagDefaults,
    osztaly: Osztaly.Harcos,
    kepzettsegek: [],
    szint: 1,
    HProlls: [],
}

