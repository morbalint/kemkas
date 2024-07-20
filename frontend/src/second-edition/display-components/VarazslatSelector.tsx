import React from "react"
import {Varazslat} from "../domain-models/varazslat";

function VarazslatSelector(props: {
    selected: string,
    available: Varazslat[],
    onChange: (selected: string) => void,
    dataTestId: string,
}) {
    const {selected, available, onChange, dataTestId} = props

    return <>
        <select className='col form-select'
                value={selected}
                onChange={e => onChange(e.target.value)}
                data-testid={dataTestId}
        >
            {available.map(v => (<option key={v.id} value={v.id}> {v.nev} </option>))}
        </select>
    </>
}

export default VarazslatSelector;
