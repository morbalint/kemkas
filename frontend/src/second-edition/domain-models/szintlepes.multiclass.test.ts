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
