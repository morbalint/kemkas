import React from "react";
import {Fegyver, KarakterFelszereles, PancelTypeLabel} from "../domain-models/felszereles";
import {Osztaly} from '../domain-models/osztaly'
import {AllowedPancelTypes} from '../domain-models/allowed-pancel-types'
import pancelok from '../domain-models/pancel.json'
import pajzsok from '../domain-models/pajzs.json'
import fegyverek from '../domain-models/fegyver.json'
import {arraySetN} from "../../util";
import {AllowedFegyver} from "../domain-models/allowed-fegyver";

export function FegyverLabel(fegyver: Fegyver): string {
    return `${fegyver.Name}${fegyver.Ketkezes ? '+' : ''}${fegyver.Egzotikus ? '(E)' : ''} | ${
        fegyver.NumberOfDamageDice}d${fegyver.DamageDice} ${
        fegyver.CritRangeStart < 20 ? `${fegyver.CritRangeStart}-20` : ''}x${fegyver.CritMultiplier}${
        fegyver.Price > 0 ? ` | ár: ${fegyver.Price} at ` : ''}${
        fegyver.Range > 0 ? ` | táv: ${fegyver.Range}` : ''}`
}

function Felszereles(props: {felszereles: KarakterFelszereles, changeFelszereles: (felszereles: KarakterFelszereles) => void, osztaly: Osztaly, harcosSpec: Fegyver['Id'][]}) {
    const { felszereles, changeFelszereles, osztaly, harcosSpec } = props;
    const allowedPancelTypes = AllowedPancelTypes([osztaly])
    const valasztottFegyverek = felszereles.fegyverIDk
            .map((id, idx) => ({idx, fegyver: fegyverek.data.find(f => f.Id === id)})).filter((x) => x.fegyver != null).map(({idx, fegyver}) => ({idx, fegyver: fegyver as Fegyver}))

    const osztalyAllowedFegyverek = AllowedFegyver(osztaly, harcosSpec)
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
                    allowedPancelTypes.map(pancelType => (
                        <optgroup key={pancelType} label={PancelTypeLabel(pancelType)}>
                            {pancelok['pancel'].filter(p => p.Type === pancelType).map(p => <option key={p.Id} value={p.Id}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
                        </optgroup>
                    ))
                }
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Hordott pajzs</label>
            <select className='col form-select' value={felszereles.pajzsID} onChange={e => changeFelszereles({...felszereles, pajzsID: e.target.value === 'nincs' ? undefined : e.target.value})}>
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {allowedPancelTypes.length > 0 && (pajzsok['pajzs'].map(p => <option key={p.Id} value={p.Id}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>))}
            </select>
        </div>
        {valasztottFegyverek.map(({idx, fegyver}) => (
            <div key={`fegyver-${idx}`} className='row m-2'>
                <label className='col-md-2 col-sm-3 col-form-label'>Fegyver</label>
                <select className='col form-select' value={fegyver.Id} onChange={e => changeFegyver(idx, e.target.value)}>
                    <optgroup label="Közelharci">
                        {allowedFegyverek.filter(f => f.Type === 'kozelharci').map(f => <option key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
                    </optgroup>
                    <optgroup label="Távolsági">
                        {allowedFegyverek.filter(f => f.Type === 'lofegyver').map(f => <option key={f.Id} value={f.Id}>{FegyverLabel(f)}</option>)}
                    </optgroup>
                </select>
                <button className='col-md-2 col-sm-3 btn btn-outline-dark btn-lg ms-2' type='button' onClick={() => changeFelszereles({...felszereles, fegyverIDk: [...felszereles.fegyverIDk.slice(0, idx), ...felszereles.fegyverIDk.slice(idx+1)]})}>Elvesz</button>
            </div>
        ))}
        <button className='btn btn-outline-dark btn btn-lg ms-2' type='button' onClick={() => changeFelszereles({...felszereles, fegyverIDk: [...felszereles.fegyverIDk, 'okol']})}>Fegyver hozzáadása</button>
    </>
}

export default Felszereles