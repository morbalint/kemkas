import {KarakterDefaults} from "./karakter";
import {Osztaly} from "./osztaly";
import {
    AvailableKezpettsegList, GetKepzettsegListaN,
    GetNumberOfKepzettsegek,
    SetDefaultTolvajKepzettsegek
} from "./kepzettsegek";
import {Faj} from "./faj";

describe('AvailableKezpettsegList', ()=> {

    const commonKepzettsegek = ['k_allatidomitas', 'k_eloadas', 'k_ertekbecsles', 'k_gyogyitas', 'k_hajozas',
    'k_hallgatozas', 'k_lovaglas', 'k_maszas', 'k_megfigyeles', 'k_mesterseg', 'k_nyomkereses', 'k_osonas',
        'k_rejtozes', 'k_tudas', 'k_ugras', 'k_uszas']

    test.each([
        [Osztaly.Amazon, commonKepzettsegek],
        [Osztaly.Ijasz, commonKepzettsegek],
        [Osztaly.Harcos, commonKepzettsegek],
        [Osztaly.Kaloz, commonKepzettsegek],
        [Osztaly.Barbar, commonKepzettsegek],
        [Osztaly.Tolvaj, ['k_alcazas', 'k_csapdak', 'k_egyensulyozas', 'k_hamisitas', 'k_jelek_olvasasa',
            'k_meregkeveres', 'k_szabadulomuveszet', 'k_zarnyitas', 'k_zsebmetszes', ...commonKepzettsegek]],
        [Osztaly.Pap, ['k_varazslatismeret', 'k_koncentracio', 'k_csillagjoslas', 'k_alkimia', 'k_jelek_olvasasa',
            ...commonKepzettsegek]],
        [Osztaly.Varazslo, ['k_varazslatismeret', 'k_koncentracio', 'k_csillagjoslas', 'k_alkimia', 'k_jelek_olvasasa',
            ...commonKepzettsegek]],
        [Osztaly.Illuzionista, ['k_varazslatismeret', 'k_koncentracio', 'k_csillagjoslas', 'k_alkimia',
            'k_jelek_olvasasa', ...commonKepzettsegek]],
    ])('%s has %s', (osztaly: Osztaly, expected: string[]) => {
        const availableKezpettsegList = AvailableKezpettsegList(osztaly).map(x => x.Id)
        expect(availableKezpettsegList).toHaveLength(expected.length)
        for (const kepzettseg of expected) {
            expect(availableKezpettsegList).toContain(kepzettseg)
        }
        for (const kepzettseg of availableKezpettsegList) {
            expect(expected).toContain(kepzettseg)
        }
    })
})

describe('GetNumberOfKepzettsegek', () => {
    test.each([
        [Faj.Birodalmi, 10, 3],
        [Faj.Ember, 10, 4],
        [Faj.Elf, 18, 6],
        [Faj.Torpe, 3, 1],
    ])('%s with %i INT has %i kepzettseg', (faj: Faj, int: number, expected: number) => {
        const actual = GetNumberOfKepzettsegek(int, faj, 16)
        expect(actual).toEqual(expected)
    })
})

