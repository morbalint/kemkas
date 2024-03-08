export enum Osztaly2E {
    Harcos = 'o_2e_harcos',
    Ijasz = 'o_2e_ijasz',
    Amazon = 'o_2e_amazon',
    Tengeresz = 'o_2e_tengeresz',
    Barbar = 'o_2e_barbar',
    
    Pap = 'o_2e_pap',
    Tolvaj = 'o_2e_tolvaj',
    Varazslo = 'o_2e_varazslo',
    Illuzionista = 'o_2e_illuzionista',

    Dalnok = 'o_2e_dalnok',
    Druida = 'o_2e_druida',
    Vandor = 'o_2e_vandor',
}

export function OsztalyLabel(osztaly: Osztaly2E) : string {
    switch (osztaly) {
        case Osztaly2E.Amazon: return 'Amazon';
        case Osztaly2E.Barbar: return 'Barbár';
        case Osztaly2E.Pap: return 'Pap';
        case Osztaly2E.Illuzionista: return 'Illúzionista';
        case Osztaly2E.Varazslo: return 'Varázsló';
        case Osztaly2E.Harcos: return 'Harcos';
        case Osztaly2E.Ijasz: return 'Íjász';
        case Osztaly2E.Tengeresz: return 'Tengerész';
        case Osztaly2E.Tolvaj: return 'Tolvaj';
        case Osztaly2E.Dalnok: return 'Dalnok';
        case Osztaly2E.Druida: return 'Druida';
        case Osztaly2E.Vandor: return 'Vándor';
    }
}

export function OsztalyDescription(osztaly: Osztaly2E) : string {
    switch (osztaly) {
        case Osztaly2E.Harcos:
        case Osztaly2E.Amazon:
        case Osztaly2E.Barbar:
        case Osztaly2E.Ijasz:
        case Osztaly2E.Tengeresz:
            return 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, és sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik.';
        case Osztaly2E.Tolvaj:
            return 'A tolvajok a becstelen harcban és a csöndes gyilkolásban járatosak (közülük sokan alkalmaznak mérgeket – őket orgyilkosoknak nevezik). Harci képességeik és életerejük viszonylag gyenge, s nehezebb vértezeteket sem használhatnak. Ezért ha módjukban áll, nem szemtől szembe, hanem lesből támadnak áldozataikra, és ha ez nem sikerülne, gyorsan kereket oldanak. Emellett alvilági pályafutásuk során számos hasznos képzettségben válnak járatossá.';
        case Osztaly2E.Pap:
            return 'A papok az istenek militáns varázshasználó szolgái. Hitük parancsait minden körülmények között be kell tartaniuk, s bizonyos rendszerességgel áldozatokat kell bemutatniuk. A papok csak istenükkel azonos vagy attól legfeljebb eggyel különböző jelleműek lehetnek. A papok csak az istenük által kijelölt fegyvereket forgathatják, de szabadon válogathatnak a különféle vértek között.';
        case Osztaly2E.Varazslo:
            return 'A varázslók kiemelkedő szellemi fegyelmezettségük segítségével képesek a magasabb fokú mágikus erőket irányító varázsigék memorizálására és fölhasználására. Tudásukat varázskönyvekben rögzítik, s mindent elkövetnek egy ismeretlen formula megszerzéséért. Többségüket a magabiztos önhittség és az alacsonyabb szellemi képességűek megvetése jellemzi. Sem a varázslók, sem az illuzionisták nem képesek bármiféle páncélban varázsolni, és csak kevés fegyvertípus forgatásában járatosak.';
        case Osztaly2E.Illuzionista:
            return 'A varázslók kiemelkedő szellemi fegyelmezettségük segítségével képesek a magasabb fokú mágikus erőket irányító varázsigék memorizálására és fölhasználására. Tudásukat varázskönyvekben rögzítik, s mindent elkövetnek egy ismeretlen formula megszerzéséért. Többségüket a magabiztos önhittség és az alacsonyabb szellemi képességűek megvetése jellemzi. Az illuzionisták a varázslók alosztályaként a mágia egy hasonló, de több lényeges területen eltérő fajtáját művelik. Lételemük a káprázat, a megtévesztés és mások elméjének befolyásolása – többségük hipnotizőr vagy ügyes manipulátor. Az illuzionista varázslatok csekélyebb pusztító erőt képviselnek, ellenben egy élelmes illuzionista kezében nagyon sokrétűek. Sem a varázslók, sem az illuzionisták nem képesek bármiféle páncélban varázsolni, és csak kevés fegyvertípus forgatásában járatosak.';
        case Osztaly2E.Dalnok:
            return 'A dalnokok a legendák és hősi énekek ismerői, a tolvaj osztályhoz közeli, de tőlük eltérő képességekkel. A legtöbbjük állandóan az úton jár, s csak rövid időre marad egy helyben, hogy újabb dalokkal és legendákkal gyarapítsa repertoárját, és újabb meg újabb közönségek előtt próbálja ki tudását. A dalnok opcionális osztály, és mesélői engedéllyel indítható.';
        case Osztaly2E.Druida:
            return 'A druidák a természet erőit szolgáló aszkétikus misztikusok, akiknek rendje az emberi kor elejére néz vissza. Céljaikat titkok köde övezi, amelyet ők maguk sem igyekeznek eloszlatni (s elárulóit ők maguk vadásszák le). Vannak, akik szerint az Egyensúly ügyét képviselik, mások szerint az emberiség visszavadításán és a civilizáció lerombolásán munkálkodnak, vagy emberáldozatoknak hódolnak. Az biztos, munkájuk valamilyen formában a kőkörökhöz, faragott kövekhez, és az ősi vérvonalak fenntartásához fűzi őket. Hitük része a szent eskü, melynek keretén belül megfogadják, hogy csak az ősi druida rend tradicionális fegyvereit használják, és nem viselnek olyan vértet, amely fémet tartalmaz. A druidáknak, szintén fogadalmuk révén, legalább részben Semleges jelleműnek kell lenniük, és nem lehetnek többosztályúak. A druida opcionális osztály, és mesélői engedéllyel indítható.'
        case Osztaly2E.Vandor:
            return 'A vándorok a vadonbeli túlélés mestereiként ismert harcosok. Ezen kívül sokat foglalkoznak ősi legendák, főleg régi civilizációk, romok feltárásával. Távoli kapcsolatban állnak a druidák rendjével, és sokan az ő ügynökeiknek tekintik őket, de a kapcsolat sokkal lazább, és gyakran csak a kölcsönös tiszteletig terjed. A vándor opcionális osztály, és mesélői engedéllyel indítható.'
    }
}

