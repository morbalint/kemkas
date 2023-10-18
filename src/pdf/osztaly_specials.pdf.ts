import {PDFFont, PDFPage, rgb} from "pdf-lib";
import {KarakterPdfView} from "./karakter_pdf_view";

export function DrawOsztalySpecialsPage(page: PDFPage, font: PDFFont, karakter: KarakterPdfView){
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
