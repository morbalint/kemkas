import React from "react";
import KepzettsegSelector from "./KepzettsegSelector";
import {Osztaly} from "../domain-models/osztaly";
import {UseFormRegisterReturn} from "react-hook-form";
import {Kepzettsegek, KepzettsegId} from "../domain-models/kepzettsegek";
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

    const numberOfKepzettseg = 3 + Modifier(t_int) + (faj === Faj.Ember ? 1 : 0)
    console.log('Number of Kepzetsegek = ', numberOfKepzettseg)

    let klist = []
    for (let i = 0; i < numberOfKepzettseg; i++) {
        klist.push(i)
    }
    console.log(klist)

    return <>
        {klist.map((idx) =>
            <KepzettsegSelector
                key={idx}
                osztaly={osztaly}
                fieldRegistration={register('tul_'+idx)}
                selected={Kepzettsegek[watch('tul_'+idx, 'k_ugras') as KepzettsegId]}
            />)
        }
    </>
}

export default KarakterKepzettsegek