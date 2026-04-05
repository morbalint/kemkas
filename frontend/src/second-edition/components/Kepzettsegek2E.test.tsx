import React from "react";
import {render} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import KarakterKepzettsegek from "./Kepzettsegek2E";
import userReducer from "../../shared/domain-models/userSlice";
import characterReducer, {setCharacter} from "../domain-models/characterSlice";
import {DefaultKarakter, Karakter2E} from "../domain-models/karakter2E";
import {Osztaly2E} from "../domain-models/osztaly2E";
import {Tulajdonsag2E} from "../domain-models/tulajdonsag2E";

function createStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            character2E: characterReducer,
        },
    });
}

describe("KarakterKepzettsegek", () => {
    it("shows one more kepzettseg selector when INT modifier increases from level-up", () => {
        const karakter: Karakter2E = {
            ...DefaultKarakter,
            szint: 4,
            tulajdonsagok: {
                ...DefaultKarakter.tulajdonsagok,
                t_int: 17,
            },
            szintlepesek: [
                { osztaly: Osztaly2E.Harcos, HProll: 10 },
                { osztaly: Osztaly2E.Harcos, HProll: 7 },
                { osztaly: Osztaly2E.Harcos, HProll: 6 },
                { osztaly: Osztaly2E.Harcos, HProll: 8, tulajdonsagNoveles: Tulajdonsag2E.Intelligencia },
            ],
            tolvajKepzettsegek: [],
            varazslatok: [],
        };

        const store = createStore();
        store.dispatch(setCharacter(karakter));

        const sut = render(
            <Provider store={store}>
                <KarakterKepzettsegek />
            </Provider>
        );

        const selectors = sut.container.querySelectorAll('[data-testid^="kepzettseg-"]');
        expect(selectors).toHaveLength(7);
    });

    it("shows one more kepzettseg selector when INT modifier increases at level 8", () => {
        const karakter: Karakter2E = {
            ...DefaultKarakter,
            szint: 8,
            tulajdonsagok: {
                ...DefaultKarakter.tulajdonsagok,
                t_int: 14,
            },
            szintlepesek: [
                { osztaly: Osztaly2E.Harcos, HProll: 10 },
                { osztaly: Osztaly2E.Harcos, HProll: 7 },
                { osztaly: Osztaly2E.Harcos, HProll: 6 },
                { osztaly: Osztaly2E.Harcos, HProll: 8, tulajdonsagNoveles: Tulajdonsag2E.Ero },
                { osztaly: Osztaly2E.Harcos, HProll: 4 },
                { osztaly: Osztaly2E.Harcos, HProll: 9 },
                { osztaly: Osztaly2E.Harcos, HProll: 5 },
                { osztaly: Osztaly2E.Harcos, HProll: 6, tulajdonsagNoveles: Tulajdonsag2E.Intelligencia },
            ],
            tolvajKepzettsegek: [],
            varazslatok: [],
        };

        const store = createStore();
        store.dispatch(setCharacter(karakter));

        const sut = render(
            <Provider store={store}>
                <KarakterKepzettsegek />
            </Provider>
        );

        const selectors = sut.container.querySelectorAll('[data-testid^="kepzettseg-"]');
        expect(selectors).toHaveLength(6);
    });

    it("shows one more kepzettseg selector when INT modifier increases at level 12", () => {
        const karakter: Karakter2E = {
            ...DefaultKarakter,
            szint: 12,
            tulajdonsagok: {
                ...DefaultKarakter.tulajdonsagok,
                t_int: 17,
            },
            szintlepesek: [
                { osztaly: Osztaly2E.Harcos, HProll: 10 },
                { osztaly: Osztaly2E.Harcos, HProll: 7 },
                { osztaly: Osztaly2E.Harcos, HProll: 6 },
                { osztaly: Osztaly2E.Harcos, HProll: 8, tulajdonsagNoveles: Tulajdonsag2E.Ero },
                { osztaly: Osztaly2E.Harcos, HProll: 4 },
                { osztaly: Osztaly2E.Harcos, HProll: 9 },
                { osztaly: Osztaly2E.Harcos, HProll: 5 },
                { osztaly: Osztaly2E.Harcos, HProll: 6, tulajdonsagNoveles: Tulajdonsag2E.Egeszseg },
                { osztaly: Osztaly2E.Harcos, HProll: 3 },
                { osztaly: Osztaly2E.Harcos, HProll: 7 },
                { osztaly: Osztaly2E.Harcos, HProll: 5 },
                { osztaly: Osztaly2E.Harcos, HProll: 4, tulajdonsagNoveles: Tulajdonsag2E.Intelligencia },
            ],
            tolvajKepzettsegek: [],
            varazslatok: [],
        };

        const store = createStore();
        store.dispatch(setCharacter(karakter));

        const sut = render(
            <Provider store={store}>
                <KarakterKepzettsegek />
            </Provider>
        );

        const selectors = sut.container.querySelectorAll('[data-testid^="kepzettseg-"]');
        expect(selectors).toHaveLength(7);
    });
});
