import {AllowedFegyver} from "./allowed-fegyver";
import {Osztaly} from "./osztaly";

describe('Allowed Fegyver calculations', () => {

    describe('varazslo fegyverek', () => {
        test.each([
            [Osztaly.Varazslo],
            [Osztaly.Illuzionista]])('%s fegyverek should be fixed', (osztaly: Osztaly) => {
            const expected = new Set([
                'bot',
                'bunko',
                'dobotu',
                'tor',
                'okol',
                'parittya',
            ]);
            const actual = AllowedFegyver(osztaly, []);
            const actualSet = new Set(actual.map(f => f.Id));
            expect(actualSet.size).toEqual(expected.size)
            for (const expectedKey in expected) {
                expect(actualSet).toContain(expectedKey)
            }
            for (const actualKey in actualSet) {
                expect(expected).toContain(actualKey)
            }
        })
    })

    describe('Tolvaj fegyverek', () => {
        it('should be fixed', () => {
            const expected = new Set([
                'rovid_ij',
                'konnyu_szamszerij',
                'nehez_szamszerij',
                'dobotu',
                'tor',
                'okol',
                'parittya',
                'szablya',
                'hosszu_kard',
                'rovid_kard'
            ]);
            const actual = AllowedFegyver(Osztaly.Tolvaj, []);
            const actualSet = new Set(actual.map(f => f.Id));
            expect(actualSet.size).toEqual(expected.size)
            for (const expectedKey in expected) {
                expect(actualSet).toContain(expectedKey)
            }
            for (const actualKey in actualSet) {
                expect(expected).toContain(actualKey)
            }
        })
    })

    describe('Harcos fegyverek', () => {
        it('Ijasz can use visszacsapo_ij', () => {
            const actual = AllowedFegyver(Osztaly.Ijasz, []);
            const actualSet = new Set(actual.map(f => f.Id));
            expect(actualSet).toContain('visszacsapo_ij')
        })
        test.each([
            [['visszacsapo_ij']],
            [['fattyu_kard', 'torpe_fejsze']],
        ])('Harcos can use %s specializations', (specializations) => {
            const actual = AllowedFegyver(Osztaly.Harcos, specializations);
            const actualSet = new Set(actual.map(f => f.Id));
            for (const specialization of specializations) {
                expect(actualSet).toContain(specialization)
            }
        })
    })
})