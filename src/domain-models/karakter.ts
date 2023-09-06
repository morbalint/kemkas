import {Faj} from "./faj";
import {Osztaly} from "./osztaly";
import {KarakterTulajdonsagok, Modifier} from "./tulajdonsag";
import {CalculateMasodlagosErtekek, KarakterMasodlagosErtekek} from "./masodlagos_ertekek";

export interface Karakter {
    Name: string
    Faj: Faj
    Osztaly: Osztaly
    Tulajdonsagok: KarakterTulajdonsagok,
    MasodlagosErtekek: KarakterMasodlagosErtekek
    HP: () => number
    VO: () => number
    Mozgas: () => number
    Kezdemenyezes: () => number
    KozelharciTB: () => number
    CelzoTB: () => number
    KitartasMentoAlap: () => number
    ReflexMentoAlap: () => number
    AkarateroMentoAlap: () => number
}

export class KarakterClass implements Karakter {

    public Name : string
    public Faj : Faj
    public Osztaly : Osztaly
    public Tulajdonsagok : KarakterTulajdonsagok
    public MasodlagosErtekek : KarakterMasodlagosErtekek

    constructor(name: string, faj: Faj, osztaly: Osztaly, tulajdonsagok: KarakterTulajdonsagok) {
        this.Name = name
        this.Faj = faj
        this.Osztaly = osztaly
        this.Tulajdonsagok = tulajdonsagok
        this.MasodlagosErtekek = CalculateMasodlagosErtekek(osztaly, tulajdonsagok)
    }

    public HP = () => this.MasodlagosErtekek.HP

    public VO = () => this.MasodlagosErtekek.VO

    public Mozgas = () => this.Faj === Faj.Torpe ? 20 : 30

    public Kezdemenyezes() : number {
        return Modifier(this.Tulajdonsagok.t_ugy) + (this.Osztaly === Osztaly.Tolvaj ? 4 : 0)
    }

    public TamadasBonusz() : number {
        switch (this.Osztaly){
            case Osztaly.Barbar:
            case Osztaly.Amazon:
            case Osztaly.Ijasz:
            case Osztaly.Kaloz:
            case Osztaly.Harcos:
                return 2;
            case Osztaly.Pap:
            case Osztaly.Tolvaj:
                return 0;
            case Osztaly.Varazslo:
            case Osztaly.Illuzionista:
                return 0;
        }
    }

    public KozelharciTB(): number {
        const base = this.TamadasBonusz();
        if (this.Osztaly === Osztaly.Kaloz && this.Tulajdonsagok.t_ugy > this.Tulajdonsagok.t_ero) {
            return base + Modifier(this.Tulajdonsagok.t_ugy)
        }
        return base + Modifier(this.Tulajdonsagok.t_ero)
    }
    public CelzoTB(): number {
        return this.TamadasBonusz() + Modifier(this.Tulajdonsagok.t_ugy)
    }

    public KitartasMentoAlap() : number {
        switch (this.Osztaly){
            case Osztaly.Barbar:
            case Osztaly.Amazon:
            case Osztaly.Ijasz:
            case Osztaly.Kaloz:
            case Osztaly.Harcos:
            case Osztaly.Pap:
                return 2;
            case Osztaly.Tolvaj:
            case Osztaly.Varazslo:
            case Osztaly.Illuzionista:
                return 0;
        }
    }

    public ReflexMentoAlap() : number {
        switch (this.Osztaly){
            case Osztaly.Tolvaj:
                return 2;
            case Osztaly.Barbar:
            case Osztaly.Amazon:
            case Osztaly.Ijasz:
            case Osztaly.Kaloz:
            case Osztaly.Harcos:
            case Osztaly.Pap:
            case Osztaly.Varazslo:
            case Osztaly.Illuzionista:
                return 0;
        }
    }

    public AkarateroMentoAlap() : number {
        switch (this.Osztaly){
            case Osztaly.Pap:
            case Osztaly.Varazslo:
            case Osztaly.Illuzionista:
                return 2;
            case Osztaly.Tolvaj:
            case Osztaly.Barbar:
            case Osztaly.Amazon:
            case Osztaly.Ijasz:
            case Osztaly.Kaloz:
            case Osztaly.Harcos:
                return 0;
        }
    }
}