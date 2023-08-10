import React from "react";
import KepzettsegSelector from "./KepzettsegSelector";
import {Osztaly} from "../domain-models/osztaly";
import {UseFormRegisterReturn} from "react-hook-form";
import {Kepzettsegek, KepzettsegId, KepzettsegLista} from "../domain-models/kepzettsegek";
import {Modifier} from "../domain-models/tulajdonsag";
import {Faj} from "../domain-models/faj";

function KarakterKepzettsegek (props: {
    faj: Faj
    osztaly: Osztaly,
    t_int: number,
    register: (fieldName: string) => UseFormRegisterReturn,
    watch: (fieldName: string, defaultValue: KepzettsegId) => string
}) {
    const { faj, osztaly, t_int, register, watch } = props

    const avaialableKepzettsegList = KepzettsegLista.filter(k => k.Osztalyok == null || k.Osztalyok.includes(osztaly))

    let numberOfKepzettseg = (osztaly === Osztaly.Tolvaj ? 7 : 4) + Modifier(t_int) + (faj === Faj.Ember ? 1 : 0)
    console.log('Raw Number of Kepzetsegek = ', numberOfKepzettseg)

    if (numberOfKepzettseg < 1) {
        numberOfKepzettseg = 1
    }
    if (numberOfKepzettseg > avaialableKepzettsegList.length){
        numberOfKepzettseg = avaialableKepzettsegList.length
    }
    console.log('Adjusted Number of Kepzetsegek = ', numberOfKepzettseg)
    const klist = Array.from(new Array(numberOfKepzettseg).keys())

    const getKepzettsegN = (n: number) => Kepzettsegek[watch('kep_'+n, avaialableKepzettsegList[n].Id) as KepzettsegId]

    const getKepzettsegListaN = (n: number) => {
        let response = avaialableKepzettsegList;
        for (let i = 0; i < n; i++) {
            response = response.filter(x => x.Id !== getKepzettsegN(i).Id)
        }
        return response
    }

    return <>
        <div className='row'>
            <div className='col-lg-2 col-md-12'>
                <label className='col-form-label text-body-emphasis'> Képzettségek </label>
            </div>
            <div className='col'>
                {klist.map((idx) =>
                    <KepzettsegSelector
                        key={idx}
                        kepzettsegek={getKepzettsegListaN(idx)}
                        fieldRegistration={register('kep_'+idx)}
                        selected={getKepzettsegN(idx)}
                    />)
                }
            </div>
        </div>
    </>
}

export default KarakterKepzettsegek