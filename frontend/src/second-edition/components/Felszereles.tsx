import React from "react";
import {
    AllFelszereles,
    Fegyver, FelszerelesDto,
    GetFegyver, GetFelszereles, GetPajzs, GetPancel,
    KarakterFelszereles,
    PancelTypeLabel, ViseltSize
} from "../domain-models/felszereles";
import {Osztaly2E} from '../domain-models/osztaly2E'
import {AllowedPajzsTypes, AllowedPancelTypes} from '../domain-models/allowed-pancel-types'
import {arraySetN} from "../../util";
import {AllowedFegyverek} from "../domain-models/allowed-fegyver";
import FegyverSelector from "../display-components/FegyverSelector";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {characterSelector, setFelszereles} from "../domain-models/characterSlice";
import FelszerlesSelector from "../display-components/FelszerelesSelector";

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
    const viseltSize = ViseltSize(felszereles)
    const allowedPancel = AllowedPancelTypes(osztalyok)
        .filter(x => felszereles.pancelID === x.Id || x.Size + viseltSize - (GetPancel(felszereles.pancelID)?.Size ?? 0) <= 8)
    const allowedPajzs = AllowedPajzsTypes(osztalyok)
        .filter(x => felszereles.pajzsID === x.Id || x.Size + viseltSize - (GetPajzs(felszereles.pajzsID)?.Size ?? 0) <= 8)
    const valasztottFegyverek = felszereles.fegyverIDk
        .map((id, idx) => ({
            idx,
            fegyver: GetFegyver(id),
        })).filter((x) => x.fegyver != null).map(({idx, fegyver}) => ({idx, fegyver: fegyver as Fegyver}));

    const viseltFelszereles= felszereles.viseltFelszerelesIDk.map((id, idx) => ({
        idx,
        targy: GetFelszereles(id),
    })).filter(x => x.targy != null);
    const aprosagFelszereles= felszereles.aprosagFelszerelesIDk.map((id, idx) => ({
        idx,
        targy: GetFelszereles(id),
    })).filter(x => x.targy != null);

    const osztalyAllowedFegyverek = AllowedFegyverek(osztalyok)
    const allowedFegyverek = (selected?: Fegyver) => ([
        ...osztalyAllowedFegyverek.filter(x => x.Size + viseltSize - (selected?.Size ?? 0) <= 8),
        ...valasztottFegyverek.filter(({idx,fegyver}) => !osztalyAllowedFegyverek.map(f => f.Id).includes(fegyver.Id))
            .map(({fegyver}) => fegyver)])
    const changeFegyver = (idx: number, newID: string) => {
        const found = GetFegyver(newID)
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
        fegyverIDk: [...felszereles.fegyverIDk.slice(0, idx), ...felszereles.fegyverIDk.slice(idx + 1)]
    })
    const addFegyver = () => changeFelszereles({...felszereles, fegyverIDk: [...felszereles.fegyverIDk, 'okol']})

    const allowedViselt = (selected?: FelszerelesDto) => AllFelszereles.filter(x =>
        (x.size > 0 && viseltSize + x.size - (selected?.size ?? 0) <= 8))
    const addViseltFelszereles = () => changeFelszereles({
        ...felszereles,
        viseltFelszerelesIDk: [...felszereles.viseltFelszerelesIDk, 'szog']
    })
    const changeViselt = (idx: number) => (newID: string) => {
        const found = GetFelszereles(newID)
        if (!found) {
            console.log('Nem létező tárgy ID: ', newID)
            return
        }
        changeFelszereles({...felszereles, viseltFelszerelesIDk: arraySetN(felszereles.viseltFelszerelesIDk, idx, newID)})
    }
    const removeViseltFelszereles = (idx: number) => () => changeFelszereles({
        ...felszereles,
        viseltFelszerelesIDk: [...felszereles.viseltFelszerelesIDk.slice(0, idx), ...felszereles.viseltFelszerelesIDk.slice(idx + 1)]
    })

    const addAprosag = () => changeFelszereles({
        ...felszereles,
        aprosagFelszerelesIDk: [...felszereles.aprosagFelszerelesIDk, 'tarsoly']
    })
    const changeAprosag = (idx: number) => (newID: string) => {
        const found = GetFelszereles(newID)
        if (!found) {
            console.log('Nem létező tárgy ID: ', newID)
            return
        }
        changeFelszereles({...felszereles, aprosagFelszerelesIDk: arraySetN(felszereles.aprosagFelszerelesIDk, idx, newID)})
    }
    const removeAprosag = (idx: number) => () => changeFelszereles({
        ...felszereles,
        aprosagFelszerelesIDk: [...felszereles.aprosagFelszerelesIDk.slice(0, idx), ...felszereles.aprosagFelszerelesIDk.slice(idx + 1)]
    })

    const cipeltCapacity = viseltFelszereles.reduce((acc, item) => acc + (item.targy?.type === 'container' ? item.targy.capacity : 0), 0)
    const addCipelt = () => changeFelszereles({
        ...felszereles,
        cipeltFelszerelesIDk: [...felszereles.cipeltFelszerelesIDk, 'szog']
    })
    const cipeltFelszereles= felszereles.cipeltFelszerelesIDk.map((id, idx) => ({
        idx,
        targy: GetFelszereles(id),
    })).filter(x => x.targy != null);

    const changeCipelt = (idx: number) => (newID: string) => {
        const found = GetFelszereles(newID)
        if (!found) {
            console.log('Nem létező tárgy ID: ', newID)
            return
        }
        changeFelszereles({...felszereles, cipeltFelszerelesIDk: arraySetN(felszereles.cipeltFelszerelesIDk, idx, newID)})
    }
    const removeCipelt = (idx: number) => () => changeFelszereles({
        ...felszereles,
        cipeltFelszerelesIDk: [...felszereles.cipeltFelszerelesIDk.slice(0, idx), ...felszereles.cipeltFelszerelesIDk.slice(idx + 1)]
    })

    return <>
        <div className='row'>
            <h5 className='col align-self-center'>Felszerelés</h5>
        </div>
        <div className='row mt-2'>
            <h6 className='col align-self-center'>Harci felszerelés</h6>
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
                            <option key={p.Id}
                                    value={p.Id}>{`${p.Name}${p.Size > 1 ? ` [${p.Size}]` : ''} (+${p.VO} VO) - ${p.Price} at`}</option>)}
                    </optgroup>
                }
                {
                    allowedPancel.some(p => p.Type === "nehez") &&
                    <optgroup label={PancelTypeLabel("nehez")}>
                        {allowedPancel.filter(p => p.Type === "nehez").map(p =>
                            <option key={p.Id}
                                    value={p.Id}>{`${p.Name} [${p.Size}] (+${p.VO} VO) - ${p.Price} at`}</option>)}
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
                {allowedPajzs.map(p => <option key={p.Id}
                                               value={p.Id}>{`${p.Name} (+${p.VO} VO) - ${p.Price} at`}</option>)}
            </select>
        </div>
        {valasztottFegyverek.map(({idx, fegyver}) => (
            <div key={`fegyver-${idx}`} className='row m-2'>
                <label className='col-md-2 col-sm-3 col-form-label'>Fegyver</label>
                <FegyverSelector
                    fegyverek={allowedFegyverek(fegyver)}
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
        {viseltSize < 8 && (<button
            className='btn btn-outline-dark btn btn-lg ms-2'
            type='button'
            onClick={addFegyver}
        >
            Fegyver hozzáadása
        </button>)}
        <hr/>
        <div className='row mt-2'>
            <h6 className='col align-self-center'>Viselt felszerelés</h6>
        </div>
        {viseltFelszereles.map(({idx, targy}) => (
            <div key={`felszereles-viselt-${idx}`} className='row m-2'>
                <FelszerlesSelector
                    felszerelesek={allowedViselt(targy)}
                    onChange={changeViselt(idx)}
                    selectedId={targy!.id}
                    dataTestId={`felszereles-viselt-selector-${idx}`}
                />
                <button
                    className='col-md-2 col-sm-3 btn btn-outline-dark btn-lg ms-2'
                    type='button'
                    onClick={removeViseltFelszereles(idx)}>Elvesz
                </button>
            </div>
        ))}
        {viseltSize < 8 && (<button
            className='btn btn-outline-dark btn btn-lg ms-2'
            type='button'
            onClick={addViseltFelszereles}
        >
            Felszerelés hozzáadása
        </button>)}
        {cipeltCapacity > 0 && <><hr/>
        <div className='row mt-2'>
            <h6 className='col align-self-center'>Cipelt felszerelés</h6>
        </div>
        {cipeltFelszereles.map(({idx, targy}) => (
            <div key={`felszereles-viselt-${idx}`} className='row m-2'>
                <FelszerlesSelector
                    felszerelesek={AllFelszereles.filter(x => x.size > 0)}
                    onChange={changeCipelt(idx)}
                    selectedId={targy!.id}
                    dataTestId={`felszereles-viselt-selector-${idx}`}
                />
                <button
                    className='col-md-2 col-sm-3 btn btn-outline-dark btn-lg ms-2'
                    type='button'
                    onClick={removeCipelt(idx)}>Elvesz
                </button>
            </div>
        ))}
        {felszereles.cipeltFelszerelesIDk.length < cipeltCapacity && (<button
            className='btn btn-outline-dark btn btn-lg ms-2'
            type='button'
            onClick={addCipelt}
        >
            Cipelt felszerelés hozzáadása
        </button>)}</>}
        <hr/>
        <div className='row mt-2'>
            <h6 className='col align-self-center'>Apróságok</h6>
        </div>
        {aprosagFelszereles.map(({idx, targy}) => (
            <div key={`felszereles-viselt-${idx}`} className='row m-2'>
                <FelszerlesSelector
                    felszerelesek={AllFelszereles.filter(x => x.size === 0)}
                    onChange={changeAprosag(idx)}
                    selectedId={targy!.id}
                    dataTestId={`felszereles-viselt-selector-${idx}`}
                />
                <button
                    className='col-md-2 col-sm-3 btn btn-outline-dark btn-lg ms-2'
                    type='button'
                    onClick={removeAprosag(idx)}>Elvesz
                </button>
            </div>
        ))}
        {felszereles.aprosagFelszerelesIDk.length < 8 && (<button
            className='btn btn-outline-dark btn btn-lg ms-2'
            type='button'
            onClick={addAprosag}
        >
            Apróság hozzáadása
        </button>)}
    </>
}

export default Felszereles