export function OsztalyProperties(osztaly: Osztaly2E) : string[] {
    switch (osztaly) {
        case Osztaly2E.Harcos: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: bármilyen',
            'Páncélhasználat: bármilyen',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly2E.Ijasz: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: bármilyen',
            'Páncélhasználat: nehéz vérteken kívül bármilyen',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly2E.Amazon: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: bármilyen',
            'Páncélhasználat: csak könnyű vértek',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly2E.Tengeresz: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: bármilyen',
            'Páncélhasználat: nehéz vérteken kívül bármilyen',
            'Hp: szintenként 1d10, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly2E.Barbar: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: bármilyen',
            'Páncélhasználat: bármilyen',
            'Hp: szintenként 1d12, 9. szint („Nagyúr”) fölött 3/szint',
            'Képzettségek: 3',
        ]
        case Osztaly2E.Pap: return [
            'Támadásbónusz: Szint x 2/3',
            'Mentődobás: Kitartás és Akaraterő az első, Reflex a második oszlop szerint',
            'Fegyverhasználat: csak istenük kijelölt fegyvereit használhatják (általában buzogányokat és tőröket)',
            'Páncélhasználat: bármilyen',
            'Hp: szintenként 1d8, 9. szint („Főpap”) fölött 2/szint',
            'Képzettségek: 3',
        ]
        case Osztaly2E.Tolvaj: return [
            'Támadásbónusz: Szint x 2/3',
            'Mentődobás: Reflex az első, Kitartás és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: egykezes fegyvereket, rövidíjat és számszeríjakat használhatnak',
            'Páncélhasználat: csak könnyű, pajzs nélkül',
            'Hp: szintenként 1d6, 9. szint („Mestertolvaj”) fölött 2/szint',
            'Képzettségek: 7 (ebből legalább 4 minden képpen a „tolvajképzettségek” listájáról); Sokoldalúságuknak köszönhetően 5. és 9. szinten kapnak egy új képzettséget'
        ]
        case Osztaly2E.Varazslo:
        case Osztaly2E.Illuzionista: return [
            'Támadásbónusz: Szint x 1/2',
            'Mentődobás: Akaraterő az első, Kitartás és Reflex a második oszlop szerint',
            'Fegyverhasználat: tőrt, botot, dobótűket, bunkót és parittyát használhatnak',
            'Páncélhasználat: nincs',
            'Hp: szintenként 1d4, 9. szint („Varázslónagyúr”) fölött 1/szint',
            'Képzettségek: 3',
        ];
        case Osztaly2E.Dalnok: return [
            'Támadásbónusz: Szint x 2/3',
            'Mentődobások: Reflex az első, Kitartás és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: egykezes fegyverek, könnyű számszeríj, rövidíj',
            'Páncélhasználat: könnyű és pajzsok',
            'Hp: szintenként 1d6, 9. szint („Bárd”) fölött 2/szint',
            'Képzettségek: 3, az egyik képzettségük mindenképpen az Előadás',
        ];
        case Osztaly2E.Druida: return [
            'Támadásbónusz: Szint x 2/3',
            'Mentődobás: Kitartás és Akaraterő az első, Reflex a második oszlop szerint',
            'Fegyverhasználat: bot, bunkósbot, tőr, dobótű, szablya, sarlókard, lándzsa, parittya.',
            'Páncélhasználat: bőrvértet, szőrméket viselhetnek és fapajzsot hordhatnak.',
            'Hp: szintenként 1d8, 9. szint („Fődruida”) fölött 2/szint.',
            'Képzettségek: 3, az egyik képzettségük mindenképpen a Vadonjárás',
        ];
        case Osztaly2E.Vandor: return [
            'Támadásbónusz: Szint x 1',
            'Mentődobások: Kitartás az első, Reflex és Akaraterő a második oszlop szerint',
            'Fegyverhasználat: tetszőleges',
            'Páncélhasználat: könnyű és pajzsok',
            'Hp: szintenként 1d10, 9. szint („a Vadak Mestere”) fölött 3/szint',
            'Képzettségek: 3, az egyik képzettségük mindenképpen a Vadonjárás',
        ]
    }
}

