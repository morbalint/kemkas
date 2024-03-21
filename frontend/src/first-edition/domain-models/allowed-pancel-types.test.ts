import {Osztaly} from "./osztaly";
import {AllowedPancelTypes} from "./allowed-pancel-types";


describe('Allowed Pancel types', () => {
    test.each([
        [[Osztaly.Amazon], ['konnyu']],
        [[Osztaly.Amazon, Osztaly.Barbar], ['konnyu', 'kozepes', 'nehez']],
        [[Osztaly.Illuzionista], []],
        [[Osztaly.Varazslo], []],
        [[Osztaly.Tolvaj], ['konnyu']],
        [[Osztaly.Ijasz], ['konnyu', 'kozepes']],
        [[Osztaly.Kaloz], ['konnyu', 'kozepes']],
    ])('%s allows %s pancel types', (osztalyok: Osztaly[], expected: string[]) => {
        const actual = AllowedPancelTypes(osztalyok)
        expect(actual.length).toEqual(expected.length)
        for (const expectedElement of expected) {
            expect(actual).toContain(expectedElement)
        }
        for (const actualElement of actual) {
            expect(expected).toContain(actualElement)
        }
    })
})