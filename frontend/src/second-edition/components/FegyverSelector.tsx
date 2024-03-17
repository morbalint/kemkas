import React from "react";
import {Fegyver} from "../domain-models/felszereles";

export function FegyverFlags(fegyver: Fegyver): string {
    const flags = [] as string[]
    if (fegyver.Megterheltseg) {
        flags.push("M")
    }
    if (fegyver.Harcos) {
        flags.push("H")
    }
    if (fegyver.Masfelkezes) {
        flags.push("1½K")
    }
    if (fegyver.Ketkezes) {
        if (fegyver.Type === "kozelharci") {
            flags.push("2K")
        } else {
            if (fegyver.KetkezesBonusz) {
                flags.push("2KB")
            } else {
                flags.push("2KN")
            }
        }
    }
    if (fegyver.HarciManover) {
        flags.push("+2 HM")
    }
    if (fegyver.Alakzat){
        flags.push("AL")
    }
    if (fegyver.Hosszu) {
        flags.push("HO")
    }
    if (fegyver.Kabito) {
        flags.push("KO")
    }
    if (fegyver.LovasRoham) {
        flags.push("LR")
    }
    if (fegyver.PancelToro) {
        flags.push("PT")
    }
    if (fegyver.PajzsZuzo) {
        flags.push("PZ")
    }
    if (fegyver.Rohamtoro) {
        flags.push("RT")
    }
    return flags.join(' ');
}

export function FegyverLabel(fegyver: Fegyver): string {
    const serializedFlags = FegyverFlags(fegyver) + (fegyver.Megjegyzes != null ? " " + fegyver.Megjegyzes : "");
    const sizeLabel = fegyver.Size < 1 && fegyver.Size > 0 ? ` [1/${Math.round(1 / fegyver.Size)}]` : (fegyver.Size > 1 ? ` [${fegyver.Size}]` : '');
    return `${fegyver.Name}${sizeLabel} | ${serializedFlags.length > 0 ? serializedFlags + " |" : ''}${
        fegyver.DamageMultiplier > 1 ? `${fegyver.DamageMultiplier}*` : ''}${
        fegyver.NumberOfDamageDice}d${fegyver.DamageDice}${fegyver.DamageBonus > 0 ? ` +${fegyver.DamageBonus}` : ''} ${
        fegyver.CritRangeStart < 20 ? `${fegyver.CritRangeStart}-20` : ''}x${fegyver.CritMultiplier}${
        fegyver.Price > 0 ? ` | ár: ${fegyver.Price} at ` : ''}${
        fegyver.Range > 10 ? ` | táv: ${fegyver.Range}` : ''}`
}

function FegyverSelector(props: {fegyverek: Fegyver[], selectedId: string, onChange: (id: string) => void}) {
    
    const { fegyverek, selectedId, onChange } = props
    
    return <>
        <select className='col form-select' value={selectedId}
                onChange={e => onChange(e.target.value)}>
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