import React from "react";
import KepzettsegSelector from "../display-components/KepzettsegSelector2E";
import {
    GetKepzettsegListaN,
    GetNumberOfKepzettsegek, GetTolvajKepzettsegListaN,
} from "../domain-models/kepzettsegek2E";
import {
    Kepzettseg,
    Kepzettsegek,
    KepzettsegId,
} from "../domain-models/kepzettsegek2E.data"
import {arraySetN} from "../../util";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {characterSelector, setKepzettsegek, setTolvajKepzettsegek} from "../domain-models/characterSlice";
import {TulajdonsagokFajjal} from "../domain-models/faj2E";

function InternalKepzettsegekSelector(props: {
    title: string,
    numberOfKepzettseg: number,
    getKepzettsegListaN: (n: number) => Kepzettseg[],
    kepzettsegek: KepzettsegId[],
    changeKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void,
    dataTestId?: string,
}) {
    const {
        title,
        numberOfKepzettseg,
        getKepzettsegListaN,
        kepzettsegek,
        changeKepzettsegek,
        dataTestId,
    } = props
    const klist = Array.from(new Array(numberOfKepzettseg).keys())

    const preCalculated: {
        kepzettsegek: Kepzettseg[],
        changeKepzettseg: (newKepzettseg: KepzettsegId) => void,
        selected: Kepzettseg,
    }[] = [];

    for (let i = 0; i < numberOfKepzettseg; i++) {
        preCalculated.push({
            kepzettsegek: getKepzettsegListaN(i),
            selected: Kepzettsegek[kepzettsegek[i]] || getKepzettsegListaN(i)[0],
            changeKepzettseg: (newKepzettseg: KepzettsegId) => changeKepzettsegek(arraySetN(kepzettsegek, i, newKepzettseg))
        })
    }

    return <>
        <div className='row m-2'>
            <label className='col-lg-2 col-md-12 col-form-label'>{title}</label>
            <div className='col'>
                {klist.map((idx) =>
                    <KepzettsegSelector
                        key={title+idx}
                        kepzettsegek={preCalculated[idx].kepzettsegek}
                        selected={preCalculated[idx].selected}
                        changeKepzettseg={preCalculated[idx].changeKepzettseg}
                        dataTestId={`${dataTestId}-${idx}`}
                    />)
                }
            </div>
        </div>
    </>

}

function KarakterKepzettsegek () {
    const karakter = useSelector.withTypes<RootState>()(characterSelector);
    const dispatch = useDispatch.withTypes<AppDispatch>()();

    const tulajdonsagokFajjal = TulajdonsagokFajjal(karakter.tulajdonsagok, karakter.faj)
    const numberOfKepzettsegek = GetNumberOfKepzettsegek(tulajdonsagokFajjal.t_int, karakter.faj)
    const kepzettsegek = karakter.kepzettsegek
    const fajError = karakter.kepzettsegFajError
    const osztalyError = karakter.kepzettsegOsztalyError
    const tolvajKepzettsegek = karakter.tolvajKepzettsegek || []
    const getKepzettsegListaN = GetKepzettsegListaN(karakter)
    const changeKepzettsegek = (k: KepzettsegId[]) => dispatch(setKepzettsegek(k))
    const changeTolvajKepzettsegek = (k: KepzettsegId[]) => dispatch(setTolvajKepzettsegek(k))

    return <>
        <InternalKepzettsegekSelector
            title="Képzettségek"
            numberOfKepzettseg={numberOfKepzettsegek}
            getKepzettsegListaN={getKepzettsegListaN}
            changeKepzettsegek={changeKepzettsegek}
            kepzettsegek={kepzettsegek}
            dataTestId={"kepzettseg"}
        />
        {fajError && (
            <span className='form-field-error'>{fajError}</span>)}
        {osztalyError && (
            <span className='form-field-error'>{osztalyError}</span>)}
        {tolvajKepzettsegek.length > 0 && <InternalKepzettsegekSelector
            title="Tolvaj képzettségek"
            numberOfKepzettseg={4}
            getKepzettsegListaN={GetTolvajKepzettsegListaN(karakter)}
            changeKepzettsegek={changeTolvajKepzettsegek}
            kepzettsegek={tolvajKepzettsegek}
            dataTestId={"tolvaj-kepzettseg"}
        />}
    </>
}

export default KarakterKepzettsegek