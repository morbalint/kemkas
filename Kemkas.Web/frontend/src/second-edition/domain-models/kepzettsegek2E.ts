import {Osztaly2E} from "./osztaly2E";
import {Faj2E} from "./faj2E";
import {Karakter2E} from "./karakter2E";
import {Modifier, Tulajdonsag2E} from "./tulajdonsag2E";

export type KepzettsegId = 'k_alkimia' | 'k_alcazas' | 'k_allatidomitas' | 'k_csapdak' | 'k_csillagjoslas' | 'k_egyensulyozas' | 'k_eloadas' | 'k_ertekbecsles' | 'k_gyogyitas' | 'k_hajozas' | 'k_hallgatozas' | 'k_hamisitas' | 'k_herbalizmus' | 'k_historia' | 'k_jelek_olvasasa' | 'k_lovaglas' | 'k_maszas' | 'k_megfigyeles' | 'k_meregkeveres' | 'k_mesterseg' | 'k_nyomkereses' | 'k_okkultizmus' | 'k_osonas' | 'k_szabadulomuveszet' | 'k_ugras' | 'k_uszas' | 'k_vadonjaras' | 'k_zarnyitas' | 'k_zsebmetszes'

export interface Kepzettseg {
    Id: KepzettsegId,
    Name: string,
    Description: string,
    Tulajdonsag: Tulajdonsag2E[],
    Osztalyok?: Osztaly2E[],
}

