import {PDFFont, PDFPage} from "pdf-lib";
import {KarakterPdfView} from "./karakter_pdf_view";
import {SignedNumberToText} from "../components/Helpers";

function drawFegyverek(karakter: KarakterPdfView, pdfFont: PDFFont, fontSizeBase: number, page: PDFPage) {
    const startFrom = 337
    for (let i = 0; i < karakter.Fegyverek.length && i < 3; i++) {
        const fegyver = karakter.Fegyverek[i];
        const simplifiedName = fegyver.Name.includes('és') ? fegyver.Name.split(' ')[0] : fegyver.Name
        const size = fitTextInWidth(pdfFont, simplifiedName, fontSizeBase, 60)
        page.drawText(simplifiedName, {
            x: 200,
            y: startFrom - (i * 18) + ((18 - pdfFont.heightAtSize(size)) / 3),
            size: size,
            font: pdfFont,
        })
        const tb = SignedNumberToText(fegyver.Type === 'kozelharci' ? karakter.KozelharciTB[0] : karakter.CelzoTB[0])
        page.drawText(tb, {
            x: 265,
            y: startFrom - (i * 18),
            size: fontSizeBase,
            font: pdfFont,
        })
        const damage = `${fegyver.NumberOfDamageDice > 1 ? fegyver.NumberOfDamageDice.toString() : ''}d${fegyver.DamageDice}${fegyver.Type === 'kozelharci' && karakter.TulajdonsagModositok.t_ero > 0 ? ` + ${karakter.TulajdonsagModositok.t_ero}` : ''}`
        const damageSize = fitTextInWidth(pdfFont, damage, fontSizeBase, 24)
        if (damageSize !== fontSizeBase) {
            console.log('font size: ', damageSize)
            console.log('width of text: ', pdfFont.widthOfTextAtSize(damage, damageSize))
        }
        page.drawText(damage, {
            x: 291,
            y: startFrom - (i * 18) + ((18 - pdfFont.heightAtSize(damageSize)) / 3),
            size: damageSize,
            font: pdfFont,
        })
        const crit = `${fegyver.CritRangeStart < 20 ? `${fegyver.CritRangeStart}-20` : '20'} x${fegyver.CritMultiplier}`
        const critSize = fitTextInWidth(pdfFont, crit, fontSizeBase, 35)
        page.drawText(crit, {
            x: 318,
            y: startFrom - (i * 18) + ((18 - pdfFont.heightAtSize(critSize)) / 3),
            size: critSize,
            font: pdfFont,
        })
        const range = fegyver.Range === 0 ? '-' : fegyver.Range.toString()
        page.drawText(range, {
            x: 360,
            y: startFrom - (i * 18),
            size: fontSizeBase,
            font: pdfFont,
        })
    }
}

export function DrawMasodlagosErtekek(
    page: PDFPage,
    karakter: KarakterPdfView,
    fontSizeBase: number,
    pdfFont: PDFFont)
{
    page.drawText(karakter.Mozgas.toString(), {
        x: 162,
        y: 416,
        size: fontSizeBase * 2,
        font: pdfFont,
    })
    page.drawText(SignedNumberToText(karakter.Kezdemenyezes), {
        x: 505,
        y: 416,
        size: fontSizeBase * 2,
        font: pdfFont,
    })
    page.drawText(karakter.HP.toString(), {
        x: 318,
        y: 517,
        size: fontSizeBase * 1.5,
        font: pdfFont,
    })
    page.drawText(karakter.VO.toString(), {
        x: 368,
        y: 495,
        size: fontSizeBase * 3,
        font: pdfFont,
    })
    page.drawText(karakter.PancelVO.toString(), {
        x: 512,
        y: 515,
        size: fontSizeBase * 2,
        font: pdfFont,
    })
    page.drawText(karakter.PajzsVO.toString(), {
        x: 512,
        y: 482,
        size: fontSizeBase * 2,
        font: pdfFont,
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
        return Math.min(length - 2, 6);
    }

    const kozelHarciFontSize = getFontSize(kozelharciTB.length)
    page.drawText(kozelharciTB, {
        x: kozelharciTB.length > 4 ? 256 : 258,
        y: 383 + getYOffset(kozelharciTB.length),
        size: kozelHarciFontSize,
        font: pdfFont,
    })
    const celzoTB = karakter.CelzoTB.map(SignedNumberToText).join("/")
    const celzoFontSize = getFontSize(celzoTB.length)
    page.drawText(celzoTB, {
        x: celzoTB.length > 4 ? 343 : 346,
        y: 383 + getYOffset(celzoTB.length),
        size: celzoFontSize,
        font: pdfFont,
    })

    drawFegyverek(karakter, pdfFont, fontSizeBase, page);
}

function fitTextInWidth(font: PDFFont, text: string, startingSize: number, maxWidth: number): number {
    let size = startingSize
    while(font.widthOfTextAtSize(text, size) > maxWidth) {
        size--
    }
    return size
}
