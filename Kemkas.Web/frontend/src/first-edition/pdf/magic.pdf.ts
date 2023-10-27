import {PDFFont, PDFPage, rgb} from "pdf-lib";

export function DrawMagic(page: PDFPage, fontSizeBase: number, pdfFont: PDFFont, napiVarazslatok: number[], varazsMentokNF: number[]){
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
