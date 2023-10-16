import {Fegyver, GetPancel, KarakterFelszereles, PancelType} from "./felszereles";
import fegyverDB from './fegyver.json'

export enum Osztaly {
    Harcos = 'o_harcos',
    Ijasz = 'o_ijasz',
    Amazon = 'o_amazon',
    Kaloz = 'o_kaloz',
    Barbar = 'o_barbar',
    Pap = 'o_pap',
    Tolvaj = 'o_tolvaj',
    Varazslo = 'o_varazslo',
    Illuzionista = 'o_illuzionista',
}

export function OsztalyAllowedPancelTypes(o: Osztaly): PancelType[] {
    switch (o) {
        case Osztaly.Amazon: return ['konnyu'];
        case Osztaly.Barbar: return ['konnyu', 'kozepes', 'nehez'];
        case Osztaly.Pap: return ['konnyu', 'kozepes', 'nehez'];
        case Osztaly.Illuzionista: return [];
        case Osztaly.Varazslo: return [];
        case Osztaly.Harcos: return ['konnyu', 'kozepes', 'nehez'];
        case Osztaly.Ijasz: return ['konnyu', 'kozepes'];
        case Osztaly.Kaloz: return ['konnyu', 'kozepes'];
        case Osztaly.Tolvaj: return ['konnyu']
    }
}

export function OsztalyAllowedFegyver(o: Osztaly): Fegyver[] {
    const fegyverek = fegyverDB.fegyverek.map(x => x as Fegyver)
    const nemEgzotikus = fegyverek.filter(f => !f.Egzotikus)
    const varazslo = fegyverek.filter(f => ['okol', 'bot', 'bunko', 'tor', 'parittya', 'dobotu'].includes(f.ID))
    const tolvaj = fegyverek.filter(f => ['okol', 'tor', 'parittya', 'rovid_ij', 'dobotu', 'konnyu_szamszerij', 'nehez_szamszerij', 'szablya', 'hosszu_kard', 'rovid_kard' ].includes(f.ID))
    switch (o) {
        case Osztaly.Amazon:
        case Osztaly.Harcos:
        case Osztaly.Barbar:
        case Osztaly.Kaloz: return nemEgzotikus;
        case Osztaly.Ijasz: return [...nemEgzotikus, fegyverDB.fegyverek.find(f => f.ID === 'visszacsapo_ij') as Fegyver]
        // Note: Isteni fegyver barmi lehet istentol foggoen
        case Osztaly.Pap: return fegyverek;
        case Osztaly.Tolvaj: return tolvaj;
        case Osztaly.Illuzionista:
        case Osztaly.Varazslo: return varazslo;
    }
}

export function SetFelszerelesForChangedOsztaly(o: Osztaly, felszereles: KarakterFelszereles, changeFelszereles: (f: KarakterFelszereles) => void) {
    const allowedPancelTypes = OsztalyAllowedPancelTypes(o)
    const pancel = GetPancel(felszereles.pancelID)
    if (pancel && !allowedPancelTypes.includes(pancel.Type)) {
        changeFelszereles({...felszereles, pancelID: undefined})
    }
    if (allowedPancelTypes.length === 0 && !!felszereles.pajzsID){
        changeFelszereles({...felszereles, pajzsID: undefined})
    }
}

export function OsztalyLabel(osztaly: Osztaly) : string {
    switch (osztaly) {
        case Osztaly.Amazon: return 'Amazon';
        case Osztaly.Barbar: return 'Barbár';
        case Osztaly.Pap: return 'Pap';
        case Osztaly.Illuzionista: return 'Illúzionista';
        case Osztaly.Varazslo: return 'Varázsló';
        case Osztaly.Harcos: return 'Harcos';
        case Osztaly.Ijasz: return 'Íjász';
        case Osztaly.Kaloz: return 'Tengerész/Kalóz';
        case Osztaly.Tolvaj: return 'Tolvaj'
    }
}

