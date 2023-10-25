import {Osztaly, Skill} from "../domain-models/osztaly";

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
        }]
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
                Description: 'Az íjászok nem viselhetnek nehéz vérteket.'
            }
        ]
        case Osztaly.Amazon: return [
            {
                Id: 's_harcos_amazon_vert',
                Name: 'MMO vért',
                Description:
                    'Az amazonok csak láncinget vagy könnyebb vérteket viselhetnek, de VO-juk Szint/2-vel\n' +
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
                    'kritikus sebesülést, tehát pl. csatabárddal 20 helyett 19-20-on, hosszúkarddal 19-20\n' +
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
                    '(mint például zombikat, lidérceket vagy vámpírokat) szimbólumuk felmutatásával\n' +
                    'elűzzenek vagy szolgálatukba állítsanak. Ez a képesség naponta csak egyszer (5. szinttől\n' +
                    'kétszer, 10. szinttől háromszor, 15. szinttől négyszer) használható. A cselekedet a\n' +
                    'következő módon működik:',
                ExtendedDescription: [
                    'A pap [1d20+Kar bónusz] próbát tesz. Ennek az értékét összeveti a standard bónusztáblázattal. Az innen kiolvasható módosítót hozzáadja saját szintjéhez (ha negatív, akkor levonja). Az eredmény jelzi, hogy a pap legfeljebb milyen szintű élőholtakra lesz hatással. Ha tehát pl. a próba végeredménye 14 és a pap ötödik szintű, akkor 5+1, azaz 6. szintű a legerősebb élőhalott, amire a kísérlet sikeres. A 20-as dobás itt is automatikus siker, az 1-es automatikus kudarc.',
                    'A pap [2d6+szint] szintű élőhalottat űzhet el vagy irányíthat. Először a leggyengébb élőholtakra hat, azután a következő leggyengébbekre, stb. Az elűzött élőholtak elmenekülnek a pap szeme elől és addig nem is ártanak neki és társainak, amíg a pap csapata meg nem támadja őket! Ezzel szemben a gonosz papok parancsokat adhatnak az irányított szörnyeknek. Mindkét hatás legfeljebb pár óráig tart, az élőholtak szintjétől és a körülményektől függően.',
                    'Ha az összes szem előtt lévő élőholtat sikerült elűzni vagy irányítani és még maradt „a szent energiából”, akkor ismét el kell kezdeni a hatást a leggyengébb ellenségektől. Az így elűzött szörnyek megsemmisülnek, illetve irányítás esetén végleg a gonosz pap szolgálatába állnak.',
                    'A két hatás egymás ellen is fölhasználható, például egy jó pap kiolthatja egy gonosz pap irányítását, de akár két gonosz pap is versenyezhet egy csapat sírlidérc „megtérítésén”.',
                ]
            },
            {
                Id: 's_pap_invokacio',
                Name: 'Invokáció',
                Description:
                    'A pap kérheti istene segítségét (általában nevének kimondásával), ami +1-et, ritkábban\n' +
                    ' +2-t ad hozzá dobásaihoz. A papok hetente annyiszor használhatják az invokációt,\n' +
                    ' amekkora a Bölcsességbónuszuk (de legalább egyszer).'
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