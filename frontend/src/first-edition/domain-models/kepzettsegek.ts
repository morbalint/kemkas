import {Osztaly} from "./osztaly";
import {Faj} from "./faj";
import {KarakterInputs} from "./karakter";
import {Modifier, Tulajdonsag} from "./tulajdonsag";

export type KepzettsegId = 'k_alkimia' | 'k_alcazas' | 'k_allatidomitas' | 'k_csapdak' | 'k_csillagjoslas' | 'k_egyensulyozas' | 'k_eloadas' | 'k_ertekbecsles' | 'k_gyogyitas' | 'k_hajozas' | 'k_hallgatozas' | 'k_hamisitas' | 'k_jelek_olvasasa' | 'k_koncentracio' | 'k_lovaglas' | 'k_maszas' | 'k_megfigyeles' | 'k_meregkeveres' | 'k_mesterseg' | 'k_nyomkereses' | 'k_osonas' | 'k_rejtozes' | 'k_szabadulomuveszet' | 'k_tudas' | 'k_ugras' | 'k_uszas' | 'k_varazslatismeret' | 'k_zarnyitas' | 'k_zsebmetszes'

export interface Kepzettseg {
    Id: KepzettsegId,
    Name: string,
    Description: string,
    Tulajdonsag: Tulajdonsag[],
    Osztalyok?: Osztaly[],
}

