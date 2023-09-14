import {Faj} from "./faj";
import {Osztaly} from "./osztaly";
import {KarakterTulajdonsagok, Modifier} from "./tulajdonsag";
import {Kepzettseg, Kepzettsegek, KepzettsegId} from "./kepzettsegek";
import TamadasBonuszTabla from './tamadas_bonus_tabla.json';
import {ElsodlegesMento, MasodlagosMento, Mentok, MentoTipus} from "./mentok";

export interface Karakter {
    Name: string
    Nem: string
    Kor: number
    Isten: string
    Faj: Faj
    Osztaly: Osztaly
    Tulajdonsagok: KarakterTulajdonsagok,
    Szint: number
    HP: () => number
    VO: () => number
    Mozgas: () => number
    Kezdemenyezes: () => number
    KozelharciTB: (szint?: number) => number[]
    CelzoTB: (szint?: number) => number[]
    ElsodlegesMentok: () => MentoTipus[]
    MentokAlap: (szint?: number) => Mentok
    MentokTulajdonsaggal: (szint?: number) => Mentok
    Kepzettsegek: Kepzettseg[]
    TolvajKepzettsegek: Kepzettseg[]
}

export interface KarakterInputs {
    name: string,
    nem?: string,
    kor: number,
    isten?: string,
    faj: Faj,
    osztaly: Osztaly,
    tulajdonsagok: KarakterTulajdonsagok,
    kepzettsegek: KepzettsegId[],
    tolvajKepzettsegek?: KepzettsegId[]
    szint: number
    HProlls: number[],
}

export class KarakterClass implements Karakter {

    public Name : string
    public Nem : string
    public Kor : number
    public Isten : string
    public Faj : Faj
    public Osztaly : Osztaly
    public Tulajdonsagok : KarakterTulajdonsagok
    public Szint : number = 1
    public Kepzettsegek: Kepzettseg[]
    public TolvajKepzettsegek: Kepzettseg[]

    private HProlls: number[]

    constructor(inputs: KarakterInputs) {
        this.Name = inputs.name
        this.Nem = inputs.nem || ""
        this.Kor = inputs.kor
        this.Isten = inputs.isten || ""
        this.Faj = inputs.faj
        this.Osztaly = inputs.osztaly
        this.Tulajdonsagok = inputs.tulajdonsagok
        this.Kepzettsegek = inputs.kepzettsegek.map(k => Kepzettsegek[k])
        this.TolvajKepzettsegek = (inputs.tolvajKepzettsegek || []).map(k => Kepzettsegek[k])
        this.Szint = Math.min(Math.max(1,inputs.szint), 20)
        this.HProlls = inputs.HProlls
    }

    public HP = () => this.baseHP() + Modifier(this.Tulajdonsagok.t_egs) + this.HProlls
            // https://lfg.hu/forum/topic/15079-kard-es-magia/page/219/#comment-2218333
            .map(hp => Math.max(1, hp + Modifier(this.Tulajdonsagok.t_egs)))
            .reduce((sum, val) => sum + val, 0)

    public VO = () => 10 + Modifier(this.Tulajdonsagok.t_ugy)

    public Mozgas = () => this.Faj === Faj.Torpe ? 20 : 30

    public Kezdemenyezes() : number {
        return Modifier(this.Tulajdonsagok.t_ugy) + (this.Osztaly === Osztaly.Tolvaj ? 4 : 0)
    }

    public TamadasBonusz(szint: number = this.Szint) : number[] {
        let base = []
        switch (this.Osztaly){
            case Osztaly.Barbar:
            case Osztaly.Amazon:
            case Osztaly.Ijasz:
            case Osztaly.Kaloz:
            case Osztaly.Harcos:
                base = TamadasBonuszTabla['elsodleges'];
                break;
            case Osztaly.Pap:
            case Osztaly.Tolvaj:
                base = TamadasBonuszTabla['ketharmados'];
                break;
            case Osztaly.Varazslo:
            case Osztaly.Illuzionista:
                base = TamadasBonuszTabla['feles'];
                break;
        }
        return base[szint-1]
    }

    public KozelharciTB(szint: number = this.Szint): number[] {
        const base = this.TamadasBonusz(szint);
        let modifier = Modifier(this.Tulajdonsagok.t_ero)
        if (this.Osztaly === Osztaly.Kaloz && this.Tulajdonsagok.t_ugy > this.Tulajdonsagok.t_ero) {
            modifier = Modifier(this.Tulajdonsagok.t_ugy)
        }
        return base.map(v => v + modifier)
    }
    public CelzoTB(szint: number = this.Szint): number[] {
        let base = this.TamadasBonusz(szint)
        if (this.Osztaly === Osztaly.Ijasz) {
            base = [base[0], ...base]
        }
        return base.map(v => v + Modifier(this.Tulajdonsagok.t_ugy))
    }

    public ElsodlegesMentok() : MentoTipus[] {
        let t: MentoTipus[] = []
        switch (this.Osztaly){
            case Osztaly.Barbar:
            case Osztaly.Amazon:
            case Osztaly.Ijasz:
            case Osztaly.Kaloz:
            case Osztaly.Harcos:
                t = ['kitartas'];
                break;
            case Osztaly.Pap:
                t = ['kitartas', 'akaratero'];
                break;
            case Osztaly.Tolvaj:
                t = ['reflex'];
                break;
            case Osztaly.Varazslo:
            case Osztaly.Illuzionista:
                t = ['akaratero']
                break;
        }
        return t
    }

    public MentokAlap(szint: number = this.Szint) {
        const elsodlegesek = this.ElsodlegesMentok()
        return {
            kitartas: elsodlegesek.includes('kitartas') ? ElsodlegesMento(szint) : MasodlagosMento(szint),
            reflex: elsodlegesek.includes('reflex') ? ElsodlegesMento(szint) : MasodlagosMento(szint),
            akaratero: elsodlegesek.includes('akaratero') ? ElsodlegesMento(szint) : MasodlagosMento(szint),
        }
    }

    public MentokTulajdonsaggal(szint: number = this.Szint) {
        const mentok = this.MentokAlap(szint)
        return {
            kitartas: mentok.kitartas + Modifier(this.Tulajdonsagok.t_egs),
            reflex: mentok.reflex + Modifier(this.Tulajdonsagok.t_ugy),
            akaratero: mentok.akaratero + Modifier(this.Tulajdonsagok.t_bol),
        }
    }

    public baseHP() {
        let base = 4;
        switch (this.Osztaly){
            case Osztaly.Barbar:
                base = 12
                break;
            case Osztaly.Amazon:
            case Osztaly.Ijasz:
            case Osztaly.Kaloz:
            case Osztaly.Harcos:
                base = 10;
                break
            case Osztaly.Pap:
                base = 8;
                break;
            case Osztaly.Tolvaj:
                base = 6;
                break;
            case Osztaly.Varazslo:
            case Osztaly.Illuzionista:
                base = 4;
                break;
        }
        return base
    }
}