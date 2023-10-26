import {Fegyver, GetFegyver} from "./felszereles";
import fegyverDB from "./fegyver.json";
import {Osztaly} from "./osztaly";

export function AllowedFegyver(o: Osztaly, harcosSpec: string[]): Fegyver[] {
    const fegyverek = fegyverDB.data.map(x => x as Fegyver)
    const nemEgzotikus = fegyverek.filter(f => !f.Egzotikus)
    const varazslo = fegyverek.filter(f => ['okol', 'bot', 'bunko', 'tor', 'parittya', 'dobotu'].includes(f.Id))
    const tolvaj = fegyverek.filter(f => ['okol', 'tor', 'parittya', 'rovid_ij', 'dobotu', 'konnyu_szamszerij', 'nehez_szamszerij', 'szablya', 'hosszu_kard', 'rovid_kard' ].includes(f.Id))
    switch (o) {
        case Osztaly.Harcos:
            const harcosSpecFegyverek = harcosSpec.map(GetFegyver).filter(x => x != null && x.Egzotikus).map(x => x as Fegyver)
            return [...nemEgzotikus, ...harcosSpecFegyverek]
        case Osztaly.Amazon:
        case Osztaly.Barbar:
        case Osztaly.Kaloz: return nemEgzotikus;
        case Osztaly.Ijasz: return [...nemEgzotikus, fegyverDB.data.find(f => f.Id === 'visszacsapo_ij') as Fegyver]
        // Note: Isteni fegyver barmi lehet istentol foggoen
        case Osztaly.Pap: return fegyverek;
        case Osztaly.Tolvaj: return tolvaj;
        case Osztaly.Illuzionista:
        case Osztaly.Varazslo: return varazslo;
    }
}
