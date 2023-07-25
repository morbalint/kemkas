
export enum Osztaly {
    Harcos = 'o_harcos',
    Ijjasz = 'o_ijjasz',
    Amazon = 'o_amazon',
    Kaloz = 'o_kaloz',
    Barbar = 'o_barbar',
    Pap = 'o_pap',
    Tolvaj = 'o_tolvaj',
    Varazslo = 'o_varazslo',
    Illuzionista = 'o_illuzionista',
}

export function OsztalyLabel(osztaly: Osztaly) : string {
    switch (osztaly) {
        case Osztaly.Amazon: return 'Amazon';
        case Osztaly.Barbar: return 'Barbár';
        case Osztaly.Pap: return 'Pap';
        case Osztaly.Illuzionista: return 'Illúzionista';
        case Osztaly.Varazslo: return 'Varázsló';
        case Osztaly.Harcos: return 'Harcos';
        case Osztaly.Ijjasz: return 'Íjjász';
        case Osztaly.Kaloz: return 'Kalóz';
        case Osztaly.Tolvaj: return 'Tolvaj'
    }
}

const osztalyDescriptions= {
    o_harcos: 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, s sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik. A játék elején minden harcos választhat egy tetszőleges harci stílust: A Harcosok az osztály leggyakoribb képviselői. Speciális harci tapasztalatuknak köszönhetően minden páratlan szinten +2-t kapnak egy választott fegyvertípus (pl. csatabárd, hosszúkard, stb.) sebzésére. Ez fegyverenként csak egyszer választható, s arra is fölhasználható, hogy a harcos megtanulja egy egzotikus fegyver használatát, amire később specializálódhat is. 9. szinttől elérhető számukra a kettős specializáció: ezzel sebzésmódosítójukat az adott fegyverre +4-re emelhetik.',
    o_ijjasz: 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, s sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik. A játék elején minden harcos választhat egy tetszőleges harci stílust: Az íjászok a távolsági harc mesterei. Íjak használatakor körönként eggyel többször támadhatnak. Értenek a visszacsapó íjak használatához is. Nem viselhetnek nehéz vérteket.',
    o_amazon: 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, s sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik. A játék elején minden harcos választhat egy tetszőleges harci stílust: Az amazonok barbár népe szépségéről és a karizmatikus jelenlétre építő védekező harcmodoráról ismert. Az amazonok csak láncinget vagy könnyebb vérteket viselhetnek, de VO-juk Szint/2-vel javul, továbbá Karizma- és Ügyességmódosítói közül a kedvezőbbet választhatják. Ha kettő vagy több amazon együttesen harcol, VO-juk további 2 ponttal nő pszionikus képességeik miatt.',
    o_kaloz: 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, s sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik. A játék elején minden harcos választhat egy tetszőleges harci stílust: A tengerészek/kalózok a hajózás mesterei; kereskedők, tengeri rablók és rabszolgavadászok. Ha magasabb, Ügyességbónuszukat adják hozzá közelharci támadásaikhoz. Nem viselhetnek nehéz vértezetet, de VO-juk könnyű vértben Szint/3-al javul. Minden harmadik szinten kiválaszthatnak egy fegyvert, amivel könynyebben okoznak kritikus sebesülést, tehát pl. csatabárddal 20 helyett 19-20-on, hoszszúkarddal 19-20 helyett 18-20-on, szablyával 18-20 helyett 17-20-on, stb. Ez a képesség 9. szintig fegyverenként csak egyszer választható.',
    o_barbar: 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, s sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik. A játék elején minden harcos választhat egy tetszőleges harci stílust: A barbár törzsek köré sorolhatók apusztai és sivatagi nomádok, a déli dzsungelek emberevői és az északi tengermelléki rablók nemzetségei egyaránt. A barbárok 1d12-vel dobják a Hp-jüket, -5 Hp-ig öntudatuknál vannak és +1 bónuszt (10. szinttől +2, 15. szinttől +4) kapnak a mentődobásaikra. Minden barbár írástudatlanul kezdi a játékot, de ha kell, később megtanulhatja a betűvetést.',
    o_pap: 'A papok az istenek militáns varázshasználó szolgái. Hitük parancsait minden körülmények között be kell tartaniuk, s bizonyos rendszerességgel áldozatokat kell bemutatniuk. A papok csak istenükkel azonos vagy attól legfeljebb eggyel különböző jelleműek lehetnek. A papok csak az istenük által kijelölt fegyvereket forgathatják, de szabadon válogathatnak a különféle vértek között.',
    o_tolvaj: 'A tolvajok a becstelen harc és a csöndes gyilkolás mesterei (közülük sokan alkalmaznak mérgeket – őket orgyilkosoknak nevezik). Harci képességeik és életerejük viszonylag gyenge, s nehezebb vértezeteket sem használhatnak. Ezért ha módjukban áll, nem szemtől szembe, hanem lesből támadnak áldozataikra, és ha ez nem sikerülne, gyorsan kereket oldanak. Emellett alvilági pályafutásuk során számos hasznos képzettségben válnak járatossá.',
    o_varazslo: 'A varázslók kiemelkedő szellemi fegyelmezettségük segítségével képesek a magasabb fokú mágikus erőket irányító varázsigék memorizálására és fölhasználására. Tudásukat varázskönyekben rögzítik, s mindent elkövetnek egy ismeretlen formula megszerzéséért. Többségüket a magabiztos önhittség és az alacsonyabb szellemi képeségűek megvetése jellemzi. A varázslók nem képesek _bármiféle_ páncélban varázsolni, és csak kevés fegyvertípus forgatásában járatosak.',
    o_illuzionista: 'A varázslók kiemelkedő szellemi fegyelmezettségük segítségével képesek a magasabb fokú mágikus erőket irányító varázsigék memorizálására és fölhasználására. Tudásukat varázskönyekben rögzítik, s mindent elkövetnek egy ismeretlen formula megszerzéséért. Többségüket a magabiztos önhittség és az alacsonyabb szellemi képeségűek megvetése jellemzi. Az illuzionisták a mágia egy igen hasonló, de több lényeges területen eltérő fajtáját művelik. Lételemük a káprázat, a megtévesztés és mások elméjének befolyásolása – többségük hipnotizőr vagy ügyes manipulátor. Az illuzionista varázslatok csekélyebb pusztító erőt képviselnek, ellenben egy élelmes illuzionista kezében szinte bármire képesek – beleértve a közönséges varázslók egyes varázslatainak utánzását. Az illuzionisták nem képesek _bármiféle_ páncélban varázsolni, és csak kevés fegyvertípus forgatásában járatosak.',
}

export function OsztalyDescription(osztaly: Osztaly) {
    return osztalyDescriptions[osztaly]
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
        case Osztaly.Ijjasz: return [
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