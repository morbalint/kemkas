import MemorizaltVarazslatTabla from "./memorizalt_varazslat_tabla.json";
import {KarakterInputs} from "./karakter";
import {Osztaly} from "./osztaly";
import {Modifier} from "./tulajdonsag";

function isSpellcaster(osztaly: Osztaly): boolean {
    return osztaly === Osztaly.Pap || osztaly === Osztaly.Illuzionista || osztaly === Osztaly.Varazslo;
}

function getMagicAbilityModifier(karakter: Pick<KarakterInputs, 'osztaly' | 'tulajdonsagok'>) : number {
    const magicAbility = karakter.osztaly === Osztaly.Pap ? karakter.tulajdonsagok.t_bol : karakter.tulajdonsagok.t_int
    return Modifier(magicAbility)
}

export function NapiVarazslatok(karakter: Pick<KarakterInputs, 'szint' | 'osztaly' | 'tulajdonsagok'>) : number[] {
    if (!isSpellcaster(karakter.osztaly)) {
        return []
    }
    const magicAbilityModifier = getMagicAbilityModifier(karakter)
    const response = [...MemorizaltVarazslatTabla.varazslatok[karakter.szint-1]]
    for (let i = 1; i <= magicAbilityModifier && i < response.length; i++){
        response[i] += 1
    }
    return response
}

export function CalculateVarazslatMentokNF(karakter: Pick<KarakterInputs, 'osztaly' | 'tulajdonsagok'>): number[] {
    if (!isSpellcaster(karakter.osztaly)) {
        return []
    }
    const magicAbilityModifier = getMagicAbilityModifier(karakter)
    const response = []
    for (let spellLevel = 0; spellLevel < 6; spellLevel++){
        const NF = 10 + spellLevel + magicAbilityModifier
        response.push(NF)
    }
    return response
}