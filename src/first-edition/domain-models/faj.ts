import {
    KarakterTulajdonsagok,
    Tulajdonsag,
    TulajdonsagModositokFajokra,
} from "./tulajdonsag";
import {Osztaly} from "./osztaly";


export enum Faj {
    Ember = 'f_ember',
    Amazon = 'f_amazon',
    Birodalmi = 'f_birodalmi',
    Etuniai = 'f_etuniai',
    Eszaki = 'f_eszaki',
    Osember = 'f_osember',
    Elf = 'f_elf',
    Felelf = 'f_felelf',
    Felork = 'f_felork',
    Felszerzet = 'f_felszerzet',
    Gnom = 'f_gnom',
    Torpe = 'f_torpe',
}

export function FajLabel(faj: Faj) : string {
    switch (faj) {
        case Faj.Ember: return 'Ember';
        case Faj.Amazon: return 'Amazon';
        case Faj.Birodalmi: return 'Birodalmi';
        case Faj.Etuniai: return 'Etúniai';
        case Faj.Eszaki: return 'Északi';
        case Faj.Osember: return 'Ősember';
        case Faj.Elf: return 'Elf';
        case Faj.Felelf: return 'Félelf';
        case Faj.Felork: return 'Félork';
        case Faj.Felszerzet: return 'Félszerzet';
        case Faj.Gnom: return 'Gnóm';
        case Faj.Torpe: return 'Törpe';
    }
}

