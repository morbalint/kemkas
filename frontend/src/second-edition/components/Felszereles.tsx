import React from "react";
import {
    AllFelszereles,
    Fegyver, FelszerelesDto, FelszerelesErtekeAranyban,
    GetFegyver, GetFelszereles, GetPajzs, GetPancel,
    KarakterFelszereles,
    PancelTypeLabel, Teherbiras, ViseltSize
} from "../domain-models/felszereles";
import {Osztaly2E} from '../domain-models/osztaly2E'
import {AllowedPajzsTypes, AllowedPancelTypes} from '../domain-models/allowed-pancel-types'
import {arraySetN} from "../../util";
import {AllowedFegyverek, HarcosFegyverforgatok} from "../domain-models/allowed-fegyver";
import FegyverSelector from "../display-components/FegyverSelector";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {characterSelector, setFelszereles} from "../domain-models/characterSlice";
import FelszerlesSelector from "../display-components/FelszerelesSelector";

export function Felszereles(){
    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const felszereles = karakter.felszereles
    const osztalyok = karakter.szintlepesek.map(x => x.osztaly)
    const changeFelszereles = (f: KarakterFelszereles) => dispatch(setFelszereles(f))
    const teherbiras = Teherbiras(karakter);
    return <FelszerelesView felszereles={felszereles} changeFelszereles={changeFelszereles} osztalyok={osztalyok} teherbiras={teherbiras} />
}

function ItemMaxCount(targy?: FelszerelesDto): number {
    const targySize = targy?.size ?? 1
    return (targySize < 1 && targySize > 0) ? Math.round(1/targy!.size) : 1;
}

// TODO: Make all items use the same `size`. Lowercase data fields!
function FegyverMaxCount(fegyver?: Fegyver): number {
    const fegyverSize = fegyver?.Size ?? 1
    return (fegyverSize < 1 && fegyverSize > 0) ? Math.round(1/fegyver!.Size) : 1;
}

function FormatCoins(gold: number): string {
    const at = Math.floor(gold)
    const et = Math.round((gold-at) * 10);
    return `${at} at${et > 0 ? ` ${et} et` : ''}`
}

