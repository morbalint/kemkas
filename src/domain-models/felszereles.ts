import pancel from "./pancel.json"

export type PancelType = keyof typeof pancel

export const PancelTypes: PancelType[] = ['konnyu', 'kozepes', 'nehez']

export interface Pancel {
    ID: string,
    Name: string,
    Type: 'konnyu' | 'kozepes' | 'nehez'
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
    Range: 'kozelharci' | 'tavolsagi'
    Ketkezes: boolean,
    Egzotikus: boolean,
    Rohamtoro: boolean, 
}

export interface KarakterFelszereles {
    pancelID?: string
    pajzsID?: string
    FegyverIDk: string[]
}

export const DefaultFelszereles: KarakterFelszereles = {
    FegyverIDk: [],
}

export function PancelTypeLabel(type: PancelType): string {
    let result = ''
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