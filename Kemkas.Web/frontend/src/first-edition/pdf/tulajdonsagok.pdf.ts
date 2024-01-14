import {PDFFont, PDFPage, rgb} from "pdf-lib";
import {SignedNumberToText} from "../../shared/components/Helpers";
import {KarakterTulajdonsagok, Modifier} from "../domain-models/tulajdonsag";

export function DrawTulajdonsagok(page: PDFPage, tulajdonsagok: KarakterTulajdonsagok, fontSizeBase: number, pdfFont: PDFFont) {
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
