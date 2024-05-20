import {Modifier, TulajdonsagokTotal} from "../domain-models/tulajdonsag2E";
import {Mentok, MentoModositok, MultiClassMentokAlap} from "../domain-models/mentok";
import {CalculateMasodlagosErtekek, VOegyeb} from "../domain-models/masodlagos_ertekek";
import {FajLabel} from "../domain-models/faj2E";
import {Osztaly2E, OsztalyLabel} from "../domain-models/osztaly2E";
import {CelzoTB, KozelharciTB, MultiClassTamadasBonusz} from "../domain-models/tamadas_bonusz";
import {Karakter2E} from "../domain-models/karakter2E";
import {GetJellem} from "../domain-models/jellem";
import {GetFegyver, GetFelszereles, GetPajzs, GetPancel} from '../domain-models/felszereles'
import {
    KarakterTulajdonsagok,
    TulajdonsagModosito
} from "../domain-models/tulajdonsag2E";
import {SignedNumberToText} from "../../shared/components/Helpers";
import {Kepzettseg, KepzettsegId, Kepzettsegek} from "../domain-models/kepzettsegek2E.data";
import {getClassLevels} from "../domain-models/szintlepes";
import {FegyverFlags} from "../domain-models/fegyver";

interface KepzettsegPdfView {
    nev: string,
    alap: string,
    bonusz: string,
    osszes: string
}

export interface KarakterPdfView {
    Nev: string
    Isten: string
    Jellem: string
    Faj: string
    Osztaly: {osztaly: string, szint: number}[]
    Tulajdonsagok: KarakterTulajdonsagok,
    TulajdonsagModositok: KarakterTulajdonsagok,
    SzintTotal: string
    HP: number
    HPszintenkent: number[]
    VO: number
    PancelVO: string
    PajzsVO: string
    EgyebVO: string
    Kezdemenyezes: number
    TamadasBonuszAlap: number[]
    KozelharciTB: number[]
    CelzoTB: number[]
    MentokAlap: Mentok
    MentoModositok: Mentok
    MentokModositokkal: Mentok,
    Kepzettsegek: KepzettsegPdfView[],
    Fegyverek: string[],
    FelszerelesViselt: string[],
    FelszerelesCipelt: string[],
    FelszerelesAprosagok: string[],
}

