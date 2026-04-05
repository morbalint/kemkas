import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import LevelUps from "./LevelUps";
import userReducer from "../../shared/domain-models/userSlice";
import characterReducer, {setCharacter} from "../domain-models/characterSlice";
import {AllowedFegyver} from "../domain-models/allowed-fegyver";
import {Osztaly2E} from "../domain-models/osztaly2E";
import {ChangeOsztalyAtSzint, DefaultKarakter, Karakter2E} from "../domain-models/karakter2E";
import {LevelUp} from "../domain-models/szintlepes";

function applyLevelUp(karakter: Karakter2E): Karakter2E {
    let next: Karakter2E | undefined;
    LevelUp(karakter, updated => {
        next = updated;
    });
    expect(next).toBeDefined();
    return next as Karakter2E;
}

describe("LevelUps Harcos specialization indexing", () => {
    it("updates specialization on the selected character level for multiclass", async () => {
        const level1Tolvaj: Karakter2E = {
            ...DefaultKarakter,
            szint: 1,
            szintlepesek: [{
                osztaly: Osztaly2E.Tolvaj,
                HProll: 6,
            }],
            tolvajKepzettsegek: [],
            varazslatok: [],
        };

        const level2Auto = applyLevelUp(level1Tolvaj);
        const karakter = ChangeOsztalyAtSzint(level2Auto, Osztaly2E.Harcos, 2);

        const store = configureStore({
            reducer: {
                user: userReducer,
                character2E: characterReducer,
            },
        });
        store.dispatch(setCharacter(karakter));

        const sut = render(
            <Provider store={store}>
                <LevelUps
                    karakter={store.getState().character2E}
                    changeKarakter={(updated) => store.dispatch(setCharacter(updated))}
                />
            </Provider>
        );

        const selector = await sut.findByTestId("harcos-specialization-2");

        const currentSpec = karakter.szintlepesek[1]?.harcosFegyver;
        const nextSpec = AllowedFegyver(Osztaly2E.Harcos)
            .map(x => x.Id)
            .find(id => id !== currentSpec);

        expect(nextSpec).toBeDefined();
        fireEvent.change(selector, {target: {value: nextSpec as string}});

        const stateAfter = store.getState().character2E;
        expect(stateAfter.szintlepesek[0]?.harcosFegyver).toBeUndefined();
        expect(stateAfter.szintlepesek[1]?.harcosFegyver).toBe(nextSpec);
    });
});
