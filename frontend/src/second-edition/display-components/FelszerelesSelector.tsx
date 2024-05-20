import React from "react";
import {FelszerelesContainer, FelszerelesDto} from "../domain-models/felszereles";

function PriceLabel(priceInGold: number): string {
    if (priceInGold >= 1 && (priceInGold * 10) % 10 === 0) {
        return `${priceInGold} at`;
    }
    if ((priceInGold * 100) % 10 === 0) {
        return `${priceInGold*10} et`;
    }
    return `${priceInGold*100} rt`;
}

function FelszerelesLabel(f: FelszerelesDto): string {
    return `${f.nev}${f.size > 1 ? ` [${f.size}]` : f.size < 1 && f.size > 0 ? ` [1/${Math.round(1/f.size)}]` : ''} | ${PriceLabel(f.price)}`
}

function ContainerLabel(c: FelszerelesContainer): string {
    return `${c.nev}${c.size > 1 ? ` [${c.size}]` : c.size < 1 ? ` [1/${Math.round(1/c.size)}]` : ''} | kapacitás: ${c.capacity} | ${PriceLabel(c.price)}`
}

function FelszerlesSelector(props: {
    felszerelesek: FelszerelesDto[],
    selectedId: string,
    onChange: (id: string) => void,
    dataTestId?: string,
}) {
    const { felszerelesek, selectedId, onChange, dataTestId } = props

    const containers = felszerelesek.filter(x => x.type === 'container').map(x => x as FelszerelesContainer)
    const ordinary = felszerelesek.filter(f => f.type === 'items');

    return <>
        <select className='col form-select'
                value={selectedId}
                onChange={e => onChange(e.target.value)}
                data-testid={dataTestId}
        >
            {ordinary.length > 0 && <optgroup label="Közönséges">
                {ordinary.map(f => <option
                    key={f.id} value={f.id}>{FelszerelesLabel(f)}</option>)}
            </optgroup>}
            {containers.length > 0 && <optgroup label="Tárolók">
                {containers.map(c => <option
                    key={c.id} value={c.id}>{ContainerLabel(c)}</option>)}
            </optgroup>}
            <optgroup label="Ruhák">
                {felszerelesek.filter(f => f.type === 'clothes').map(f => <option
                    key={f.id} value={f.id}>{FelszerelesLabel(f)}</option>)}
            </optgroup>
            <optgroup label="Speciális">
                {felszerelesek.filter(f => f.type === 'spec').map(f => <option
                    key={f.id} value={f.id}>{FelszerelesLabel(f)}</option>)}
            </optgroup>
        </select>
    </>
}

export default FelszerlesSelector