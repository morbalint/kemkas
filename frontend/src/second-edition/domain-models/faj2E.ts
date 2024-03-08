import {KarakterTulajdonsagok, Tulajdonsag2E} from "./tulajdonsag2E";

export enum Faj2E {
    Ember = 'f_2e_ember',
    Amazon = 'f_2e_amazon',
    Birodalmi = 'f_2e_birodalmi',
    Nomad = 'f_2e_nomad',
    Eszaki = 'f_2e_eszaki',
    Osember = 'f_2e_osember',
    Elf = 'f_2e_elf',
    Felelf = 'f_2e_felelf',
    Felork = 'f_2e_felork',
    Felszerzet = 'f_2e_felszerzet',
    Gnom = 'f_2e_gnom',
    Torpe = 'f_2e_torpe',
}

export function FajLabel(faj: Faj2E) : string {
    switch (faj) {
        case Faj2E.Ember: return 'Ember';
        case Faj2E.Amazon: return 'Amazon';
        case Faj2E.Birodalmi: return 'Birodalmi';
        case Faj2E.Nomad: return 'Nomád';
        case Faj2E.Eszaki: return 'Északi';
        case Faj2E.Osember: return 'Ősember';
        case Faj2E.Elf: return 'Elf';
        case Faj2E.Felelf: return 'Félelf';
        case Faj2E.Felork: return 'Félork';
        case Faj2E.Felszerzet: return 'Félszerzet';
        case Faj2E.Gnom: return 'Gnóm';
        case Faj2E.Torpe: return 'Törpe';
    }
}

