import React from "react";
import {Fegyver} from "../domain-models/felszereles";
import {FegyverFlags} from "../domain-models/fegyver";


export function FegyverLabel(fegyver: Fegyver): string {
    const serializedFlags = (FegyverFlags(fegyver) + (fegyver.Megjegyzes != null ? " " + fegyver.Megjegyzes : "")).trim();
    const sizeLabel = fegyver.Size < 1 && fegyver.Size > 0 ? ` [1/${Math.round(1 / fegyver.Size)}]` : (fegyver.Size > 1 ? ` [${fegyver.Size}]` : '');
    return `${fegyver.Name}${sizeLabel} | ${serializedFlags.length > 0 ? serializedFlags + " |" : ''}${
        fegyver.DamageMultiplier > 1 ? `${fegyver.DamageMultiplier}*` : ''}${
        fegyver.NumberOfDamageDice}d${fegyver.DamageDice}${fegyver.DamageBonus > 0 ? ` +${fegyver.DamageBonus}` : ''} ${
        fegyver.CritRangeStart < 20 ? `${fegyver.CritRangeStart}-20` : ''}x${fegyver.CritMultiplier}${
        fegyver.Price > 0 ? ` | ár: ${fegyver.Price} at ` : ''}${
        fegyver.Range > 10 ? ` | táv: ${fegyver.Range}` : ''}`
}

function FegyverSelector(props: {
    fegyverek: Fegyver[],
    selectedId: string,
    onChange: (id: string) => void,
    dataTestId?: string,
}) {
    const { fegyverek, selectedId, onChange, dataTestId } = props
    return <>
        <select className='col form-select'
                value={selectedId}
                onChange={e => onChange(e.target.value)}
                data-testid={dataTestId}
        >
            <optgroup label="Közelharci">
                {fegyverek.filter(f => f.Type === 'kozelharci').map(f => <option
                    key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
            </optgroup>
            <optgroup label="Közelharci, dobható">
                {fegyverek.filter(f => f.Type === 'dobhato').map(f => <option
                    key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
            </optgroup>
            <optgroup label="Távolsági">
                {fegyverek.filter(f => f.Type === 'lofegyver').map(f => <option
                    key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
            </optgroup>
        </select>
    </>
}

export default FegyverSelector