export function OsztalyDescription(osztaly: Osztaly) : string {
    switch (osztaly) {
        case Osztaly.Harcos:
        case Osztaly.Amazon:
        case Osztaly.Barbar:
        case Osztaly.Ijasz:
        case Osztaly.Kaloz:
            return 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, s sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik.';
        case Osztaly.Tolvaj:
            return 'A tolvajok a becstelen harc és a csöndes gyilkolás mesterei (közülük sokan alkalmaznak mérgeket – őket orgyilkosoknak nevezik). Harci képességeik és életerejük viszonylag gyenge, s nehezebb vértezeteket sem használhatnak. Ezért ha módjukban áll, nem szemtől szembe, hanem lesből támadnak áldozataikra, és ha ez nem sikerülne, gyorsan kereket oldanak. Emellett alvilági pályafutásuk során számos hasznos képzettségben válnak járatossá.';
        case Osztaly.Pap:
            return 'A papok az istenek militáns varázshasználó szolgái. Hitük parancsait minden körülmények között be kell tartaniuk, s bizonyos rendszerességgel áldozatokat kell bemutatniuk. A papok csak istenükkel azonos vagy attól legfeljebb eggyel különböző jelleműek lehetnek. A papok csak az istenük által kijelölt fegyvereket forgathatják, de szabadon válogathatnak a különféle vértek között.';
        case Osztaly.Varazslo:
            return 'A varázslók kiemelkedő szellemi fegyelmezettségük segítségével képesek a magasabb fokú mágikus erőket irányító varázsigék memorizálására és fölhasználására. Tudásukat varázskönyekben rögzítik, s mindent elkövetnek egy ismeretlen formula megszerzéséért. Többségüket a magabiztos önhittség és az alacsonyabb szellemi képeségűek megvetése jellemzi. A varázslók nem képesek _bármiféle_ páncélban varázsolni, és csak kevés fegyvertípus forgatásában járatosak.';
        case Osztaly.Illuzionista:
            return 'A varázslók kiemelkedő szellemi fegyelmezettségük segítségével képesek a magasabb fokú mágikus erőket irányító varázsigék memorizálására és fölhasználására. Tudásukat varázskönyekben rögzítik, s mindent elkövetnek egy ismeretlen formula megszerzéséért. Többségüket a magabiztos önhittség és az alacsonyabb szellemi képeségűek megvetése jellemzi. Az illuzionisták a mágia egy igen hasonló, de több lényeges területen eltérő fajtáját művelik. Lételemük a káprázat, a megtévesztés és mások elméjének befolyásolása – többségük hipnotizőr vagy ügyes manipulátor. Az illuzionista varázslatok csekélyebb pusztító erőt képviselnek, ellenben egy élelmes illuzionista kezében szinte bármire képesek – beleértve a közönséges varázslók egyes varázslatainak utánzását. Az illuzionisták nem képesek _bármiféle_ páncélban varázsolni, és csak kevés fegyvertípus forgatásában járatosak.';
    }
}

