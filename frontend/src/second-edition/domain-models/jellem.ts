export type JellemID = 'TJ' | 'SJ' | 'KJ' | 'TS' | 'S' | 'KS' | 'TG' | 'SG' | 'KG'

export const AllJellemIDs: JellemID[] = ['TJ', 'SJ', 'KJ', 'TS', 'S', 'KS', 'TG', 'SG', 'KG']

export interface Jellem {
    ID: JellemID
    Label: string
    Description: string
}

export function GetJellem(id: JellemID): Jellem {
    switch (id) {
        case "TJ": return {
            ID: "TJ",
            Label: "Törvényes Jó",
            Description: "A törvényes jó karakterek betartják és fontosnak tartják az igazságos törvényeket, valamint a kiérdemelt tekintély tiszteletét. Viselkedésükben lehetőleg egyenesek, és nem okoznak szükségtelen károkat másnak; továbbá segítenek a kevésbé szerencséseken.",
        }
        case "SJ": return {
            ID: "SJ",
            Label: "Semleges Jó",
            Description: "A semleges jó karakterek általában jóindulatúak, de nem jellemző rájuk sem a törvényes jók szigora, sem a kaotikus jók kiszámíthatatlansága.",
        }
        case "KJ": return {
            ID: "KJ",
            Label: "Kaotikus Jó",
            Description: "A kaotikus jó karakterek nagy súlyt fektetnek az egyéni szabadságra és a jótéteményekre – akkor is, ha ezek a nézetek és tettek ellentétesek a társadalmi szokásokkal és írott törvényekkel.",
        }
        case "TS": return {
            ID: "TS",
            Label: "Törvényes Semleges",
            Description: "A törvényes semleges karakterek szigorúan betartják a törvényeket és adott szavukat, de ez a törvénytisztelet nem altruizmusból, hanem elsősorban önzésből, közömbösségből vagy a törvények öncélú tiszteletéből fakad.",
        }
        case "S": return {
            ID: "S",
            Label: "Semleges",
            Description: "A semleges karakterek vagy nem törődnek a fontos erkölcsi kérdésekkel – azaz nem kötelezik el magukat egyes ügyek mellett – vagy éppen ellenkezőleg, aktívan a különféle nézetek közötti egyensúlyra és harmóniára törekednek. Az átlagemberek többsége ehhez a jellemhez tartozik.",
        }
        case "KS": return {
            ID: "KS",
            Label: "Kaotikus Semleges",
            Description: "A kaotikus semleges karakterek kiszámíthatatlanok, saját boldogulásukra törekednek akár mások ellenében is. A kalandozók igen jelentős része kaotikus semleges jellemű"
        }
        case "TG": return {
            ID: "TG",
            Label: "Törvényes Gonosz",
            Description: "A törvényes gonosz karakterek lételeme a törvényadta lehetőségek kihasználása mások kisemmizésére és önmaguk gyarapítására. Nem csoda, hogy számos zsarnok és kiskirály e jellem képviselője.",
        }
        case "SG": return {
            ID: "SG",
            Label: "Semleges Gonosz",
            Description: "A semleges gonosz karakterek döntően aljasak és rosszindulatúak, s céljaikat hol a törvények kijátszásával, hol a rájuk való hivatkozással érik el."
        }
        case "KG": return {
            ID: "KG",
            Label: "Kaotikus Gonosz",
            Description: "A kaotikus gonosz karakterek kíméletlenül, mindenen és mindenkin átgázolva hajszolják a hatalmat vagy a vagyont, s ennek érdekében bármilyen gaztettre képesek."
        }
    }
}
