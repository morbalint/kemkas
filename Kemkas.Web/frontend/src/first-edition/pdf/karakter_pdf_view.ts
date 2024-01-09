import {TulajdonsagokTotal} from "../domain-models/tulajdonsag";
import {Mentok, MentokAlap, MentoModositok} from "../domain-models/mentok";
import {Kepzettseg, Kepzettsegek} from "../domain-models/kepzettsegek";
import {CalculateMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";
import {Faj, FajLabel} from "../domain-models/faj";
import {Osztaly, OsztalyLabel, Skill} from "../domain-models/osztaly";
import {CelzoTB, KozelharciTB} from "../domain-models/tamadas_bonusz";
import {KarakterInputs} from "../domain-models/karakter";
import {CalculateVarazslatMentokNF, NapiVarazslatok} from "../domain-models/memorizalt_varazslatok";
import {GetJellem} from "../domain-models/jellem";
import {Fegyver, GetFegyverek, GetPajzs, GetPancel} from '../domain-models/felszereles'
import {SignedNumberToText} from "../components/Helpers";
import {OsztalySkillsTordelt} from "./osztaly_skills";
import {
    KarakterTulajdonsagok,
    Modifier,
    TulajdonsagModosito
} from "../domain-models/tulajdonsag";

export interface KepzettsegPdfView {
    KepzettsegName: string
    KepzettsegModifier: number
}

export interface FegyverPdfView {
    Name: string
    TamadoBonusz: number
    Damage: string
    Crit: string
    Range: string
}

export interface KarakterPdfView {
    Name: string
    Nem: string
    Kor: number
    Isten: string
    Jellem: string
    Faj: string
    Osztaly: string
    OsztalySkills: Skill[],
    Tulajdonsagok: KarakterTulajdonsagok,
    TulajdonsagModositok: KarakterTulajdonsagok,
    Szint: string
    HP: number
    VO: number
    Mozgas: number
    Kezdemenyezes: number
    KozelharciTB: number[]
    CelzoTB: number[]
    MentokAlap: Mentok
    MentoModositok: Mentok
    MentokModositokkal: Mentok
    Kepzettsegek: KepzettsegPdfView[]
    TolvajKepzettsegek: KepzettsegPdfView[]
    NapiMemorizalhatoVarazslatok: number[]
    VarazslatMentokNF : number[]
    Felszereles: string[]
    PancelVO: number
    PajzsVO: number
    Fegyverek: FegyverPdfView[]
}

export function KarakterInputToPdfView(karakter: KarakterInputs): KarakterPdfView {
    const tulajdonsagok = TulajdonsagokTotal(karakter)
    karakter = {...karakter, tulajdonsagok}
    const tulajdonsagModositok = TulajdonsagModosito(tulajdonsagok)
    const masodlagosErtekek = CalculateMasodlagosErtekek(karakter)
    const pancel = GetPancel(karakter.felszereles.pancelID)
    const pajzs = GetPajzs(karakter.felszereles.pajzsID)
    const mozgas = karakter.faj === Faj.Torpe || pancel?.Type === 'nehez' || pancel?.Type === 'kozepes' ? 20 : 30
    const kezdemenyezes = tulajdonsagModositok.t_ugy + (karakter.osztaly === Osztaly.Tolvaj ? 4 : 0)

    const mentok = MentokAlap(karakter.osztaly, karakter.szint)
    const mentoModositok = MentoModositok(tulajdonsagModositok)

    const NapiMemorizalhatoVarazslatok = NapiVarazslatok(karakter)
    const VarazslatMentokNF = CalculateVarazslatMentokNF(karakter)
    const fegyverek = GetFegyverek(karakter.felszereles.fegyverIDk)

    const felszereles = [ pancel?.Name, pajzs?.Name, ...fegyverek.filter(f => f.Id !== 'okol').map(f => f.Name.includes('és') ? f.Name.split(' ')[0] : f.Name) ].filter(x => !!x) as string[]

    return {
        Faj: FajLabel(karakter.faj),
        Isten: karakter.isten || "",
        Jellem: GetJellem(karakter.jellem).Label,
        Kor: karakter.kor,
        Name: karakter.name,
        Nem: karakter.nem || "",
        Tulajdonsagok: karakter.tulajdonsagok,
        Osztaly: OsztalyLabel(karakter.osztaly),
        OsztalySkills: OsztalySkillsTordelt(karakter.osztaly),
        Szint: karakter.szint.toString(),
        Kepzettsegek: karakter.kepzettsegek.map(id => mapKepzettsegToPdfView(Kepzettsegek[id], tulajdonsagok, karakter.szint)),
        TolvajKepzettsegek: karakter.tolvajKepzettsegek?.map(id => mapKepzettsegToPdfView(Kepzettsegek[id], tulajdonsagok, karakter.szint)) || [],
        TulajdonsagModositok: tulajdonsagModositok,

        HP: masodlagosErtekek.HP,
        VO: masodlagosErtekek.VO,
        Mozgas: mozgas,
        Kezdemenyezes: kezdemenyezes,
        KozelharciTB: KozelharciTB(karakter),
        CelzoTB: CelzoTB(karakter),

        MentoModositok: mentoModositok,
        MentokAlap: mentok,
        MentokModositokkal: masodlagosErtekek.Mentok,

        NapiMemorizalhatoVarazslatok,
        VarazslatMentokNF,
        Felszereles: felszereles,
        PajzsVO: pajzs?.VO ?? 0,
        PancelVO: pancel?.VO ?? 0,
        Fegyverek: fegyverek.map(mapFegyverToPdfView(karakter)),
    }
}

function mapKepzettsegToPdfView(kepzettseg: Kepzettseg, tulajdonsagok: KarakterTulajdonsagok, szint: number) {
    const tulajdonsagErtek = kepzettseg.Tulajdonsag.reduce((maxTulajdonsagErtek, currentTulajdonsag) =>
            tulajdonsagok[currentTulajdonsag] > maxTulajdonsagErtek
                ? tulajdonsagok[currentTulajdonsag]
                : maxTulajdonsagErtek,
        tulajdonsagok[kepzettseg.Tulajdonsag[0]])

    const modifier = Modifier(tulajdonsagErtek) + szint
    return {
        KepzettsegName: kepzettseg.Name,
        KepzettsegModifier: modifier,
    }
}

function mapFegyverToPdfView(karakter: KarakterInputs) {
    return (fegyver: Fegyver): FegyverPdfView => {
        const simplifiedName = fegyver.Name.includes('és') ? fegyver.Name.split(' ')[0] : fegyver.Name
        const tb = fegyver.Type === 'kozelharci' ? KozelharciTB(karakter)[0] : CelzoTB(karakter)[0]
        const tulajdonsagModositok = TulajdonsagModosito(TulajdonsagokTotal(karakter))
        let damageModifier = fegyver.Type === 'kozelharci' || (fegyver.Id === 'visszacsapo_ij' && tulajdonsagModositok.t_ero > 0) ? tulajdonsagModositok.t_ero : 0
        damageModifier += karakter.harcosSpecializaciok.filter(x => x === fegyver.Id).length * 2
        if (fegyver.Id === 'visszacsapo_ij' && tulajdonsagModositok.t_ero > 0) { // "hozzaadhato", so only add if positive
            damageModifier += tulajdonsagModositok.t_ero
        }
        if (fegyver.Ketkezes) {
            damageModifier += Math.floor(tulajdonsagModositok.t_ero / 2)
        }
        const damage = `${fegyver.NumberOfDamageDice > 1 ? fegyver.NumberOfDamageDice.toString() : ''}d${fegyver.DamageDice}${damageModifier !== 0 ? SignedNumberToText(damageModifier) : ''}`
        const critStart = fegyver.CritRangeStart - karakter.kalozKritikus.filter(x => x === fegyver.Id).length
        const crit = `${critStart < 20 ? `${critStart}-20` : '20'} x${fegyver.CritMultiplier}`
        const range = fegyver.Range === 0 ? '-' : fegyver.Range.toString()
        return {
            Name: simplifiedName,
            TamadoBonusz: tb,
            Damage: damage,
            Crit: crit,
            Range: range,
        }
    }
}