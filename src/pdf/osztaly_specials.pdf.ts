import {PDFFont, PDFPage, rgb, breakTextIntoLines} from "pdf-lib";
import {KarakterPdfView} from "./karakter_pdf_view";
import {Skill} from "../domain-models/osztaly";

const maxWidth = 540

function drawExtendedSkillDescription(skill: Skill, font: PDFFont, baseFontSize: number, page: PDFPage, rows: number) {
    const indent = 20
    for (let j = 0; j < (skill.ExtendedDescription?.length || 0); j++) {
        const paragraph = `${j + 1}. ${skill.ExtendedDescription![j]}`
        const lines = breakTextIntoLines(paragraph, [' ', '-'], maxWidth - indent, (s) => font.widthOfTextAtSize(s, baseFontSize))
        page.drawText(paragraph, {
            x: 30 + indent,
            y: 700 - rows,
            size: baseFontSize,
            font: font,
            lineHeight: 16,
            color: rgb(0, 0, 0),
            maxWidth: maxWidth - indent,
            wordBreaks: [' ', '-']
        })
        rows += lines.length * font.heightAtSize(baseFontSize)
    }
    return rows;
}

export function DrawOsztalySpecialsPage(page: PDFPage, font: PDFFont, fontBold: PDFFont, karakter: KarakterPdfView): number{
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
    for (let i = 0; i < karakter.OsztalySkills.length; i++) {
        const skill = karakter.OsztalySkills[i];
        page.drawText(skill.Name, {
            x: 30,
            y: 720 - rows,
            size: baseFontSize,
            font: fontBold,
            color: rgb(0, 0, 0),
        })
        const lines = breakTextIntoLines(skill.Description, [' ', '-'], maxWidth, (s) => font.widthOfTextAtSize(s, baseFontSize))
        page.drawText(skill.Description, {
            x: 30,
            y: 700 - rows,
            size: baseFontSize,
            font: font,
            lineHeight: 16,
            color: rgb(0, 0, 0),
            maxWidth: maxWidth,
            wordBreaks: [' ', '-']
        })
        // rows += Math.ceil(font.widthOfTextAtSize(skill.Description, baseFontSize)/textWidth)*20 + 30
        // rows += skill.Description.split('\n').length*16 + 30
        rows += lines.length * font.heightAtSize(baseFontSize)
        rows = drawExtendedSkillDescription(skill, font, baseFontSize, page, rows);
        rows += 24 // for title and spacing
    }
    return rows
}