export function OsztalyProperties(osztaly: Osztaly) : string[] {
    switch (osztaly) {
        case Osztaly.Harcos: return [
            'Támadásbónusz: Szint * 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: az egzotikus fegyvereken kívül bármilyen fegyvertípust használhatnak',
            'Páncélhasználat: bármilyen',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly.Ijasz: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: az egzotikus fegyvereken kívül bármilyen fegyvertípust használhatnak',
            'Páncélhasználat: nehéz vérteken kívül bármilyen',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly.Amazon: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: az egzotikus fegyvereken kívül bármilyen fegyvertípust használhatnak',
            'Páncélhasználat: láncing vagy könnyebb vértek',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly.Kaloz: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: az egzotikus fegyvereken kívül bármilyen fegyvertípust használhatnak',
            'Páncélhasználat: nehéz vérteken kívül bármilyen',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly.Barbar: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: az egzotikus fegyvereken kívül bármilyen fegyvertípust használhatnak',
            'Páncélhasználat: bármilyen',
            'Hp: szintenként 1d12, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly.Pap: return [
            'Támadásbónusz: Szint x 2/3',
            'Mentődobás: Kitartás és Akaraterő az első, Reflex a második oszlop szerint',
            'Fegyverhasználat: csak buzogányokat, tőröket és istenük kijelölt fegyvereit használhatják',
            'Páncélhasználat: bármilyen',
            'Hp: szintenként 1d8, 9. szint („Főpap”) fölött 2/szint',
            'Képzettségek: 3',
        ]
        case Osztaly.Tolvaj: return [
            'Támadásbónusz: Szint x 2/3',
            'Mentődobás: Reflex az első, Kitartás és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: tőröket, dobótűket, parittyákat, számszeríjakat , rövidíjakat és egykezes kardokat használhatnak',
            'Páncélhasználat: csak könnyű',
            'Hp: szintenként 1d6, 9. szint („Mestertolvaj”) fölött 2/szint',
            'Képzettségek: 7 (ebből legalább 4 minden képpen a „tolvajképzettségek” listájáról); 9. és ezután minden páratlan szinten újabb, eddig akár tiltott képzettséget tanulhatnak meg.'
        ]
        case Osztaly.Varazslo:
        case Osztaly.Illuzionista: return [
            'Támadásbónusz: Szint x 1/2',
            'Mentődobás: Akaraterő az első, Kitartás és Reflex a második oszlop szerint',
            'Fegyverhasználat: tőrt, botot, dobótűket, bunkót és parittyát használhatnak',
            'Páncélhasználat: nincs',
            'Hp: szintenként 1d4, 9. szint („Varázslónagyúr”) fölött 1/szint',
            'Képzettségek: 3'
        ]
    }
}

export interface Skill {
    Id: string
    Name: string,
    Description: string
    ExtendedDescription?: string[]
}

