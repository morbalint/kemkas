import React from "react";
import {KarakterVarazslat, Varazslat} from "../domain-models/varazslat";
import {getClassLevels} from "../domain-models/szintlepes";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {addVarazslat, characterSelector, setVarazslat} from "../domain-models/characterSlice";
import {Osztaly2E} from "../domain-models/osztaly2E";
import spells from "../data/spells.json";
import VarazslatSelector from "../display-components/VarazslatSelector";

//
// function VarazslatSzint(props: {
//     szint: number,
//     osztaly: Osztaly2E,
//     selected: string[]
// }) {
//     const {szint, osztaly, selected} = props
//
//     let classSpells: Varazslat[] = []
//
//     switch (osztaly) {
//         case Osztaly2E.Vandor:
//         case Osztaly2E.Varazslo:
//             classSpells = (spells.varazslo.tomor as Varazslat[])
//             break;
//         case Osztaly2E.Illuzionista:
//             classSpells = (spells.illuzionista.tomor as Varazslat[])
//             break;
//         case Osztaly2E.Dalnok:
//             classSpells = (spells.dalnok.tomor as Varazslat[])
//             break;
//         case Osztaly2E.Druida:
//             classSpells = (spells.druida.tomor as Varazslat[])
//             break;
//         case Osztaly2E.Pap:
//             classSpells = (spells.pap.tomor as Varazslat[])
//             break;
//     }
//
//
//     classSpells = classSpells.filter(v => v.szint === szint)
//
//     const selectedSpells = classSpells.filter(v => selected.includes(v.id))
//
// }

function Varazskonyv(props: {osztaly: Osztaly2E, varazslatok: KarakterVarazslat[] }) {
    const {osztaly, varazslatok } = props;

    const dispatch = useDispatch.withTypes<AppDispatch>()()

    let classSpells: Varazslat[] = []

    switch (osztaly) {
        case Osztaly2E.Vandor:
        case Osztaly2E.Varazslo:
            classSpells = (spells.varazslo.tomor as Varazslat[])
            break;
        case Osztaly2E.Illuzionista:
            classSpells = (spells.illuzionista.tomor as Varazslat[])
            break;
        case Osztaly2E.Dalnok:
            classSpells = (spells.dalnok.tomor as Varazslat[])
            break;
        case Osztaly2E.Druida:
            classSpells = (spells.druida.tomor as Varazslat[])
            break;
        case Osztaly2E.Pap:
            classSpells = (spells.pap.tomor as Varazslat[])
            break;
    }

    const firstLevel = classSpells.filter(v => v.szint === 1)
    const firstLevelSelected = varazslatok.map(v => {
        return firstLevel.find(x => x.id === v.id)
    }).filter(x => !!x)
    const firstLevelAvailable = firstLevel.filter(v => varazslatok.every(x => x.id !== v.id))

    return <>
        <h3>Varázslói Varázskönyv</h3>
        <h5>1. Szintű varázslatok</h5>
        {firstLevelSelected.map((v, i) => (
            <VarazslatSelector
                key={`${i}VarazslatSelector`}
                selected={v.id}
                available={[v, ...firstLevelAvailable]}
                dataTestId={`varazskonyv_varazslo_1_${v.id}`}
                onChange={(nextId) => dispatch(setVarazslat({prev: v.id, next: nextId}))}
            />))}
        <button className='btn btn-outline-dark'
                onClick={() => dispatch(addVarazslat(firstLevelAvailable[0].id))}>
            Új varázslat hozzáadása
        </button>
    </>;
}

function Varazslatok() {
    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const classLevels = getClassLevels(karakter.szintlepesek)


    return <>
        {classLevels[Osztaly2E.Varazslo] > 0 && <Varazskonyv osztaly={Osztaly2E.Varazslo} varazslatok={karakter.varazslatok} />}
    </>
}

export default Varazslatok;