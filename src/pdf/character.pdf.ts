import {Karakter} from "../domain-models/karakter";
import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import {OsztalyLabel} from "../domain-models/osztaly";
import {FajLabel} from "../domain-models/faj";
import {SignedNumberToText} from "../components/Helpers";
import {Modifier} from "../domain-models/tulajdonsag";
import download from "downloadjs";

export async function CreatePDF(karakter: Karakter) {

    const existingPdfBytes = await fetch('/km_karakterlap_hysteria_1.2.pdf').then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const page = pdfDoc.getPage(0)
    const fontSize = 12
    page.drawText(karakter.Name, {
        x: 60,
        y: 710,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(OsztalyLabel(karakter.Osztaly), {
        x: 60,
        y: 672,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText('1', {
        x: 264,
        y: 682,
        size: fontSize * 3,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(FajLabel(karakter.Faj), {
        x: 304,
        y: 710,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_ero.toString(), {
        x: 130,
        y: 613,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_ero)), {
        x: 176,
        y: 613,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_ugy.toString(), {
        x: 130,
        y: 580,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_ugy)), {
        x: 176,
        y: 580,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_egs.toString(), {
        x: 130,
        y: 547,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_egs)), {
        x: 176,
        y: 547,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_int.toString(), {
        x: 130,
        y: 515,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_int)), {
        x: 176,
        y: 515,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_bol.toString(), {
        x: 130,
        y: 482,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_bol)), {
        x: 176,
        y: 482,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_kar.toString(), {
        x: 130,
        y: 449,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_kar)), {
        x: 176,
        y: 449,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })

    page.drawText(karakter.Mozgas().toString(), {
        x: 162,
        y: 416,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.Kezdemenyezes()), {
        x: 505,
        y: 416,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.HP().toString(), {
        x: 318,
        y: 517,
        size: fontSize * 1.5,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.VO().toString(), {
        x: 368,
        y: 495,
        size: fontSize * 3,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.KozelharciTB()), {
        x: 258,
        y: 382,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.CelzoTB()), {
        x: 347,
        y: 382,
        size: fontSize * 2,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })

    page.drawText(SignedNumberToText(karakter.KitartasMentoAlap()), {
        x: 435,
        y: 613,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.ReflexMentoAlap()), {
        x: 435,
        y: 580,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.AkarateroMentoAlap()), {
        x: 435,
        y: 547,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_egs)), {
        x: 475,
        y: 613,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_ugy)), {
        x: 475,
        y: 580,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_bol)), {
        x: 475,
        y: 547,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.KitartasMentoAlap() + Modifier(karakter.Tulajdonsagok.t_egs)), {
        x: 515,
        y: 613,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.ReflexMentoAlap() + Modifier(karakter.Tulajdonsagok.t_ugy)), {
        x: 515,
        y: 580,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.AkarateroMentoAlap() + Modifier(karakter.Tulajdonsagok.t_bol)), {
        x: 515,
        y: 547,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, karakter.Name + ".pdf", "application/pdf");
}
