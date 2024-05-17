import React from "react";
import {Kepzettseg, KepzettsegId} from "../domain-models/kepzettsegek2E.data";
import {TulajdonsagLabel} from "../domain-models/tulajdonsag2E";
import {OsztalyLabel} from "../domain-models/osztaly2E";

function kepzettsegOptionText(k: Kepzettseg) {
    const osztalyok = k.Osztalyok?.reduce((acc, o) => acc + ' / ' + OsztalyLabel(o), '')?.substring(3)
    return k.Name + ' (' + k.Tulajdonsag.reduce((acc, k) => (acc === '' ? acc : acc + ' / ') + TulajdonsagLabel(k), '') + ')' + (osztalyok == null ? '' : (' - ' + osztalyok));
}

function KepzettsegSelector (props: {
    kepzettsegek: Kepzettseg[],
    changeKepzettseg: (newKepzettseg: KepzettsegId) => void,
    selected : Kepzettseg,
    dataTestId?: string,
}) {
    const { kepzettsegek, changeKepzettseg, selected, dataTestId } = props
    return <>
        <div className='row'>
            <select
                className='form-control'
                value={selected.Id}
                onChange={e => changeKepzettseg(e.target.value as KepzettsegId)}
                data-testid={dataTestId}
            >
                {kepzettsegek.map(k =>(
                    <option key={k.Id} value={k.Id}>
                        {kepzettsegOptionText(k)}
                    </option>
                ))}
            </select>
        </div>
        <div className='row pt-2'>
            <p className='col'>{selected.Description}</p>
        </div>
    </>
}

export default KepzettsegSelector