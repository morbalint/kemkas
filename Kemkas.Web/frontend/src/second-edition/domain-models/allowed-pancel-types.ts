import {Pajzs, Pancel} from "./felszereles";
import {Osztaly2E} from "./osztaly2E";
import pancelDB from "./pancel.json";
import pajzsDB from "./pajzs.json"

export function AllowedPajzsTypes(osztalyok: Osztaly2E[]): Pajzs[] {
    return [...new Set(osztalyok.flatMap(osztalyAllowedPajzs))]
}

function osztalyAllowedPajzs(o: Osztaly2E): Pajzs[] {
    const pajzsok = pajzsDB.pajzs.map(x => x as Pajzs)
    
    switch (o) {
        case Osztaly2E.Harcos: return pajzsok;
        case Osztaly2E.Amazon: return pajzsok;
        case Osztaly2E.Barbar: return pajzsok;
        case Osztaly2E.Tengeresz: return pajzsok;
        case Osztaly2E.Ijasz: return pajzsok;
        case Osztaly2E.Tolvaj: return [];
        case Osztaly2E.Pap: return pajzsok;
        case Osztaly2E.Illuzionista: return [];
        case Osztaly2E.Varazslo: return [];
        case Osztaly2E.Dalnok: return pajzsok;
        case Osztaly2E.Druida: return pajzsok.filter(f => f.Id === "pajzs_fa");
        case Osztaly2E.Vandor: return pajzsok;
    }
}

export function AllowedPancelTypes(osztalyok: Osztaly2E[]): Pancel[] {
    return [...new Set(osztalyok.flatMap(osztalyAllowedPancel))]
}

function osztalyAllowedPancel(o: Osztaly2E): Pancel[] {
    const pancelok = pancelDB.pancel.map(x => x as Pancel)
    const konnyu = pancelok.filter(x => x.Type === "konnyu")
    switch (o) {
        case Osztaly2E.Harcos: return pancelok;
        case Osztaly2E.Amazon: return konnyu;
        case Osztaly2E.Barbar: return pancelok;
        case Osztaly2E.Ijasz: return konnyu;
        case Osztaly2E.Tengeresz: return konnyu;
        case Osztaly2E.Pap: return pancelok;
        case Osztaly2E.Illuzionista: return [];
        case Osztaly2E.Varazslo: return [];
        case Osztaly2E.Tolvaj: return konnyu;
        case Osztaly2E.Dalnok: return konnyu;
        case Osztaly2E.Druida: return pancelok.filter(f => ['csuha', 'bor', 'kivert_bor', 'prem'].includes(f.Id));
        case Osztaly2E.Vandor: return konnyu;
    }
}