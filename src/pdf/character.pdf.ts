import {KarakterPdfView, KepzettsegPdfView} from "./karakter_pdf_view";
import {PDFDocument, rgb} from "pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import {SignedNumberToText} from "../components/Helpers";
import download from "downloadjs";
import {DrawTulajdonsagok} from "./tulajdonsagok.pdf";
import {DrawMentok} from "./mentok.pdf";
import {DrawMagic} from "./magic.pdf";
import {DrawMasodlagosErtekek} from './masodlagos_ertekek.pdf'
import {DrawOsztalySpecialsPage} from './osztaly_specials.pdf'
import {DrawFegyverek} from "./fegyverek.pdf";

function drawBaseInfo(karakter: KarakterPdfView, draw: (text: string, x : number ,y: number, scale: number) => void) {
    draw(karakter.Name, 60, 710, 1)
    draw(karakter.Nem, 454, 710, 1)
    draw(karakter.Kor.toString(), 454, 690, 1)
    draw(karakter.Isten, 454, 670, 1)
    draw(karakter.Osztaly, 60, 672, 1)
    draw(karakter.Szint, karakter.Szint.length > 1 ? 252 : 264, 682, 3)
    draw(karakter.Faj, 302, 710, 1)
    draw(karakter.Jellem, 302, 672, karakter.Jellem.length > 17 ? 11/12 : 1)
}

function DrawKepzettsegek(draw: (text: string, x: number, y: number) => void, kepzettsegek: KepzettsegPdfView[], startFrom: number) {
    for (let i = 0; i < kepzettsegek.length; i++) {
        let kepzettseg = kepzettsegek[i]
        draw(kepzettseg.KepzettsegName, 60, startFrom - (i * 18))
        const kepzettsegModifier = SignedNumberToText(kepzettseg.KepzettsegModifier)
        draw(kepzettsegModifier, kepzettsegModifier.length > 2 ? 172 : 175, startFrom - (i * 18))
    }
}

function DrawFelszereles(draw: (text: string, x: number, y:number) => void, felszereles: string[]) {     
    const startFrom = 337   
    for (let i = 0; i < felszereles.length; i++) {
        const item = felszereles[i];
        draw(item, 390, startFrom - (i * 18))
    }
}

export async function CreatePDF(karakter: KarakterPdfView) {

    const existingPdfBytes = await fetch('/km_karakterlap_hysteria_1.2.pdf').then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)

    const fontBytes = await fetch('/Merienda-Regular.ttf').then(res => res.arrayBuffer())
    const pdfFont = await pdfDoc.embedFont(fontBytes)
    // const pdfFont = await pdfDoc.embedFont(StandardFonts.TimesNewRoman)
    const fontSizeBase = 12

    const page = pdfDoc.getPage(0)

    function drawText(text: string, x: number, y: number, fontScale = 1, shade = 0) {
        page.drawText(text, {
            x: x,
            y: y,
            size: fontSizeBase * fontScale,
            font: pdfFont,
            color: rgb(shade, shade, shade),
        })
    }

    drawBaseInfo(karakter, drawText);

    DrawTulajdonsagok(page, karakter.Tulajdonsagok, fontSizeBase, pdfFont);

    DrawMasodlagosErtekek(page, karakter, fontSizeBase, pdfFont);

    DrawMentok(page, karakter, fontSizeBase, pdfFont);

    DrawKepzettsegek(drawText, karakter.Kepzettsegek, 337);
    const nextKepzettsegFrom = 337 - (karakter.Kepzettsegek.length * 18)
    DrawKepzettsegek(drawText, karakter.TolvajKepzettsegek, nextKepzettsegFrom)

    DrawFelszereles(drawText, karakter.Felszereles)

    DrawFegyverek(karakter, pdfFont, fontSizeBase, page)

    DrawMagic(page, fontSizeBase, pdfFont, karakter.NapiMemorizalhatoVarazslatok, karakter.VarazslatMentokNF)

    const secondPage = pdfDoc.addPage()
    DrawOsztalySpecialsPage(secondPage, pdfFont, karakter)

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, karakter.Name + ".pdf", "application/pdf");
}