export function FajDescription(faj: Faj2E) : string {
    switch (faj) {
        case Faj2E.Ember: return "Az emberi népek sokfélesége és szaporasága, valamint a bennük élő felfedezői hajlam és erkölcsi rugalmasság hatására képviselőik majdnem minden földön megtalálhatók. A legtöbb ember a lenti vonásokkal rendelkezik.";
        case Faj2E.Amazon: return "Bár az amazonok barbár népe igen kis létszámú, harciasságuk miatt mégis félik őket. Az amazonok nyúlánk termetűek, hajuk általában vöröses vagy világosbarna, bőrük világos. Társadalmukban teljes a nőuralom; a férfiakat rabszolgaságban tartják és megtiltják számukra a fegyverek viselését. Képzett tengeri rablók, de a szárazföldön is megállják a helyüket. Az amazon nők kivétel nélkül értenek a harchoz és soha, soha nem hagyják megtorlatlanul az őket ért sérelmeket. Technikailag fejletlenek. Kis erejű passzív pszionikus (elmebeli) képességeik vannak.";
        case Faj2E.Birodalmi: return "Dekadens, hanyatló birodalmak előkelő lakói. Életüket többnyire dekadens élvezetek habzsolásával, kábítószeres mámorban töltik; soraikban a beltenyészet és a degeneráció miatt gyakoriak az örökletes betegségek. Városaik számtalan titkot és mesés kincseket rejtenek.";
        case Faj2E.Eszaki: return "Az északi kultúra lételeme a harc és a hajózás. Még nőik is kiválóan forgatják a harci fejszét vagy a hosszú nyelű bárdot, s – bár rabszolgatartók – kegyetlenségnek tartják rabszolgáikat a legelemibb védekező eszközöktől, mint a késtől vagy a rövidkardtól megfosztani, vagy fegyvertelenekre támadni. Ettől eltekintve vérszomjasak, és általában semleges vagy gonosz jelleműek. Testalkatuk magas és erős, hajuk vöröses, szőke vagy világosbarna. A férfiak szakállat vagy bajuszt, a nők hosszú hajat viselnek. A déli vidékeken civilizálatlanságuk és faragatlanságuk miatt gyakran megvetik őket.";
        case Faj2E.Nomad: return "A lovas nomádok kultúrája mindmáig megőrizte primitívségét. Az alkalomnak megfelelően állattartásból, lovas portyázásból, kereskedésből vagy ezek kombinációjából élnek. Eszközeik is egyszerűek: fegyvereik főleg hosszú lándzsák és íjak, és bár kedvelik a kardokat és láncvérteket, nem jeleskednek azok előállításában (a vas megmunkálását kovácsaik féltett titokként őrzik). Többnyire semleges jelleműek, de otthonuktól elszakadva mindenhol feltalálják magukat, és hajlamosak a gonoszra. A nomádok középtermetűek, bőrük cserzett, hajuk olajos fekete, amit leggyakrabban copfban fognak össze. A férfiak kedvelik a bajusz viseletét." ;
        case Faj2E.Osember: return "Vad földek primitív őslakói. Máig megőrizték görnyedt tartásukat, szőrös küllemüket és loboncos fekete hajukat. A fémmegmunkálást még sokan nem ismerik, s kőeszközöket – esetleg rezet – használnak. Írásuk egyáltalán nincs. Félistenekként tisztelik hátasaikat, a hatalmas mamutokat. Sokan értelem nélküli vagy gyermeki vadaknak hiszik őket, nagy kárukra: az ősemberekben gyakran lakozik bestiális ravaszság, és a civilizált ember eszközeihez jutva rendkívül veszedelmesek.";
        case Faj2E.Elf: return "Az elfek szépségükről, 150-200 éves élettartamukról és fejlett civilizációjukról ismertek, amely ötvözi a városi és természeti élet előnyeit. Termetük nyúlánk, vonásaik az embernél finomabbak, de egyben törékenyebbek. Kiváló íjászok és varázslók. Általában visszahúzódók, csak ritkán lépnek kapcsolatba a rövidebb életű népekkel – legjobban az emberekkel és a félszerzetekkel jönnek ki. Jellemük általában kaotikus jó.";
        case Faj2E.Felelf: return "A félelfek elf és ember szülők gyermekei, akik nem tartoznak egyik közösséghez sem – jellemvonásaik általában az elfekhez húznak, de élettartamuk emberi. Kis számuk miatt nem alkotnak külön nemzetségeket, többségük magányos utazó.";
        case Faj2E.Felork: return "A félorkok többsége külsejében inkább rút emberre hasonlít (bár termetük gyakran görnyedt, arcvonásaik pedig disznószerűek), belsőleg azonban számos ork vonással rendelkeznek: számítók, magányosak és bizalmatlanok a szebb fajokkal, de legtöbbször fajtársaikkal is. Különösen sok közöttük az orgyilkos és a közönséges gonosztevő; egyikük-másikuk ezt némi mágikus erővel vegyíti. Nem alkotnak különálló közösségeket, életük általában rövid és erőszakos. A legtöbb félork gonosz jellemű.";
        case Faj2E.Felszerzet: return "A félszerzetek általában megelégszenek a nyugodt vidéki élettel. Termetük az emberi fele, élettartamuk a másfélszerese. Hajlamosak az elhízásra, s lábukat vastag szőr borítja. Általában mezítláb járnak. Mivel lusták és kényelemszeretők, csak ritkán adják fejüket kalandokra – ekkor azonban kiváló tolvajokká válhatnak.";
        case Faj2E.Gnom: return "A gnómok különösen ritka, elsősorban az embernéppel együtt élő Faj2E. A gnómokat alacsony termetükről, vékony végtagjaikról és tömpe, húsos orrukról lehet fölismerni. Élettartamuk az emberi másfélszerese. A gnómok jó kézművesek és van érzékük a mágiához is – elsősorban az illuzionisták trükkjeihez vonzódnak. A legtöbb gnóm semleges jó vagy semleges jellemű.";
        case Faj2E.Torpe: return "A törpék elsősorban hegyek között és dombvidékeken élnek. Termetük kicsi, de testük tömzsi és igen szívós. Bozontos szakállat viselnek, amely a férfiak esetén dús és sörteszerű, a nőknél finomabb és ritkásabb. A törpék kiemelkedőek a mindenféle mesterségekben, különösen a fémmunkákban, de harcban is megállják helyüket. Nagy nemzetségekbe szerveződnek és híresek igazságérzetükről, makacsságukról és kapzsiságukról. A legtöbb törpe törvényes jó vagy törvényes semleges jellemű..";
    }
}