export function FelszerelesView(props: {felszereles: KarakterFelszereles, changeFelszereles: (felszereles: KarakterFelszereles) => void, osztalyok: Osztaly2E[], teherbiras: number}) {
    const {felszereles, changeFelszereles, osztalyok, teherbiras} = props;
    const viseltSize = ViseltSize(felszereles)
    const allowedPancel = AllowedPancelTypes(osztalyok)
        .filter(x => felszereles.pancelID === x.Id || x.Size + viseltSize - (GetPancel(felszereles.pancelID)?.Size ?? 0) <= 8)
    const allowedPajzs = AllowedPajzsTypes(osztalyok)
        .filter(x => felszereles.pajzsID === x.Id || x.Size + viseltSize - (GetPajzs(felszereles.pajzsID)?.Size ?? 0) <= 8)
    const valasztottFegyverek = felszereles.fegyverek
        .map(({id, count}, idx) => {
            const fegyver = GetFegyver(id)
            const max = FegyverMaxCount(fegyver)
            return {
                idx,
                fegyver: GetFegyver(id),
                count,
                max
            };
        }).filter((x) => x.fegyver != null).map(x => ({...x, fegyver: x.fegyver as Fegyver}));

    const viseltFelszereles= felszereles.viselt.map(({id, count}, idx) => {
        const targy = GetFelszereles(id)
        const max = ItemMaxCount(targy)
        return {
            idx,
            targy,
            count,
            max,
        };
    }).filter(x => x.targy != null);


    const osztalyAllowedFegyverek = AllowedFegyverek(osztalyok)
    const allowedFegyverek = (selected?: Fegyver) => ([
        ...osztalyAllowedFegyverek.filter(x => x.Size + viseltSize - (selected?.Size ?? 1 > 1 ? selected!.Size : 1) <= 8),
        ...valasztottFegyverek.filter(({idx,fegyver}) => !osztalyAllowedFegyverek.map(f => f.Id).includes(fegyver.Id))
            .map(({fegyver}) => fegyver)])


    const changePancel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeFelszereles({...felszereles, pancelID: event.target.value === 'nincs' ? undefined : event.target.value})
    }
    const changePajzs = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeFelszereles({...felszereles, pajzsID: event.target.value === 'nincs' ? undefined : event.target.value})
    }
    const addFegyver = () => {
        const newFegyver = osztalyok.some(o => HarcosFegyverforgatok.has(o)) ? 'okol_harcos' : 'okol'
        changeFelszereles({...felszereles, fegyverek: [...felszereles.fegyverek, {id: newFegyver, count: 1}]});
    }
    const changeFegyver = (idx: number, newID: string) => {
        const found = GetFegyver(newID)
        if (!found) {
            console.log('Nem létező fegyver ID: ', newID)
            return
        }
        changeFelszereles({...felszereles, fegyverek: arraySetN(felszereles.fegyverek, idx, {id: newID, count: 1})})
    }
    const increaseFegyverCount = (idx: number) => () => {
        const old = felszereles.fegyverek[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.fegyverek)
            return
        }
        if(old.count >= FegyverMaxCount(GetFegyver(old.id))){
            console.error("Can't increase item count more than max!", old)
            return;
        }
        changeFelszereles({...felszereles, fegyverek: arraySetN(felszereles.fegyverek, idx, {...old, count: old.count + 1})})
    }
    const decreaseFegyverCount = (idx: number) => () => {
        const old = felszereles.fegyverek[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.fegyverek)
            return
        }
        if(old.count === 1){
            changeFelszereles({
                ...felszereles,
                fegyverek: [...felszereles.fegyverek.slice(0, idx), ...felszereles.viselt.slice(idx + 1)]
            })
        }
        else{
            changeFelszereles({...felszereles, fegyverek: arraySetN(felszereles.fegyverek, idx, {...old, count: old.count - 1})})
        }
    }
    const removeFegyver = (idx: number) => () => changeFelszereles({
        ...felszereles,
        fegyverek: [...felszereles.fegyverek.slice(0, idx), ...felszereles.fegyverek.slice(idx + 1)]
    })

    const allowedViselt = (selected?: FelszerelesDto) => AllFelszereles.filter(x => {
        const selectedSize = (selected?.size ?? 1) > 1 ? selected!.size : 1
        return (x.size > 0 && (viseltSize + x.size - selectedSize) <= 8);
    })
    const addViselt = () => changeFelszereles({
        ...felszereles,
        viselt: [...felszereles.viselt, {id: 'szog', count: 1}]
    })
    const changeViselt = (idx: number) => (newID: string) => {
        const found = GetFelszereles(newID)
        if (!found) {
            console.log('Nem létező tárgy ID: ', newID)
            return
        }
        const old = felszereles.viselt[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.viselt)
            return
        }
        const item = {id: newID, count: 1}
        changeFelszereles({...felszereles, viselt: arraySetN(felszereles.viselt, idx, item)})
    }
    const increaseViseltCount = (idx: number) => () => {
        const old = felszereles.viselt[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.viselt)
            return
        }
        if(old.count >= ItemMaxCount(GetFelszereles(old.id))){
            console.error("Can't increase item count more than max!", old)
            return;
        }
        changeFelszereles({...felszereles, viselt: arraySetN(felszereles.viselt, idx, {...old, count: old.count + 1})})
    }
    const decreaseViseltCount = (idx: number) => () => {
        const old = felszereles.viselt[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.viselt)
            return
        }
        if(old.count === 1){
            changeFelszereles({
                ...felszereles,
                viselt: [...felszereles.viselt.slice(0, idx), ...felszereles.viselt.slice(idx + 1)]
            })
        }
        else{
            changeFelszereles({...felszereles, viselt: arraySetN(felszereles.viselt, idx, {...old, count: old.count - 1})})
        }
    }
    const removeViselt = (idx: number) => () => changeFelszereles({
        ...felszereles,
        viselt: [...felszereles.viselt.slice(0, idx), ...felszereles.viselt.slice(idx + 1)]
    })

    const aprosagFelszereles= felszereles.aprosagok.map(({id, count}, idx) => ({
        idx,
        targy: GetFelszereles(id),
        count,
    })).filter(x => x.targy != null);
    const addAprosag = () => changeFelszereles({
        ...felszereles,
        aprosagok: [...felszereles.aprosagok, {id: 'tarsoly', count: 1}]
    })
    const changeAprosag = (idx: number) => (newID: string) => {
        const found = GetFelszereles(newID)
        if (!found) {
            console.error('Nem létező tárgy ID: ', newID)
            return
        }
        const old = felszereles.aprosagok[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.aprosagok)
            return
        }
        changeFelszereles({...felszereles, aprosagok: arraySetN(felszereles.aprosagok, idx, {...old, id: newID})})
    }
    const increaseAprosagCount = (idx: number) => () => {
        const old = felszereles.aprosagok[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.aprosagok)
            return
        }
        changeFelszereles({...felszereles, aprosagok: arraySetN(felszereles.aprosagok, idx, {...old, count: old.count + 1})})
    }
    const decreaseAprosagCount = (idx: number) => () => {
        const old = felszereles.aprosagok[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.aprosagok)
            return
        }
        if(old.count === 1){
            changeFelszereles({
                ...felszereles,
                aprosagok: [...felszereles.aprosagok.slice(0, idx), ...felszereles.aprosagok.slice(idx + 1)]
            })
        }
        else{
            changeFelszereles({...felszereles, aprosagok: arraySetN(felszereles.aprosagok, idx, {...old, count: old.count - 1})})
        }
    }

    const cipeltCapacity = viseltFelszereles.reduce((acc, item) => acc + (item.targy?.type === 'container' ? item.targy.capacity : 0), 0)
    const addCipelt = () => changeFelszereles({
        ...felszereles,
        cipelt: [...felszereles.cipelt, {id: 'szog', count: 1}]
    })
    const cipeltFelszereles= felszereles.cipelt.map(({id, count}, idx) => {
        const targy = GetFelszereles(id)
        const max = ItemMaxCount(targy)
        return ({
            idx,
            targy,
            count,
            max
        });
    }).filter(x => x.targy != null);
    const cipeltSize = cipeltFelszereles.reduce((acc, item) => acc + Math.ceil(item.targy?.size ?? 1), 0)

    const allowedCipelt = (selected?: FelszerelesDto) => AllFelszereles.filter(x => x.size > 0
        && Math.ceil(x.size) + cipeltSize - Math.ceil(selected?.size ?? 0) <= cipeltCapacity)

    const changeCipelt = (idx: number) => (newID: string) => {
        const found = GetFelszereles(newID)
        if (!found) {
            console.log('Nem létező tárgy ID: ', newID)
            return
        }
        const old = felszereles.cipelt[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.cipelt)
            return
        }
        const newItem = {id: newID, count: 1}
        changeFelszereles({...felszereles, cipelt: arraySetN(felszereles.cipelt, idx, newItem)})
    }
    const increaseCipeltCount = (idx: number) => () => {
        const old = felszereles.cipelt[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.cipelt)
            return
        }
        if(old.count >= ItemMaxCount(GetFelszereles(old.id))){
            console.error("Can't increase item count more than max!", old)
            return;
        }
        changeFelszereles({...felszereles, cipelt: arraySetN(felszereles.cipelt, idx, {...old, count: old.count + 1})})
    }
    const decreaseCipeltCount = (idx: number) => () => {
        const old = felszereles.cipelt[idx]
        if (old == null) {
            console.error('Index out of range! index: {0}, array: {1}', idx, felszereles.cipelt)
            return
        }
        if(old.count === 1){
            changeFelszereles({
                ...felszereles,
                cipelt: [...felszereles.cipelt.slice(0, idx), ...felszereles.cipelt.slice(idx + 1)]
            })
        }
        else{
            changeFelszereles({...felszereles, cipelt: arraySetN(felszereles.cipelt, idx, {...old, count: old.count - 1})})
        }
    }
    const removeCipelt = (idx: number) => () => changeFelszereles({
        ...felszereles,
        cipelt: [...felszereles.cipelt.slice(0, idx), ...felszereles.cipelt.slice(idx + 1)]
    })

    return <>
        <div className='row'>
            <h5 className='col align-self-center'>Felszerelés</h5>
        </div>
        <div className='row mt-4'>
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
        {valasztottFegyverek.map(({idx, fegyver, count, max}) => (
            <div key={`fegyver-${idx}`} className='row m-2'>
                <label className='col-md-2 col-sm-3 col-form-label'>Fegyver</label>
                <FegyverSelector
                    fegyverek={allowedFegyverek(fegyver)}
                    selectedId={fegyver.Id}
                    onChange={(fegyverId) => changeFegyver(idx, fegyverId)}
                    dataTestId={`felszereles-fegyver-${idx}`}
                />
                {(count > 1 || max > 1) &&
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <div className="row">
                            <div className="w-25 ps-2">
                                <button
                                    className='btn btn-outline-dark'
                                    type='button'
                                    onClick={decreaseFegyverCount(idx)}
                                >
                                    −
                                </button>
                            </div>
                            <span className="w-50 align-content-center text-center">{' '}{count}{' db '}</span>
                            <div className="w-25 ps-2 ">
                                <button
                                    className='btn btn-outline-dark float-end'
                                    type='button'
                                    disabled={count >= max}
                                    onClick={increaseFegyverCount(idx)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>}
                {max <= 1 && <div className="col-lg-2 col-md-3 col-sm-4">
                    <button
                        className='btn btn-outline-dark w-100'
                        type='button'
                        onClick={removeFegyver(idx)}>Elvesz
                    </button>
                </div>}
            </div>
        ))}
        {viseltSize < 8 && (viseltSize + cipeltSize < teherbiras) && (<button
            className='btn btn-outline-dark btn ms-2'
            type='button'
            onClick={addFegyver}
        >
            Fegyver hozzáadása
        </button>)}
        <div className='row mt-4'>
            <h6 className='col align-self-center'>Viselt felszerelés</h6>
        </div>
        {viseltFelszereles.map(({idx, targy, count, max}) => (
            <div key={`felszereles-viselt-${idx}`} className='row m-2'>
                <FelszerlesSelector
                    felszerelesek={allowedViselt(targy)}
                    onChange={changeViselt(idx)}
                    selectedId={targy!.id}
                    dataTestId={`felszereles-viselt-selector-${idx}`}
                />
                {(count > 1 || max > 1) &&
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <div className="row">
                            <div className="w-25 ps-2">
                                <button
                                    className='btn btn-outline-dark'
                                    type='button'
                                    onClick={decreaseViseltCount(idx)}
                                >
                                    −
                                </button>
                            </div>
                            <span className="w-50 align-content-center text-center">{' '}{count}{' db '}</span>
                            <div className="w-25 ps-2 ">
                                <button
                                    className='btn btn-outline-dark float-end'
                                    type='button'
                                    disabled={count >= max}
                                    onClick={increaseViseltCount(idx)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>}
                {max <= 1 && <div className="col-lg-2 col-md-3 col-sm-4">
                    <button
                        className='btn btn-outline-dark w-100'
                        type='button'
                        onClick={removeViselt(idx)}>Elvesz
                    </button>
                </div>}
            </div>
        ))}
        {viseltSize < 8 && viseltSize + cipeltSize < teherbiras && (<button
            className='btn btn-outline-dark btn ms-2'
            type='button'
            onClick={addViselt}
        >
            Viselt felszerelés hozzáadása
        </button>)}
        {cipeltCapacity > 0 && <>
            <div className='row mt-4'>
                <h6 className='col align-self-center'>Cipelt felszerelés</h6>
            </div>
            {cipeltFelszereles.map(({idx, targy, count, max}) => (
                <div key={`felszereles-viselt-${idx}`} className='row m-2'>
                    <FelszerlesSelector
                        felszerelesek={allowedCipelt(targy)}
                        onChange={changeCipelt(idx)}
                        selectedId={targy!.id}
                        dataTestId={`felszereles-viselt-selector-${idx}`}
                    />
                    {(count > 1 || max > 1) &&
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <div className="row">
                                <div className="w-25 ps-2">
                                    <button
                                        className='btn btn-outline-dark'
                                        type='button'
                                        onClick={decreaseCipeltCount(idx)}
                                    >
                                        −
                                    </button>
                                </div>
                                <span className="w-50 align-content-center text-center">{' '}{count}{' db '}</span>
                                <div className="w-25 ps-2 ">
                                    <button
                                        className='btn btn-outline-dark float-end'
                                        type='button'
                                        disabled={count >= max}
                                        onClick={increaseCipeltCount(idx)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>}
                    {max <= 1 && <div className="col-lg-2 col-md-3 col-sm-4">
                        <button
                            className='btn btn-outline-dark w-100'
                            type='button'
                            onClick={removeCipelt(idx)}>Elvesz
                        </button>
                    </div>}
                </div>
            ))}
            {cipeltSize < cipeltCapacity && (viseltSize + cipeltSize < teherbiras) && (<button
                className='btn btn-outline-dark btn ms-2'
                type='button'
                onClick={addCipelt}
            >
                Cipelt felszerelés hozzáadása
            </button>)}</>}
        <div className='row mt-4'>
            <h6 className='col align-self-center'>Apróságok</h6>
        </div>
        {aprosagFelszereles.map(({idx, targy, count}) => (
            <div key={`felszereles-viselt-${idx}`} className='row m-2'>
                <FelszerlesSelector
                    felszerelesek={AllFelszereles.filter(x => x.size === 0)}
                    onChange={changeAprosag(idx)}
                    selectedId={targy!.id}
                    dataTestId={`felszereles-viselt-selector-${idx}`}
                />
                <div className="col-lg-2 col-md-3 col-sm-4">
                    <div className="row">
                        <div className="w-25 ps-2">
                            <button
                                className='btn btn-outline-dark'
                                type='button'
                                onClick={decreaseAprosagCount(idx)}
                            >
                                −
                            </button>
                        </div>
                        <span className="w-50 align-content-center text-center">{' '}{count}{' db '}</span>
                        <div className="w-25 ps-2 ">
                            <button
                                className='btn btn-outline-dark float-end'
                                type='button'
                                onClick={increaseAprosagCount(idx)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        {felszereles.aprosagok.length < 8 && (<button
            className='btn btn-outline-dark btn ms-2'
            type='button'
            onClick={addAprosag}
        >
            Apróság hozzáadása
        </button>)}
        <div className='row mt-4'>
            <h6 className='col align-self-center'>Pénz</h6>
        </div>
        <div className='row m-2'>
            Felszerelés értéke: {FormatCoins(FelszerelesErtekeAranyban(felszereles))}
        </div>
    </>
}

export default Felszereles