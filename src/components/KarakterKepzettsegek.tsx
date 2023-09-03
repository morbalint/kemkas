import React from "react";
import KepzettsegSelector from "./KepzettsegSelector";
import {Osztaly} from "../domain-models/osztaly";
import {
    AvailableKezpettsegList,
    Kepzettseg,
    Kepzettsegek,
    KepzettsegId,
} from "../domain-models/kepzettsegek";
import {Modifier} from "../domain-models/tulajdonsag";
import {Faj} from "../domain-models/faj";


function InternalKepzettsegekSelector(props: {title: string, numberOfKepzettseg: number, getKepzettsegListaN: (n: number) => Kepzettseg[], kepzettsegek: KepzettsegId[], changeKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void}) {
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
            changeKepzettseg: (newKepzettseg: KepzettsegId) => { changeKepzettsegek([...kepzettsegek.slice(0, i), newKepzettseg, ...kepzettsegek.slice(i+1)]) }
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
    faj: Faj
    osztaly: Osztaly,
    t_int: number,
    kepzettsegek: KepzettsegId[],
    changeKepzettsegek: (newKepzettsegek: KepzettsegId[]) => void
}) {
    const { faj, osztaly, t_int, kepzettsegek, changeKepzettsegek} = props

    const availableKepzettsegList = AvailableKezpettsegList(osztaly)

    let numberOfKepzettseg = 3 + Modifier(t_int) + (faj === Faj.Ember ? 1 : 0)
    console.log('Raw Number of Kepzetsegek = ', numberOfKepzettseg)

    if (numberOfKepzettseg < 1) {
        numberOfKepzettseg = 1
    }
    if (numberOfKepzettseg > availableKepzettsegList.length){
        numberOfKepzettseg = availableKepzettsegList.length
    }
    console.log('Adjusted Number of Kepzetsegek = ', numberOfKepzettseg)

    const getKepzettsegListaN = (n: number) => {
        let response = availableKepzettsegList;
        for (let i = 0; i < numberOfKepzettseg; i++) {
            response = response.filter(x => i === n || x.Id !== kepzettsegek[i])
        }
        return response
    }

    return <>
        <InternalKepzettsegekSelector
            title="Képzettségek"
            numberOfKepzettseg={numberOfKepzettseg}
            getKepzettsegListaN={getKepzettsegListaN}
            changeKepzettsegek={changeKepzettsegek}
            kepzettsegek={kepzettsegek} />
    </>
}

export default KarakterKepzettsegek