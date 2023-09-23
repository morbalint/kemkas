import {Osztaly} from "./osztaly";
import {CelzoTB, KozelharciTB, TamadasBonusz} from "./tamadas_bonusz";
import {KarakterTulajdonsagok, Modifier} from "./tulajdonsag";

describe('Tamadas Bonusz calculation', () => {

    describe('Base Tamadas Bonusz', () => {
        test.each([
            [Osztaly.Harcos, 1, [1]],
            [Osztaly.Amazon, 6, [6,1]],
            [Osztaly.Ijasz, 20, [10,10,10]],
            [Osztaly.Tolvaj, 1, [0]],
            [Osztaly.Tolvaj, 9, [6,1]],
            [Osztaly.Pap, 17, [10,6]],
            [Osztaly.Varazslo, 1, [0]],
            [Osztaly.Varazslo, 12, [6]],
            [Osztaly.Illuzionista, 20, [10]],
        ])('%s has a TB of %i at level %i', (osztaly: Osztaly, szint: number, expectedTB: number[]) => {
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
            const osztaly = Osztaly.Tolvaj
            const base = TamadasBonusz(osztaly, szint)
            const expected = base.map(x => x + modifier)

            const actual = CelzoTB({
                osztaly,
                szint,
                tulajdonsagok
            })

            expect(actual).toEqual(expected)
        });
        it('should double the first base TB for Íjjász', () => {
            const osztaly = Osztaly.Ijasz
            const base = TamadasBonusz(osztaly, szint)
            const ijjaszDoubleBase = [base[0], ...base]
            const expected = ijjaszDoubleBase.map(x => x + modifier)

            const actual = CelzoTB({
                osztaly,
                szint,
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
            const osztaly = Osztaly.Tolvaj
            const base = TamadasBonusz(osztaly, szint)
            const expected = base.map(x => x + modifier)

            const actual = KozelharciTB({
                osztaly,
                szint,
                tulajdonsagok
            })

            expect(actual).toEqual(expected)
        });
        it('should use t_ugy for Kaloz if t_ugy > t_ero', () => {
            const osztaly = Osztaly.Kaloz
            const tulajdonsagok: KarakterTulajdonsagok = {
                t_ugy: 17,
                t_kar: 3,
                t_bol: 3,
                t_egs: 3,
                t_ero: 3,
                t_int: 3,
            }
            const modifier = Modifier(tulajdonsagok.t_ugy)
            const base = TamadasBonusz(osztaly, szint)
            const expected = base.map(x => x + modifier)

            const actual = KozelharciTB({
                osztaly,
                szint,
                tulajdonsagok
            })

            expect(actual).toEqual(expected)
        });
        it('should use t_ero for Kaloz if t_ero > t_ugy', () => {
            const osztaly = Osztaly.Kaloz
            const tulajdonsagok: KarakterTulajdonsagok = {
                t_ugy: 3,
                t_kar: 3,
                t_bol: 3,
                t_egs: 3,
                t_ero: 13,
                t_int: 3,
            }
            const modifier = Modifier(tulajdonsagok.t_ero)
            const base = TamadasBonusz(osztaly, szint)
            const expected = base.map(x => x + modifier)

            const actual = KozelharciTB({
                osztaly,
                szint,
                tulajdonsagok
            })

            expect(actual).toEqual(expected)
        });
    });

});