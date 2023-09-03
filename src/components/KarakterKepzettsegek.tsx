import React from "react";
import KepzettsegSelector from "./KepzettsegSelector";
import {Osztaly} from "../domain-models/osztaly";
import {UseFormRegisterReturn} from "react-hook-form";
import {
    AvailableKezpettsegList,
    Kepzettseg,
    Kepzettsegek,
    KepzettsegId,
    KepzettsegLista
} from "../domain-models/kepzettsegek";
import {Modifier} from "../domain-models/tulajdonsag";
import {Faj} from "../domain-models/faj";


function InternalKepzettsegekSelector(props: {title: string, numberOfKepzettseg: number, getKepzettsegListaN: (n: number) => Kepzettseg[], register: (n: number) => UseFormRegisterReturn, availableKepzettsegList: Kepzettseg[], getKepzettsegN: (n: number) => Kepzettseg}) {
    const {title, numberOfKepzettseg, getKepzettsegListaN, register, availableKepzettsegList, getKepzettsegN} = props

    const klist = Array.from(new Array(numberOfKepzettseg).keys())

    const preCalculated: {
        kepzettsegek: Kepzettseg[],
        registration: UseFormRegisterReturn,
        selected: Kepzettseg,
    }[] = [];

    for (let i = 0; i < numberOfKepzettseg; i++) {
        preCalculated.push({
            kepzettsegek: getKepzettsegListaN(i),
            registration: register(i),
            selected: getKepzettsegN(i)
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
                        fieldRegistration={preCalculated[idx].registration}
                        selected={preCalculated[idx].selected}
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
    register: (fieldName: string) => UseFormRegisterReturn,
    watch: (fieldName: string, defaultValue: KepzettsegId) => string
}) {
    const { faj, osztaly, t_int, register, watch } = props

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

    const getKepzettsegN = (n: number) => Kepzettsegek[watch('kepzettseg.'+n, availableKepzettsegList[n].Id) as KepzettsegId]

    const getKepzettsegListaN = (n: number) => {
        let response = availableKepzettsegList;
        for (let i = 0; i < numberOfKepzettseg; i++) {
            response = response.filter(x => i === n || x.Id !== getKepzettsegN(i).Id)
        }
        if (osztaly === Osztaly.Tolvaj) {
            for (let i = 0; i < 4; i++) {
                response = response.filter(x => x.Id !== getTolvajKepzettsegN(i).Id)
            }
        }
        return response
    }

    const tolvajKepzettsegek =  KepzettsegLista.filter(k => k.Osztalyok != null && k.Osztalyok.includes(Osztaly.Tolvaj))
    const getTolvajKepzettsegN = (n: number) => Kepzettsegek[watch('tolvaj_kepzettseg.'+n, tolvajKepzettsegek[n].Id) as KepzettsegId]

    const getTolvajKepzettsegListaN = (n: number) => {
        let response = tolvajKepzettsegek;
        // filter out selected kepzettsegek
        for (let i = 0; i < numberOfKepzettseg; i++) {
            response = response.filter(x => x.Id !== getKepzettsegN(i).Id)
        }
        // filter out selected tolvaj kepzettsegek
        for (let i = 0; i < 4; i++) {
            response = response.filter(x => i === n || x.Id !== getTolvajKepzettsegN(i).Id)
        }
        return response
    }

    return <>
        <InternalKepzettsegekSelector
            title="Képzettségek"
            numberOfKepzettseg={numberOfKepzettseg}
            availableKepzettsegList={availableKepzettsegList}
            getKepzettsegListaN={getKepzettsegListaN}
            register={(n: number) => register('kepzettseg.' + n)}
            getKepzettsegN={getKepzettsegN} />
        {osztaly === Osztaly.Tolvaj &&
            <InternalKepzettsegekSelector
                title="Tolvaj Képzettségek"
                numberOfKepzettseg={4}
                availableKepzettsegList={tolvajKepzettsegek}
                getKepzettsegListaN={getTolvajKepzettsegListaN}
                register={(n: number) => register('tolvaj_kepzettseg.' + n)}
                getKepzettsegN={getTolvajKepzettsegN} />}
    </>
}

export default KarakterKepzettsegek