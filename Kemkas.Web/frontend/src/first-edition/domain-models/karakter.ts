import {Faj} from "./faj";
import {Osztaly} from "./osztaly";
import {KarakterTulajdonsagok, Tulajdonsag, TulajdonsagDefaults} from "./tulajdonsag";
import {KepzettsegId} from "./kepzettsegek";
import {JellemID} from "./jellem";
import { DefaultFelszereles, KarakterFelszereles } from './felszereles'

export interface KarakterInputs {
    name: string,
    nem?: string,
    kor: number,
    jellem: JellemID,
    isten?: string,
    faj: Faj,
    osztaly: Osztaly,
    tulajdonsagok: KarakterTulajdonsagok,
    kepzettsegek: KepzettsegId[],
    tolvajKepzettsegek?: KepzettsegId[]
    szint: number
    hpRolls: number[],
    tulajdonsagNovelesek: Tulajdonsag[],
    harcosSpecializaciok: string[],
    kalozKritikus: string[],
    felszereles: KarakterFelszereles,
}

export const KarakterDefaults: KarakterInputs = {
    name: "Névtelen Kalandozó",
    faj: Faj.Ember,
    kor: 20,
    jellem: 'S',
    tulajdonsagok: TulajdonsagDefaults,
    osztaly: Osztaly.Kaloz,
    kepzettsegek: [],
    szint: 1,
    hpRolls: [],
    tulajdonsagNovelesek: [],
    harcosSpecializaciok: [],
    kalozKritikus: [],
    felszereles: DefaultFelszereles,
}
