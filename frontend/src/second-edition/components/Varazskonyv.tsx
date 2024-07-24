import {Osztaly2E} from "../domain-models/osztaly2E";
import {ClassSpells, KarakterVarazslat} from "../domain-models/varazslat";
import VarazskonyvSzint from "./VarazskonyvSzint";
import React from "react";

function getTitle(osztaly: Osztaly2E) : string {
    if (osztaly === Osztaly2E.Varazslo) {
        return "Varázslói Varázskönyv";
    }
    if (osztaly === Osztaly2E.Illuzionista) {
        return "Illúzionista Varázskönyv";
    }
    if (osztaly === Osztaly2E.Dalnok) {
        return "Dalnok tanult varázslatok";
    }
    if (osztaly === Osztaly2E.Vandor) {
        return "Vándor tanult varázslatok";
    }
    return ""
}

function Varazskonyv(props: { osztaly: Osztaly2E, varazslatok: KarakterVarazslat[] }) {
    const {osztaly, varazslatok} = props;

    const classSpells = ClassSpells(osztaly)
    const spells = varazslatok.map(v => classSpells.find(x => x.id === v.id)).filter(x => !!x)

    return <>
        <div className='row my-2'>
            <h4 className='col align-self-center'>{getTitle(osztaly)}</h4>
        </div>
        <VarazskonyvSzint osztaly={osztaly} level={0} varazslatok={varazslatok}/>
        {spells.some(v => v.szint === 0) && <VarazskonyvSzint osztaly={osztaly} level={1} varazslatok={varazslatok}/>}
        {spells.some(v => v.szint === 1) && <VarazskonyvSzint osztaly={osztaly} level={2} varazslatok={varazslatok}/>}
        {spells.some(v => v.szint === 2) && <VarazskonyvSzint osztaly={osztaly} level={3} varazslatok={varazslatok}/>}
        {spells.some(v => v.szint === 3) && <VarazskonyvSzint osztaly={osztaly} level={4} varazslatok={varazslatok}/>}
        {spells.some(v => v.szint === 4) && <VarazskonyvSzint osztaly={osztaly} level={5} varazslatok={varazslatok}/>}
    </>;
}

export default Varazskonyv