export function OsztalySpecialSkills(osztaly: Osztaly) : Skill[] {
    switch (osztaly) {
        case Osztaly.Harcos: return [{
            Id: 's_harcos_harcos',
            Name: 'Harcos',
            Description: 'Speciális harci tapasztalatuknak köszönhetően minden páratlan szinten +2-t kapnak egy választott fegyvertípus (pl. csatabárd, hosszúkard, stb.) sebzésére. Ez fegyverenként csak egyszer választható, s arra is fölhasználható, hogy a harcos megtanulja egy egzotikus fegyver használatát, amire később specializálódhat is. 9. szinttől elérhető számukra a kettős specializáció: ezzel sebzésmódosítójukat az adott fegyverre +4-re emelhetik.'
        }
        ]
        case Osztaly.Ijasz: return [
            {
                Id: 's_harcos_ijasz',
                Name: 'Íjász',
                Description: 'A távolsági harc mesterei. Íjak használatakor körönként eggyel többször támadhatnak. Értenek a visszacsapó íjak használatához is.'
            },
            {
                Id: 's_harcos_ijasz_vert',
                Name: 'Kötelező mozgékonyság',
                Description: 'Az íjjászok nem viselhetnek nehéz vérteket.'
            }
        ]
        case Osztaly.Amazon: return [
            {
                Id: 's_harcos_amazon',
                Name: 'Amazon',
                Description: 'Az amazonok barbár népe szépségéről és a karizmatikus jelenlétre építő védekező harcmodoráról ismert.'
            },
            {
                Id: 's_harcos_amazon_vert',
                Name: 'MMO vért',
                Description: 'Az amazonok csak láncinget vagy könnyebb vérteket viselhetnek, de VO-juk Szint/2-vel javul, továbbá Karizma- és Ügyességmódosítói közül a kedvezőbbet választhatják.'
            },
            {
                Id: 's_harcos_amazon_csapatmunka',
                Name: 'Csapatmunka',
                Description: 'Ha kettő vagy több amazon együttesen harcol, VO-juk további 2 ponttal nő pszionikus képességeik miatt.'
            },
        ]
        case Osztaly.Kaloz: return [
            {
                Id: 's_harcos_kaloz',
                Name: 'Tengerész/Kalóz',
                Description: 'A tengerészek a hajózás mesterei; kereskedők, tengeri rablók és rabszolgavadászok.'
            },
            {
                Id: 's_harcos_kaloz_ugyes_huzas',
                Name: 'Ügyes húzás',
                Description: 'A kalózok és tengerészek ha magasabb, Ügyességbónuszukat adják hozzá közelharci támadásaikhoz.'
            },
            {
                Id: 's_harcos_kaloz_vasmacska',
                Name: 'Vasmacska',
                Description: 'A kalózok és tengerészek nem viselhetnek nehéz vértezetet, de VO-juk könnyű vértben Szint/3-al javul.'
            },
            {
                Id: 's_harcos_kaloz_kritikus',
                Name: 'Kritikus',
                Description: 'Minden harmadik szinten kiválaszthatnak egy fegyvert, amivel könnyebben okoznak kritikus sebesülést, tehát pl. csatabárddal 20 helyett 19-20-on, hoszszúkarddal 19-20 helyett 18-20-on, szablyával 18-20 helyett 17-20-on, stb. Ez a képesség 9. szintig fegyverenként csak egyszer választható.'
            }]
        case Osztaly.Barbar: return [
            {
                Id: 's_harcos_barbar',
                Name: 'Barbár',
                Description: 'A barbár törzsek köré sorolhatók a pusztai és sivatagi nomádok, a déli dzsungelek emberevői és az északi tengermelléki rablók nemzetségei egyaránt.'
            },
            {
                Id: 's_harcos_barbar_eletero',
                Name: 'Túlélő',
                Description: 'A barbárok 1d12-vel dobják a Hp-jüket, -5 Hp-ig öntudatuknál vannak és +1 bónuszt (10. szinttől +2, 15. szinttől +4) kapnak a mentődobásaikra.'
            },
            {
                Id: 's_harcos_barbar_iras',
                Name: 'Írástudatlan',
                Description: 'Minden barbár írástudatlanul kezdi a játékot, de ha kell, később megtanulhatja a betűvetést.'
            }
        ]
        case Osztaly.Pap: return [
            {
                Id: 's_pap_varazslat',
                Name: 'Varázslatok',
                Description: 'a papi varázslatok általában gyógyításra, mások megsegítésére és vallási feladatok ellátására szolgálnak. Minél magasabb szintűek, egy nap annál több varázslatot tudnak alkalmazni a következő oldalon található táblának megfelelően. Például egy 4. szintű, 17-es Bölcsességgel rendelkező pap öt nulladik szintű, négy első szintű és három második szintű varázslatot tarthat naponta elméjében.'
            },
            {
                Id: 's_pap_gyogyseb',
                Name: 'Gyógyítás vagy sebokozás',
                Description: 'a pap az aznap már memorizált (megtanult) varázslatokat gyógyításra vagy sebek okozására is fölhasználhatja. Érintésével a varázslat minden szintjéért 1d8 Hp-t gyógyít vagy sebez – így pl. egy Ómen elhasználásával 2d8 Hp-t. Az így konvertált varázslat természetesen elvész. Az, hogy a képesség sebek gyógyítására vagy okozására szolgál, a pap istenétől függ. A békésebb istenek főleg az elsőt, a harciasabbak főleg a másodikat részesítik előnyben, s vannak olyanok is, akik híveikre bízzák, hogy melyik utat választják. Ha azonban a pap már eldöntötte, melyik képességben járatos, döntését többé nem másíthatja meg!'
            },
            {
                Id: 's_pap_elohalott',
                Name: 'Élőholtak elűzése vagy irányítása',
                Description: 'A papok istenük dogmájának megfelelően képesek lehetnek arra, hogy élőholt szörnyeket (mint például zombikat, lidérceket vagy vámpírokat) szimbólumuk felmutatásával elűzzenek vagy szolgálatukba állítsanak. Ez a képesség naponta csak egyszer (5. szinttől kétszer, 10. szinttől háromszor, 15. szinttől négyszer) használható. A cselekedet a következőképpen működik:',
                ExtendedDescription: [
                    'A pap [1d20+Kar bónusz] próbát tesz. Ennek az értékét összeveti a standard bónusztáblázattal. Az innen kiolvasható módosítót hozzáadja saját szintjéhez (ha negatív, akkor levonja). Az eredmény jelzi, hogy a pap legfeljebb milyen szintű élőholtakra lesz hatással. Ha tehát pl. a próba végeredménye 14 és a pap ötödik szintű, akkor 5+1, azaz 6. szintű a legerősebb élőhalott, amire a kísérlet sikeres. A 20-as dobás itt is automatikus siker, az 1-es automatikus kudarc.',
                    'A pap [2d6+szint] szintű élőhalottat űzhet el vagy irányíthat. Először a leggyengébb élőholtakra hat, azután a következő leggyengébbekre, stb. Az elűzött élőholtak elmenekülnek a pap szeme elől és addig nem is ártanak neki és társainak, amíg a pap csapata meg nem támadja őket! Ezzel szemben a gonosz papok parancsokat adhatnak az irányított szörnyeknek. Mindkét hatás legfeljebb pár óráig tart, az élőholtak szintjétől és a körülményektől függően.',
                    'Ha az összes szem előtt lévő élőholtat sikerült elűzni vagy irányítani és még maradt „a szent energiából”, akkor ismét el kell kezdeni a hatást a leggyengébb ellenségektől. Az így elűzött szörnyek megsemmisülnek, illetve irányítás esetén végleg a gonosz pap szolgálatába állnak.',
                    'A két hatás egymás ellen is fölhasználható, például egy jó pap kiolthatja egy gonosz pap irányítását, de akár két gonosz pap is versenyezhet egy csapat sírlidérc „megtérítésén”.',
                ]
            }
        ]
        case Osztaly.Tolvaj: return [
            {
                Id: 's_tolvaj_orvtamadas',
                Name: 'Orvtámadás',
                Description: 'az orvtámadás akkor használható, ha a tolvaj meglepi áldozatát, tehát pl. csöndesen a hátába kerül, vagy beszélgetés közben tőrt ránt és egyetlen mozdulattal gyomron szúrja. Az orvtámadás minden páratlan szintért 1d6 bónusz sebzést okoz (maximuma +5d6). Dobó- és lőfegyverrel is használható, és ha a tolvaj úgy dönt, illetve a használt fegyver lehetővé teszi, az ellenfél elkábítására is alkalmazható.'
            },
            {
                Id: 's_tolvaj_kezdemenyezes',
                Name: 'Jobb kezdeményezés',
                Description: 'a tolvajok +4-et kapnak kezdeményezési dobásaikra.',
            },
            {
                Id: 's_tolvaj_kepzettsegek',
                Name: 'Tolvajképzettségek',
                Description: 'minden tolvaj jártas több olyan képzettségben, amely segíti a rejtőzködésben, a jól őrzött értékek eltulajdonításában és hasonló feladatokban. A tolvajok azokat a tolvajképzettségeket is használhatják, amelyekben nem járatosak külön, de ekkor szintjük nem számít bele a próbadobás módosítójába! A tolvajképzettségek listája: Álcázás, Csapdák állítása és eltávolítása, Egyensúlyozás, Értékbecslés, Hallgatózás, Hamisítás, Jelek olvasása, Keresés, Mászás, Megfigyelés, Méregkeverés, Osonás, Rejtőzés, Szabadulóművészet, Zárnyitás és Zsebmetszés.',
            },
        ]
        case Osztaly.Varazslo: return [{
                Id: 's_varazslo_varazskonyv',
                Name: 'Varázskönyv',
                Description: 'egy első szintű varázsló varázskönyve 6 nulladik és 3 első szintű varázslatot tartalmaz, harmadik szintű kezdő karakteré ezen felül még 2 első szintűt és 2 második szintűt. Az újabb varázslatokat mások könyveiből, mágikus tekercsekből vagy más módszerek segítségével kell könyvébe másolnia. Az illuzionisták szintén varázskönyveket használnak, de eltérő mágiaformájuk miatt nem képesek a varázslói varázslatok megértésére – és viszont.'
            }]
        case Osztaly.Illuzionista: return [{
            Id: 's_illuzionista_varazskonyv',
            Name: 'Varázskönyv',
            Description: 'egy első szintű varázsló varázskönyve 6 nulladik és 3 első szintű varázslatot tartalmaz, harmadik szintű kezdő karakteré ezen felül még 2 első szintűt és 2 második szintűt. Az újabb varázslatokat mások könyveiből, mágikus tekercsekből vagy más módszerek segítségével kell könyvébe másolnia. Az illuzionisták szintén varázskönyveket használnak, de eltérő mágiaformájuk miatt nem képesek a varázslói varázslatok megértésére – és viszont.'
        }]
    }
}