export function FajDescription(faj: Faj) : string {
    switch (faj) {
        case Faj.Ember: return "Az emberi népek sokfélesége és szaporasága, valamint a bennük élő felfedezői hajlam és erkölcsi rugalmasság hatására képviselőik majdnem minden földön megtalálhatók. A legtöbb ember a lenti vonásokkal rendelkezik.";
        case Faj.Amazon: return "Bár az amazonok népe igen kis létszámú, harciasságuk miatt mégis félik őket. Az amazonok nyúlánk termetűek, hajuk általában vöröses vagy világosbarna, bőrük világos. Társadalmukban teljes a nőuralom, a férfiakat rabszolgaságban tartják és megtiltják számukra a fegyverviselést. Képzett tengeri rablók, de a szárazföldön is megállják a helyüket. Az amazon nők kivétel nélkül értenek a harchoz és soha, soha nem hagyják megtorlatlanul az őket ért sérelmeket. Technikailag fejletlenek. Kis erejű passzív pszionikus (elmebeli) képességeik vannak.";
        case Faj.Birodalmi: return "Bár a Birodalom történelemelőtti kora már évezredek óta elmúlt, a nép maradékai még megtalálhatók. Az irántuk érzett gyűlölet miatt sokan rejtőzködni kényszerülnek közülük, pedig hatalmuk már meg sem közelíti a régit – életüket többnyire dekadens élvezetek habzsolásával, kábítószeres mámorban töltik. Bőrük lilás, a tisztavérűek esetén padlizsánszínű, szemük ibolyaszín. A fajtiszta birodalmiak között a beltenyészet és a degeneráció miatt gyakoriak az örökletes betegségek. Városaik számtalan titkot és mesés kincseket rejtenek.";
        case Faj.Etuniai: return "Az etúniai lovas nomádok kultúrája mindmáig megőrizte primitívségét. Akár földművelésből, akár lovas portyázásból, akár rablásból és kereskedésből élnek, nem fogékonyak a finomságok iránt. Eszközeik is egyszerűek: fegyvereik főleg hosszú lándzsák, és bár kedvelik a kardokat és láncvérteket, nem jeleskednek azok előállításában (a vas megmunkálását kovácsaik féltett titokként őrzik). Többnyire semleges jelleműek – bár azok, akik otthonuktól elszakadva kénytelenek megélni, inkább a gonosz felé hajlanak. Az etúniaiak középtermetűek, bőrük cserzett, hajuk olajos fekete, amit leggyakrabban copfban fognak össze. A férfiak kedvelik a bajusz viseletét.";
        case Faj.Eszaki: return "Az északi kultúra lételeme a harc és a hajózás. Még nőik is kiválóan forgatják a harci fejszét vagy a hosszú élű bárdot, s – bár rabszolgatartók – kegyetlenségnek tartják rabszolgáikat a legelemibb védekező eszközöktől, mint a késtől vagy a rövidkardtól megfosztani vagy fegyvertelenekre támadni. Ettől eltekintve vérszomjasak és általában semleges vagy gonosz jelleműek. Testalkatuk magas és erős, hajuk vöröses, szőke vagy világosbarna. A férfiak szakállat vagy bajuszt, a nők hosszú hajat viselnek. A déli vidékeken civilizálatlanságuk és faragatlanságuk miatt gyakran megvetik őket.";
        case Faj.Osember: return "Az Ősemberek vad földek primitív őslakói. Máig merizték görnyedt tartásukat, szőrös küllemüket és loboncos fekete hajukat. A fémmegmunkálást még sokan nem ismerik, s kőeszközöket – esetleg rezet– használnak. Írásuk egyáltalán nincs. Félisteneént tisztelik hátasaikat, a hatalmas mamutokat.";
        case Faj.Elf: return "Az elfek szépségükről, hosszú életükről és fejlett civilizációjukról ismertek, amely ötvözi a városi és természeti élet előnyeit. Termetük nyúlánk, vonásaik az embernél finomabbak, de egyben törékenyebbek. Kiváló íjászok és varázslók. Általában visszahúzódóak, csak ritkán lépnek kapcsolatba a rövidebb életű népekkel – legjobban az emberekkel és a félszerzetekkel jönnek ki. Jellemük általában kaotikus jó.";
        case Faj.Felelf: return "A félelfek elf és ember szülők gyermekei. Kis számuk miatt nem alkotnak külön közösségeket.";
        case Faj.Felork: return "A félorkok többsége külsejében inkább rút emberre hasonlít (bár termetük gyakran görnyedt, arcvonásaik pedig a disznóéra emlékeztetnek), belsőleg azonban számos ork vonással rendelkeznek: számítók, magányosak és bizalmatlanok a szebb fajokkal, de legtöbbször fajtársaikkal is. Különösen sok közöttük az orgyilkos és a közönséges gonosztevő; egyikük-másikuk ezt némi mágikus erővel vegyíti. A legtöbb félork gonosz jellemű.";
        case Faj.Felszerzet: return "A félszerzetek általában megelégszenek a nyugodt vidéki élettel. Termetük az emberi fele. Hajlamosak az elhízásra, s lábukat vastag szőr borítja. Általában mezítláb járnak. Mivel lusták és kényelemszeretők, csak ritkán adják fejüket kalandokra – ekkor azonban kiváló tolvajokká válhatnak.";
        case Faj.Gnom: return "A gnómok különösen ritka, elsősorban emberi városokban megtalálható alacsony termetű faj. A gnómokat alacsony termetükről, vékony végtagjaikról és tömpe, húsos orrukról lehet fölismerni. A gnómok jó kézművesek és van érzékük a mágiához is – elsősorban az illuzionisták trükkjeihez vonzódnak.";
        case Faj.Torpe: return "A törpék elsősorban hegyek között és dombvidékeken élnek. Termetük kicsi (1,2 m), de testük tömzsi és igen szívós. Bozontos szakállat viselnek, amely a férfiak esetén dús és sörteszerű, a nőknél finomabb és ritkásabb. A törpék kiemelkedőek a mindenféle mesterségekben, különösen a fémmunkákban, de harcban is megállják helyüket. Nagy nemzetségekbe szerveződnek és híresek igazságérzetükről, makacsságukról és kapzsiságukról. A legtöbb törpe törvényes jó vagy törvényes semleges jellemű.";
    }
}

