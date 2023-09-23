import {KarakterPdfView} from "../domain-models/karakter";
import {PDFDocument, PDFFont, PDFPage, rgb} from "pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import {OsztalyLabel} from "../domain-models/osztaly";
import {FajLabel} from "../domain-models/faj";
import {SignedNumberToText} from "../components/Helpers";
import {KarakterTulajdonsagok, Modifier} from "../domain-models/tulajdonsag";
import download from "downloadjs";
import {Kepzettseg} from "../domain-models/kepzettsegek";

function drawTulajdonsagok(page: PDFPage, tulajdonsagok: KarakterTulajdonsagok, fontSizeBase: number, pdfFont: PDFFont) {
    page.drawText(tulajdonsagok.t_ero.toString(), {
        x: 130,
        y: 613,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(tulajdonsagok.t_ero)), {
        x: 176,
        y: 613,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(tulajdonsagok.t_ugy.toString(), {
        x: 130,
        y: 580,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(tulajdonsagok.t_ugy)), {
        x: 176,
        y: 580,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(tulajdonsagok.t_egs.toString(), {
        x: 130,
        y: 547,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(tulajdonsagok.t_egs)), {
        x: 176,
        y: 547,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(tulajdonsagok.t_int.toString(), {
        x: 130,
        y: 515,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(tulajdonsagok.t_int)), {
        x: 176,
        y: 515,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(tulajdonsagok.t_bol.toString(), {
        x: 130,
        y: 482,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(tulajdonsagok.t_bol)), {
        x: 176,
        y: 482,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(tulajdonsagok.t_kar.toString(), {
        x: 130,
        y: 449,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(tulajdonsagok.t_kar)), {
        x: 176,
        y: 449,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
}

function drawMentok(page: PDFPage, karakter: KarakterPdfView, fontSizeBase: number, pdfFont: PDFFont) {
    const mentokAlap = karakter.MentokAlap
    page.drawText(SignedNumberToText(mentokAlap.kitartas), {
        x: 435,
        y: 613,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(mentokAlap.reflex), {
        x: 435,
        y: 580,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(mentokAlap.akaratero), {
        x: 435,
        y: 547,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_egs)), {
        x: 475,
        y: 613,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_ugy)), {
        x: 475,
        y: 580,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_bol)), {
        x: 475,
        y: 547,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    const mentok = karakter.MentokModositokkal
    page.drawText(SignedNumberToText(mentok.kitartas), {
        x: 515,
        y: 613,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(mentok.reflex), {
        x: 515,
        y: 580,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(mentok.akaratero), {
        x: 515,
        y: 547,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
}

function drawBaseInfo(karakter: KarakterPdfView, draw: (text: string, x : number ,y: number, scale: number) => void) {
    draw(karakter.Name, 60, 710, 1)
    draw(karakter.Nem, 454, 710, 1)
    draw(karakter.Kor.toString(), 454, 690, 1)
    draw(karakter.Isten, 454, 670, 1)
    draw(OsztalyLabel(karakter.Osztaly), 60, 672, 1)
    draw(karakter.Szint.toString(), 264, 682, 3)
    draw(FajLabel(karakter.Faj), 304, 710, 1)
}

function DrawKepzettsegek(page: PDFPage, fontSizeBase: number, pdfFont: PDFFont, kepzettsegek: Kepzettseg[], tulajdonsagok: KarakterTulajdonsagok, szint: number, startFrom: number) {
    for (let i = 0; i < kepzettsegek.length; i++) {
        let kepzettseg = kepzettsegek[i]
        page.drawText(kepzettseg.Name, {
            x: 60,
            y: startFrom - (i * 18),
            size: fontSizeBase,
            font: pdfFont,
            color: rgb(0, 0, 0),
        })
        const tulajdonsagErtek = kepzettseg.Tulajdonsag.reduce((maxTulajdonsagErtek, currentTulajdonsag) =>
                (tulajdonsagok[currentTulajdonsag] > maxTulajdonsagErtek)
                    ? tulajdonsagok[kepzettseg.Tulajdonsag[i]]
                    : maxTulajdonsagErtek,
            tulajdonsagok[kepzettseg.Tulajdonsag[0]])

        const kepzettsegModifier = SignedNumberToText(Modifier(tulajdonsagErtek) + szint)
        page.drawText(kepzettsegModifier, {
            x: kepzettsegModifier.length > 2 ? 172 : 175,
            y: startFrom - (i * 18),
            size: fontSizeBase,
            font: pdfFont,
            color: rgb(0, 0, 0),
        })
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

    drawTulajdonsagok(page, karakter.Tulajdonsagok, fontSizeBase, pdfFont);

    page.drawText(karakter.Mozgas.toString(), {
        x: 162,
        y: 416,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.Kezdemenyezes), {
        x: 505,
        y: 416,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.HP.toString(), {
        x: 318,
        y: 517,
        size: fontSizeBase * 1.5,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.VO.toString(), {
        x: 368,
        y: 495,
        size: fontSizeBase * 3,
        font: pdfFont,
        color: rgb(0.75, 0.75, 0.75),
    })
    const kozelharciTB = karakter.KozelharciTB.map(SignedNumberToText).join("/")
    page.drawText(kozelharciTB, {
        x: 254,
        y: kozelharciTB.length > 2 ? 386 : 382,
        size: kozelharciTB.length > 2 ? fontSizeBase : fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    const celzoTB = karakter.CelzoTB.map(SignedNumberToText).join("/")
    page.drawText(celzoTB, {
        x: 344,
        y: celzoTB.length > 2 ? 386 : 382,
        size: celzoTB.length > 5 ? fontSizeBase * 0.5 : celzoTB.length > 2 ? fontSizeBase : fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })

    drawMentok(page, karakter, fontSizeBase, pdfFont);

    DrawKepzettsegek(page, fontSizeBase, pdfFont, karakter.Kepzettsegek, karakter.Tulajdonsagok, karakter.Szint, 337);
    const nextKepzettsegFrom = 337 - (karakter.Kepzettsegek.length * 18)
    DrawKepzettsegek(page, fontSizeBase, pdfFont, karakter.TolvajKepzettsegek, karakter.Tulajdonsagok, karakter.Szint, nextKepzettsegFrom)

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, karakter.Name + ".pdf", "application/pdf");
}