export const KepzettsegLista: Kepzettseg[] = [
    {
        Id: 'k_alkimia',
        Name: 'Alkímia',
        Description: 'Különféle különleges anyagok, pl. savak, görögtűz, stb. kikeverésére szolgál. Használatához gyakran jól felszerelt laboratórium szükséges. Az Alkímia képzettséggel a karakter képes beazonosítani a különféle vegyi anyagokat és mérgeket, bizonyos esetekben varázsitalokat is.',
        Tulajdonsag: [Tulajdonsag.Intelligencia],
        Osztalyok: [Osztaly.Varazslo, Osztaly.Illuzionista, Osztaly.Pap],
    },
    {
        Id: 'k_alcazas',
        Name: 'Álcázás',
        Description: 'Álöltözetek készítése és effektív használata. Próbadobást akkor kell dobni, ha az álca hitelességét valaki kétségbe vonhatja (általában titkos dobás; az eredményt csak a mesélő ismeri).',
        Tulajdonsag: [Tulajdonsag.Karizma],
        Osztalyok: [Osztaly.Tolvaj],
    },
    {
        Id: 'k_allatidomitas',
        Name: 'Állatidomítás',
        Description: 'Állatok megszelídítésére, betanítására szolgál. A járatos karakter próbát tehet arra is, hogy a különféle vadállatok ne tekintsék ellenségüknek vagy prédájuknak',
        Tulajdonsag: [Tulajdonsag.Karizma],
    },
    {
        Id: 'k_csapdak',
        Name: 'Csapdák állítása',
        Description: 'A karakter a rendelkezésre álló idő és alapanyagok függvényében készíthet szimpla vagy komplex csapdákat. Ha egy csapda eltávolítására tett próba sikertelen, az bizonyos eséllyel kisülhet és veszélybe sodorhatja az óvatlan próbálkozót.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
        Osztalyok: [Osztaly.Tolvaj],
    },
    {
        Id: 'k_csillagjoslas',
        Name: 'Csillagjóslás',
        Description: 'A karakter a képzettséggel egyrészt képes meghatározni a karakterek hozzávetőleges pozícióját a térképen, másrészt egyszerűbb jóslatokat készíthet.',
        Tulajdonsag: [Tulajdonsag.Bolcsesseg],
        Osztalyok: [Osztaly.Varazslo, Osztaly.Illuzionista, Osztaly.Pap],
    },
    {
        Id: 'k_egyensulyozas',
        Name: 'Egyensúlyozás',
        Description: 'Omlatag talajon vagy keskeny járófelületen való átjutáshoz szükséges képzettség. Ha a próba sikertelen, a karakter lezuhan.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
        Osztalyok: [Osztaly.Tolvaj],
    },
    {
        Id: 'k_eloadas',
        Name: 'Előadás',
        Description: 'A képzettséggel rendelkező karakter járatos a hangszerek használatában, éneklésben, eposzmondásban, stb.',
        Tulajdonsag: [Tulajdonsag.Karizma],
    },
    {
        Id: 'k_ertekbecsles',
        Name: 'Értékbecslés',
        Description: 'Sikeres próba esetén a karakter hozzávetőlegesen felméri egy tárgy pénzbeli értékét és kiszúrja a hamisítványokat.',
        Tulajdonsag: [Tulajdonsag.Intelligencia],
    },
    {
        Id: 'k_gyogyitas',
        Name: 'Gyógyítás',
        Description: 'A sebek ellátásának, mérgek és betegségek semlegesítésének vagy enyhítésének tudománya. Ha a képzettséget sikeresen alkalmazzák közvetlenül harc után, a bekötözött karakter visszanyer 1d4 elvesztett Hp-t.',
        Tulajdonsag: [Tulajdonsag.Bolcsesseg],
    },
    {
        Id: 'k_hajozas',
        Name: 'Hajózás',
        Description: 'A karakter ismeri a hajózás trükkjeit, tehát elkormányoz kisebb vitorlásokat vagy gályákat, tudja hogyan kell elkerülni a zátonyokat, képes javításokat végezni, stb.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
    },
    {
        Id: 'k_hallgatozas',
        Name: 'Hallgatózás',
        Description: 'Alig hallható zajok, beszéd meghallása.',
        Tulajdonsag: [Tulajdonsag.Bolcsesseg],
    },
    {
        Id: 'k_hamisitas',
        Name: 'Hamisítás',
        Description: 'A képzettséggel hamis pénz, iratok, pecsétek és értéktárgyak készíthetők. Próbadobást akkor kell dobni, ha a hamisítvány hitelességét valaki kétségbe vonhatja.',
        Tulajdonsag: [Tulajdonsag.Intelligencia],
        Osztalyok: [Osztaly.Tolvaj],
    },
    {
        Id: 'k_jelek_olvasasa',
        Name: 'Jelek Olvasása',
        Description: 'A képzettséggel a karakter el tud olvasni más nyelven írt írásokat és feliratokat.',
        Tulajdonsag: [Tulajdonsag.Intelligencia],
        Osztalyok: [Osztaly.Tolvaj, Osztaly.Varazslo, Osztaly.Illuzionista, Osztaly.Pap],
    },
    {
        Id: 'k_koncentracio',
        Name: 'Koncentráció',
        Description: 'Ez a képesség arra teszi alkalmassá a varázshasználót, hogy nehéz körülmények között – sebesülten, vágtató lovon, hánykolódó hajón, stb. – is alkalmazhassa varázslatait.',
        Tulajdonsag: [Tulajdonsag.Bolcsesseg],
        Osztalyok: [Osztaly.Varazslo, Osztaly.Illuzionista, Osztaly.Pap],
    },
    {
        Id: 'k_lovaglas',
        Name: 'Lovaglás',
        Description: 'A karakter kiemelkedően jól ért a lovagláshoz; harcban és nehéz helyzetekben is csodákra képes sarkallni hátasát.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
    },
    {
        Id: 'k_maszas',
        Name: 'Mászás',
        Description: 'A képzettség olyan falakra való felmászásra alkalmas, ami egy átlagembernek komol gondot jelentene. Sikertelen próba esetén a karakter lezuhan, vagy a feladat meghaladja a képességeit.',
        Tulajdonsag: [Tulajdonsag.Ero],
    },
    {
        Id: 'k_megfigyeles',
        Name: 'Megfigyelés',
        Description: 'Ez a képzettség olyan érzékelési képességet jelent, ami meghaladja az átlagemberét. Így olyan részletek vehetők észre, amelye szabad szemmel láthatóak, de csak az avatott megfigyelő számára.',
        Tulajdonsag: [Tulajdonsag.Bolcsesseg],
    },
    {
        Id: 'k_meregkeveres',
        Name: 'Méregkeverés',
        Description: 'A megfelelő eszközök és alapanyagok birtokában különféle mérgek készíthetők. Sikertelen próbadobás esetén a keverék hatástalan, vagy a méregkeverő veszélybe sodorja önmagát.',
        Tulajdonsag: [Tulajdonsag.Intelligencia],
        Osztalyok: [Osztaly.Tolvaj],
    },
    {
        Id: 'k_mesterseg',
        Name: 'Mesterség',
        Description: 'A karakter járatos egy kiválasztott mesterségben – pl. kovácsolás, gyertyaöntés, adószedés, ötvösség. A kézügyességet igénylő mesterségekhez Ügyesség, a szellemi foglalkozásokhoz Intelligencia szükséges.',
        Tulajdonsag: [Tulajdonsag.Intelligencia, Tulajdonsag.Ugyesseg],
    },
    {
        Id: 'k_nyomkereses',
        Name: 'Nyomkeresés',
        Description: 'A karakter képes a nyomok követésére és hozzávetőleges azonosítására, vagyis megtudhatja, milyen régiek, miféle szerzet hagyta őket, milyen gyorsan haladt a nyomokat hagyó, stb.',
        Tulajdonsag: [Tulajdonsag.Bolcsesseg],
    },
    {
        Id: 'k_osonas',
        Name: 'Osonás',
        Description: 'Csöndes és általában viszonylag gyors mozgás.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
    },
    {
        Id: 'k_rejtozes',
        Name: 'Rejtőzés',
        Description: 'A képzettséget ismerő karakter olyan helyeken is elrejtőzhet, ahol más nem volna képes – például sötétebb sarkokban, árnyékokban.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
    },
    {
        Id: 'k_szabadulomuveszet',
        Name: 'Szabadulóművészet',
        Description: 'A karakter képes kiszabadulni kötelékeiből és láncaiból.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
        Osztalyok: [Osztaly.Tolvaj],
    },
    {
        Id: 'k_tudas',
        Name: 'Tudás',
        Description: 'A karakter járatos egy bizonyos tudományterületen. Számos példa lehetséges, a leggyakoribbak a Történelemismeret, Országismeret, Mágiaismeret (csak varázshasználók sajátíthatják el), Teológia, Vadonismeret és a Növényismeret.',
        Tulajdonsag: [Tulajdonsag.Intelligencia],
    },
    {
        Id: 'k_ugras',
        Name: 'Ugrás',
        Description: 'A karakter képes átugrani szélesebb vagy magasabb akadályokat is, és tompíthatja az esésből származó sebesüléseket. Ha a próba sikertelen, a karakter leesik.',
        Tulajdonsag: [Tulajdonsag.Ero],
    },
    {
        Id: 'k_uszas',
        Name: 'Úszás',
        Description: 'A karakter jól tud úszni, akár nehéz körülmények között (zajló vízben, megterhelten, stb.) is képes a felszínen maradni.',
        Tulajdonsag: [Tulajdonsag.Ero],
    },
    {
        Id: 'k_varazslatismeret',
        Name: 'Varázslatismeret',
        Description: 'A Mágiaismerettel ellentétben ez a képzettség nem a mágia elméletében, hanem a konkrét varázslatokban való ismereteket méri. Sikeres próbával a karakter azonosíthatja az elmondás alatt álló varázslatokat (NF= a mentődobás nehézsége), bizonyos mágikus effektusokat, csapdákat, stb.',
        Tulajdonsag: [Tulajdonsag.Intelligencia],
        Osztalyok: [Osztaly.Illuzionista, Osztaly.Varazslo, Osztaly.Pap],
    },
    {
        Id: 'k_zarnyitas',
        Name: 'Zárnyitás',
        Description: 'Tolvajszerszámok segítségével a karakter felnyithatja a különféle mechanikus zárakat. Sikertelen próba esetén nem képes az adott zár felnyitására – egészen addig, amíg új tapasztalatokat nem szerez (vagyis a következő szintlépéséig).',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
        Osztalyok: [Osztaly.Tolvaj],
    },
    {
        Id: 'k_zsebmetszes',
        Name: 'Zsebmetszés',
        Description: 'Őrizetlenül hagyott vagy övön, zsebben található kisebb tárgyak észrevétlen eltulajdonítása. Ha a próba sikertelen, a karaktert észreveszik vagy legalábbis gyanút kelt.',
        Tulajdonsag: [Tulajdonsag.Ugyesseg],
        Osztalyok: [Osztaly.Tolvaj],
    },
]