export function FajSpecials(faj : Faj2E) : string[] {
    switch (faj) {
        case Faj2E.Ember: return [
            "A játék kezdetén egy extra képzettséggel kezdenek",
            "Korlátlanul fejlődhetnek minden osztályban",
        ];
        case Faj2E.Amazon: return [
            "+1-et kapnak kezdeményezésükre",
            "Ha két vagy több amazon együttesen harcol, VO-juk 2-vel nő pszionikus képességeik miatt",
            "Szintkorlátok: Harcos 9, Pap 5, Tolvaj 3, Varázsló 3",
        ];
        case Faj2E.Birodalmi: return [
            "+1 Intelligencia, -1 Egészség",
            "Egyik kezdő képzettségük mindenképpen az Alkímia, a Méregkeverés vagy az Okkultizmus.",
            "Szintkorlátok: Harcos 7, Pap 5, Tolvaj 5, Varázsló 9",
        ];
        case Faj2E.Eszaki: return [
            "+1 Erő, -1 Bölcsesség",
            "Az egyik kezdő képzettségük mindenképpen a Hajózás",
            "-1-et kapnak minden Karizmapróbájukra (népük tagjai között is)",
            "Szintkorlátok: Harcos 9, Pap 7, Tolvaj 7, Varázsló 3",
        ];
        case Faj2E.Nomad: return [
            "+1 Egészség, -1 Bölcsesség",
            "Az egyik kezdő képzettségük mindenképpen a Lovaglás",
            "Szintkorlátok: Harcos 9, Pap 5, Tolvaj 7, Varázsló 3",
        ];
        case Faj2E.Osember: return [
            "+1 Erő, +1 Egészség, -1 Intelligencia, -1 Bölcsesség",
            "Szintkorlátok: Harcos -, Pap 5, Tolvaj 4, Varázsló 0",
        ];
        case Faj2E.Elf: return [
            "+1 Ügyesség, -1 Egészség",
            "Immunisak az altató mágiára, +2 mentődobás bűbáj ellen",
            "Képzettek a hosszúíjak és a hosszúkard használatában akkor is, ha osztályuk ezt nem adná meg nekik",
            "Az egyik képzettségük mindenképpen a Vadonjárás",
            "Nem támaszthatók föl",
            "Szintkorlátok: Harcos 7, Pap 3, Tolvaj 5, Varázsló 7",
        ];
        case Faj2E.Felelf: return [
            "Képzettek a hosszúíjak és a hosszúkard használatában akkor is, ha osztályuk ezt nem adná meg nekik",
            "Az egyik képzettségük mindenképpen a Vadonjárás",
            "Szintkorlátok: Harcos 9, Pap 5, Tolvaj 9, Varázsló 9",
        ];
        case Faj2E.Felork: return [
            "+1 Erő, +1 Egészség, -2 Karizma",
            "A fenti levonáson túl -1-et kapnak minden Karizmapróbájukra (más félorkokkal szemben is)",
            "Szintkorlátok: Harcos 7, Pap 5, Tolvaj 7, Varázsló 5",
        ];
        case Faj2E.Felszerzet: return [
            "+1 Ügyesség, -1 Erő",
            "+1 VO-t kapnak kis méretük miatt",
            "+1 támadást kapnak dobófegyverekre és parittyákra",
            "Kétkezes közelharci fegyvereket -4 levonással, másfélkezes fegyvereket két kézzel forgathatnak",
            "Kétszer annyi élelmet kell enniük, mint másoknak",
            "Szintkorlátok: Harcos 5, Pap 3, Tolvaj 7, Varázsló 3",
        ];
        case Faj2E.Gnom: return [
            "+1 Intelligencia, -1 Erő",
            "+1 VO-t kapnak kis méretük miatt",
            "+1-et kapnak a mágia elleni mentődobásaikra",
            "Kétkezes közelharci fegyvereket -4 levonással, másfélkezes fegyvereket két kézzel forgathatnak",
            "Szintkorlátok: Harcos 3, Pap 3, Tolvaj 5, Varázsló 7",
        ];
        case Faj2E.Torpe: return [
            "+1 Egészség, -1 Karizma",
            "Lassabban mozognak az embereknél, kezdeményezésükre -2-t kapnak",
            "+2 mentődobást kapnak mérgek, betegségek és varázslatok hatásai ellen",
            "Az egyik képzettségük mindenképpen az Értékbecslés",
            "Szintkorlátok: Harcos 7, Pap 5, Tolvaj 5, Varázsló 3",
        ];
    }
}

export type Szintkorlatok = Record<string, number> // TODO!! use Osztaly enum, rule fix!

export interface FajDetails {
    ID: Faj2E,
    Label: string,
    Description: string,
    Specials: string[],
    TulajdonsagModifiers: KarakterTulajdonsagok
    Szintkorlatok: Szintkorlatok
}

