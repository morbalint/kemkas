import {
    KarakterTulajdonsagok, Modifier,
    TulajdonsagModosito,
    TulajdonsagokTotal
} from "../domain-models/tulajdonsag";
import {Mentok, MentokAlap, MentoModositok} from "../domain-models/mentok";
import {Kepzettseg, Kepzettsegek} from "../domain-models/kepzettsegek";
import {CalculateMasodlagosErtekek} from "../domain-models/masodlagos_ertekek";
import {Faj, FajLabel} from "../domain-models/faj";
import {
    Osztaly,
    OsztalyLabel, OsztalySkillsTordelt, OsztalySpecialSkills,
    Skill
} from "../domain-models/osztaly";
import {CelzoTB, KozelharciTB} from "../domain-models/tamadas_bonusz";
import {KarakterInputs} from "../domain-models/karakter";
import {NapiVarazslatok, CalculateVarazslatMentokNF} from "../domain-models/memorizalt_varazslatok";
import {GetJellem} from "../domain-models/jellem";
import {GetPancel, GetPajzs} from '../domain-models/felszereles'

export interface KepzettsegPdfView {
    KepzettsegName: string
    KepzettsegModifier: number
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
        Felszereles: [pancel?.Name, pajzs?.Name].filter(x => !!x) as string[],
        PajzsVO: pajzs?.VO ?? 0,
        PancelVO: pancel?.VO ?? 0,
    }
}

function mapKepzettsegToPdfView(kepzettseg: Kepzettseg, tulajdonsagok: KarakterTulajdonsagok, szint: number) {
    const tulajdonsagErtek = kepzettseg.Tulajdonsag.reduce((maxTulajdonsagErtek, currentTulajdonsag) =>
            (tulajdonsagok[currentTulajdonsag] > maxTulajdonsagErtek)
                ? tulajdonsagok[currentTulajdonsag]
                : maxTulajdonsagErtek,
        tulajdonsagok[kepzettseg.Tulajdonsag[0]])

    const modifier = Modifier(tulajdonsagErtek) + szint
    return {
        KepzettsegName: kepzettseg.Name,
        KepzettsegModifier: modifier,
    }
}