export function FajSpecials(faj : Faj) : string[] {
    switch (faj) {
        case Faj.Ember: return [
            "A játék kezdetén egy extra képzettséggel kezdenek",
            "Korlátlanul fejlődhetnek minden osztályban",
        ];
        case Faj.Amazon: return [
            "Ha két vagy több amazon együttesen harcol, VO-juk 2-vel nő pszionikus képességeik miatt",
            "Szintkorlátok: Harcos -, Pap 5, Tolvaj 0, Varázsló 0",
        ];
        case Faj.Birodalmi: return [
            "+1 Int, -1 Egs",
            "Egyik kezdő képzettségük mindenképpen az Alkímia vagy a Méregkeverés",
            "Szintkorlátok: Harcos 7, Pap 5, Tolvaj 5, Varázsló -",
        ];
        case Faj.Etuniai: return [
            "+1 Egs, -1 Böl",
            "Az egyik kezdő képzettségük mindenképpen a Lovaglás",
            "Szintkorlátok: Harcos -, Pap 5, Tolvaj -, Varázsló 4",
        ];
        case Faj.Eszaki: return [
            "+1 Erő, -1 Böl",
            "Az egyik kezdő képzettségük mindenképpen a Hajózás",
            "Szintkorlátok: Harcos -, Pap 7, Tolvaj -, Varázsló 5",
        ];
        case Faj.Osember: return [
            "+1 Erő, +1 Egészség, -1 Int, -1 Böl",
            "Szintkorlátok: Harcos -, Pap 5, Tolvaj 4, Varázsló 0",
        ];
        case Faj.Elf: return [
            "+1 Ügy, -1 Egs",
            "Immunisak az altató mágiára, +2 mentődobás bűbáj ellen",
            "Automatikusan képzettek az íjak és a hosszúkard használatában akkor is, ha osztályuk ezt nem adná meg nekik",
            "Nem támaszthatók föl közönséges mágiával",
            "Szintkorlátok: Harcos 9, Pap 7, Tolvaj 6, Varázsló 9",
        ];
        case Faj.Felelf: return [
            "Automatikusan képzettek az íjak és a hosszúkard használatában",
            "Szintkorlátok: Harcos 9, Pap 5, Tolvaj 9, Varázsló 9",
        ];
        case Faj.Felork: return [
            "+1 Erő, +1 Egs, -2 Kar",
            "Szintkorlátok: Harcos 9, Pap 5, Tolvaj 9, Varázsló 5",
        ];
        case Faj.Felszerzet: return [
            "+1 Ügy, -1 Erő",
            "+1 VO kis méretük miatt",
            "+1 támadást kapnak dobófegyverekre és parittyákra",
            "Szintkorlátok: Harcos 6, Pap 6, Tolvaj 9, Varázsló 4",
        ];
        case Faj.Gnom: return [
            "+1 Int, -1 Erő",
            "Szintkorlátok: Harcos 6, Pap 6, Tolvaj 8, Varázsló 7",
        ];
        case Faj.Torpe: return [
            "+1 Egs, -1 Kar",
            "Lassabban mozognak az embereknél (alapsebességük 20’)",
            "+2 mentődobást kapnak mérgek és varázslatok hatásai ellen",
            "Szintkorlátok: Harcos 9, Pap 9, Tolvaj 6, Varázsló 4",
        ];
    }
}

export type Szintkorlatok = Record<Osztaly, number>

export interface FajDetails {
    ID: Faj,
    Label: string,
    Description: string,
    Specials: string[],
    TulajdonsagModifiers: KarakterTulajdonsagok
    Szintkorlatok: Szintkorlatok
}


export function GetFajDetails(faj: Faj): FajDetails {
    return {
        ID: faj,
        Label: FajLabel(faj),
        Description: FajDescription(faj),
        Specials: FajSpecials(faj),
        TulajdonsagModifiers: fajiTulajdonsagModositok(faj),
        Szintkorlatok: SzintKorlatokFajokra(faj),
    }
}

function fajiTulajdonsagModositok(faj: Faj): KarakterTulajdonsagok {
    return {
        [Tulajdonsag.Ero]: TulajdonsagModositokFajokra(Tulajdonsag.Ero)(faj),
        [Tulajdonsag.Ugyesseg]: TulajdonsagModositokFajokra(Tulajdonsag.Ugyesseg)(faj),
        [Tulajdonsag.Egeszseg]: TulajdonsagModositokFajokra(Tulajdonsag.Egeszseg)(faj),
        [Tulajdonsag.Intelligencia]: TulajdonsagModositokFajokra(Tulajdonsag.Intelligencia)(faj),
        [Tulajdonsag.Bolcsesseg]: TulajdonsagModositokFajokra(Tulajdonsag.Bolcsesseg)(faj),
        [Tulajdonsag.Karizma]: TulajdonsagModositokFajokra(Tulajdonsag.Karizma)(faj),
    }
}