export function KarakterInputToPdfView(karakter: Karakter2E): KarakterPdfView {
    const tulajdonsagok = TulajdonsagokTotal(karakter)
    karakter = {...karakter, tulajdonsagok}
    const tulajdonsagModositok = TulajdonsagModosito(tulajdonsagok)
    const masodlagosErtekek = CalculateMasodlagosErtekek(karakter)
    const pancel = GetPancel(karakter.felszereles.pancelID)
    const pajzs = GetPajzs(karakter.felszereles.pajzsID)
    const kezdemenyezes = tulajdonsagModositok.t_ugy + (karakter.szintlepesek.some(x => x.osztaly  === Osztaly2E.Tolvaj) ? 4 : 0)

    const mentok = MultiClassMentokAlap(karakter.szintlepesek)
    const mentoModositok = MentoModositok(tulajdonsagModositok)
    
    const osztalyok = new Array(...(new Set(karakter.szintlepesek.map(x => x.osztaly))))
    const osztaly = osztalyok.map(x => ({
        osztaly: OsztalyLabel(x), 
        szint: karakter.szintlepesek.filter(sz => sz.osztaly === x).length
    }))
    
    const classLevels = getClassLevels(karakter.szintlepesek)
    
    let viseltFelszereles = [] as string[]
    if(pancel != null){
        viseltFelszereles = viseltFelszereles.concat(FelszerelesToPdfView(pancel))
    }
    if(pajzs != null){
        viseltFelszereles = viseltFelszereles.concat(FelszerelesToPdfView(pajzs))
    }
        
    viseltFelszereles = viseltFelszereles.concat(karakter.felszereles.fegyverek.reduce((acc, x) => {
        const fegyver = GetFegyver(x.id)
        if (fegyver == null) {
            console.error("unknown fegyver: " + x)
            return acc
        }
        if(fegyver.Size === 0) {
            return acc
        }
        const pdfView = FelszerelesToPdfView({...fegyver, Count: x.count})
        return acc.concat(pdfView)
    }, [] as string[]));

    viseltFelszereles = viseltFelszereles.concat(karakter.felszereles.viselt.reduce((acc, item) => {
        const targy = GetFelszereles(item.id)
        if (targy == null) {
            console.error("unknown targy: ", targy)
            return acc
        }
        const pdfView = FelszerelesToPdfView({Name: targy.nev, Size: targy.size, Count: item.count})
        return acc.concat(pdfView);
    }, [] as string[]))

    const cipeltFelszereles = karakter.felszereles.cipelt.reduce((acc, item) => {
        const targy = GetFelszereles(item.id)
        if (targy == null) {
            console.error("unknown targy: ", targy)
            return acc
        }
        const pdfView = FelszerelesToPdfView({Name: targy.nev, Size: targy.size, Count: item.count})
        return acc.concat(pdfView);
    }, [] as string[])

    const aprosagFelszereles = karakter.felszereles.aprosagok.reduce((acc, item) => {
        const targy = GetFelszereles(item.id)
        if (targy == null) {
            console.error("unknown targy: ", targy)
            return acc
        }
        const pdfView = FelszerelesToPdfView({Name: targy.nev, Size: targy.size, Count: item.count})
        return acc.concat(pdfView);
    }, [] as string[])

    return {
        Faj: FajLabel(karakter.faj).toLowerCase(),
        Isten: karakter.isten || "",
        Jellem: GetJellem(karakter.jellem).Label,
        Nev: karakter.nev,
        Tulajdonsagok: karakter.tulajdonsagok,
        Osztaly: osztaly,
        SzintTotal: karakter.szint.toString(),
        TulajdonsagModositok: tulajdonsagModositok,

        HP: masodlagosErtekek.HP,
        HPszintenkent: karakter.szintlepesek.map(x => x.HProll),
        
        Kezdemenyezes: kezdemenyezes,
        
        TamadasBonuszAlap: MultiClassTamadasBonusz(karakter.szintlepesek),
        KozelharciTB: KozelharciTB(karakter),
        CelzoTB: CelzoTB(karakter),

        MentoModositok: mentoModositok,
        MentokAlap: mentok,
        MentokModositokkal: masodlagosErtekek.Mentok,

        VO: masodlagosErtekek.VO,
        PajzsVO: SignedNumberToText(pajzs?.VO),
        PancelVO: SignedNumberToText(pancel?.VO),
        EgyebVO: SignedNumberToText(VOegyeb(karakter)),
        
        Kepzettsegek: 
            karakter.kepzettsegek.map((k : KepzettsegId) =>
                mapKepzettsegToPdfView(Kepzettsegek[k], tulajdonsagok, karakter.szint))
                .concat(karakter.tolvajKepzettsegek?.map((k: KepzettsegId) =>
                    mapKepzettsegToPdfView(Kepzettsegek[k], tulajdonsagok, classLevels[Osztaly2E.Tolvaj])) || []),
        
        Fegyverek: karakter.felszereles.fegyverek.slice(0, 4).map(fid => {
            const fegyver = GetFegyver(fid.id)
            if (fegyver == null) {
                console.error("unknown fegyver: " + fid)
                return ""
            }
            const serializedFlags = FegyverFlags(fegyver);
            const critStart = fegyver.CritRangeStart - karakter.szintlepesek.filter(x => x.kalozKritikus === fegyver.Id).length
            const damageBonus = fegyver.DamageBonus + 
                (fegyver.KetkezesBonusz ? 1 : 0) +
                (fegyver.Type !== "lofegyver" || fegyver.EroBonusz ? tulajdonsagModositok.t_ero : 0) + 
                (karakter.szintlepesek.filter(x => x.harcosFegyver === fegyver.Id).length * 2)
            return  `${fegyver.Name} ${serializedFlags.length > 0 ? serializedFlags + " " : ''} ${
                fegyver.DamageMultiplier > 1 ? `${fegyver.DamageMultiplier}*` : ''}${
                fegyver.NumberOfDamageDice}d${fegyver.DamageDice}${damageBonus !== 0 ? `${
                    SignedNumberToText(damageBonus)}` : ''} ${
                critStart < 20 ? `${critStart}-20` : '20'}x${fegyver.CritMultiplier}`
        }),
        FelszerelesViselt: viseltFelszereles,
        FelszerelesCipelt: cipeltFelszereles,
        FelszerelesAprosagok: aprosagFelszereles,
    }
}

interface FelszerelesPdf {
    Name: string,
    Size: number,
    Count?: number
}

function FelszerelesToPdfView(item: FelszerelesPdf): string[] {
    const nameWithCount = `${item.Name}${(item?.Count ?? 1) > 1 ? ` x${item.Count}` : ''}`
    const ans = [nameWithCount]
    for (let i = 1; i < item.Size; i ++) {
        ans.push("+")
    }
    return ans
}

function mapKepzettsegToPdfView(kepzettseg: Kepzettseg, tulajdonsagok: KarakterTulajdonsagok, szint: number): KepzettsegPdfView {
    const tulajdonsagErtek = kepzettseg.Tulajdonsag.reduce((maxTulajdonsagErtek, currentTulajdonsag) =>
            tulajdonsagok[currentTulajdonsag] > maxTulajdonsagErtek
                ? tulajdonsagok[currentTulajdonsag]
                : maxTulajdonsagErtek,
        tulajdonsagok[kepzettseg.Tulajdonsag[0]])
    
    return {
        nev: kepzettseg.Name,
        alap: szint.toString(),
        bonusz: SignedNumberToText(Modifier(tulajdonsagErtek)),
        osszes: (szint + Modifier(tulajdonsagErtek)).toString(),
    }
}