export interface Skill {
    Id: string
    Name: string,
    Description: string
    ExtendedDescription?: string[]
}


export function OsztalySpecialSkills(osztaly: Osztaly2E) : Skill[] {
    switch (osztaly) {
        case Osztaly2E.Harcos: return [
            {
                Id: 's_2e_harcos_harcos',
                Name: 'Harcos',
                Description: 'Speciális harci tapasztalatuknak köszönhetően minden páratlan szinten +2-t kapnak egy választott fegyvertípus (pl. kardok, buzogányok, fejszék, dobófegyverek, íjak stb.) sebzésére. 5. szinttől kétszer ugyanarra a típusra választva a sebzésbónusz +4-re emelhető'
            }
        ]
        case Osztaly2E.Amazon: return [
            {
                Id: 's_2e_harcos_amazon',
                Name: 'Amazon',
                Description: 'Ezek a barbár harcosnők szépségükről és karizmatikus jelenlétükre építő védekező harcmodorukról ismertek',
            },
            {
                Id: 's_2e_harcos_amazon_vert',
                Name: 'MMO vért',
                Description: 'Az amazonok csak könnyű vérteket viselhetnek, de VO-juk szint/2-vel javul, továbbá Karizma- és Ügyességmódosítóik közül a kedvezőbbet választhatják a VO számításánál'
            },
        ]
        case Osztaly2E.Barbar: return [
            {
                Id: 's_2e_harcos_barbar',
                Name: 'Barbár',
                Description: 'Pusztaságok, sarkvidéki jégmezők és fülledt őserdők lakói, akiket kegyetlen környezetük nevelt túlélővé'
            },
            {
                Id: 's_2e_harcos_barbar_tulelo',
                Name: 'Túlélő',
                Description: 'A barbárok 1d12-vel dobják a Hp-jüket, és +1 bónuszt (9. szinttől +2-t) kapnak a mentődobásaikra.'
            },
            {
                Id: 's_2e_harcos_barbar_szivos',
                Name: 'Szívós',
                Description: 'Szintenként -1 Hp-ig öntudatuknál vannak, bár -5 Hp-n halálos sebet kapnak, ami 1d3*10 perc alatt akkor is halálos, ha egyébként győznek a csetepatéban.'
            },
            {
                Id: 's_2e_harcos_barbar_iras',
                Name: 'Írástudatlan',
                Description: 'Minden barbár írástudatlanul kezdi a játékot, de ha kell, később megtanulhatja a betűvetést.'
            }
        ]
        case Osztaly2E.Ijasz: return [
            {
                Id: 's_2e_harcos_ijasz',
                Name: 'Íjász',
                Description: 'A távolsági harc mesterei. Dobó- és lőfegyverrel (a számszeríjakat kivéve) körönként kapnak egy teljesértékű extra támadást, vagy számszeríj esetén +2-t a célzásra'
            },
            {
                Id: 's_2e_harcos_ijasz_vert',
                Name: 'Kötelező mozgékonyság',
                Description: 'Az íjászok nem viselhetnek nehéz vérteket'
            },
            {
                Id: 's_2e_harcos_ijasz_lovaglas',
                Name: 'Vágta',
                Description: 'Lovaglás próbával akár vágtató lóról is tudnak lőni'
            }
        ]
        
        case Osztaly2E.Tengeresz: return [
            {
                Id: 's_2e_harcos_kaloz',
                Name: 'Tengerész/Kalóz',
                Description: 'A tengerészek a hajózás mesterei; kereskedők, tengeri rablók és rabszolgavadászok. Egyik képzettségük mindenképpen a Hajózás.'
            },
            {
                Id: 's_2e_harcos_kaloz_vasmacska',
                Name: 'Vasmacska',
                Description: 'A kalózok és tengerészek nem viselhetnek nehéz vértezetet, de VO-juk Szint/3-al javul.'
            },
            {
                Id: 's_2e_harcos_kaloz_kritikus',
                Name: 'Kritikus',
                Description: 'Minden harmadik szinten kiválaszthatnak egy fegyvertípust, amellyel könnyebben okoznak kritikus sebesülést, tehát pl. fejszékkel 20 helyett 19-20-on, hosszú kardokkal 19-20 helyett 18-20-on, görbe kardokkal 18-20 helyett 17-20-on stb. 9. szinttől fegyverenként kétszer is választható.'
            },
            {
                Id: 's_2e_harcos_kaloz_trukkos',
                Name: 'Trükkös',
                Description: '+2-t kapnak harci manővereikre (HM)'
            },
        ]
        case Osztaly2E.Tolvaj: return [
            {
                Id: 's_2e_tolvaj_orvtamadas',
                Name: 'Orvtámadás',
                Description: 'akkor használható, ha a tolvaj meglepi áldozatát, tehát pl. osonva a hátába kerül, vagy beszélgetés közben tőrt ránt és egyetlen mozdulattal gyomron szúrja. Ekkor a támadásra +4 jár, az orvtámadás pedig minden páratlan szintért +1d6 Hp sebzést okoz (maximuma +5d6). Dobó- és lőfegyverrel is használható, és ha a tolvaj úgy dönt, illetve a használt fegyver lehetővé teszi, az ellenfél elkábítására is alkalmazható.'
            },
            {
                Id: 's_2e_tolvaj_kezdemenyezes',
                Name: 'Jobb kezdeményezés',
                Description: 'a tolvajok +4-et kapnak kezdeményezési dobásaikra.',
            },
            {
                Id: 's_2e_tolvaj_kepzettsegek',
                Name: 'Tolvajképzettségek',
                Description: 'minden tolvaj jártas több olyan képzettségben, amely segíti a rejtőzködésben, a jól őrzött értékek eltulajdonításában és hasonló feladatokban.',
            },
        ]
        case Osztaly2E.Pap: return [
            {
                Id: 's_2e_pap_varazslat',
                Name: 'Varázslatok',
                Description: 'a papi varázslatok általában gyógyításra, mások megsegítésére és vallási feladatok ellátására szolgálnak. Minél magasabb szintűek, egy nap annál több varázslatot tudnak alkalmazni a következő oldalon található táblának megfelelően. Például egy 4. szintű, 17-es Bölcsességgel rendelkező pap öt nulladik szintű, négy első szintű és három második szintű varázslatot tarthat naponta elméjében.'
            },
            {
                Id: 's_2e_pap_bonusz_varazslat',
                Name: 'Bónusz varázslatok',
                Description: 'a magas Bölcsességű papok minden nap további varázslatokat memorizálhatnak, ha erre szintjük eleve képessé tenné őket. Ez a kegy azonban csak azoknak a papoknak jár, akik jó megítélésben állnak istenüknél (a kalandok elején ez a helyzet).'
            },
            {
                Id: 's_2e_pap_gyogyseb',
                Name: 'Gyógyítás vagy sebokozás',
                Description: 'a pap az aznap már memorizált (megtanult) varázslatokat gyógyításra vagy sebek okozására is fölhasználhatja. Érintésével a varázslat minden szintjéért 1d8 Hp-t gyógyít vagy sebez – így pl. egy Ómen elhasználásával 2d8 Hp-t. Az így konvertált varázslat természetesen elvész. Az, hogy a képesség sebek gyógyítására vagy okozására szolgál, a pap istenétől függ. A békésebb istenek főleg az elsőt, a harciasabbak főleg a másodikat részesítik előnyben, s vannak olyanok is, akik híveikre bízzák, hogy melyik utat választják. Ha azonban a pap már eldöntötte, melyik képességben járatos, döntését többé nem másíthatja meg!'
            },
            {
                Id: 's_2e_pap_elohalott',
                Name: 'Élőholtak elűzése vagy irányítása',
                Description: 'a papok képesek elűzni vagy uralmuk alá vonni az élőholt szörnyeket, például zombikat, lidérceket és vámpírokat. Ez a képesség naponta egyszer (5. szinttől kétszer, 9. szinttől háromszor) használható. A cselekedet a következőképpen működik:',
                ExtendedDescription: [
                    'A pap [1d20 + Karizma bónusz] próbát tesz. Ennek az értékét összeveti a standard bónusztáblázattal (3-5 = -2, 6-8 = -1, 9-11 = +0, 12-14 = +1, 15-17 = +2, 18 = +3). Az innen kiolvasható módosítót hozzáadja saját szintjéhez (ha negatív, akkor levonja). Az eredmény jelzi, hogy a pap legfeljebb milyen szintű élőholtakra lesz hatással. Ha tehát pl. a próba végeredménye 14 és a pap ötödik szintű, akkor 5+1, azaz 6. szintű a legerősebb élőhalott, amire a kísérlet sikeres. A 20-as dobás itt is automatikus siker, az 1-es automatikus kudarc.',
                    'A pap [2d6+szint] szintű élőhalottat űzhet el vagy irányíthat. Először a leggyengébb élőholtakra hat, azután a következő leggyengébbekre stb. Az elűzött élőholtak elmenekülnek a pap szeme elől, és addig nem is ártanak neki és társainak, amíg a pap csapata meg nem támadja őket! Ezzel szemben a gonosz papok parancsokat adhatnak az irányított szörnyeknek. Mindkét hatás néhány óráig tart, az élőholtak szintjétől és a körülményektől függően.',
                    'Ha az összes szem előtt lévő élőholtat sikerült elűzni vagy irányítani és még maradt „a szent energiából”, akkor ismét el kell kezdeni a hatást a leggyengébb ellenségektől. Az így elűzött szörnyek megsemmisülnek, illetve irányítás esetén végleg a gonosz pap szolgálatába állnak.',
                    'A két hatás egymás ellen is fölhasználható, például egy jó pap kiolthatja egy gonosz pap irányítását, de akár két gonosz pap is versenyezhet egy csapat sírlidérc „megtérítésén”.',
                ]
            },
            {
                Id: 's_2e_pap_invokacio',
                Name: 'Invokáció',
                Description: 'az istenség nevének kimondásával kérhetik annak segítségét, ami +2-t ad egy kiválasztott próbadobáshoz. Hetente a Bölcsességbónuszukkal azonos alkalommal (de legalább egyszer) használhatják a képességet.'
            }
        ]
        case Osztaly2E.Varazslo: return [
            {
                Id: 's_2e_varazslo_varazslatok',
                Name: 'Varázslatok',
                Description: 'a varázslók mágiája mind között a legszerteágazóbb. A papokkal ellentétben azonban minden varázslatot külön kell megszerezniük és könyvükben rögzíteniük. A már ismert varázslatokat reggelenként könyvük tanulmányozásával memorizálják a szabálykönyvben leírt táblázat szerinti számban, s ha felhasználják őket, azok eltűnnek elméjükből és aznap már nem használhatók. Így például egy harmadik szintű varázsló négy nulladik, két első és egy második szintű varázslatot tud egyszerre elméjében tárolni. Egy varázslat kétszeres memorizálása két helyet foglal. Az illuzionisták nem képesek a varázslói varázslatok megértésére – és viszont.'
            },
            {
                Id: 's_2e_varazslo_varazskonyv',
                Name: 'Varázskönyv',
                Description: 'minden varázsló megtanulja és könyvében rögzíti az összes nulladik szintű varázslatot. Ezen kívül harmadik szinten (vagyis a kalandok kezdetén) még 1d3+3 első szintű és 1d3 második szintű varázslatot ismernek. A kezdeti varázslatokat véletlenszerűen, kockadobással kell meghatározni; azonos eredmény esetén nincs lehetőség új dobásra. A további varázslatok mások könyveiből, mágikus tekercsekből vagy más módszerek segítségével sajátíthatók el (lásd a IV. fejezetet).'
            },
        ]
        case Osztaly2E.Illuzionista: return [
            {
                Id: 's_2e_illuzionista_varazslatok',
                Name: 'Varázslatok',
                Description: 'a varázslók mágiája mind között a legszerteágazóbb. A papokkal ellentétben azonban minden varázslatot külön kell megszerezniük és könyvükben rögzíteniük. A már ismert varázslatokat reggelenként könyvük tanulmányozásával memorizálják a szabálykönyvben leírt táblázat szerinti számban, s ha felhasználják őket, azok eltűnnek elméjükből és aznap már nem használhatók. Így például egy harmadik szintű varázsló négy nulladik, két első és egy második szintű varázslatot tud egyszerre elméjében tárolni. Egy varázslat kétszeres memorizálása két helyet foglal. Az illuzionisták nem képesek a varázslói varázslatok megértésére – és viszont.'
            },
            {
                Id: 's_2e_illuzionista_varazskonyv',
                Name: 'Varázskönyv',
                Description: 'minden varázsló megtanulja és könyvében rögzíti az összes nulladik szintű varázslatot. Ezen kívül harmadik szinten (vagyis a kalandok kezdetén) még 1d3+3 első szintű és 1d3 második szintű varázslatot ismernek. A kezdeti varázslatokat véletlenszerűen, kockadobással kell meghatározni; azonos eredmény esetén nincs lehetőség új dobásra. A további varázslatok mások könyveiből, mágikus tekercsekből vagy más módszerek segítségével sajátíthatók el (lásd a IV. fejezetet).'
            }
        ];
        case Osztaly2E.Dalnok: return [
            {
                Id: 's_2e_dalnok_zene',
                Name: 'Zene',
                Description: 'zenéjük napi egy alkalommal inspiráló hatással van a szövetségeseikre és demoralizáló hatással ellenfeleikre: az előbbiek +1-et, az utóbbiak -1-et kapnak mindenféle dobásukra. Ezt a képzettséget 5. szinttől kétszer, 9. szinttől háromszor használhatják.'
            },
            {
                Id: 's_2e_dalnok_legendak',
                Name: 'Legendák (Böl)',
                Description: 'ezzel a speciális képzettséggel a karakter megtudhat valamit a kiválasztott hely, család, szervezet stb. hátteréről – ha ez a legendákból vagy hősi énekekből megtudható volna. Közepes próba esetén általános, Nehéz próba esetén specifikus, Hősies próba esetén titkos ismereteket is adhat. Olyan dolgokra alkalmazható, amelyek szerepelhetnének egy közszájon forgó legendában, és az ismeretek is ezt fogják tükrözni. A köznapi, vagy éppenséggel nagyon jól elrejtett dolgok kapcsán nem nyújt segítséget.'
            },
            {
                Id: 's_2e_dalnok_varazslatok',
                Name: 'Varázslatok',
                Description: 'szintenként 2 db varázslatot tudnak megtanulni a dalnok varázslatlistából, s azt verses rigmusként, dalként vagy zeneműként előadni. További dalok rejtőznek régi könyvekben és más dalnokok ajkán. A dalnokok nem kapnak bónusz varázslatokat.\n A dalnok varázslatok egy része folyamatos, megszakítatlan éneklést igényel (ezek mellett csak mozgásra és egyszerűbb cselekedetekre nyílik lehetőség, de cserébe az énekszó abbamaradtáig hatnak), mások pedig egy rövid dallam után a varázslatleírásokban jelzett határidő lejártáig érvényesek. A dalnok szintenként fél óráig tudja fenntartani énekét.'
            },
        ];
        case Osztaly2E.Druida: return [
            {
                Id: 's_2e_druida_varazslatok',
                Name: 'Varázslatok',
                Description: 'a druida varázslatok általában a természet erőinek kisebb-nagyobb megnyilvánulásai. A naponta memorizálható varázslatok száma a papokéval egyező, és szintén a Bölcsességük alapján kapnak bónusz varázslatokat.'
            },
            {
                Id: 's_2e_druida_termeszetjaras',
                Name: 'Természetjárás',
                Description: 'szabadon mozoghatnak bármiféle természetes aljnövényzetben (mint például bozótosban, sűrűn benőtt területen, pókhálókban, de nem mágikus kötelékekben). Nem hagynak nyomot természetes környezetben, így – hacsak nem akarják – követni sem lehet őket.'
            },
            {
                Id: 's_2e_druida_alakvaltas',
                Name: 'Alakváltás',
                Description: 'a tapasztalt druidák 6. szinttől naponta egyszer, 9. szinttől kétszer képesek felvenni a közönséges, helyben honos állatok alakját. A fölvett forma összes fizikai jellemzőjét megkapják (fizikai tulajdonságok, támadási forma, sebzés, speciális képességek stb.), de megtartják Hp-jüket, alap támadásbónuszukat, és szellemi képességeiket. Állati alakban nem képesek varázsolni és eszközöket használni. Minden átalakulás 2/szint Hp-t gyógyít a druidán.'
            }
        ];
        case Osztaly2E.Vandor: return [
            {
                Id: 's_2e_vandor_kepzettsegek',
                Name: 'Vándorképzettségek',
                Description: 'olyan képzettségeket is szabadon tanulhatnak, amelyeket csak varázshasználók ismernének.'
            },
            {
                Id: 's_2e_vandor_termeszetjaras',
                Name: 'Természetjárás',
                Description: 'szabadon mozoghatnak bármiféle természetes aljnövényzetben (mint például bozótosban, sűrűn benőtt területen, pókhálókban, de nem mágikus kötelékekben). Nem hagynak nyomot természetes környezetben, így – hacsak nem akarják – követni sem lehet őket.'
            },
            {
                Id: 's_2e_vandor_vadon_sugallata',
                Name: 'A vadon sugallata',
                Description: 'ha számukra új, vagy rég nem látott vadonbéli területre érkeznek, játékalkalmanként egyszer sikeres Vadonjárás próbával értelmezhetik a környezetükben elrejtett jeleket: ez lehet figyelmeztetés a környék veszélyeiről („valami nincs rendjén a hely vizeivel”), rejtélyeiről („régen emberek éltek itt – de ez már a múlt”), az ott történtek lenyomata („itt hadak jártak!”), vagy más praktikus, de csak utalásszerű információ, amit a mesélő gondol.'
            },
            {
                Id: 's_2e_vandor_varazslatok',
                Name: 'Varázslatok',
                Description: 'első szinten 2 + Bölcsességmódosítónyi 0. szintű varázslatot ismernek, majd szintenként további egy varázslatot tanulhatnak a druida listából. További varázslatok titokzatos kőkörökből és a druida hit más helyszínein ismerhetők meg. A vándorok nem kapnak bónusz varázslatokat.'
            },
        ];
    }
}
