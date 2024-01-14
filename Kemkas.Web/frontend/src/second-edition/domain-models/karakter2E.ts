import {KarakterTulajdonsagok, TulajdonsagDefaults} from "./tulajdonsag2E";
import {Faj2E} from "./faj2E";
import {Osztaly2E} from "./osztaly2E";
import {KepzettsegId} from "./kepzettsegek2E";
import {JellemID} from "./jellem";

export interface Karakter2E {
    name: string,
    nem?: string,
    kor: number,
    isten?: string,
    jellem: JellemID,
    tulajdonsagok: KarakterTulajdonsagok
    faj: Faj2E
    osztaly: Osztaly2E
    harcosSpecializaciok: string[],
    kalozKritikus: string[],
    kepzettsegek: KepzettsegId[]
    tolvajKepzettsegek?: KepzettsegId[]
    szint: number,
    hpRolls: number[]
}
export const DefaultKarakter: Karakter2E = {
    name: 'Névtelen Kalandozó',
    kor: 20,
    jellem: 'S',
    tulajdonsagok: TulajdonsagDefaults,
    faj: Faj2E.Ember,
    osztaly: Osztaly2E.Tengeresz,
    harcosSpecializaciok: [],
    kalozKritikus: [],
    kepzettsegek: [],
    tolvajKepzettsegek: [],
    szint: 1,
    hpRolls: []
} 