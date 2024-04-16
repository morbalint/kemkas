import {Fegyver} from "./felszereles";

export function FegyverFlags(fegyver: Fegyver): string {
    const flags = [] as string[]
    if (fegyver.Megterheltseg) {
        flags.push("M")
    }
    if (fegyver.Harcos) {
        flags.push("H")
    }
    if (fegyver.Masfelkezes) {
        flags.push("1½K")
    }
    if (fegyver.Ketkezes) {
        if (fegyver.Type === "kozelharci") {
            flags.push("2K")
        } else {
            if (fegyver.KetkezesBonusz) {
                flags.push("2KB")
            } else {
                flags.push("2KN")
            }
        }
    }
    if (fegyver.HarciManover) {
        flags.push("+2 HM")
    }
    if (fegyver.Alakzat){
        flags.push("AL")
    }
    if (fegyver.Hosszu) {
        flags.push("HO")
    }
    if (fegyver.Kabito) {
        flags.push("KO")
    }
    if (fegyver.LovasRoham) {
        flags.push("LR")
    }
    if (fegyver.PancelToro) {
        flags.push("PT")
    }
    if (fegyver.PajzsZuzo) {
        flags.push("PZ")
    }
    if (fegyver.Rohamtoro) {
        flags.push("RT")
    }
    return flags.join(' ');
}
