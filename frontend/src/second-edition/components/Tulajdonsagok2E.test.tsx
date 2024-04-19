import React from "react";
import {fireEvent, render} from "@testing-library/react"
import Tulajdonsagok from "./Tulajdonsagok2E";
import {Faj2E} from "../domain-models/faj2E";
import '@testing-library/jest-dom'
import {Provider} from "react-redux";
import store from "../../store";

describe("render Tulajdonsagok", () => {
    test('change Ero', async () => {
        const sut = render(
            <Provider store={store} >
                <Tulajdonsagok currentFaj={Faj2E.Ember}/>
            </Provider>)
        const eroInput = await sut.findByTestId("t_ero");
        fireEvent.change(eroInput, {target: {value: "18"}})
        const eroInputAfterChange = await sut.findByTestId("t_ero");
        expect((eroInputAfterChange as HTMLInputElement).value).toBe("18")
        const storedCharacter = store.getState().character2E
        expect(storedCharacter.tulajdonsagok.t_ero).toBe(18)
    })

    test('display Ero too low error', async () => {
        const sut = render(
            <Provider store={store} >
                <Tulajdonsagok currentFaj={Faj2E.Ember}/>
            </Provider>)
        const eroInput = await sut.findByTestId("t_ero");
        fireEvent.change(eroInput, {target: {value: "1"}})
        const eroError = await sut.findByText("Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!");
        expect(eroError).toBeVisible()
    })

    test('display Ero too high error with store', async () => {
        const sut = render(
            <Provider store={store} >
                <Tulajdonsagok currentFaj={Faj2E.Ember}/>
            </Provider>)
        const eroInput = await sut.findByTestId("t_ero");
        fireEvent.change(eroInput, {target: {value: "20"}})
        const eroError = await sut.findByText("Szét szakadtak az izmaid!");
        expect(eroError).toBeVisible()
    })
})