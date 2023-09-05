import {Faj} from "./faj";
import {Osztaly} from "./osztaly";
import {KarakterTulajdonsagok} from "./tulajdonsag";
import {KarakterMasodlagosErtekek} from "./masodlagos_ertekek";

export interface Karakter {
    Name: string
    Faj: Faj
    Osztaly: Osztaly
    Tulajdonsagok: KarakterTulajdonsagok,
    MasodlagosErtekek: KarakterMasodlagosErtekek
}