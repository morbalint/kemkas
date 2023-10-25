import pancelok from './pancel.json'
import pajzsok from './pajzs.json'
import fegyverek from './fegyver.json'

export type PancelType = 'konnyu' | 'kozepes' | 'nehez'

export const PancelTypes: PancelType[] = ['konnyu', 'kozepes', 'nehez']

export interface Pancel {
    Id: string,
    Name: string,
    Type: PancelType
    VO: number,
    Price: number,
}

export interface Pajzs {
    Id: string,
    Name: string,
    Type: 'pajzs'
    VO: number,
    Price: number,
}

export interface Fegyver {
    Id: string,
    Name: string,
    Type: 'kozelharci' | 'lofegyver'
    Ketkezes: boolean,
    Egzotikus: boolean,
    Rohamfelfogo: boolean,
    Price: number,
    DamageDice: number,
    NumberOfDamageDice: number,
    CritRangeStart: number,
    CritMultiplier: number,
    Range: number
}

export interface KarakterFelszereles {
    pancelID?: string
    pajzsID?: string
    fegyverIDk: string[]
}

export const DefaultFelszereles: KarakterFelszereles = {
    fegyverIDk: [],
}

export function PancelTypeLabel(type: PancelType): string {
    let result: string
    switch(type) {
        case 'konnyu': 
            result = 'Könnyű'
            break
        case 'kozepes':
            result = 'Közepes'
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
        case 'konnyu': return 3;
        case 'kozepes': return 2;
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

export function GetFegyverek(ids: string[]): Fegyver[] {
    return ids.map(GetFegyver).filter(x => x != null).map(x => x as Fegyver)
}
export const defaultFegyverID = 'okol'
export const defaultFegyver = GetFegyver('okol')!