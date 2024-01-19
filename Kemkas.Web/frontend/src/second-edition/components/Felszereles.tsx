import React from "react";
import {Fegyver, KarakterFelszereles, PancelTypeLabel} from "../domain-models/felszereles";
import {Osztaly2E} from '../domain-models/osztaly2E'
import {AllowedPajzsTypes, AllowedPancelTypes} from '../domain-models/allowed-pancel-types'
import fegyverek from '../domain-models/fegyver.json'
import {arraySetN} from "../../util";
import {AllowedFegyver} from "../domain-models/allowed-fegyver";

export function FegyverLabel(fegyver: Fegyver): string {
    const flags = [] as string[]
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
    // if (fegyver.EroBonusz) {
    //     flags.push("ER")
    // }
    if (fegyver.Megjegyzes != null && fegyver.Megjegyzes.length > 0) {
        flags.push(fegyver.Megjegyzes)
    }
    const serializedFlags = flags.reduce((p,c) => `${p}${c} `, '');
    const sizeLabel = fegyver.Size < 1 && fegyver.Size > 0 ? ` [1/${Math.round(1 / fegyver.Size)}]` : (fegyver.Size > 1 ? ` [${fegyver.Size}]` : '');
    return `${fegyver.Name}${sizeLabel} ${serializedFlags.length > 0 ? "| " + serializedFlags : ''}| ${
        fegyver.DamageMultiplier > 1 ? `${fegyver.DamageMultiplier}*` : ''}${fegyver.NumberOfDamageDice}d${fegyver.DamageDice}${fegyver.DamageBonus > 0 ? ` +${fegyver.DamageBonus}` : ''} ${
        fegyver.CritRangeStart < 20 ? `${fegyver.CritRangeStart}-20` : ''}x${fegyver.CritMultiplier}${
        fegyver.Price > 0 ? ` | ár: ${fegyver.Price} at ` : ''}${
        fegyver.Range > 10 ? ` | táv: ${fegyver.Range}` : ''}`
}

function Felszereles(props: {felszereles: KarakterFelszereles, changeFelszereles: (felszereles: KarakterFelszereles) => void, osztaly: Osztaly2E}) {
    const { felszereles, changeFelszereles, osztaly } = props;
    const allowedPancel = AllowedPancelTypes([osztaly])
    const allowedPajzs = AllowedPajzsTypes([osztaly])
    const valasztottFegyverek = felszereles.fegyverIDk
        .map((id, idx) => ({idx, fegyver: fegyverek.data.find(f => f.Id === id)})).filter((x) => x.fegyver != null).map(({idx, fegyver}) => ({idx, fegyver: fegyver as Fegyver}))

    const osztalyAllowedFegyverek = AllowedFegyver(osztaly)
    const allowedFegyverek = [...osztalyAllowedFegyverek, ...valasztottFegyverek.filter(({idx, fegyver}) => !osztalyAllowedFegyverek.map(f => f.Id).includes(fegyver.Id)).map(({fegyver}) => fegyver)]
    const changeFegyver = (idx: number, newID: string) => {
        const found = fegyverek.data.find(x => x.Id === newID)
        if (!found) {
            console.log('Nem létező fegyver ID: ', newID)
            return
        }
        changeFelszereles({...felszereles, fegyverIDk: arraySetN(felszereles.fegyverIDk, idx, newID)})
    }

    return <>
        <div className='row'>
            <h5 className='col align-self-center'>Felszerelés</h5>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Viselt páncél</label>
            <select className='col form-select' value={felszereles.pancelID} onChange={e => changeFelszereles({...felszereles, pancelID: e.target.value === 'nincs' ? undefined : e.target.value})}>
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {
                    <optgroup label={PancelTypeLabel("konnyu")}>
                        {allowedPancel.filter(p => p.Type === "konnyu").map(p => 
                            <option key={p.Id} value={p.Id}>{`${p.Name}${p.Size > 1 ? ` [${p.Size}]` : ''} (+${p.VO} VO) - ${p.Price} at`}</option>)}
                    </optgroup>
                }
                {
                    allowedPancel.some(p => p.Type === "nehez") &&
                    <optgroup label={PancelTypeLabel("nehez")}>
                        {allowedPancel.filter(p => p.Type === "nehez").map(p => 
                            <option key={p.Id} value={p.Id}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
                    </optgroup>
                }
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Hordott pajzs</label>
            <select className='col form-select' value={felszereles.pajzsID}
                    onChange={e => changeFelszereles({...felszereles, pajzsID: e.target.value === 'nincs' ? undefined : e.target.value})}>
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {allowedPajzs.map(p => <option key={p.Id} value={p.Id}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
            </select>
        </div>
        {valasztottFegyverek.map(({idx, fegyver}) => (
            <div key={`fegyver-${idx}`} className='row m-2'>
                <label className='col-md-2 col-sm-3 col-form-label'>Fegyver</label>
                <select className='col form-select' value={fegyver.Id}
                        onChange={e => changeFegyver(idx, e.target.value)}>
                    <optgroup label="Közelharci">
                        {allowedFegyverek.filter(f => f.Type === 'kozelharci').map(f => <option
                            key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
                    </optgroup>
                    <optgroup label="Közelharci, dobható">
                        {allowedFegyverek.filter(f => f.Type === 'dobhato').map(f => <option
                            key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
                    </optgroup>
                    <optgroup label="Távolsági">
                        {allowedFegyverek.filter(f => f.Type === 'lofegyver').map(f => <option 
                            key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
                    </optgroup>
                </select>
                <button className='col-md-2 col-sm-3 btn btn-outline-dark btn-lg ms-2' type='button'
                        onClick={() => changeFelszereles({
                            ...felszereles,
                            fegyverIDk: [...felszereles.fegyverIDk.slice(0, idx), ...felszereles.fegyverIDk.slice(idx+1)]})}>Elvesz</button>
            </div>
        ))}
        <button className='btn btn-outline-dark btn btn-lg ms-2' type='button' onClick={() => changeFelszereles({...felszereles, fegyverIDk: [...felszereles.fegyverIDk, 'bot']})}>Fegyver hozzáadása</button>
    </>
}

export default Felszereles