describe('SetDefaultTolvajKepzettsegek', ()=> {
    describe('when karakter is not a Tolvaj', () => {
        it('sets tolvaj kepzettsegek to empty', () => {
            // arrange
            const karakter = {...KarakterDefaults}
            karakter.osztaly = Osztaly.Barbar
            karakter.tolvajKepzettsegek = ['k_alkimia']

            const invocations = [] as (string[] | undefined)[]
            const changeTolvajkepzettsegek = (ids?: string[]) => {
                invocations.push(ids)
            }
            // act
            SetDefaultTolvajKepzettsegek(karakter, changeTolvajkepzettsegek)
            // assert
            expect(invocations).toHaveLength(1)
            expect(invocations[0]).toBeUndefined()
        })
    })
    describe('when karakter is a Tolvaj', () => {
        describe('and tolvaj kepzettsegek is empty', () => {
            it('sets 4 tolvaj kepzettsegek', () => {
                // arrange
                const karakter = {...KarakterDefaults}
                karakter.osztaly = Osztaly.Tolvaj
                const invocations = [] as (string[] | undefined)[]
                const changeTolvajkepzettsegek = (ids?: string[]) => {
                    invocations.push(ids)
                }
                // act
                SetDefaultTolvajKepzettsegek(karakter, changeTolvajkepzettsegek)
                // assert
                expect(invocations).toHaveLength(1)
                expect(invocations[0]).toHaveLength(4)
            })
        })
        describe('and tolvaj kepzettsegek is already set', () => {
            it('doesnt change anything', () => {
                // arrange
                const karakter = {...KarakterDefaults}
                karakter.osztaly = Osztaly.Tolvaj
                karakter.tolvajKepzettsegek = ['k_alkimia', 'k_hamisitas', 'k_meregkeveres', 'k_zsebmetszes']
                const invocations = [] as (string[] | undefined)[]
                const changeTolvajkepzettsegek = (ids?: string[]) => {
                    invocations.push(ids)
                }
                // act
                SetDefaultTolvajKepzettsegek(karakter, changeTolvajkepzettsegek)
                // assert
                expect(invocations).toHaveLength(0)
            })
        })
    })
})

describe('GetKepzettsegListaN', () => {
    it("contains the Nth kepzettseg", () => {
        const karakter = {...KarakterDefaults}
        karakter.kepzettsegek = ['k_uszas', 'k_ugras', 'k_osonas', 'k_hallgatozas']
        const sut = GetKepzettsegListaN(karakter)
        for (let i = 0; i <  karakter.kepzettsegek.length; i++) {
            const actual = sut(i).map(x => x.Id)
            expect(actual).toContain(karakter.kepzettsegek[i])
        }
    })
    it('returns Hajozas as 1st for Eszaki', ()=> {
        const karakter = {...KarakterDefaults}
        karakter.faj = Faj.Eszaki
        karakter.kepzettsegek = ['k_uszas', 'k_ugras', 'k_osonas', 'k_hallgatozas']
        const actual = GetKepzettsegListaN(karakter)(0).map(x => x.Id)
        expect(actual).toHaveLength(1)
        expect(actual[0]).toEqual('k_hajozas')
    })
    it('returns Lovaglas as 1st for Etuniai', ()=> {
        const karakter = {...KarakterDefaults}
        karakter.faj = Faj.Etuniai
        karakter.kepzettsegek = ['k_uszas', 'k_ugras', 'k_osonas', 'k_hallgatozas']
        const actual = GetKepzettsegListaN(karakter)(0).map(x => x.Id)
        expect(actual).toHaveLength(1)
        expect(actual[0]).toEqual('k_lovaglas')
    })
    it('returns Meregkeveres and Alkimia as 1st for Birodalmi', ()=> {
        const karakter = {...KarakterDefaults}
        karakter.faj = Faj.Birodalmi
        karakter.kepzettsegek = ['k_uszas', 'k_ugras', 'k_osonas', 'k_hallgatozas']
        const actual = GetKepzettsegListaN(karakter)(0).map(x => x.Id)
        expect(actual).toHaveLength(2)
        expect(actual).toContain('k_meregkeveres')
        expect(actual).toContain('k_alkimia')
    })
    it("doesn't contains other selected kepzettsegek", () => {
        const karakter = {...KarakterDefaults}
        karakter.kepzettsegek = ['k_uszas', 'k_ugras', 'k_osonas', 'k_hallgatozas']
        const sut = GetKepzettsegListaN(karakter)
        for (let i = 0; i <  karakter.kepzettsegek.length; i++) {
            const actual = sut(i).map(x => x.Id)
            for (let j = 0; j < karakter.kepzettsegek.length; j++) {
                if (i === j) {
                    continue;
                }
                expect(actual.indexOf(karakter.kepzettsegek[j])).toEqual(-1)
            }
        }
    })
})
