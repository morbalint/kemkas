import {KarakterPdfView, KepzettsegPdfView} from "./karakter_pdf_view";
import {PDFDocument, rgb} from "pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import {SignedNumberToText} from "../../shared/components/Helpers";
import download from "downloadjs";
import {DrawTulajdonsagok} from "./tulajdonsagok.pdf";
import {DrawMentok} from "./mentok.pdf";
import {DrawMagic} from "./magic.pdf";
import {DrawMasodlagosErtekek} from './masodlagos_ertekek.pdf'
import {DrawOsztalySpecialsPage} from './osztaly_specials.pdf'
import {DrawFegyverek} from "./fegyverek.pdf";

function drawBaseInfo(karakter: KarakterPdfView, 
                      draw: (name: string, text: string, x : number ,y: number, width: number, scale: number) => void) {
    draw("nev", karakter.Name, 56, 704, 190, 1)
    draw("nem", karakter.Nem, 449, 704, 90, 11/12)
    draw("kor", karakter.Kor.toString(), 449, 687, 90, 11/12)
    draw("isten", karakter.Isten, 449, 669, 90, 11/12)
    draw("osztaly", karakter.Osztaly, 56, 668, 190, 1)
    draw("szint", karakter.Szint, 250, 669, 45, 3)
    draw("faj", karakter.Faj, 301, 704, 110, 1)
    draw("jellem", karakter.Jellem, 301, 669,  110,karakter.Jellem.length > 17 ? 11/12 : 1)
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
    
    const form = pdfDoc.getForm()
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

    function drawInputField(name: string, text: string, x: number, y: number, width: number, fontScale = 1) {
        let field = form.createTextField(`kemkas.1e.${name}`)
        field.addToPage(page, {
            x: x,
            y: y,
            font: pdfFont,
            height: pdfFont.heightAtSize(fontSizeBase * fontScale),
            width: width,
            borderWidth: 0,
            borderColor: rgb(0,0,0) 
        });
        field.disablePassword();
        field.disableMultiline();
        field.disableRichFormatting();
        field.disableFileSelection();
        field.disableSpellChecking();
        field.setFontSize(fontSizeBase * fontScale);
        field.setText(text);
    }
    
    drawBaseInfo(karakter, drawInputField);

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
    const fontBoldBytes = await fetch('/Merienda-Bold.ttf').then(res => res.arrayBuffer())
    const fontBold = await pdfDoc.embedFont(fontBoldBytes)
    DrawOsztalySpecialsPage(secondPage, pdfFont, fontBold, karakter)

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, karakter.Name + ".pdf", "application/pdf");
}

