import {PancelType} from "./felszereles";
import {Osztaly} from "./osztaly";

export function AllowedPancelTypes(osztalyok: Osztaly[]): PancelType[] {
    return [...new Set(osztalyok.flatMap(osztalyAllowedPancelTypes))]
}

function osztalyAllowedPancelTypes(o: Osztaly): PancelType[] {
    switch (o) {
        case Osztaly.Amazon: return ['konnyu'];
        case Osztaly.Barbar: return ['konnyu', 'kozepes', 'nehez'];
        case Osztaly.Pap: return ['konnyu', 'kozepes', 'nehez'];
        case Osztaly.Illuzionista: return [];
        case Osztaly.Varazslo: return [];
        case Osztaly.Harcos: return ['konnyu', 'kozepes', 'nehez'];
        case Osztaly.Ijasz: return ['konnyu', 'kozepes'];
        case Osztaly.Kaloz: return ['konnyu', 'kozepes'];
        case Osztaly.Tolvaj: return ['konnyu']
    }
}