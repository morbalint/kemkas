import {Karakter} from "../domain-models/karakter";
import {PDFDocument, rgb} from "pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import {OsztalyLabel} from "../domain-models/osztaly";
import {FajLabel} from "../domain-models/faj";
import {SignedNumberToText} from "../components/Helpers";
import {Modifier} from "../domain-models/tulajdonsag";
import download from "downloadjs";
import {Kepzettseg} from "../domain-models/kepzettsegek";

export async function CreatePDF(karakter: Karakter) {

    const existingPdfBytes = await fetch('/km_karakterlap_hysteria_1.2.pdf').then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)

    const fontBytes = await fetch('/Merienda-Regular.ttf').then(res => res.arrayBuffer())
    const pdfFont = await pdfDoc.embedFont(fontBytes)
    // const pdfFont = await pdfDoc.embedFont(StandardFonts.TimesNewRoman)
    const fontSizeBase = 12

    const page = pdfDoc.getPage(0)

    page.drawText(karakter.Name, {
        x: 60,
        y: 710,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(OsztalyLabel(karakter.Osztaly), {
        x: 60,
        y: 672,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Szint.toString(), {
        x: 264,
        y: 682,
        size: fontSizeBase * 3,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(FajLabel(karakter.Faj), {
        x: 304,
        y: 710,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_ero.toString(), {
        x: 130,
        y: 613,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_ero)), {
        x: 176,
        y: 613,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_ugy.toString(), {
        x: 130,
        y: 580,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_ugy)), {
        x: 176,
        y: 580,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_egs.toString(), {
        x: 130,
        y: 547,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_egs)), {
        x: 176,
        y: 547,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_int.toString(), {
        x: 130,
        y: 515,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_int)), {
        x: 176,
        y: 515,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_bol.toString(), {
        x: 130,
        y: 482,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_bol)), {
        x: 176,
        y: 482,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.Tulajdonsagok.t_kar.toString(), {
        x: 130,
        y: 449,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(Modifier(karakter.Tulajdonsagok.t_kar)), {
        x: 176,
        y: 449,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })

    page.drawText(karakter.Mozgas().toString(), {
        x: 162,
        y: 416,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.Kezdemenyezes()), {
        x: 505,
        y: 416,
        size: fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.HP().toString(), {
        x: 318,
        y: 517,
        size: fontSizeBase * 1.5,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(karakter.VO().toString(), {
        x: 368,
        y: 495,
        size: fontSizeBase * 3,
        font: pdfFont,
        color: rgb(0.5, 0.5, 0.5),
    })
    const kozelharciTB = SignedNumberToText(karakter.KozelharciTB())
    page.drawText(kozelharciTB, {
        x: 258,
        y: 382,
        size: kozelharciTB.length > 2 ? (fontSizeBase * 1.5) : fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    const celzoTB = SignedNumberToText(karakter.CelzoTB())
    page.drawText(celzoTB, {
        x: 347,
        y: 382,
        size: celzoTB.length > 2 ? (fontSizeBase * 1.5) : fontSizeBase * 2,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })

    page.drawText(SignedNumberToText(karakter.KitartasMentoAlap()), {
        x: 435,
        y: 613,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.ReflexMentoAlap()), {
        x: 435,
        y: 580,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.AkarateroMentoAlap()), {
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
    page.drawText(SignedNumberToText(karakter.KitartasMentoAlap() + Modifier(karakter.Tulajdonsagok.t_egs)), {
        x: 515,
        y: 613,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.ReflexMentoAlap() + Modifier(karakter.Tulajdonsagok.t_ugy)), {
        x: 515,
        y: 580,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(SignedNumberToText(karakter.AkarateroMentoAlap() + Modifier(karakter.Tulajdonsagok.t_bol)), {
        x: 515,
        y: 547,
        size: fontSizeBase,
        font: pdfFont,
        color: rgb(0, 0, 0),
    })

    function DrawKepzettsegek(kepzettsegek: Kepzettseg[], startFrom: number) {
        for (let i = 0; i < kepzettsegek.length; i++) {
            let kepzettseg = kepzettsegek[i]
            page.drawText(kepzettseg.Name, {
                x: 60,
                y: startFrom - (i * 18),
                size: fontSizeBase,
                font: pdfFont,
                color: rgb(0, 0, 0),
            })
            const tulajdonsagErtek = kepzettseg.Tulajdonsag.reduce((maxTulajdonsagErtek, currentTulajdonsag) =>
                (karakter.Tulajdonsagok[currentTulajdonsag] > maxTulajdonsagErtek)
                    ? karakter.Tulajdonsagok[kepzettseg.Tulajdonsag[i]]
                    : maxTulajdonsagErtek,
                karakter.Tulajdonsagok[kepzettseg.Tulajdonsag[0]])

            const kepzettsegModifier = SignedNumberToText(Modifier(tulajdonsagErtek) + karakter.Szint)
            page.drawText(kepzettsegModifier, {
                x: kepzettsegModifier.length > 2 ? 172 : 175,
                y: startFrom - (i * 18),
                size: fontSizeBase,
                font: pdfFont,
                color: rgb(0, 0, 0),
            })
        }
    }

    DrawKepzettsegek(karakter.Kepzettsegek, 337);
    const nextKepzettsegFrom = 337 - (karakter.Kepzettsegek.length * 18)
    DrawKepzettsegek(karakter.TolvajKepzettsegek, nextKepzettsegFrom)

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, karakter.Name + ".pdf", "application/pdf");
}
