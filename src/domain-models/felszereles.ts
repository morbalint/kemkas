import pancelok from './pancel.json'
import pajzsok from './pajzs.json'

export type PancelType = 'konnyu' | 'kozepes' | 'nehez'

export const PancelTypes: PancelType[] = ['konnyu', 'kozepes', 'nehez']

export interface Pancel {
    ID: string,
    Name: string,
    Type: PancelType
    VO: number,
    Price: number,
}

export interface Pajzs {
    ID: string,
    Name: string,
    Type: 'pajzs'
    VO: number,
    Price: number,
}

export interface Fegyver {
    ID: string,
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
    const filteredPancel = pancelok['pancel'].filter(p => p.ID === id) as Pancel[]
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
    const filtered = pajzsok['pajzs'].filter(p => p.ID === id) as Pajzs[]
    return filtered.length > 0 ? filtered[0] : undefined
}