export function OsztalySkillsTordelt(osztaly: Osztaly) : Skill[] {
    switch (osztaly) {
        case Osztaly.Harcos: return [{
            Id: 's_harcos_harcos',
            Name: 'Harcos',
            Description: 'Speciális harci tapasztalatuknak köszönhetően minden páratlan szinten +2-t kapnak egy\n' +
                'választott fegyvertípus (pl. csatabárd, hosszúkard, stb.) sebzésére. Ez fegyverenként csak\n' +
                'egyszer választható, s arra is fölhasználható, hogy a harcos megtanulja egy egzotikus\n' +
                'fegyver használatát, amire később specializálódhat is. 9. szinttől elérhető számukra a\n' +
                'kettős specializáció: ezzel sebzésmódosítójukat az adott fegyverre +4-re emelhetik.'
        }
        ]
        case Osztaly.Ijasz: return [
            {
                Id: 's_harcos_ijasz',
                Name: 'Íjász',
                Description: 'Íjak használatakor körönként eggyel többször támadhatnak.\n' +
                    'Értenek a visszacsapó íjak használatához is.'
            },
            {
                Id: 's_harcos_ijasz_vert',
                Name: 'Kötelező mozgékonyság',
                Description: 'Az íjjászok nem viselhetnek nehéz vérteket.'
            }
        ]
        case Osztaly.Amazon: return [
            {
                Id: 's_harcos_amazon_vert',
                Name: 'MMO vért',
                Description: 'Az amazonok csak láncinget vagy könnyebb vérteket viselhetnek, de VO-juk Szint/2-vel\n' +
                    'javul, továbbá Karizma- és Ügyességmódosítói közül a kedvezőbbet választhatják.'
            },
            {
                Id: 's_harcos_amazon_csapatmunka',
                Name: 'Csapatmunka',
                Description: 'Ha kettő vagy több amazon együttesen harcol, VO-juk további 2 ponttal nő pszionikus\n' +
                    'képességeik miatt.'
            },
        ]
        case Osztaly.Kaloz: return [
            {
                Id: 's_harcos_kaloz_ugyes_huzas',
                Name: 'Ügyes húzás',
                Description: 'A kalózok és tengerészek ha magasabb, Ügyességbónuszukat adják hozzá közelharci\n' +
                    'támadásaikhoz.'
            },
            {
                Id: 's_harcos_kaloz_vasmacska',
                Name: 'Vasmacska',
                Description: 'A kalózok és tengerészek nem viselhetnek nehéz vértezetet, de VO-juk könnyű vértben\n' +
                    'Szint/3-al javul.'
            },
            {
                Id: 's_harcos_kaloz_kritikus',
                Name: 'Kritikus',
                Description: 'Minden harmadik szinten kiválaszthatnak egy fegyvert, amivel könnyebben okoznak\n' +
                    'kritikus sebesülést, tehát pl. csatabárddal 20 helyett 19-20-on, hoszszúkarddal 19-20\n' +
                    'helyett 18-20-on, szablyával 18-20 helyett 17-20-on, stb. Ez a képesség 9. szintig\n' +
                    'fegyverenként csak egyszer választható.'
            }]
        case Osztaly.Barbar: return [
            {
                Id: 's_harcos_barbar_eletero',
                Name: 'Túlélő',
                Description: 'A barbárok 1d12-vel dobják a Hp-jüket, -5 Hp-ig öntudatuknál vannak és\n' +
                    '+1 bónuszt (10. szinttől +2, 15. szinttől +4) kapnak a mentődobásaikra.'
            },
            {
                Id: 's_harcos_barbar_iras',
                Name: 'Írástudatlan',
                Description: 'Minden barbár írástudatlanul kezdi a játékot, de ha kell,\n' +
                    'később megtanulhatja a betűvetést.'
            }
        ]
        case Osztaly.Pap: return [
            {
                Id: 's_pap_varazslat',
                Name: 'Varázslatok',
                Description: 'A papi varázslatok általában gyógyításra, mások megsegítésére és vallási feladatok\n' +
                    'ellátására szolgálnak. Minél magasabb szintűek, egy nap annál több varázslatot tudnak\n' +
                    'alkalmazni. Ez a karakterlapon a Mágiánál megtalálható.'
            },
            {
                Id: 's_pap_gyogyseb',
                Name: 'Gyógyítás vagy sebokozás',
                Description:
                    'A pap az aznap már memorizált (megtanult) varázslatokat gyógyításra vagy sebek\n' +
                    'okozására is fölhasználhatja. Érintésével a varázslat minden szintjéért 1d8 Hp-t gyógyít\n' +
                    'vagy sebez – így pl. egy Ómen elhasználásával 2d8 Hp-t. Az így konvertált varázslat\n' +
                    'természetesen elvész. Az, hogy a képesség sebek gyógyítására vagy okozására szolgál, a\n' +
                    'pap istenétől függ. A békésebb istenek főleg az elsőt, a harciasabbak főleg a másodikat\n' +
                    'részesítik előnyben, s vannak olyanok is, akik híveikre bízzák, hogy melyik utat választják.\n' +
                    'Ha azonban a pap már eldöntötte, melyik képességben járatos, döntését többé nem\n' +
                    'másíthatja meg!'
            },
            {
                Id: 's_pap_elohalott',
                Name: 'Élőholtak elűzése vagy irányítása',
                Description:
                    'A papok istenük dogmájának megfelelően képesek lehetnek arra, hogy élőholt szörnyeket\n' +
                    '(mint például zombikat, lidérceket vagy vámpírokat) szimbólumuk felmutatásával elűzzenek\n' +
                    'vagy szolgálatukba állítsanak. Ez a képesség naponta csak egyszer (5. szinttől kétszer, 10.\n' +
                    'szinttől háromszor, 15. szinttől négyszer) használható. A cselekedet a harcnál leírt módon\n' +
                    'működik.', //TODO!
                ExtendedDescription: [
                    'A pap [1d20+Kar bónusz] próbát tesz. Ennek az értékét összeveti a standard bónusztáblázattal. Az innen kiolvasható módosítót hozzáadja saját szintjéhez (ha negatív, akkor levonja). Az eredmény jelzi, hogy a pap legfeljebb milyen szintű élőholtakra lesz hatással. Ha tehát pl. a próba végeredménye 14 és a pap ötödik szintű, akkor 5+1, azaz 6. szintű a legerősebb élőhalott, amire a kísérlet sikeres. A 20-as dobás itt is automatikus siker, az 1-es automatikus kudarc.',
                    'A pap [2d6+szint] szintű élőhalottat űzhet el vagy irányíthat. Először a leggyengébb élőholtakra hat, azután a következő leggyengébbekre, stb. Az elűzött élőholtak elmenekülnek a pap szeme elől és addig nem is ártanak neki és társainak, amíg a pap csapata meg nem támadja őket! Ezzel szemben a gonosz papok parancsokat adhatnak az irányított szörnyeknek. Mindkét hatás legfeljebb pár óráig tart, az élőholtak szintjétől és a körülményektől függően.',
                    'Ha az összes szem előtt lévő élőholtat sikerült elűzni vagy irányítani és még maradt „a szent energiából”, akkor ismét el kell kezdeni a hatást a leggyengébb ellenségektől. Az így elűzött szörnyek megsemmisülnek, illetve irányítás esetén végleg a gonosz pap szolgálatába állnak.',
                    'A két hatás egymás ellen is fölhasználható, például egy jó pap kiolthatja egy gonosz pap irányítását, de akár két gonosz pap is versenyezhet egy csapat sírlidérc „megtérítésén”.',
                ]
            }
        ]
        case Osztaly.Tolvaj: return [
            {
                Id: 's_tolvaj_orvtamadas',
                Name: 'Orvtámadás',
                Description:
                    'az orvtámadás akkor használható, ha a tolvaj meglepi áldozatát, tehát pl. csöndesen a\n' +
                    'hátába kerül, vagy beszélgetés közben tőrt ránt és egyetlen mozdulattal gyomron szúrja.\n' +
                    'Az orvtámadás minden páratlan szintért 1d6 bónusz sebzést okoz (maximuma +5d6).\n' +
                    'Dobó- és lőfegyverrel is használható, és ha a tolvaj úgy dönt, illetve a használt fegyver\n' +
                    'lehetővé teszi, az ellenfél elkábítására is alkalmazható.'
            },
            {
                Id: 's_tolvaj_kezdemenyezes',
                Name: 'Jobb kezdeményezés',
                Description: 'a tolvajok +4-et kapnak kezdeményezési dobásaikra.',
            },
            {
                Id: 's_tolvaj_kepzettsegek',
                Name: 'Tolvajképzettségek',
                Description:
                    'Minden tolvaj jártas több olyan képzettségben, amely segíti a rejtőzködésben, a jól őrzött\n' +
                    'értékek eltulajdonításában és hasonló feladatokban. A tolvajok azokat a tolvajképzettség-\n' +
                    'eket is használhatják, amelyekben nem járatosak külön, de ekkor szintjük nem számít bele\n' +
                    'a próbadobás módosítójába! A tolvajképzettségek listája:\n' +
                    'Álcázás, Csapdák állítása és eltávolítása, Egyensúlyozás, Értékbecslés, Hallgatózás,\n' +
                    'Hamisítás, Jelek olvasása, Keresés, Mászás, Megfigyelés, Méregkeverés, Osonás, Rejtőzés,\n' +
                    'Szabadulóművészet, Zárnyitás és Zsebmetszés.',
            },
        ]
        case Osztaly.Varazslo: return [{
            Id: 's_varazslo_varazskonyv',
            Name: 'Varázskönyv',
            Description:
                'Egy első szintű varázsló varázskönyve 6 nulladik és 3 első szintű varázslatot tartalmaz,\n' +
                'harmadik szintű kezdő karakteré ezen felül még 2 első szintűt és 2 második szintűt.\n' +
                'Az újabb varázslatokat mások könyveiből, mágikus tekercsekből vagy más módszerek\n' +
                'segítségével kell könyvébe másolnia. Az illuzionisták szintén varázskönyveket használnak\n' +
                'de eltérő mágiaformájuk miatt nem képesek a varázslói varázslatok megértésére – és viszont.'
        }]
        case Osztaly.Illuzionista: return [{
            Id: 's_illuzionista_varazskonyv',
            Name: 'Varázskönyv',
            Description:
                'Egy első szintű illuzionista varázskönyve 6 nulladik és 3 első szintű varázslatot tartalmaz,\n' +
                'harmadik szintű kezdő karakteré ezen felül még 2 első szintűt és 2 második szintűt. Az\n' +
                'újabb varázslatokat mások könyveiből, mágikus tekercsekből vagy más módszerek\n' +
                'segítségével kell könyvébe másolnia. Az varázslók szintén varázskönyveket használnak, de\n' +
                'eltérő mágiaformájuk miatt nem képesek a varázslói varázslatok megértésére – és viszont.'
        }]
    }
}