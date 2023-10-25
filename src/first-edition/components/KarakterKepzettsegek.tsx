import React from "react";
import KepzettsegSelector from "./KepzettsegSelector";
import {
    Kepzettseg,
    Kepzettsegek,
    KepzettsegId,
    TolvajKepzettsegList,
} from "../domain-models/kepzettsegek";
import {arraySetN} from "../../util";


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
                    />)
                }
            </div>
        </div>
    </>

}

function KarakterKepzettsegek (props: {
    numberOfKepzettsegek: number
    kepzettsegek: KepzettsegId[],
    changeKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void
    tolvajKepzettsegek: KepzettsegId[],
    changeTolvajKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void
    getKepzettsegListaN: (n: number) => Kepzettseg[]
}) {
    const { kepzettsegek, numberOfKepzettsegek, getKepzettsegListaN, changeKepzettsegek, tolvajKepzettsegek, changeTolvajKepzettsegek} = props

    // TODO: Birodalmi tolvajnal az Alikmia, vagy Meregkeveres kezelese

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