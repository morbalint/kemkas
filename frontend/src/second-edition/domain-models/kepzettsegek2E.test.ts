import {GetAvailableKepzettsegek, GetNumberOfKepzettsegek, Kepzettsegek, KepzettsegLista} from "./kepzettsegek2E";
import {Faj2E} from "./faj2E";
import {DefaultKarakter} from "./karakter2E";
import {Osztaly2E} from "./osztaly2E";
import {Tulajdonsag2E} from "./tulajdonsag2E";

describe("Kepzettsegek 2E", () => {
    describe("GetNumberOfKepzettsegek", () => {
        test("Add extra kepzettseg for Ember", () => {
            const actual = GetNumberOfKepzettsegek(18, Faj2E.Ember)
            expect(actual).toEqual(7)
        })
        test("should be min for extra stupid", () => {
            const actual = GetNumberOfKepzettsegek(3, Faj2E.Osember)
            expect(actual).toEqual(1)
        })
        test("never less than 1", () => {
            const actual = GetNumberOfKepzettsegek(-999, Faj2E.Osember)
            expect(actual).toEqual(1)
        })
        test("never more than 11", () => {
            const actual = GetNumberOfKepzettsegek(999, Faj2E.Elf)
            expect(actual).toEqual(11)
        })
    })

    describe("GetAvailableKepzettsegek", () => {
        test("excludes existing karakter kepzettsegek", () => {
            const karakter = {
                ...DefaultKarakter,
                kepzettsegek: KepzettsegLista.map(x => x.Id),
            }
            const actual = GetAvailableKepzettsegek(karakter)
            expect(actual).toHaveLength(0)
        })
        test("includes Birodalmi kepzettsegek for a Birodalmi", () => {
            const karakter = {
                ...DefaultKarakter,
                faj: Faj2E.Birodalmi,
            }
            const actual = GetAvailableKepzettsegek(karakter)
            expect(actual).toContain(Kepzettsegek.k_meregkeveres)
            expect(actual).toContain(Kepzettsegek.k_alkimia)
            expect(actual).toContain(Kepzettsegek.k_okkultizmus)
        })
        test.each([
            [Osztaly2E.Varazslo],
            [Osztaly2E.Illuzionista],
            [Osztaly2E.Pap],
            [Osztaly2E.Druida],
            [Osztaly2E.Vandor],
        ])("includes arcane kepzettsegek for %s", (osztaly) => {
            const karakter = {
                ...DefaultKarakter,
                szintlepesek: [
                    { osztaly, HProll: 4, },
                ]
            }
            const actual = GetAvailableKepzettsegek(karakter)
            expect(actual).toContain(Kepzettsegek.k_csillagjoslas)
        })
        describe("when Tolvaj", () => {
            test("includes unpicked Tolvaj kepzettsegek", () => {
                const karakter = {
                    ...DefaultKarakter,
                    szintlepesek: [
                        { osztaly: Osztaly2E.Tolvaj, HProll: 6, }
                    ]
                }
                const actual = GetAvailableKepzettsegek(karakter)
                expect(actual).toContain(Kepzettsegek.k_meregkeveres)
            })
            test.each([
                [Kepzettsegek.k_meregkeveres],
                [Kepzettsegek.k_alcazas],
                [Kepzettsegek.k_csapdak],
                [Kepzettsegek.k_szabadulomuveszet],
                [Kepzettsegek.k_hamisitas],
            ])("excludes already picked Tolvaj kepzettsegek", (kepzettseg) => {
                const karakter = {
                    ...DefaultKarakter,
                    szintlepesek: [
                        { osztaly: Osztaly2E.Tolvaj, HProll: 6, }
                    ],
                    tolvajKepzettsegek: [kepzettseg.Id]
                }
                const actual = GetAvailableKepzettsegek(karakter)
                expect(actual).not.toContain(kepzettseg)
            })
            test("excludes extra high level Tolvaj kepzettsegek", () => {
                const karakter = {
                    ...DefaultKarakter,
                    szintlepesek: [
                        { osztaly: Osztaly2E.Tolvaj, HProll: 6, },
                        { osztaly: Osztaly2E.Tolvaj, HProll: 6, },
                        { osztaly: Osztaly2E.Tolvaj, HProll: 6, },
                        { osztaly: Osztaly2E.Tolvaj, HProll: 6, tulajdonsagNoveles: Tulajdonsag2E.Ugyesseg },
                        {
                            osztaly: Osztaly2E.Tolvaj,
                            HProll: 6,
                            tolvajExtraKepzettseg: Kepzettsegek.k_meregkeveres.Id
                        },
                    ]
                }
                const actual = GetAvailableKepzettsegek(karakter)
                expect(actual).not.toContain(Kepzettsegek.k_meregkeveres)
            })
        })
        test("multiclass characters get access to kepzettsegek from all classes", () => {
            const karakter = {
                ...DefaultKarakter,
                szintlepesek: [
                    { osztaly: Osztaly2E.Illuzionista, HProll: 4, },
                    { osztaly: Osztaly2E.Tolvaj, HProll: 4, },
                ]
            }
            const actual = GetAvailableKepzettsegek(karakter)
            expect(actual).toContain(Kepzettsegek.k_csillagjoslas)
            expect(actual).toContain(Kepzettsegek.k_meregkeveres)
        })
    })

})