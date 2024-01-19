import {Fegyver} from "./felszereles";
import fegyverDB from "./fegyver.json";
import {Osztaly2E} from "./osztaly2E";

export function AllowedFegyver(o: Osztaly2E): Fegyver[] {
    const fegyverek = fegyverDB.data.map(x => x as Fegyver)
    const varazslo = fegyverek.filter(f => ['okol', 'bot', 'bot_vasalt' , 'bunko', 'tor', 'parittya', 'dobotu'].includes(f.Id))
    const tolvaj = fegyverek.filter(f => !f.Ketkezes || !f.Masfelkezes || ['ij_rovid', 'szamszerij_konnyu', 'szamszerij_nehez' ].includes(f.Id))
    const dalnok = fegyverek.filter(f => !f.Ketkezes || !f.Masfelkezes || ['okol', 'ij_rovid', 'szamszerij_konnyu' ].includes(f.Id))
    const druida = fegyverek.filter(f => ['okol', 'bot', 'bunko', 'tor', 'dobotu', 'kard_szablya', 'sarlo', 'landzsa', 'parittya'].includes(f.Id))
    const nemHarcos = fegyverek.filter(f => !f.Harcos) 
    const harcos = fegyverek.filter(f => !f.CsakNemHarcos)
    switch (o) {
        case Osztaly2E.Harcos:
        case Osztaly2E.Amazon:
        case Osztaly2E.Barbar:
        case Osztaly2E.Ijasz:
        case Osztaly2E.Tengeresz:
        case Osztaly2E.Vandor:
            return harcos;
        // Note: Isteni fegyver barmi lehet istentol foggoen
        case Osztaly2E.Pap: return nemHarcos;
        case Osztaly2E.Tolvaj: return tolvaj;
        case Osztaly2E.Illuzionista:
        case Osztaly2E.Varazslo: return varazslo;
        case Osztaly2E.Dalnok: return dalnok;
        case Osztaly2E.Druida: return druida;
    }
}
