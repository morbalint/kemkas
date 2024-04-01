import {ElsodlegesMento, MasodlagosMento, MentokTotal, MultiClassMentokAlap} from "./mentok";
import {Osztaly2E} from "./osztaly2E";
import {Szintlepes} from "./szintlepes";

describe("mentok", () => {
    test.each([
        [1, 2],
        [2, 3],
        [7, 5]
    ])('Elsodleges mento is %i at level %i', (szint: number, expected: number) => {
        const actual = ElsodlegesMento(szint)
        expect(actual).toEqual(expected)
    })

    test.each([
        [1, 0],
        [2, 0],
        [3, 1],
        [9, 3]
    ])('Masopdlagos mento is %i at level %i', (szint: number, expected: number) => {
        const actual = MasodlagosMento(szint)
        expect(actual).toEqual(expected)
    })

    test.each([
        [[Osztaly2E.Pap, Osztaly2E.Pap, Osztaly2E.Pap, Osztaly2E.Tolvaj], {akaratero: 3, reflex: 3, kitartas: 3  }],
        [[Osztaly2E.Harcos, Osztaly2E.Harcos, Osztaly2E.Harcos, Osztaly2E.Tolvaj, Osztaly2E.Tolvaj, Osztaly2E.Tolvaj], {akaratero: 2, reflex: 4, kitartas: 4  }],
    ])('Multiclass character with classes: %s have saves: %s', (osztalyok, expected) => {
        const szintlepesek = osztalyok.map(o => ({
            osztaly: o,
            HProll: 1
        } as Szintlepes))
        const actual = MultiClassMentokAlap(szintlepesek)
        expect(actual).toEqual(expected)
    })

    test("Mentok total example character", () => {
        const tulajdonsagok = {
            t_ero: 10,
            t_ugy: 15,
            t_egs: 18,
            t_int: 8,
            t_bol: 13,
            t_kar: 3
        }
        const szintlepesek = [{osztaly: Osztaly2E.Illuzionista, HProll: 1}]
        const expected = {
            kitartas: 3,
            reflex: 2,
            akaratero: 3,
        }
        const actual = MentokTotal({szintlepesek, tulajdonsagok})
        expect(actual).toEqual(expected)
    })
})
