import pancelok from '../data/pancel.json'
import pajzsok from '../data/pajzs.json'
import fegyverek from '../data/fegyver.json'
import felszereles from '../data/felszereles.json'
import {Modifier, TulajdonsagokTotal} from "./tulajdonsag2E";
import {Karakter2E} from "./karakter2E";

export type PancelType = 'konnyu' | 'nehez'

export const PancelTypes: PancelType[] = ['konnyu', 'nehez']

export interface Pancel {
    Id: string,
    Name: string,
    Type: PancelType
    VO: number,
    Price: number,
    Size: number
}

export interface Pajzs {
    Id: string,
    Name: string,
    Type: 'pajzs'
    VO: number,
    Price: number,
    Size: number
}

export interface Fegyver {
    Id: string,
    Name: string,
    Type: 'kozelharci' | 'dobhato' | 'lofegyver',
    Harcos: boolean,
    CsakNemHarcos: boolean,
    Masfelkezes: boolean,
    Ketkezes: boolean,
    KetkezesBonusz: boolean,
    HarciManover: boolean,
    Alakzat: boolean,
    Hosszu: boolean,
    Kabito: boolean,
    LovasRoham: boolean,
    PancelToro: boolean,
    PajzsZuzo: boolean,
    Rohamtoro: boolean,
    EroBonusz: boolean,
    Megterheltseg: boolean,
    Megjegyzes: string | undefined | null,
    Price: number,
    DamageMultiplier: number,
    DamageDice: number,
    NumberOfDamageDice: number,
    DamageBonus: number,
    CritRangeStart: number,
    CritMultiplier: number,
    Range: number,
    Size: number
}

export interface FelszerelesContainer {
    id: string,
    nev: string,
    size: number,
    price: number,
    type: "container",
    capacity: number
}

export interface FelszerelesItem {
    id: string,
    nev: string,
    size: number,
    price: number,
    type: "items" | "spec" | "clothes"
}

export type FelszerelesDto = FelszerelesItem | FelszerelesContainer;

export function Teherbiras(karakter: Pick<Karakter2E, "tulajdonsagok" | "faj" | "szintlepesek">) {
    const tulajdonsagok = TulajdonsagokTotal(karakter)
    return 13 + Modifier(tulajdonsagok.t_ero)
}

export const AllFelszereles : FelszerelesDto[] = [
    ...(felszereles.items as FelszerelesItem[]),
    ...(felszereles.containers as FelszerelesContainer[]),
    ...(felszereles.clothes as FelszerelesItem[]),
    ...(felszereles.specialis as FelszerelesItem[])
]

export interface IdAndCount {
    id: string
    count: number
}

export interface KarakterFelszereles {
    pancelID?: string
    pajzsID?: string
    fegyverek: IdAndCount[]
    viselt: IdAndCount[]
    cipelt: IdAndCount[]
    aprosagok: IdAndCount[]
    et: number
    el: number
    at: number
}

export const DefaultFelszereles: KarakterFelszereles = {
    fegyverek: [],
    viselt: [],
    cipelt: [],
    aprosagok: [],
    et: 0,
    el: 0,
    at: 0,
}

export function ViseltSize(felszereles: KarakterFelszereles): number {
    let sum = 0;
    sum += GetPajzs(felszereles.pajzsID)?.Size ?? 0;
    sum += GetPancel(felszereles.pancelID)?.Size ?? 0;

    sum += felszereles.fegyverek.map(({id}) => GetFegyver(id)).reduce((acc, item) => acc + Math.ceil(item?.Size ?? 0),0)
    sum += felszereles.viselt.map(({id}) => GetFelszereles(id)).reduce((acc, item) => acc + Math.ceil(item?.size ?? 0),0)

    return sum;
}

export function FelszerelesErtekeAranyban(felszereles: KarakterFelszereles): number {
    let sum = 0;
    sum += GetPajzs(felszereles.pajzsID)?.Price ?? 0;
    sum += GetPancel(felszereles.pancelID)?.Price ?? 0;

    sum += felszereles.fegyverek.map(({id, count}) => ({fegyver: GetFegyver(id), count})).reduce((acc, {fegyver, count}) => acc + ((fegyver?.Price ?? 0) * count),0)
    sum += felszereles.viselt.map(({id, count}) => ({targy: GetFelszereles(id), count})).reduce((acc, {targy, count}) => acc + (targy?.price ?? 0) * count,0)
    sum += felszereles.cipelt.map(({id, count}) => ({targy: GetFelszereles(id), count})).reduce((acc, {targy, count}) => acc + (targy?.price ?? 0) * count,0)
    sum += felszereles.aprosagok.map(({id, count}) => ({targy: GetFelszereles(id), count})).reduce((acc, {targy, count}) => acc + (targy?.price ?? 0) * count,0)

    return sum;
}

export function PancelTypeLabel(type: PancelType): string {
    let result: string
    switch(type) {
        case 'konnyu': 
            result = 'Könnyű'
            break
        case 'nehez':
            result = 'Nehéz'
            break
        default:
            result = 'Egyéb páncél'
    }
    return result
}

export function GetPancel(id?: string): Pancel | undefined {
    if (id == null) {
        return undefined
    }
    const filteredPancel = pancelok['pancel'].filter(p => p.Id === id) as Pancel[]
    return filteredPancel.length > 0 ? filteredPancel[0] : undefined
}

export function MaxAbilityVO(p: PancelType) {
    switch(p){
        case 'konnyu': return 9999;
        case 'nehez': return 1;
        default: return 9999;
    }
}

export function GetPajzs(id?: string): Pajzs | undefined {
    if (id == null) {
        return undefined
    }
    const filtered = pajzsok['pajzs'].filter(p => p.Id === id) as Pajzs[]
    return filtered.length > 0 ? filtered[0] : undefined
}

export function GetFegyver(id: string): Fegyver | undefined {
    return fegyverek.data.find(f => f.Id === id) as Fegyver | undefined
}

export function GetFelszereles(id?: string): FelszerelesItem | FelszerelesContainer | undefined {
    return GetFelszerelesItem(id) || GetFelszerelesContainer(id);
}

export function GetFelszerelesItem(id?: string): FelszerelesItem | undefined {
    if (id == null) {
        return undefined
    }
    const item = felszereles.items.find(f => f.id === id) as FelszerelesItem | undefined
    if (item != null) {
        return item;
    }
    const cloth = felszereles.clothes.find(f => f.id === id) as FelszerelesItem | undefined
    if (cloth != null) {
        return cloth;
    }
    return felszereles.specialis.find(f => f.id === id) as FelszerelesItem | undefined
}

export function GetFelszerelesContainer(id?: string): FelszerelesContainer | undefined {
    if (id == null) {
        return undefined
    }
    return felszereles.containers.find(f => f.id === id) as FelszerelesContainer | undefined
}