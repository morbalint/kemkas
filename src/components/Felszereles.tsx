import React from "react";
import { KarakterFelszereles, PancelTypes, PancelTypeLabel } from "../domain-models/felszereles";
import pancelok from '../domain-models/pancel.json'
import pajzsok from '../domain-models/pajzs.json'

function Felszereles(props: {felszereles: KarakterFelszereles, changeFelszereles: (felszereles: KarakterFelszereles) => void}) {
    const { felszereles, changeFelszereles } = props;
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Viselt páncél</label>
            <select className='col form-select' value={felszereles.pancelID} onChange={e => changeFelszereles({...felszereles, pancelID: e.target.value === 'nincs' ? undefined : e.target.value})}>
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {
                    PancelTypes.map(pancelType => (
                        <optgroup label={PancelTypeLabel(pancelType)}>
                            {pancelok[pancelType].map(p => <option key={p.ID} value={p.ID}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
                        </optgroup>
                    ))
                }
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Hordott pajzs</label>
            <select className='col form-select' value={felszereles.pajzsID} onChange={e => changeFelszereles({...felszereles, pajzsID: e.target.value === 'nincs' ? undefined : e.target.value})}>
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {pajzsok['pajzs'].map(p => <option key={p.ID} value={p.ID}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
            </select>
        </div>
    </>
}

export default Felszereles