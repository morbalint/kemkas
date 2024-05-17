import {Osztaly2E} from "./osztaly2E";
import {CelzoTB, KozelharciTB, TamadasBonusz} from "./tamadas_bonusz";
import {KarakterTulajdonsagok, Modifier} from "./tulajdonsag2E";
import {Szintlepes} from "./szintlepes";
import {d6} from "../../shared/domain-models/kockak";

describe('Tamadas Bonusz calculation', () => {

    describe('Base Tamadas Bonusz', () => {
        test.each([
            [Osztaly2E.Harcos, 1, [1]],
            [Osztaly2E.Amazon, 6, [6,1]],
            [Osztaly2E.Ijasz, 12, [10,7,2]],
            [Osztaly2E.Tolvaj, 1, [0]],
            [Osztaly2E.Tolvaj, 9, [6,1]],
            [Osztaly2E.Pap, 12, [8,3]],
            [Osztaly2E.Varazslo, 1, [0]],
            [Osztaly2E.Varazslo, 12, [6, 1]],
            [Osztaly2E.Illuzionista, 5, [2]],
        ])('%s has a TB of %i at level %i', (osztaly: Osztaly2E, szint: number, expectedTB: number[]) => {
            const actual = TamadasBonusz(osztaly, szint)
            expect(actual).toEqual(expectedTB)
        })
    });

    describe('CelzoTB', () => {
        const szint = 10
        const tulajdonsagok: KarakterTulajdonsagok = {
            t_ugy: 17,
            t_kar: 3,
            t_bol: 3,
            t_egs: 3,
            t_ero: 3,
            t_int: 3,
        }
        const modifier = Modifier(tulajdonsagok.t_ugy)

        it('should be equal base + ugyesseg modifier', () => {
            const osztaly = Osztaly2E.Tolvaj
            const szintlepesek = Array.from({length: szint},
                () => ({ osztaly, HProll: d6(), }))
            const base = TamadasBonusz(osztaly, szint)
            const expected = base.map(x => x + modifier)

            const actual = CelzoTB({
                szintlepesek,
                tulajdonsagok
            })

            expect(actual).toEqual(expected)
        });
    });

    describe('KozelharciTB', () => {
        const szint = 10
        const tulajdonsagok: KarakterTulajdonsagok = {
            t_ugy: 3,
            t_kar: 3,
            t_bol: 3,
            t_egs: 3,
            t_ero: 3,
            t_int: 3,
        }
        const modifier = Modifier(tulajdonsagok.t_ero)

        it('should be equal base + ero modifier', () => {
            const osztaly = Osztaly2E.Pap
            const szintlepesek: Szintlepes[] = Array.from({length: szint},
                () => ({ osztaly, HProll: 1, }));
            const base = TamadasBonusz(osztaly, szint)
            const expected = base.map(x => x + modifier)

            const actual = KozelharciTB({
                szintlepesek,
                tulajdonsagok
            })

            expect(actual).toEqual(expected)
        });
    });

});