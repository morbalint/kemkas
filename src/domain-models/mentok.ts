export interface Mentok {
    kitartas: number
    reflex: number
    akaratero: number
}
export type MentoTipus = keyof Mentok

export function MentoTipusLabel(tipus: MentoTipus): string {
    let label: string | null = null
    switch (tipus) {
        case "akaratero":
            label = "Akaraterő";
            break;
        case "kitartas":
            label = "Kitartás";
            break;
        case "reflex":
            label = "Reflex";
            break;
    }
    return label
}

export function ElsodlegesMento(szint: number): number {
    return Math.min(Math.floor(2 + szint / 2), 10);
}

export function MasodlagosMento(szint: number): number {
    return Math.floor(szint / 3)
}