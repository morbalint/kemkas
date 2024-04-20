import {createSlice} from "@reduxjs/toolkit";
import {Faj2E} from "./faj2E";
import {JellemID} from "./jellem";
import {DefaultKarakter, Karakter2E} from "./karakter2E";
import {RollAllAbilities} from "./tulajdonsag2E";
import {Osztaly2E} from "./osztaly2E";
import {arraySetN} from "../../util";
import {
    AdjustKepzettsegek,
    KepzettsegId,
    SetDefaultTolvajKepzettsegek
} from "./kepzettsegek2E";
import {BaseHP} from "./masodlagos_ertekek";
import {KarakterFelszereles} from "./felszereles";

export const characterSlice = createSlice({
    name: "character2E",
    initialState: DefaultKarakter,
    reducers: {
        setNev: (state, action: { payload: string }) => {
            state.nev = action.payload;
        },
        setIsten: (state, action: { payload: string }) => {
            state.isten = action.payload;
        },
        setJellem: (state, action: { payload: JellemID }) => {
            state.jellem = action.payload;
        },
        setFaj: (state, action: { payload: Faj2E }) => {
            state.faj = action.payload;
            state.kepzettsegek = AdjustKepzettsegek(state)
            state.kepzettsegFajError = getKepzettsegErrorForFaj(action.payload, [...state.kepzettsegek, ...(state.tolvajKepzettsegek || [])])
        },
        rollAbilities: (state) => {
            state.tulajdonsagok = RollAllAbilities()
            state.kepzettsegek = AdjustKepzettsegek(state)
        },
        setEro: (state, action: {payload: number}) => {
            state.tulajdonsagok.t_ero = action.payload;
        },
        setUgyesseg: (state, action: {payload: number}) => {
            state.tulajdonsagok.t_ugy = action.payload;
        },
        setEgeszseg: (state, action: {payload: number}) => {
            state.tulajdonsagok.t_egs = action.payload;
        },
        setIntelligencia: (state, action: {payload: number}) => {
            state.tulajdonsagok.t_int = action.payload;
            state.kepzettsegek = AdjustKepzettsegek(state);
        },
        setBolcsesseg: (state, action: {payload: number}) => {
            state.tulajdonsagok.t_bol = action.payload;
        },
        setKarizma: (state, action: {payload: number}) => {
            state.tulajdonsagok.t_kar = action.payload;
        },
        setLevel1Osztaly : (state, action: {payload: Osztaly2E}) => {
            const szintlepesek = [{...state.szintlepesek[0], HProll: BaseHP(action.payload) , osztaly: action.payload}, ...state.szintlepesek.slice(1)]
            state.szintlepesek = szintlepesek
            // if character is not a tolvaj anymore remove all tolvaj kepzettsegek
            SetDefaultTolvajKepzettsegek(state, t => state.tolvajKepzettsegek = t)
            state.kepzettsegFajError = getKepzettsegErrorForFaj(state.faj, [...state.kepzettsegek])
            const osztalyok = new Set(szintlepesek.map(x => x.osztaly))
            state.kepzettsegOsztalyError = getKepzettsegErrorForOsztaly(osztalyok, state.kepzettsegek);
        },
        setCharacter: (state, action: {payload: Karakter2E}) => {
            state = action.payload
            SetDefaultTolvajKepzettsegek(state, t => state.tolvajKepzettsegek = t)
            const osztalyok = new Set(state.szintlepesek.map(x => x.osztaly))
            state.kepzettsegOsztalyError = getKepzettsegErrorForOsztaly(osztalyok, state.kepzettsegek);
            state.kepzettsegFajError = getKepzettsegErrorForFaj(action.payload.faj, action.payload.kepzettsegek)
            return state;
        },
        setHarcosSpecialization: (state, action: {payload: {szint: number, fegyver: string}}) => {
            const idx = action.payload.szint - 1
            const szintlepes = {
                ...state.szintlepesek[idx],
                harcosFegyver: action.payload.fegyver,
            }
            state.szintlepesek = arraySetN(state.szintlepesek, idx, szintlepes)
        },
        setKepzettsegek: (state, action: {payload: KepzettsegId[]}) => {
            state.kepzettsegek = action.payload;
            state.kepzettsegFajError = getKepzettsegErrorForFaj(state.faj, [...action.payload, ...(state.tolvajKepzettsegek || [])])
            const osztalyok = new Set(state.szintlepesek.map(x => x.osztaly))
            state.kepzettsegOsztalyError = getKepzettsegErrorForOsztaly(osztalyok, action.payload);
        },
        setTolvajKepzettsegek: (state, action: {payload: KepzettsegId[]}) => {
            state.tolvajKepzettsegek = action.payload;
            // birodalmi
            state.kepzettsegFajError = getKepzettsegErrorForFaj(state.faj, [...state.kepzettsegek, ...action.payload])
        },
        setFelszereles: (state, action: {payload: KarakterFelszereles}) => {
            state.felszereles = action.payload;
        }
    }
})

const getKepzettsegErrorForFaj = (faj: Faj2E, kepzettsegek: KepzettsegId[]) : (string | undefined) => {
    if (faj === Faj2E.Eszaki && kepzettsegek.every(x => x !== "k_hajozas")){
        return "Szomjan haltál miután északi létedre, hajódat zátonyra futtatad a tengeren :("
    }
    if (faj === Faj2E.Nomad && kepzettsegek.every(x => x !== "k_lovaglas")){
        return "Minden nomád lovon születik!"
    }
    if (faj === Faj2E.Birodalmi && kepzettsegek.every(x =>
        x !== "k_alkimia" && x !== "k_meregkeveres" && x !== "k_okkultizmus")){
        return "Belehaltál a birodalmi intrikákba :("
    }
    if (faj === Faj2E.Torpe && kepzettsegek.every(x => x !== "k_ertekbecsles")){
        return "Törpeként a hegy mélyére sűllyedtél szégyenedben mikor átvertek egy drágakő eladásakor :("
    }
    if ((faj === Faj2E.Elf || faj === Faj2E.Felelf) && kepzettsegek.every(x => x !== "k_vadonjaras")){
        return "Eltévedtél az elf vadonban és éhen haltál :("
    }
    return;
}

const getKepzettsegErrorForOsztaly = (osztalyok: Set<Osztaly2E>, kepzettsegek: KepzettsegId[]) : (string | undefined) => {
    if (osztalyok.has(Osztaly2E.Druida) && kepzettsegek.every(x => x !== "k_vadonjaras")) {
        return "Druida létedre, eltévedtél a vadonban és éhen haltál :("
    }
    if (osztalyok.has(Osztaly2E.Vandor) && kepzettsegek.every(x => x !== "k_vadonjaras")) {
        return "Vándor létedre, eltévedtél a vadonban és éhen haltál :("
    }
    if (osztalyok.has(Osztaly2E.Dalnok) && kepzettsegek.every(x => x !== "k_eloadas")) {
        return "Az előadásodat rohadt paradicsomok zápora szakította meg, karriered csúfos véget ért :("
    }
    return;
}

export const {
    setCharacter,
    setNev,
    setJellem,
    setFaj,
    setIsten,
    setEro,
    setUgyesseg,
    setEgeszseg,
    setIntelligencia,
    setBolcsesseg,
    setKarizma,
    rollAbilities,
    setLevel1Osztaly,
    setHarcosSpecialization,
    setKepzettsegek,
    setTolvajKepzettsegek,
    setFelszereles,
} = characterSlice.actions

export const characterSelector = characterSlice.selectSlice

export default characterSlice.reducer