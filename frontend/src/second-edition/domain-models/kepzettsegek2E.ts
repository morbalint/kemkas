import {Osztaly2E} from "./osztaly2E";
import {Faj2E} from "./faj2E";
import {Karakter2E} from "./karakter2E";
import {Modifier, TulajdonsagokTotal} from "./tulajdonsag2E";
import {Kepzettseg, Kepzettsegek, KepzettsegId, KepzettsegLista, TolvajKepzettsegList} from "./kepzettsegek2E.data";

function availableKezpettsegListFajjal(faj: Faj2E, ...osztalyok: Osztaly2E[]): Kepzettseg[] {
    const birodalmiKepzettsegek : KepzettsegId[] = ["k_alkimia", "k_meregkeveres", "k_okkultizmus"]
    return KepzettsegLista.filter(k =>
        k.Osztalyok == null || k.Osztalyok.some(o => osztalyok.includes(o))
        || (faj === Faj2E.Birodalmi && birodalmiKepzettsegek.some(x => x === k.Id))
    )
}

export function GetNumberOfKepzettsegek(t_int: number, faj: Faj2E, max: number = 11) {
    //max = 3 + 1 + 3 + 5 = 12 // 3 base, 1 human, 3 from max ability modifier, 4 from Thief  +1 at 9th level
    let numberOfKepzettseg = 3 + Modifier(t_int) + (faj === Faj2E.Ember ? 1 : 0)

    if (numberOfKepzettseg < 1) {
        numberOfKepzettseg = 1
        console.log('Adjusted Number of Kepzetsegek = ', numberOfKepzettseg)
    }
    if (numberOfKepzettseg > max) {
        numberOfKepzettseg = max
        console.log('Adjusted Number of Kepzetsegek = ', numberOfKepzettseg)
    }
    return numberOfKepzettseg;
}

export function GetAvailableKepzettsegek(karakter: Pick<Karakter2E, 'szintlepesek' | 'faj' | 'kepzettsegek' | 'tolvajKepzettsegek'>): Kepzettseg[] {
    const osztalyok = new Set(karakter.szintlepesek.map(x => x.osztaly))
    const availableKepzettsegek = availableKezpettsegListFajjal(karakter.faj, ...osztalyok)
        .filter(k => !karakter.kepzettsegek.includes(k.Id))

    if (!osztalyok.has(Osztaly2E.Tolvaj)) {
        return availableKepzettsegek;
    }

    return availableKepzettsegek.filter(k =>
            !karakter.tolvajKepzettsegek?.includes(k.Id)
            && !karakter.szintlepesek.some(sz =>
                sz.tolvajExtraKepzettseg === k.Id && sz.osztaly === Osztaly2E.Tolvaj))
}

export function SetDefaultTolvajKepzettsegek(karakter: Pick<Karakter2E, 'szintlepesek' | 'tolvajKepzettsegek'>, changeTolvajKepzettsegek: (tolvajKepzettsegek?: KepzettsegId[]) => void) {
    const hasTolvajSzint = karakter.szintlepesek.some(szint => szint.osztaly === Osztaly2E.Tolvaj)
    if (!hasTolvajSzint && karakter.tolvajKepzettsegek != null) {
        changeTolvajKepzettsegek(undefined)
    }
    if (hasTolvajSzint && (karakter.tolvajKepzettsegek == null || karakter.tolvajKepzettsegek.length === 0)) {
        const tolvajKepzettsegek = TolvajKepzettsegList.slice(0, 4).map(x => x.Id)
        changeTolvajKepzettsegek(tolvajKepzettsegek)
    }
}

export function GetKepzettsegListaN(karakter: Pick<Karakter2E, 'szintlepesek' | 'faj' | 'kepzettsegek' | 'tolvajKepzettsegek'>) {
    return (n: number): Kepzettseg[] => {
        if (karakter.kepzettsegek.length > n){
            const kepzettsegIndexN: KepzettsegId = karakter.kepzettsegek[n];
            return [Kepzettsegek[kepzettsegIndexN], ...GetAvailableKepzettsegek(karakter)]
        }
        else {
            return GetAvailableKepzettsegek(karakter);
        }
    }
}

export function GetTolvajKepzettsegListaN(karakter: Pick<Karakter2E, 'szintlepesek' | 'faj' | 'kepzettsegek' | 'tolvajKepzettsegek'>) {
    return (n: number): Kepzettseg[] => {
        if (karakter.tolvajKepzettsegek != null && karakter.tolvajKepzettsegek.length > n){
            const kepzettsegIndexN: KepzettsegId = karakter.tolvajKepzettsegek[n];
            return [Kepzettsegek[kepzettsegIndexN], ...GetAvailableKepzettsegek(karakter)]
        }
        else {
            return GetAvailableKepzettsegek(karakter);
        }
    }
}

export function AdjustKepzettsegek(karakter: Pick<Karakter2E, 'faj' | 'tulajdonsagok' | 'szintlepesek' | 'kepzettsegek' | 'tolvajKepzettsegek'>): KepzettsegId[] {
    const tul = TulajdonsagokTotal(karakter)
    const numberOfKepzettsegek = GetNumberOfKepzettsegek(tul.t_int, karakter.faj)
    const diff = numberOfKepzettsegek - karakter.kepzettsegek.length
    if (diff > 0) {
        const kepzettsegek = [...karakter.kepzettsegek]
        for (let i = 0; i < diff; i++) {
            const next = GetAvailableKepzettsegek({
                ...karakter,
                kepzettsegek,
            })[0].Id;
            kepzettsegek.push(next)
        }
        return kepzettsegek;
    }
    else if (diff === 0) {
        return karakter.kepzettsegek
    }
    else {
        return karakter.kepzettsegek.slice(0, numberOfKepzettsegek);
    }
}