export function GetFajDetails(faj: Faj2E): FajDetails {
    return {
        ID: faj,
        Label: FajLabel(faj),
        Description: FajDescription(faj),
        Specials: FajSpecials(faj),
        TulajdonsagModifiers: fajiTulajdonsagModositok(faj),
        Szintkorlatok: SzintKorlatokFajokra(faj),
    }
}

// noinspection OverlyComplexFunctionJS,FunctionTooLongJS
function tulajdonsagModositokPerFaj(tul: Tulajdonsag2E, faj: Faj2E) : number {
    switch (faj) {
        case Faj2E.Birodalmi: switch (tul) {
            case Tulajdonsag2E.Egeszseg: return -1;
            case Tulajdonsag2E.Intelligencia: return +1;
            default: return 0;
        }
        case Faj2E.Eszaki: switch (tul) {
            case Tulajdonsag2E.Ero: return +1;
            case Tulajdonsag2E.Bolcsesseg: return -1;
            default: return 0;
        }
        case Faj2E.Nomad: switch (tul) {
            case Tulajdonsag2E.Egeszseg: return +1;
            case Tulajdonsag2E.Bolcsesseg: return -1;
            default: return 0
        }
        case Faj2E.Osember: switch (tul) {
            case Tulajdonsag2E.Ero: return +1;
            case Tulajdonsag2E.Egeszseg: return +1;
            case Tulajdonsag2E.Intelligencia: return -1;
            case Tulajdonsag2E.Bolcsesseg: return -1;
            default: return 0
        }
        case Faj2E.Elf: switch (tul) {
            case Tulajdonsag2E.Egeszseg: return -1;
            case Tulajdonsag2E.Ugyesseg: return +1;
            default: return 0;
        }
        case Faj2E.Felork: switch (tul) {
            case Tulajdonsag2E.Ero: return +1;
            case Tulajdonsag2E.Egeszseg: return +1;
            case Tulajdonsag2E.Karizma: return -2;
            default: return 0;
        }
        case Faj2E.Felszerzet: switch (tul) {
            case Tulajdonsag2E.Ero: return -1;
            case Tulajdonsag2E.Ugyesseg: return +1;
            default: return 0;
        }
        case Faj2E.Gnom: switch (tul) {
            case Tulajdonsag2E.Ero: return -1;
            case Tulajdonsag2E.Intelligencia: return +1;
            default: return 0;
        }
        case Faj2E.Torpe: switch (tul) {
            case Tulajdonsag2E.Egeszseg: return +1;
            case Tulajdonsag2E.Karizma: return -1;
            default: return 0;
        }

        default: return 0;
    }
}

export function TulajdonsagModositokFajokra(tul: Tulajdonsag2E) {
    return (faj: Faj2E) => tulajdonsagModositokPerFaj(tul, faj);
}

export function TulajdonsagokFajjal(tulajdonsagok: KarakterTulajdonsagok, faj: Faj2E): KarakterTulajdonsagok {
    return {
        [Tulajdonsag2E.Ero]: tulajdonsagok.t_ero + tulajdonsagModositokPerFaj(Tulajdonsag2E.Ero, faj),
        [Tulajdonsag2E.Ugyesseg]: tulajdonsagok.t_ugy + tulajdonsagModositokPerFaj(Tulajdonsag2E.Ugyesseg, faj),
        [Tulajdonsag2E.Egeszseg]: tulajdonsagok.t_egs + tulajdonsagModositokPerFaj(Tulajdonsag2E.Egeszseg, faj),
        [Tulajdonsag2E.Intelligencia]: tulajdonsagok.t_int + tulajdonsagModositokPerFaj(Tulajdonsag2E.Intelligencia, faj),
        [Tulajdonsag2E.Bolcsesseg]: tulajdonsagok.t_bol + tulajdonsagModositokPerFaj(Tulajdonsag2E.Bolcsesseg, faj),
        [Tulajdonsag2E.Karizma]: tulajdonsagok.t_kar + tulajdonsagModositokPerFaj(Tulajdonsag2E.Karizma, faj),
    }
}

