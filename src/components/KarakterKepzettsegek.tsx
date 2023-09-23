import React from "react";
import KepzettsegSelector from "./KepzettsegSelector";
import {
    Kepzettseg,
    Kepzettsegek,
    KepzettsegId,
    TolvajKepzettsegList,
} from "../domain-models/kepzettsegek";

function arraySetN<T>(array: T[], n: number, elem: T): T[] {
    if (array.length < n || n < 0) {
        return array
    }
    return [...array.slice(0, n), elem, ...array.slice(n+1)]
}

function InternalKepzettsegekSelector(props: {
    title: string,
    numberOfKepzettseg: number,
    getKepzettsegListaN: (n: number) => Kepzettseg[],
    kepzettsegek: KepzettsegId[],
    changeKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void
}) {
    const {title, numberOfKepzettseg, getKepzettsegListaN, kepzettsegek, changeKepzettsegek} = props

    const klist = Array.from(new Array(numberOfKepzettseg).keys())

    const preCalculated: {
        kepzettsegek: Kepzettseg[],
        changeKepzettseg: (newKepzettseg: KepzettsegId) => void,
        selected: Kepzettseg,
    }[] = [];

    for (let i = 0; i < numberOfKepzettseg; i++) {
        preCalculated.push({
            kepzettsegek: getKepzettsegListaN(i),
            selected: Kepzettsegek[kepzettsegek[i]],
            changeKepzettseg: (newKepzettseg: KepzettsegId) => changeKepzettsegek(arraySetN(kepzettsegek, i, newKepzettseg))
        })
    }

    console.log(preCalculated)

    return <>
        <div className='row'>
            <div className='col-lg-2 col-md-12'>
                <label className='col-form-label text-body-emphasis'>{title}</label>
            </div>
            <div className='col'>
                {klist.map((idx) =>
                    <KepzettsegSelector
                        key={title+idx}
                        kepzettsegek={preCalculated[idx].kepzettsegek}
                        selected={preCalculated[idx].selected}
                        changeKepzettseg={preCalculated[idx].changeKepzettseg}
                    />)
                }
            </div>
        </div>
    </>

}


function KarakterKepzettsegek (props: {
    availableKepzettsegList: Kepzettseg[],
    numberOfKepzettsegek: number
    kepzettsegek: KepzettsegId[],
    changeKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void
    tolvajKepzettsegek: KepzettsegId[],
    changeTolvajKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void
}) {
    const { numberOfKepzettsegek, availableKepzettsegList, changeKepzettsegek, tolvajKepzettsegek, changeTolvajKepzettsegek} = props
    let kepzettsegek = [ ...props.kepzettsegek]

    // TODO: Eszakinak es Kaloznak hajozas, Birodalminak Alikmia, vagy Meregkeveres, Etuniainak Lovaglas

    const getKepzettsegListaN = (n: number) => {
        const kepzettsegekWithoutN = [...kepzettsegek.slice(0, n), ...kepzettsegek.slice(n+1)]
        return availableKepzettsegList.filter(x => !kepzettsegekWithoutN.includes(x.Id) && !tolvajKepzettsegek.includes(x.Id))
    }

    const getTolvajKepzettsegListaN = (n: number) : Kepzettseg[] => {
        const tolvajKepzettsegekWithoutN = [...tolvajKepzettsegek.slice(0, n), ...tolvajKepzettsegek.slice(n+1)]
        return TolvajKepzettsegList.filter(x => !kepzettsegek.includes(x.Id) && !tolvajKepzettsegekWithoutN.includes(x.Id))
    }

    return <>
        <InternalKepzettsegekSelector
            title="Képzettségek"
            numberOfKepzettseg={numberOfKepzettsegek}
            getKepzettsegListaN={getKepzettsegListaN}
            changeKepzettsegek={changeKepzettsegek}
            kepzettsegek={kepzettsegek} />

        {tolvajKepzettsegek.length > 0 && <InternalKepzettsegekSelector
            title="Tolvaj képzettségek"
            numberOfKepzettseg={4}
            getKepzettsegListaN={getTolvajKepzettsegListaN}
            changeKepzettsegek={changeTolvajKepzettsegek}
            kepzettsegek={tolvajKepzettsegek} />}
    </>
}

export default KarakterKepzettsegek