export const TolvajKepzettsegList = KepzettsegLista.filter(x => x.Osztalyok?.includes(Osztaly.Tolvaj))

export const Kepzettsegek: Record<KepzettsegId, Kepzettseg> =
    KepzettsegLista.reduce(
        (acc: Record<KepzettsegId, Kepzettseg>, k) => { acc[k.Id] = k; return acc; },
        {} as Record<KepzettsegId, Kepzettseg>);

export function AvailableKezpettsegList(osztaly: Osztaly): Kepzettseg[] {
    return KepzettsegLista.filter(k => k.Osztalyok == null || k.Osztalyok.includes(osztaly))
}

export function GetNumberOfKepzettsegek(t_int: number, faj: Faj, max: number) {
    let numberOfKepzettseg = 3 + Modifier(t_int) + (faj === Faj.Ember ? 1 : 0)

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

export function SetDefaultTolvajKepzettsegek(karakter: Pick<KarakterInputs, 'osztaly' | 'tolvajKepzettsegek'>, changeTolvajKepzettsegek: (tolvajKepzettsegek?: KepzettsegId[]) => void) {
    if (karakter.osztaly !== Osztaly.Tolvaj && karakter.tolvajKepzettsegek != null) {
        changeTolvajKepzettsegek(undefined)
    }
    if (karakter.osztaly === Osztaly.Tolvaj && (karakter.tolvajKepzettsegek == null || karakter.tolvajKepzettsegek.length === 0)) {
        const tolvajKepzettsegek = TolvajKepzettsegList.slice(0, 4).map(x => x.Id)
        changeTolvajKepzettsegek(tolvajKepzettsegek)
    }
}

export function GetKepzettsegListaN(karakter: Pick<KarakterInputs, 'osztaly' | 'faj' | 'kepzettsegek' | 'tolvajKepzettsegek'>) {
    const availableKepzettsegList = AvailableKezpettsegList(karakter.osztaly)
    return (n: number): Kepzettseg[] => {
        let available = [...availableKepzettsegList]
        if (n === 0) {
            if (karakter.faj === Faj.Eszaki) {
                return [Kepzettsegek.k_hajozas]
            }
            if (karakter.faj === Faj.Etuniai) {
                return [Kepzettsegek.k_lovaglas]
            }
            if (karakter.faj === Faj.Birodalmi && karakter.osztaly !== Osztaly.Tolvaj) {
                available = [Kepzettsegek.k_meregkeveres, Kepzettsegek.k_alkimia]
            }
        }
        const kepzettsegekWithoutN = [...karakter.kepzettsegek.slice(0, n), ...karakter.kepzettsegek.slice(n + 1)]
        return available.filter(x => !kepzettsegekWithoutN.includes(x.Id) && !karakter.tolvajKepzettsegek?.includes(x.Id))
    }
}

export function SetDefaultKepzettsegek(karakter: Pick<KarakterInputs, 'osztaly' | 'faj' | 'tulajdonsagok' | 'kepzettsegek' | 'tolvajKepzettsegek'>, changeKepzettsegek: (k: KepzettsegId[]) => void) {
    const availableKepzettsegList = AvailableKezpettsegList(karakter.osztaly)
    const numberOfKepzettsegek = GetNumberOfKepzettsegek(karakter.tulajdonsagok.t_int, karakter.faj, availableKepzettsegList.length)
    let kepzettsegek = [...karakter.kepzettsegek]

    let mustChangeKepzettsegek = false

    const restrictedKepzettsegek = GetKepzettsegListaN(karakter)(0)
    if (kepzettsegek.length === 0) {
        if (restrictedKepzettsegek.length > 0) {
            kepzettsegek.push(restrictedKepzettsegek[0].Id)
            mustChangeKepzettsegek = true
        }
    } else {
        if (!restrictedKepzettsegek.includes(Kepzettsegek[kepzettsegek[0]])) {
            kepzettsegek[0] = restrictedKepzettsegek[0].Id
            mustChangeKepzettsegek = true
        }
    }

    if (kepzettsegek.length < numberOfKepzettsegek) {
        for (let i = kepzettsegek.length; i < numberOfKepzettsegek; i++) {
            const kepzettsegLista = GetKepzettsegListaN({...karakter, kepzettsegek})(i)
            if (kepzettsegLista.length > 0) {
                kepzettsegek.push(kepzettsegLista[0].Id)
            }
        }
        mustChangeKepzettsegek = true
    }
    if (kepzettsegek.length > numberOfKepzettsegek){
        kepzettsegek = kepzettsegek.slice(0, numberOfKepzettsegek)
        mustChangeKepzettsegek = true
    }
    if (mustChangeKepzettsegek){
        changeKepzettsegek(kepzettsegek)
    }
}
