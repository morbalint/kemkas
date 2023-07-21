export enum Tulajdonsag {
    Ero = 't_ero',
    Ugyesseg = 't_ugy',
    Egeszseg = 't_egs',
    Intelligencia = 't_int',
    Bolcsesseg = 't_bol',
    Karizma = 't_kar',
}

export enum Faj {
    Ember = 'f_ember',
    Amazon = 'f_amazon',
    Birodalmi = 'f_birodalmi',
    Etuniai = 'f_etuniai',
    Eszaki = 'f_eszaki',
    Osember = 'f_osember',
    Elf = 'f_elf',
    Felelf = 'f_felelf',
    Felork = 'f_felork',
    Felszerzet = 'f_felszerzet',
    Gnom = 'f_gnom',
    Torpe = 'f_torpe',
}

export enum Osztaly {
    Harcos = 'o_harcos',
    Ijjasz = 'o_ijjasz',
    Amazon = 'o_amazon',
    Kaloz = 'o_kaloz',
    Barbar = 'o_barbar',
    Pap = 'o_pap',
    Tolvaj = 'o_tolvaj',
    Varazslo = 'o_varazslo',
    Illuzionista = 'o_illuzionista',
}

export function OsztalyLabel(osztaly: Osztaly) : string {
    switch (osztaly) {
        case Osztaly.Amazon: return 'Amazon';
        case Osztaly.Barbar: return 'Barbár';
        case Osztaly.Pap: return 'Pap';
        case Osztaly.Illuzionista: return 'Illúzionista';
        case Osztaly.Varazslo: return 'Varázsló';
        case Osztaly.Harcos: return 'Harcos';
        case Osztaly.Ijjasz: return 'Íjjász';
        case Osztaly.Kaloz: return 'Kalóz';
        case Osztaly.Tolvaj: return 'Tolvaj'
    }
}