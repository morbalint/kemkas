import React from "react";
import {Fegyver, KarakterFelszereles, PancelTypeLabel} from "../domain-models/felszereles";
import {Osztaly, OsztalyAllowedFegyver, OsztalyAllowedPancelTypes} from '../domain-models/osztaly'
import pancelok from '../domain-models/pancel.json'
import pajzsok from '../domain-models/pajzs.json'
import fegyverek from '../domain-models/fegyver.json'
import {arraySetN} from "../util";

function Felszereles(props: {felszereles: KarakterFelszereles, changeFelszereles: (felszereles: KarakterFelszereles) => void, osztaly: Osztaly}) {
    const { felszereles, changeFelszereles, osztaly } = props;
    const allowedPancelTypes = OsztalyAllowedPancelTypes(osztaly)
    const valasztottFegyverek = felszereles.fegyverIDk
            .map((id, idx) => ({idx, fegyver: fegyverek.fegyverek.find(f => f.ID === id)})).filter((x) => x.fegyver != null).map(({idx, fegyver}) => ({idx, fegyver: fegyver as Fegyver}))

    const osztalyAllowedFegyverek = OsztalyAllowedFegyver(osztaly)
    const allowedFegyverek = [...osztalyAllowedFegyverek, ...valasztottFegyverek.filter(({idx, fegyver}) => !osztalyAllowedFegyverek.map(f => f.ID).includes(fegyver.ID)).map(({fegyver}) => fegyver)]
    const changeFegyver = (idx: number, newID: string) => {
        const found = fegyverek.fegyverek.find(x => x.ID === newID)
        if (!found) {
            console.log('Nem létező fegyver ID: ', newID)
            return
        }
        changeFelszereles({...felszereles, fegyverIDk: arraySetN(felszereles.fegyverIDk, idx, newID)})
    }

    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Viselt páncél</label>
            <select className='col form-select' value={felszereles.pancelID} onChange={e => changeFelszereles({...felszereles, pancelID: e.target.value === 'nincs' ? undefined : e.target.value})}>
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {
                    allowedPancelTypes.map(pancelType => (
                        <optgroup key={pancelType} label={PancelTypeLabel(pancelType)}>
                            {pancelok['pancel'].filter(p => p.Type === pancelType).map(p => <option key={p.ID} value={p.ID}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
                        </optgroup>
                    ))
                }
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Hordott pajzs</label>
            <select className='col form-select' value={felszereles.pajzsID} onChange={e => changeFelszereles({...felszereles, pajzsID: e.target.value === 'nincs' ? undefined : e.target.value})}>
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {allowedPancelTypes.length > 0 && (pajzsok['pajzs'].map(p => <option key={p.ID} value={p.ID}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>))}
            </select>
        </div>
        {valasztottFegyverek.map(({idx, fegyver}) => (
            <div key={`fegyver-${idx}`} className='row m-2'>
                <label className='col-md-2 col-sm-3 col-form-label'>Fegyver</label>
                <select className='col form-select' value={fegyver.ID} onChange={e => changeFegyver(idx, e.target.value)}>
                    <optgroup label="Közelharci">
                        {allowedFegyverek.filter(f => f.Type === 'kozelharci').map(f => <option key={f.ID} value={f.ID}>{`${f.Name}`}</option>)}
                    </optgroup>
                    <optgroup label="Távolsági">
                        {allowedFegyverek.filter(f => f.Type === 'lofegyver').map(f => <option key={f.ID} value={f.ID}>{`${f.Name}`}</option>)}
                    </optgroup>
                </select>
                <button className='col-md-2 col-sm-3 btn btn-outline-dark btn-lg ms-2' type='button' onClick={() => changeFelszereles({...felszereles, fegyverIDk: [...felszereles.fegyverIDk.slice(0, idx), ...felszereles.fegyverIDk.slice(idx+1)]})}>Elvesz</button>
            </div>
        ))}
        <button className='btn btn-outline-dark btn btn-lg ms-2' type='button' onClick={() => changeFelszereles({...felszereles, fegyverIDk: [...felszereles.fegyverIDk, 'okol']})}>Fegyver hozzáadása</button>
    </>
}

export default Felszereles