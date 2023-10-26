import {PDFFont, PDFPage, rgb} from "pdf-lib";
import {KarakterPdfView} from "./karakter_pdf_view";
import {SignedNumberToText} from "../components/Helpers";
import {Modifier} from "../domain-models/tulajdonsag";

export function DrawMentok(page: PDFPage, karakter: KarakterPdfView, fontSizeBase: number, pdfFont: PDFFont) {
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
