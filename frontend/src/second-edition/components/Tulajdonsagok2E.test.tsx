import React from "react";
import {fireEvent, render} from "@testing-library/react"
import Tulajdonsagok from "./Tulajdonsagok2E";
import {Faj2E} from "../domain-models/faj2E";
import {TulajdonsagDefaults} from "../domain-models/tulajdonsag2E";
import {
    setEro,
} from "../domain-models/tulajdonsagSlice";
import '@testing-library/jest-dom'
import {Provider} from "react-redux";
import store from "../../store";

describe("render Tulajdonsagok", () => {
    test('change Ero', async () => {
        type SetEroAction = ReturnType<typeof setEro>
        let invocations: SetEroAction[] = []
        const dispatch = (action: SetEroAction) => {
            invocations.push(action)
        }
        const sut = render(<Tulajdonsagok
            currentFaj={Faj2E.Ember}
            tulajdonsagok={TulajdonsagDefaults}
            dispatch={dispatch}
        />)
        const eroInput = await sut.findByTestId("t_ero");
        fireEvent.change(eroInput, {target: {value: "20"}})
        expect(invocations).toHaveLength(1)
        const action = invocations[0]
        expect(action.payload).toEqual(20)
    })

    test('display Ero too low error', async () => {
        const sut = render(<Tulajdonsagok
            currentFaj={Faj2E.Ember}
            tulajdonsagok={{...TulajdonsagDefaults, t_ero: 1}}
            dispatch={() => {}}
        />)
        const eroError = await sut.findByText("Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!");
        expect(eroError).toBeVisible()
    })

    test('change Ero and display Ero too high error with store', async () => {
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