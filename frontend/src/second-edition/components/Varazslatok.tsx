import React from "react";
import {KarakterVarazslat, Varazslat} from "../domain-models/varazslat";
import {getClassLevels} from "../domain-models/szintlepes";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {addVarazslat, characterSelector, setVarazslatok} from "../domain-models/characterSlice";
import {Osztaly2E} from "../domain-models/osztaly2E";
import spells from "../data/spells.json";
import VarazslatSelector from "../display-components/VarazslatSelector";
import {arraySetN} from "../../util";
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

function Varazskonyv(props: {osztaly: Osztaly2E, varazsloSzint: number, varazslatok: KarakterVarazslat[] }) {
    const {osztaly, varazsloSzint, varazslatok } = props;

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
    const firstLevelSelected = firstLevel.filter(v => varazslatok.some(x => x.id === v.id))
    const firstLevelAvailable = firstLevel.filter(v => varazslatok.every(x => x.id !== v.id))

    const createOnChange = (idx: number, allSelected: string[]) => (selected: string) => {
        const nextVarazslatok: KarakterVarazslat[] = arraySetN(allSelected, idx, selected).map(x => ({
            id: x,
            bekeszitve: false,
        }))
        dispatch(setVarazslatok(nextVarazslatok))
    }

    return <>
        <h3>Varazsloi Varazskonyv</h3>
        <h5>1. Szintu varazslatok</h5>
        {firstLevelSelected.map((v, i) => (
            <VarazslatSelector
                selected={v.id}
                available={[v, ...firstLevelAvailable]}
                dataTestId={`varazskonyv_varazslo_1_${v.id}`}
                onChange={createOnChange(i, varazslatok.map(x => x.id))}
            />)) }
        {firstLevelSelected.length < varazsloSzint &&
            <button className='btn btn-outline-dark' onClick={() => dispatch(addVarazslat({id: firstLevelAvailable[0].id, bekeszitve: false}))} >Uj varazslat hozzadasa</button>}
    </>;
}

function Varazslatok() {
    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const classLevels = getClassLevels(karakter.szintlepesek)


    return <>
        {classLevels[Osztaly2E.Varazslo] > 0 && <Varazskonyv osztaly={Osztaly2E.Varazslo} varazsloSzint={classLevels[Osztaly2E.Varazslo]} varazslatok={karakter.varazslatok} />}
    </>
}

export default Varazslatok;