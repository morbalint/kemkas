import {KarakterPdfView} from "./karakter_pdf_view";
import {PDFFont, PDFPage} from "pdf-lib";
import {SignedNumberToText} from "../components/Helpers";

function fitTextInWidth(font: PDFFont, text: string, startingSize: number, maxWidth: number): number {
    let size = startingSize
    while(font.widthOfTextAtSize(text, size) > maxWidth) {
        size--
    }
    return size
}

export function DrawFegyverek(karakter: KarakterPdfView, pdfFont: PDFFont, fontSizeBase: number, page: PDFPage) {
    const startFrom = 337
    for (let i = 0; i < karakter.Fegyverek.length && i < 3; i++) {
        const fegyver = karakter.Fegyverek[i];
        const size = fitTextInWidth(pdfFont, fegyver.Name, fontSizeBase, 60)
        page.drawText(fegyver.Name, {
            x: 200,
            y: startFrom - (i * 18) + ((18 - pdfFont.heightAtSize(size)) / 3),
            size: size,
            font: pdfFont,
        })
        page.drawText(SignedNumberToText(fegyver.TamadoBonusz), {
            x: 265,
            y: startFrom - (i * 18),
            size: fontSizeBase,
            font: pdfFont,
        })
        const damageSize = fitTextInWidth(pdfFont, fegyver.Damage, fontSizeBase, 24)
        page.drawText(fegyver.Damage, {
            x: 291,
            y: startFrom - (i * 18) + ((18 - pdfFont.heightAtSize(damageSize)) / 3),
            size: damageSize,
            font: pdfFont,
        })
        const critSize = fitTextInWidth(pdfFont, fegyver.Crit, fontSizeBase, 35)
        page.drawText(fegyver.Crit, {
            x: 318,
            y: startFrom - (i * 18) + ((18 - pdfFont.heightAtSize(critSize)) / 3),
            size: critSize,
            font: pdfFont,
        })
        page.drawText(fegyver.Range, {
            x: 360,
            y: startFrom - (i * 18),
            size: fontSizeBase,
            font: pdfFont,
        })
    }
}
