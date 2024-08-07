import {KarakterPdfView} from "./karakter_pdf_view";
import {PDFDocument} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import download from "downloadjs";
import {SignedNumberToText} from "../../shared/components/Helpers";

export async function CreatePDF(karakter: KarakterPdfView) {
    const existingPdfBytes = await fetch('/pdfs/kem2karakterlap_form.pdf').then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)

    const fontBytes = await fetch('/fonts/Milonga-Regular.ttf').then(res => res.arrayBuffer())
    const pdfFont = await pdfDoc.embedFont(fontBytes)
    
    const form = pdfDoc.getForm()
    
    const osztalyok = karakter.Osztaly.length > 1 ? karakter.Osztaly.map(x => `${x.osztaly} (${x.szint})`).join(", ") : karakter.Osztaly[0].osztaly
    form.getTextField("nev_faj_osztaly").setText(`${karakter.Nev}, ${karakter.Faj} ${osztalyok}`)

    form.getTextField("szint").setText((karakter.SzintTotal.length > 1 ? " " : "  ") + karakter.SzintTotal)
    form.getTextField("jellem").setText(karakter.Jellem)
    form.getTextField("istenseg").setText(karakter.Isten)

    form.getTextField("vo").setText(karakter.VO.toString())
    form.getTextField("pancel").setText("   " + karakter.PancelVO)
    form.getTextField("pajzs").setText("   " + karakter.PajzsVO)
    form.getTextField("egyeb_vo").setText("   " + karakter.EgyebVO)

    form.getTextField("tul_ero").setText(`   ${karakter.Tulajdonsagok.t_ero}`)
    form.getTextField("tul_ero_mod").setText(SignedNumberToText(karakter.TulajdonsagModositok.t_ero))
    form.getTextField("tul_ugy").setText(`   ${karakter.Tulajdonsagok.t_ugy}`)
    form.getTextField("tul_ugy_mod").setText(SignedNumberToText(karakter.TulajdonsagModositok.t_ugy))
    form.getTextField("tul_egs").setText(`   ${karakter.Tulajdonsagok.t_egs}`)
    form.getTextField("tul_egs_mod").setText(SignedNumberToText(karakter.TulajdonsagModositok.t_egs))
    form.getTextField("tul_int").setText(`   ${karakter.Tulajdonsagok.t_int}`)
    form.getTextField("tul_int_mod").setText(SignedNumberToText(karakter.TulajdonsagModositok.t_int))
    form.getTextField("tul_bol").setText(`   ${karakter.Tulajdonsagok.t_bol}`)
    form.getTextField("tul_bol_mod").setText(SignedNumberToText(karakter.TulajdonsagModositok.t_bol))
    form.getTextField("tul_kar").setText(`   ${karakter.Tulajdonsagok.t_kar}`)
    form.getTextField("tul_kar_mod").setText(SignedNumberToText(karakter.TulajdonsagModositok.t_kar))

    form.getTextField("hp_rolls").setText(karakter.HPszintenkent.join(", "))
    form.getTextField("hp_aktualis").setText(karakter.HP.toString())

    form.getTextField("kitartas_alap").setText("   " + karakter.MentokAlap.kitartas.toString())
    form.getTextField("kitartas_mod").setText("  " + SignedNumberToText(karakter.MentoModositok.kitartas))
    form.getTextField("kitartas_sum").setText("  " + karakter.MentokModositokkal.kitartas.toString())

    form.getTextField("reflex_alap").setText("   " + karakter.MentokAlap.reflex.toString())
    form.getTextField("reflex_mod").setText("  " + SignedNumberToText(karakter.MentoModositok.reflex))
    form.getTextField("reflex_sum").setText("  " + karakter.MentokModositokkal.reflex.toString())

    form.getTextField("akaratero_alap").setText("   " + karakter.MentokAlap.akaratero.toString())
    form.getTextField("akaratero_mod").setText("  " + SignedNumberToText(karakter.MentoModositok.akaratero))
    form.getTextField("akaratero_sum").setText("  " + karakter.MentokModositokkal.akaratero.toString())

    form.getTextField("kezdemenyezes").setText(" " + SignedNumberToText(karakter.Kezdemenyezes))
    
    form.getTextField("tamadas_bonusz_alap").setText(karakter.TamadasBonuszAlap.join("/"))
    form.getTextField("tamadas_bonusz_ero").setText("  " + SignedNumberToText(karakter.TulajdonsagModositok.t_ero))
    form.getTextField("tamadas_bonusz_kozelharc").setText(karakter.KozelharciTB.join("/"))
    form.getTextField("tamadas_bonusz_ugy").setText("  " + SignedNumberToText(karakter.TulajdonsagModositok.t_ugy))
    form.getTextField("tamadas_bonusz_tavolsagi").setText(karakter.CelzoTB.join("/"))
    
    for (let i = 0; i < karakter.Kepzettsegek.length && i < 12; i++) {
        const kepzettseg = karakter.Kepzettsegek[i]
        form.getTextField(`kepzettseg_${i}_nev`).setText(kepzettseg.nev)
        form.getTextField(`kepzettseg_${i}_alap`).setText(kepzettseg.alap)
        form.getTextField(`kepzettseg_${i}_bonusz`).setText(kepzettseg.bonusz)
        form.getTextField(`kepzettseg_${i}_osszes`).setText(kepzettseg.osszes)
    }
    for (let i = 0; i < karakter.Fegyverek.length; i++) {
        form.getTextField(`fegyver_${i+1}`).setText(karakter.Fegyverek[i])
    }

    for (let i = 0; i < karakter.FelszerelesViselt.length && i < 8; i++) {
        form.getTextField(`viselt_${i}`).setText(karakter.FelszerelesViselt[i])
    }
    for (let i = 0; i < karakter.FelszerelesCipelt.length && i < 8; i++) {
        form.getTextField(`cipelt_${i}`).setText(karakter.FelszerelesCipelt[i])
    }
    for (let i = 0; i < karakter.FelszerelesAprosagok.length && i < 8; i++) {
        form.getTextField(`aprosagok_${i}`).setText(karakter.FelszerelesAprosagok[i])
    }

    form.getTextField('arany').setText(karakter.at.toString())
    form.getTextField('elektrum').setText(karakter.el.toString())
    form.getTextField('ezust').setText(karakter.et.toString())

    for (let i = 0; i < karakter.SpecialisKepessegek.length && i < 14; i+=2){
        const text = i+1 < karakter.SpecialisKepessegek.length
            ? `${karakter.SpecialisKepessegek[i]}, ${karakter.SpecialisKepessegek[i+1]}`
            : karakter.SpecialisKepessegek[i]
        form.getTextField(`specialis_kepessegek_${Math.floor(i/2)}`).setText(text)
    }

    if (karakter.Varazskonyv.length > 0) {
        form.getTextField('varazskonyv_nev_faj_osztaly_szint').setText(`${karakter.Nev}, ${karakter.Faj} ${osztalyok}`)
    }

    for (let i = 0; i < karakter.Varazskonyv.length && i < 6; i++) {
        const spell = karakter.Varazskonyv[i];
        form.getTextField(`varazskonyv_page1_spell${i}_nev`).setText(spell.nev)
        form.getTextField(`varazskonyv_page1_spell${i}_szint`).setText(spell.szint)
        form.getTextField(`varazskonyv_page1_spell${i}_hatoido`).setText(spell.hatoido)
        form.getTextField(`varazskonyv_page1_spell${i}_tav`).setText(spell.tav)
        form.getTextField(`varazskonyv_page1_spell${i}_terulet`).setText(spell.terulet)
        form.getTextField(`varazskonyv_page1_spell${i}_mento`).setText(spell.mento)
        for (let j = 0; j < spell.leiras.length && j < 5; j++) {
            form.getTextField(`varazskonyv_page1_spell${i}_leiras_${j}`).setText(spell.leiras[j])
        }
    }

    for (let i = 0; (i+6) < karakter.Varazskonyv.length && i < 7; i++){
        const spell = karakter.Varazskonyv[i+6];
        form.getTextField(`varazskonyv_page2_spell${i}_nev`).setText(spell.nev)
        form.getTextField(`varazskonyv_page2_spell${i}_szint`).setText(spell.szint)
        form.getTextField(`varazskonyv_page2_spell${i}_hatoido`).setText(spell.hatoido)
        form.getTextField(`varazskonyv_page2_spell${i}_tav`).setText(spell.tav)
        form.getTextField(`varazskonyv_page2_spell${i}_terulet`).setText(spell.terulet)
        form.getTextField(`varazskonyv_page2_spell${i}_mento`).setText(spell.mento)
        for (let j = 0; j < spell.leiras.length && j < 5; j++) {
            form.getTextField(`varazskonyv_page2_spell${i}_leiras_${j}`).setText(spell.leiras[j])
        }
    }

    form.updateFieldAppearances(pdfFont)

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, `${karakter.Nev}_${karakter.SzintTotal}.pdf`, "application/pdf");
}