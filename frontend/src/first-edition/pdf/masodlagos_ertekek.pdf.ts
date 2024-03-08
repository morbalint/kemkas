import {PDFFont, PDFPage} from "pdf-lib";
import {KarakterPdfView} from "./karakter_pdf_view";
import {SignedNumberToText} from "../../shared/components/Helpers";

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
}
