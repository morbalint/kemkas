import {KarakterPdfView, KepzettsegPdfView} from "./karakter_pdf_view";
import {PDFDocument, PDFFont, PDFPage, rgb} from "pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import {SignedNumberToText} from "../components/Helpers";
import {KarakterTulajdonsagok, Modifier} from "../domain-models/tulajdonsag";
import download from "downloadjs";

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

function DrawMagic(page: PDFPage, fontSizeBase: number, pdfFont: PDFFont, napiVarazslatok: number[], varazsMentokNF: number[]){
    for(let i = 0; i < 6; i++) {
        const y = 247 - (i*18)
        page.drawText(i.toString(), {
            x: 210,
            y: y,
            size: fontSizeBase,
            font: pdfFont,
            color: rgb(0, 0, 0),
        })
        if (i < napiVarazslatok.length) {
            page.drawText(napiVarazslatok[i].toString(), {
                x: 242,
                y: y,
                size: fontSizeBase,
                font: pdfFont,
                color: rgb(0, 0, 0),
            })
            page.drawText(varazsMentokNF[i].toString(), {
                x: 269,
                y: y,
                size: fontSizeBase,
                font: pdfFont,
                color: rgb(0, 0, 0),
            })
        }
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

    function getFontSize(length: number): number {
        switch (length) {
            case 1:
            case 2:
                return 24;
            case 3:
                return 18;
            case 4:
                return 14;
            case 5:
                return 11;
            case 6:
                return 9;
            case 7:
                return 8;
            default:
                return 6;
        }
    }
    function getYOffset(length: number): number {
        return Math.min(length-2, 6);
    }

    const kozelHarciFontSize = getFontSize(kozelharciTB.length)
    page.drawText(kozelharciTB, {
        x: kozelharciTB.length > 4 ? 256 : 258,
        y: 383 + getYOffset(kozelharciTB.length),
        size: kozelHarciFontSize,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    const celzoTB = karakter.CelzoTB.map(SignedNumberToText).join("/")
    const celzoFontSize = getFontSize(celzoTB.length)
    page.drawText(celzoTB, {
        x: celzoTB.length > 4 ? 343 : 346,
        y: 383 + getYOffset(celzoTB.length),
        size: celzoFontSize,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })

    drawMentok(page, karakter, fontSizeBase, pdfFont);

    DrawKepzettsegek(drawText, karakter.Kepzettsegek, 337);
    const nextKepzettsegFrom = 337 - (karakter.Kepzettsegek.length * 18)
    DrawKepzettsegek(drawText, karakter.TolvajKepzettsegek, nextKepzettsegFrom)

    DrawMagic(page, fontSizeBase, pdfFont, karakter.NapiMemorizalhatoVarazslatok, karakter.VarazslatMentokNF)

    page.drawText(karakter.PancelVO.toString(), {
        x: 512,
        y: 515,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.PajzsVO.toString(), {
        x: 512,
        y: 482,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })

    const secondPage = pdfDoc.addPage()
    DrawSecondPage(secondPage, pdfFont, karakter)


    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, karakter.Name + ".pdf", "application/pdf");
}

function DrawSecondPage(page: PDFPage, font: PDFFont, karakter: KarakterPdfView){
    const baseFontSize = 12
    const titleFontSize = baseFontSize * 3
    const pageCenterX = page.getWidth()/2
    const titleWidth = font.widthOfTextAtSize(karakter.Osztaly, titleFontSize)
    const titleX = pageCenterX - (titleWidth / 2)
    page.drawText(karakter.Osztaly, {
        x: titleX,
        y: 770,
        size: titleFontSize,
        font: font,
        color: rgb(0, 0, 0),
    })
    let rows = 0
    // const margin = 30
    // const textWidth = page.getWidth() - 2*margin;
    for (let i = 0; i < karakter.OsztalySkills.length; i++) {
        const skill = karakter.OsztalySkills[i];
        page.drawText(skill.Name, {
            x: 30,
            y: 720 - rows,
            size: baseFontSize,
            font: font,
            color: rgb(0, 0, 0),
        })
        page.drawText(skill.Description, {
            x: 30,
            y: 700 - rows,
            size: baseFontSize,
            font: font,
            lineHeight: 16,
            color: rgb(0, 0, 0),
            // maxWidth: textWidth,
            // wordBreaks: [' ', '-']
        })
        // rows += Math.ceil(font.widthOfTextAtSize(skill.Description, baseFontSize)/textWidth)*20 + 30
        rows += skill.Description.split('\n').length*16 + 30
    }
}