function fajiTulajdonsagModositok(faj: Faj2E): KarakterTulajdonsagok {
    return {
        [Tulajdonsag2E.Ero]: TulajdonsagModositokFajokra(Tulajdonsag2E.Ero)(faj),
        [Tulajdonsag2E.Ugyesseg]: TulajdonsagModositokFajokra(Tulajdonsag2E.Ugyesseg)(faj),
        [Tulajdonsag2E.Egeszseg]: TulajdonsagModositokFajokra(Tulajdonsag2E.Egeszseg)(faj),
        [Tulajdonsag2E.Intelligencia]: TulajdonsagModositokFajokra(Tulajdonsag2E.Intelligencia)(faj),
        [Tulajdonsag2E.Bolcsesseg]: TulajdonsagModositokFajokra(Tulajdonsag2E.Bolcsesseg)(faj),
        [Tulajdonsag2E.Karizma]: TulajdonsagModositokFajokra(Tulajdonsag2E.Karizma)(faj),
    }
}

const EmberiSzintKorlatok: Szintkorlatok = {
    o_amazon: 0,
    o_barbar: 12,
    o_harcos: 12,
    o_ijasz: 12,
    o_illuzionista: 12,
    o_kaloz: 12,
    o_pap: 12,
    o_tolvaj: 12,
    o_varazslo: 12

}

// noinspection OverlyComplexFunctionJS,FunctionTooLongJS
export function SzintKorlatokFajokra(faj: Faj2E) : Szintkorlatok {
    let szintkorlatok = {...EmberiSzintKorlatok}
    switch (faj) {
        case Faj2E.Ember: break;
        case Faj2E.Amazon:
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 0
            szintkorlatok.o_illuzionista = 0
            szintkorlatok.o_varazslo = 0
            szintkorlatok.o_amazon = 20
            break
        case Faj2E.Birodalmi:
            szintkorlatok.o_harcos = 7
            szintkorlatok.o_barbar = 7
            szintkorlatok.o_ijasz = 7
            szintkorlatok.o_kaloz = 7
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 5
            break
        case Faj2E.Eszaki:
        case Faj2E.Nomad:
            szintkorlatok.o_pap = 7
            szintkorlatok.o_illuzionista = 5
            szintkorlatok.o_varazslo = 5
            break
        case Faj2E.Osember:
            szintkorlatok.o_pap = 7
            szintkorlatok.o_tolvaj = 4
            szintkorlatok.o_illuzionista = 0
            szintkorlatok.o_varazslo = 0
            break
        case Faj2E.Elf:
            szintkorlatok.o_pap = 7
            szintkorlatok.o_tolvaj = 6
            szintkorlatok.o_illuzionista = 9
            szintkorlatok.o_varazslo = 9
            szintkorlatok.o_harcos = 9
            szintkorlatok.o_barbar = 9
            szintkorlatok.o_ijasz = 9
            szintkorlatok.o_kaloz = 9
            break
        case Faj2E.Felelf:
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 9
            szintkorlatok.o_illuzionista = 9
            szintkorlatok.o_varazslo = 9
            szintkorlatok.o_harcos = 9
            szintkorlatok.o_barbar = 9
            szintkorlatok.o_ijasz = 9
            szintkorlatok.o_kaloz = 9
            break
        case Faj2E.Felork:
            szintkorlatok.o_pap = 5
            szintkorlatok.o_tolvaj = 9
            szintkorlatok.o_illuzionista = 5
            szintkorlatok.o_varazslo = 5
            szintkorlatok.o_harcos = 9
            szintkorlatok.o_barbar = 9
            szintkorlatok.o_ijasz = 9
            szintkorlatok.o_kaloz = 9
            break
        case Faj2E.Felszerzet:
            szintkorlatok.o_pap = 6
            szintkorlatok.o_tolvaj = 9
            szintkorlatok.o_illuzionista = 4
            szintkorlatok.o_varazslo = 4
            szintkorlatok.o_harcos = 6
            szintkorlatok.o_barbar = 6
            szintkorlatok.o_ijasz = 6
            szintkorlatok.o_kaloz = 6
            break
        case Faj2E.Gnom:
            szintkorlatok.o_pap = 6
            szintkorlatok.o_tolvaj = 8
            szintkorlatok.o_illuzionista = 7
            szintkorlatok.o_varazslo = 7
            szintkorlatok.o_harcos = 6
            szintkorlatok.o_barbar = 6
            szintkorlatok.o_ijasz = 6
            szintkorlatok.o_kaloz = 6
            break
        case Faj2E.Torpe:
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