export const KepzettsegLista: Kepzettseg[] = [
    {
        Id: 'k_alkimia',
        Name: 'Alkímia',
        Description: 'Különféle különleges anyagok, pl. savak, görögtűz,és különböző varázskomponensek kikeverésére szolgál. Használatához gyakran jól felszerelt laboratórium szükséges. A képzettséggel a karakter képes beazonosítani a különféle vegyi anyagokat és mérgeket, Nehéz próbával a varázsitalokat is',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia],
        Osztalyok: [Osztaly2E.Druida, Osztaly2E.Illuzionista, Osztaly2E.Pap, Osztaly2E.Varazslo, Osztaly2E.Vandor]
    },
    {
        Id: 'k_alcazas',
        Name: 'Álcázás',
        Description: 'Álöltözetek készítése és használata. Próbadobást akkor kell dobni, ha az álca hitelességét valaki kétségbe vonhatja (általában ellenpróbaként; az eredményt gyakran csak a mesélő ismerheti)',
        Tulajdonsag: [Tulajdonsag2E.Karizma],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
    {
        Id: 'k_allatidomitas',
        Name: 'Állatidomítás',
        Description: 'Állatok megszelídítésére és betanítására szolgál. A járatos karakter próbát tehet arra is, hogy a különféle vadállatok ne tekintsék ellenségüknek vagy prédájuknak',
        Tulajdonsag: [Tulajdonsag2E.Karizma],
    },
    {
        Id: 'k_csapdak',
        Name: 'Csapdák',
        Description: 'A karakter a rendelkezésre álló idő és alapanyagok függvényében szimpla vagy komplex csapdákat készíthet. A képzettség arra is jó, hogy hatástalanítsa, tönkretegye, vagy elkerülje ezeket a szerkezeteket. Ha egy csapda eltávolítására tett próba sikertelen, az kisülhet és veszélybe sodorhatja az óvatlan próbálkozót.',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
    {
        Id: 'k_csillagjoslas',
        Name: 'Csillagjóslás',
        Description: 'A karakter a képzettséggel egyrészt képes meghatározni a csapat hozzávetőleges pozícióját a térképen (hexek vagy tájegység szerint), másrészt egyszerűbb jóslatokat készíthet. A jóslat sikertelen próbánál értelmezhetetlen, Közepes nehézségnél homályos, Nehéz próbánál többértelmű, Hősies próbánál pedig világos és jól értelmezhető. Egyetlen jóslat sem tárja fel a pontos jövőt, csak segítséget vagy jelet ad annak értelmezéséhez. A képzettséget csak tiszta, csillagos égbolt alatt vagy ritka asztrológiai térképek birtokában lehet használni (ezek ára 2000 at vagy több, és így is -2 jár a próbára).',
        Tulajdonsag: [Tulajdonsag2E.Bolcsesseg],
        Osztalyok: [Osztaly2E.Druida, Osztaly2E.Illuzionista, Osztaly2E.Pap, Osztaly2E.Varazslo, Osztaly2E.Vandor]
    },
    {
        Id: 'k_egyensulyozas',
        Name: 'Egyensúlyozás',
        Description: 'Omlatag talajon, kötélen vagy keskeny párkányon való átjutáshoz szükséges képzettség. Ha a próba sikertelen, a karakter lezuhan.',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
    {
        Id: 'k_eloadas',
        Name: 'Előadás',
        Description: 'A képzettséggel rendelkező karakter járatos a hangszerek használatában, éneklésben, eposzmondásban, stb.',
        Tulajdonsag: [Tulajdonsag2E.Karizma],
    },
    {
        Id: 'k_ertekbecsles',
        Name: 'Értékbecslés',
        Description: 'Sikeres próba esetén a karakter hozzávetőlegesen felméri egy tárgy pénzbeli értékét, és Nehéz vagy jobb próbán kiszúrja a hamisítványokat.',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia],
    },
    {
        Id: 'k_gyogyitas',
        Name: 'Gyógyítás',
        Description: 'A sebek bekötözésének, mérgek és betegségek semlegesítésének vagy enyhítésének tudománya. Harc vagy más sérülés után alkalmazva a bekötözött karakter siker esetén visszanyer 1d4 elvesztett Hp-t, Nehéz próba megdobása esetén 1d4+2-t, Hősies esetén pedig 1d4+4-et. 1-es dobáson 1d4 pontot veszít. A képzettség hatékony alkalmazásához egy adag gyógyfű vagy egy orvosló készlet szükséges; nélkülük legfeljebb 1d4 Hp adható vissza.',
        Tulajdonsag: [Tulajdonsag2E.Bolcsesseg],
    },
    {
        Id: 'k_hajozas',
        Name: 'Hajózás',
        Description: 'A karakter ismeri a hajózás fogásait, tehát elkormányoz kisebb vitorlásokat vagy gályákat, tudja hogyan kell elkerülni a zátonyokat és épen kikerülni egy viharból, képes javításokat végezni stb.',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
    },
    {
        Id: 'k_hallgatozas',
        Name: 'Hallgatózás',
        Description: 'Nehezen hallható zajok, beszéd meghallása és kihallgatása.',
        Tulajdonsag: [Tulajdonsag2E.Bolcsesseg],
    },
    {
        Id: 'k_hamisitas',
        Name: 'Hamisítás',
        Description: 'A képzettséggel néhány óra vagy nap munkájával hamis pénz, iratok, pecsétek és értéktárgyak készíthetők. Ellenpróbát akkor kell dobni, ha a hamisítvány hitelességét valaki kétségbe vonná.',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
    {
        Id: 'k_herbalizmus',
        Name: 'Herbalizmus',
        Description: 'A képzettség sikeres alkalmazásával (Közepes, Nehéz és Hősies eredménnyel) 1d3 / 1d3+1 / 1d3+2 adag, a Gyógyítás vagy Méregkeverés képzettséghez hasznos fű gyűjthető össze, az utóbbinál -2, terméketlen vidékeken -3 módosítóval. Utazás közben naponta egy, táborozva két próba dobható.',
        Tulajdonsag: [Tulajdonsag2E.Bolcsesseg],
    },
    {
        Id: 'k_historia',
        Name: 'História',
        Description: 'A karakter ismeri a történetírók munkáit vagy a szóhagyományt. Az ismeretek mértékét és pontosságát a képzettségpróba eredménye mutatja. Természetesen gyakran vannak olyan helyezetek, amikor a képzettség nem ad használható ismeretet.',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia],
    },
    {
        Id: 'k_jelek_olvasasa',
        Name: 'Jelek Olvasása',
        Description: 'A képzettséggel a karakter el tud olvasni más nyelven írt írásokat és feliratokat.',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia],
        Osztalyok: [Osztaly2E.Druida, Osztaly2E.Illuzionista, Osztaly2E.Pap, Osztaly2E.Varazslo, Osztaly2E.Vandor, Osztaly2E.Tolvaj]
    },
    {
        Id: 'k_lovaglas',
        Name: 'Lovaglás',
        Description: 'A karakter kiemelkedően jól ért a lovagláshoz; harcban és nehéz helyzetekben is csodákra képes sarkallni hátasát.',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
    },
    {
        Id: 'k_maszas',
        Name: 'Mászás',
        Description: 'A képzettség olyan falakra való felmászásra alkalmas, ami egy átlagembernek komol gondot jelentene. Sikertelen próba esetén a karakter lezuhan, vagy a feladat meghaladja a képességeit.',
        Tulajdonsag: [Tulajdonsag2E.Ero],
    },
    {
        Id: 'k_megfigyeles',
        Name: 'Megfigyelés',
        Description: 'A karakter észreveszi a szabad szemmel látható veszélyforrásokat, a rá leselkedő támadókat, és a csak az avatott megfigyelő számára látható részleteket. (A szobák átkutatásához vagy pl. titkosajtók megtalálásához azonban nem szükséges ez a képzettség.)',
        Tulajdonsag: [Tulajdonsag2E.Bolcsesseg],
    },
    {
        Id: 'k_meregkeveres',
        Name: 'Méregkeverés',
        Description: 'A megfelelő eszközök és alapanyagok birtokában különféle mérgek készíthetők. Sikertelen próbadobás esetén a keverék hatástalan, és a méregkeverő 1:6 eséllyel veszélybe sodorja önmagát.',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
    {
        Id: 'k_mesterseg',
        Name: 'Mesterség',
        Description: 'A karakter járatos egy kiválasztott mesterségben – pl. kovácsolás, adószedés vagy építészet. A kézügyességet igénylő mesterségekhez Ügyesség, a szellemi foglalkozásokhoz Intelligencia szükséges.',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia, Tulajdonsag2E.Ugyesseg],
    },
    {
        Id: 'k_nyomkereses',
        Name: 'Nyomkeresés',
        Description: 'A karakter képes a nyomok követésére és hozzávetőleges azonosítására, vagyis megtudhatja, milyen régiek, miféle szerzet hagyta őket, milyen gyorsan haladt a nyomokat hagyó stb.',
        Tulajdonsag: [Tulajdonsag2E.Bolcsesseg],
    },
    {
        Id: 'k_okkultizmus',
        Name: 'Okkultizmus',
        Description: 'A képzettség a mágikus tanok elméleti és gyakorlati ismeretét jelenti. Számos hasznán belül a karakter Közepes próbával azonosíthatja az elmondás alatt álló varázslatokat, Nehéz próbával pedig a mágikus effektusokat és csapdákat.',
        Tulajdonsag: [Tulajdonsag2E.Intelligencia],
        Osztalyok: [Osztaly2E.Druida, Osztaly2E.Illuzionista, Osztaly2E.Pap, Osztaly2E.Varazslo, Osztaly2E.Vandor]
    },
    {
        Id: 'k_osonas',
        Name: 'Osonás',
        Description: 'Csöndes és gyors mozgást tesz lehetővé, s azt, hogy a karakter elrejtőzzön a figyelmes tekintetek elől – nagy szakértelemmel akár sötét sarkokban vagy árnyékokban is. Nehéz próba megdobásával az aktívan nem figyelő ellenfelek nem is dobhatnak ellenpróbát a felfedésére, Hősies próba esetén a karakter gyakorlatilag „mintha ott sem lenne”.',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
    },
    {
        Id: 'k_szabadulomuveszet',
        Name: 'Szabadulóművészet',
        Description: 'A karakter képes kiszabadulni kötelékeiből és láncaiból, és ami még fontosabb, ellenségei gyűrűjéből (lásd harcrendszer).',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
    {
        Id: 'k_ugras',
        Name: 'Ugrás',
        Description: 'A karakter képes átugrani szélesebb vagy magasabb akadályokat is, és tompíthatja az esésből származó sebesüléseket (sikeres próbával egy kocka, Nehéz próbával kettő, Hősiessel három). Ha a próba sikertelen, a karakter lezuhan.',
        Tulajdonsag: [Tulajdonsag2E.Ero],
    },
    {
        Id: 'k_uszas',
        Name: 'Úszás',
        Description: 'A karakter jól tud úszni, akár nehéz körülmények között (zajló vízben, megterhelten stb.) is képes a felszínen maradni.',
        Tulajdonsag: [Tulajdonsag2E.Ero],
    },
    {
        Id: 'k_vadonjaras',
        Name: 'Vadonjárás',
        Description: 'A képzettség segít a vadonbeli megélhetésben, tájékozódásban és túlélésben. Sikeres képzettségpróbával (Közepes, Nehéz és Hősies nehézség megdobása esetén) 1d3 / 1d3+2 / 1d3+4 adag élelmet eredményez, terméketlen vidékeken az utóbbi dobásra -3 módosítóval. Utazás közben naponta egy, táborozva két próba dobható. A képzettség segít abban is, hogy a csapat ne tévedjen el a sűrű erdőkben, kietlen sivatagokban vagy zegzugos szurdokvölgyekben. Végül a képzettségpróba sikere befolyásolja, hogy milyen táborhelyet sikerül találni a vadonban: ha a mesélő máshogy nem határoz, sikeres próbával kettőre, Nehéz próbával egyre csökkenti, Hősies próbával teljesen elkerüli az éjszakai találkozási esélyeket.',
        Tulajdonsag: [Tulajdonsag2E.Bolcsesseg],
    },
    {
        Id: 'k_zarnyitas',
        Name: 'Zárnyitás',
        Description: 'Tolvajszerszámok segítségével a karakter felnyithatja a különféle mechanikus zárakat. Sikertelen próba esetén nem képes az adott zár felnyitására – egészen addig, amíg új tapasztalatokat nem szerez (vagyis a következő szintlépéséig).',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
    {
        Id: 'k_zsebmetszes',
        Name: 'Zsebmetszés',
        Description: 'Őrizetlenül hagyott vagy övön, zsebben található kisebb tárgyak észrevétlen eltulajdonítása. Ha a próba sikertelen, a karaktert észreveszik vagy legalábbis gyanút kelt. Másféle, kézügyességet igénylő fogásokra is alkalmas.',
        Tulajdonsag: [Tulajdonsag2E.Ugyesseg],
        Osztalyok: [Osztaly2E.Tolvaj],
    },
]

export const TolvajKepzettsegList = KepzettsegLista.filter(x => x.Osztalyok?.includes(Osztaly2E.Tolvaj))

export const Kepzettsegek: Record<KepzettsegId, Kepzettseg> =
    KepzettsegLista.reduce(
        (acc: Record<KepzettsegId, Kepzettseg>, k) => { acc[k.Id] = k; return acc; },
        {} as Record<KepzettsegId, Kepzettseg>);

export function AvailableKezpettsegList(osztaly: Osztaly2E): Kepzettseg[] {
    return KepzettsegLista.filter(k => k.Osztalyok == null || k.Osztalyok.includes(osztaly))
}

export function GetNumberOfKepzettsegek(t_int: number, faj: Faj2E, max: number = 11) {
    //max = 3 + 1 + 3 + 4 // 3 base, 1 human, 3 from max ability modifier, 4 from Thief
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

export function SetDefaultTolvajKepzettsegek(karakter: Pick<Karakter2E, 'osztaly' | 'tolvajKepzettsegek'>, changeTolvajKepzettsegek: (tolvajKepzettsegek?: KepzettsegId[]) => void) {
    if (karakter.osztaly !== Osztaly2E.Tolvaj && karakter.tolvajKepzettsegek != null) {
        changeTolvajKepzettsegek(undefined)
    }
    if (karakter.osztaly === Osztaly2E.Tolvaj && (karakter.tolvajKepzettsegek == null || karakter.tolvajKepzettsegek.length === 0)) {
        const tolvajKepzettsegek = TolvajKepzettsegList.slice(0, 4).map(x => x.Id)
        changeTolvajKepzettsegek(tolvajKepzettsegek)
    }
}

export function GetKepzettsegListaN(karakter: Pick<Karakter2E, 'osztaly' | 'faj' | 'kepzettsegek' | 'tolvajKepzettsegek'>) {
    const availableKepzettsegList = AvailableKezpettsegList(karakter.osztaly)
    return (n: number): Kepzettseg[] => {
        let available = [...availableKepzettsegList]
        if (n === 0) {
            if (karakter.faj === Faj2E.Eszaki) {
                return [Kepzettsegek.k_hajozas]
            }
            if (karakter.faj === Faj2E.Nomad) {
                return [Kepzettsegek.k_lovaglas]
            }
            if (karakter.faj === Faj2E.Birodalmi && karakter.osztaly !== Osztaly2E.Tolvaj) {
                return [Kepzettsegek.k_alkimia, Kepzettsegek.k_meregkeveres, Kepzettsegek.k_okkultizmus]
            }
            if (karakter.faj === Faj2E.Torpe) {
                return [Kepzettsegek.k_ertekbecsles]
            }
            if (karakter.faj === Faj2E.Elf || karakter.faj === Faj2E.Felelf) {
                return [Kepzettsegek.k_vadonjaras]
            }
            if (karakter.osztaly === Osztaly2E.Druida || karakter.osztaly === Osztaly2E.Vandor) {
                return [Kepzettsegek.k_vadonjaras]
            }
            if (karakter.osztaly === Osztaly2E.Dalnok) {
                return [Kepzettsegek.k_eloadas]
            }
        }
        if (n === 1) {
            if (karakter.osztaly === Osztaly2E.Dalnok 
                && [Faj2E.Eszaki, Faj2E.Nomad, Faj2E.Birodalmi, Faj2E.Torpe, Faj2E.Elf, Faj2E.Felelf].includes(karakter.faj)) {
                return [Kepzettsegek.k_eloadas]
            }
            if ([Osztaly2E.Druida, Osztaly2E.Vandor].includes(karakter.osztaly)
                && [Faj2E.Eszaki, Faj2E.Nomad, Faj2E.Birodalmi, Faj2E.Torpe].includes(karakter.faj)) {
                return [Kepzettsegek.k_vadonjaras]
            }
        }
        const kepzettsegekWithoutN = [...karakter.kepzettsegek.slice(0, n), ...karakter.kepzettsegek.slice(n + 1)]
        return available.filter(x => !kepzettsegekWithoutN.includes(x.Id) && !karakter.tolvajKepzettsegek?.includes(x.Id))
    }
}

export function SetDefaultKepzettsegek(karakter: Pick<Karakter2E, 'osztaly' | 'faj' | 'tulajdonsagok' | 'kepzettsegek' | 'tolvajKepzettsegek'>, changeKepzettsegek: (k: KepzettsegId[]) => void) {
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

    // // TODO: really fix this sometimes.
    // const uglyDoubleRestrictedKepzettsegek = GetKepzettsegListaN(karakter)(1)
    // if (kepzettsegek.length === 1) {
    //     if (uglyDoubleRestrictedKepzettsegek.length > 0) {
    //         kepzettsegek.push(uglyDoubleRestrictedKepzettsegek[0].Id)
    //         mustChangeKepzettsegek = true
    //     }
    // } else {
    //     if (!uglyDoubleRestrictedKepzettsegek.includes(Kepzettsegek[kepzettsegek[1]])) {
    //         kepzettsegek[1] = uglyDoubleRestrictedKepzettsegek[0].Id
    //         mustChangeKepzettsegek = true
    //     }
    // }

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