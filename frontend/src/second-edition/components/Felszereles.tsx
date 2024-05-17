import React from "react";
import {Fegyver, KarakterFelszereles, PancelTypeLabel} from "../domain-models/felszereles";
import {Osztaly2E} from '../domain-models/osztaly2E'
import {AllowedPajzsTypes, AllowedPancelTypes} from '../domain-models/allowed-pancel-types'
import fegyverek from '../domain-models/fegyver.json'
import {arraySetN} from "../../util";
import {AllowedFegyverek} from "../domain-models/allowed-fegyver";
import FegyverSelector from "../display-components/FegyverSelector";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {characterSelector, setFelszereles} from "../domain-models/characterSlice";

export function Felszereles(){
    const character = useSelector.withTypes<RootState>()(characterSelector)
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const felszereles = character.felszereles
    const osztalyok = character.szintlepesek.map(x => x.osztaly)
    const changeFelszereles = (f: KarakterFelszereles) => dispatch(setFelszereles(f))
    return <FelszerelesView felszereles={felszereles} changeFelszereles={changeFelszereles} osztalyok={osztalyok} />
}

export function FelszerelesView(props: {felszereles: KarakterFelszereles, changeFelszereles: (felszereles: KarakterFelszereles) => void, osztalyok: Osztaly2E[]}) {
    const {felszereles, changeFelszereles, osztalyok} = props;
    const allowedPancel = AllowedPancelTypes(osztalyok)
    const allowedPajzs = AllowedPajzsTypes(osztalyok)
    const valasztottFegyverek = felszereles.fegyverIDk
        .map((id, idx) => ({idx, fegyver: fegyverek.data.find(f => f.Id === id)})).filter((x) => x.fegyver != null).map(({idx, fegyver}) => ({idx, fegyver: fegyver as Fegyver}))

    const osztalyAllowedFegyverek = AllowedFegyverek(osztalyok)
    const allowedFegyverek = [...osztalyAllowedFegyverek, ...valasztottFegyverek.filter(({idx, fegyver}) => !osztalyAllowedFegyverek.map(f => f.Id).includes(fegyver.Id)).map(({fegyver}) => fegyver)]
    const changeFegyver = (idx: number, newID: string) => {
        const found = fegyverek.data.find(x => x.Id === newID)
        if (!found) {
            console.log('Nem létező fegyver ID: ', newID)
            return
        }
        changeFelszereles({...felszereles, fegyverIDk: arraySetN(felszereles.fegyverIDk, idx, newID)})
    }

    const changePancel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeFelszereles({...felszereles, pancelID: event.target.value === 'nincs' ? undefined : event.target.value})
    }
    const changePajzs = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeFelszereles({...felszereles, pajzsID: event.target.value === 'nincs' ? undefined : event.target.value})
    }
    const removeFegyver = (idx: number) => () => changeFelszereles({
        ...felszereles,
        fegyverIDk: [...felszereles.fegyverIDk.slice(0, idx), ...felszereles.fegyverIDk.slice(idx+1)]
    })
    const addFegyver = () => changeFelszereles({...felszereles, fegyverIDk: [...felszereles.fegyverIDk, 'bot']})

    return <>
        <div className='row'>
            <h5 className='col align-self-center'>Felszerelés</h5>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Viselt páncél</label>
            <select
                className='col form-select'
                value={felszereles.pancelID}
                onChange={changePancel}
                data-testid={"pancel"}
            >
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {
                    allowedPancel.some(p => p.Type === "konnyu") &&
                    <optgroup label={PancelTypeLabel("konnyu")}>
                        {allowedPancel.filter(p => p.Type === "konnyu").map(p => 
                            <option key={p.Id} value={p.Id}>{`${p.Name}${p.Size > 1 ? ` [${p.Size}]` : ''} (+${p.VO} VO) - ${p.Price} at`}</option>)}
                    </optgroup>
                }
                {
                    allowedPancel.some(p => p.Type === "nehez") &&
                    <optgroup label={PancelTypeLabel("nehez")}>
                        {allowedPancel.filter(p => p.Type === "nehez").map(p => 
                            <option key={p.Id} value={p.Id}>{`${p.Name} [${p.Size}] (+${p.VO} VO) - ${p.Price} at`}</option>)}
                    </optgroup>
                }
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Hordott pajzs</label>
            <select
                className='col form-select'
                value={felszereles.pajzsID}
                onChange={changePajzs}
                data-testid={"pajzs"}
            >
                <option key={'nincs'} value={'nincs'}>Nincs</option>
                {allowedPajzs.map(p => <option key={p.Id} value={p.Id}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
            </select>
        </div>
        {valasztottFegyverek.map(({idx, fegyver}) => (
            <div key={`fegyver-${idx}`} className='row m-2'>
                <label className='col-md-2 col-sm-3 col-form-label'>Fegyver</label>
                <FegyverSelector
                    fegyverek={allowedFegyverek}
                    selectedId={fegyver.Id}
                    onChange={(fegyverId) => changeFegyver(idx, fegyverId)}
                    dataTestId={`felszereles-fegyver-${idx}`}
                />
                <button
                    className='col-md-2 col-sm-3 btn btn-outline-dark btn-lg ms-2'
                    type='button'
                    onClick={removeFegyver(idx)}>Elvesz
                </button>
            </div>
        ))}
        <button
            className='btn btn-outline-dark btn btn-lg ms-2'
            type='button'
            onClick={addFegyver}
        >
            Fegyver hozzáadása
        </button>
    </>
}

export default Felszereles