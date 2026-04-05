import {ChangeOsztalyAtSzint, DefaultKarakter, Karakter2E} from "./karakter2E";
import {Osztaly2E} from "./osztaly2E";
import {LevelUp} from "./szintlepes";

function applyLevelUp(karakter: Karakter2E): Karakter2E {
    let next: Karakter2E | undefined;
    LevelUp(karakter, updated => {
        next = updated;
    });
    expect(next).toBeDefined();
    return next as Karakter2E;
}

function level1Tolvaj(): Karakter2E {
    return {
        ...DefaultKarakter,
        szint: 1,
        szintlepesek: [{
            osztaly: Osztaly2E.Tolvaj,
            HProll: 6,
        }],
        tolvajKepzettsegek: [],
        varazslatok: [],
    };
}

describe("Harcos specialization in multiclass level-ups", () => {
    it("adds a specialization when first Harcos level is gained at character level 2", () => {
        const afterLevel2 = applyLevelUp(level1Tolvaj());
        const multiclassed = ChangeOsztalyAtSzint(afterLevel2, Osztaly2E.Harcos, 2);

        const secondLevel = multiclassed.szintlepesek[1];
        expect(secondLevel?.osztaly).toBe(Osztaly2E.Harcos);
        expect(secondLevel?.harcosFegyver).toBeDefined();
    });

    it("does not add a specialization on even Harcos class level", () => {
        const afterLevel2 = applyLevelUp(level1Tolvaj());
        const multiclassed = ChangeOsztalyAtSzint(afterLevel2, Osztaly2E.Harcos, 2);
        const afterLevel3 = applyLevelUp(multiclassed);

        const thirdLevel = afterLevel3.szintlepesek[2];
        expect(thirdLevel?.osztaly).toBe(Osztaly2E.Harcos);
        expect(thirdLevel?.harcosFegyver).toBeUndefined();
    });

    it("adds the next specialization on odd Harcos class level after multiclass", () => {
        const afterLevel2 = applyLevelUp(level1Tolvaj());
        const multiclassed = ChangeOsztalyAtSzint(afterLevel2, Osztaly2E.Harcos, 2);
        const afterLevel3 = applyLevelUp(multiclassed);
        const afterLevel4 = applyLevelUp(afterLevel3);

        const firstHarcosSpec = multiclassed.szintlepesek[1]?.harcosFegyver;
        const thirdHarcosLevelSpec = afterLevel4.szintlepesek[3]?.harcosFegyver;

        expect(firstHarcosSpec).toBeDefined();
        expect(thirdHarcosLevelSpec).toBeDefined();
        expect(thirdHarcosLevelSpec).not.toBe(firstHarcosSpec);
    });
});

describe("Tolvaj extra skill in multiclass level-ups", () => {
    it("adds extra skill when Tolvaj class reaches level 5 at higher character level", () => {
        const karakter: Karakter2E = {
            ...DefaultKarakter,
            szint: 5,
            szintlepesek: [
                { osztaly: Osztaly2E.Tolvaj, HProll: 6 },
                { osztaly: Osztaly2E.Harcos, HProll: 10 },
                { osztaly: Osztaly2E.Tolvaj, HProll: 4 },
                { osztaly: Osztaly2E.Tolvaj, HProll: 5 },
                { osztaly: Osztaly2E.Tolvaj, HProll: 3 },
            ],
            tolvajKepzettsegek: ["k_alcazas", "k_csapdak", "k_egyensulyozas", "k_hamisitas"],
            varazslatok: [],
        };

        const afterLevel6 = applyLevelUp(karakter);
        const sixthLevel = afterLevel6.szintlepesek[5];

        expect(sixthLevel?.osztaly).toBe(Osztaly2E.Tolvaj);
        expect(sixthLevel?.tolvajExtraKepzettseg).toBeDefined();
    });

    it("recomputes missing extra skill when class change makes current level Tolvaj level 5", () => {
        const karakter: Karakter2E = {
            ...DefaultKarakter,
            szint: 5,
            szintlepesek: [
                { osztaly: Osztaly2E.Tolvaj, HProll: 6 },
                { osztaly: Osztaly2E.Tolvaj, HProll: 5 },
                { osztaly: Osztaly2E.Tolvaj, HProll: 4 },
                { osztaly: Osztaly2E.Tolvaj, HProll: 3 },
                { osztaly: Osztaly2E.Harcos, HProll: 8 },
            ],
            tolvajKepzettsegek: ["k_alcazas", "k_csapdak", "k_egyensulyozas", "k_hamisitas"],
            varazslatok: [],
        };

        const changed = ChangeOsztalyAtSzint(karakter, Osztaly2E.Tolvaj, 5);
        const fifthLevel = changed.szintlepesek[4];

        expect(fifthLevel?.osztaly).toBe(Osztaly2E.Tolvaj);
        expect(fifthLevel?.tolvajExtraKepzettseg).toBeDefined();
    });
});