const EmberiSzintKorlatok: Szintkorlatok = {
    o_amazon: 0,
    o_barbar: 20,
    o_harcos: 20,
    o_ijasz: 20,
    o_illuzionista: 20,
    o_kaloz: 20,
    o_pap: 20,
    o_tolvaj: 20,
    o_varazslo: 20

}

// noinspection OverlyComplexFunctionJS,FunctionTooLongJS
export function SzintKorlatokFajokra(faj: Faj) : Szintkorlatok {
    let szintkorlatok = {...EmberiSzintKorlatok}
    switch (faj) {
        case Faj.Ember: break;
        case Faj.Amazon:
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 0
            szintkorlatok.o_illuzionista = 0
            szintkorlatok.o_varazslo = 0
            szintkorlatok.o_amazon = 20
            break
        case Faj.Birodalmi:
            szintkorlatok.o_harcos = 7
            szintkorlatok.o_barbar = 7
            szintkorlatok.o_ijasz = 7
            szintkorlatok.o_kaloz = 7
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 5
            break
        case Faj.Eszaki:
        case Faj.Etuniai:
            szintkorlatok.o_pap = 7
            szintkorlatok.o_illuzionista = 5
            szintkorlatok.o_varazslo = 5
            break
        case Faj.Osember:
            szintkorlatok.o_pap = 7
            szintkorlatok.o_tolvaj = 4
            szintkorlatok.o_illuzionista = 0
            szintkorlatok.o_varazslo = 0
            break
        case Faj.Elf:
            szintkorlatok.o_pap = 7
            szintkorlatok.o_tolvaj = 6
            szintkorlatok.o_illuzionista = 9
            szintkorlatok.o_varazslo = 9
            szintkorlatok.o_harcos = 9
            szintkorlatok.o_barbar = 9
            szintkorlatok.o_ijasz = 9
            szintkorlatok.o_kaloz = 9
            break
        case Faj.Felelf:
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 9
            szintkorlatok.o_illuzionista = 9
            szintkorlatok.o_varazslo = 9
            szintkorlatok.o_harcos = 9
            szintkorlatok.o_barbar = 9
            szintkorlatok.o_ijasz = 9
            szintkorlatok.o_kaloz = 9
            break
        case Faj.Felork:
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 9
            szintkorlatok.o_illuzionista = 5
            szintkorlatok.o_varazslo = 5
            szintkorlatok.o_harcos = 9
            szintkorlatok.o_barbar = 9
            szintkorlatok.o_ijasz = 9
            szintkorlatok.o_kaloz = 9
            break
        case Faj.Felszerzet:
            szintkorlatok.o_pap = 6
            szintkorlatok.o_tolvaj = 9
            szintkorlatok.o_illuzionista = 4
            szintkorlatok.o_varazslo = 4
            szintkorlatok.o_harcos = 6
            szintkorlatok.o_barbar = 6
            szintkorlatok.o_ijasz = 6
            szintkorlatok.o_kaloz = 6
            break
        case Faj.Gnom:
            szintkorlatok.o_pap = 6
            szintkorlatok.o_tolvaj = 8
            szintkorlatok.o_illuzionista = 7
            szintkorlatok.o_varazslo = 7
            szintkorlatok.o_harcos = 6
            szintkorlatok.o_barbar = 6
            szintkorlatok.o_ijasz = 6
            szintkorlatok.o_kaloz = 6
            break
        case Faj.Torpe:
            szintkorlatok.o_pap = 9
            szintkorlatok.o_tolvaj = 6
            szintkorlatok.o_illuzionista = 4
            szintkorlatok.o_varazslo = 4
            szintkorlatok.o_harcos = 9
            szintkorlatok.o_barbar = 9
            szintkorlatok.o_ijasz = 9
            szintkorlatok.o_kaloz = 9
            break
    }
    return szintkorlatok
}