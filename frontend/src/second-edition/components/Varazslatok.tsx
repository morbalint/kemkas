import React from "react";
import {ClassSpells, KarakterVarazslat} from "../domain-models/varazslat";
import {getClassLevels} from "../domain-models/szintlepes";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {addVarazslat, characterSelector, setVarazslat} from "../domain-models/characterSlice";
import {Osztaly2E} from "../domain-models/osztaly2E";
import VarazslatSelector from "../display-components/VarazslatSelector";

function VarazskonyvSzint(props: {osztaly: Osztaly2E, level: number, varazslatok: KarakterVarazslat[]}) {
    const {level, osztaly, varazslatok} = props;
    const dispatch = useDispatch.withTypes<AppDispatch>()()

    const classSpells = ClassSpells(osztaly)
    const leveledSpells = classSpells.filter(v => v.szint === level)
    const selectedSpells = varazslatok.map(v => {
        return leveledSpells.find(x => x.id === v.id)
    }).filter(x => !!x)
    const availableSpells = leveledSpells.filter(v => varazslatok.every(x => x.id !== v.id))

    return <>
        <h5>{level}. Szintű varázslatok</h5>
        {selectedSpells.map((v, i) => (
            <VarazslatSelector
                key={`${i}VarazslatSelector`}
                selected={v.id}
                available={[v, ...availableSpells]}
                dataTestId={`varazskonyv_varazslo_1_${v.id}`}
                onChange={(nextId) => dispatch(setVarazslat({prev: v.id, next: nextId}))}
            />))}
        {availableSpells.length > 0 && <button className='btn btn-outline-dark'
                onClick={() => dispatch(addVarazslat(availableSpells[0].id))}>
            Új varázslat hozzáadása
        </button>}
    </>;

}

function Varazskonyv(props: {osztaly: Osztaly2E, varazslatok: KarakterVarazslat[] }) {
    const {osztaly, varazslatok } = props;

    const classSpells = ClassSpells(osztaly)
    const spells = varazslatok.map(v => classSpells.find(x => x.id === v.id)).filter(x => !!x)

    return <>
        <h3>Varázslói Varázskönyv</h3>
        <VarazskonyvSzint osztaly={osztaly} level={0} varazslatok={varazslatok} />
        {spells.some(v => v.szint === 0) && <VarazskonyvSzint osztaly={osztaly} level={1} varazslatok={varazslatok} />}
        {spells.some(v => v.szint === 1) && <VarazskonyvSzint osztaly={osztaly} level={2} varazslatok={varazslatok} />}
        {spells.some(v => v.szint === 2) && <VarazskonyvSzint osztaly={osztaly} level={3} varazslatok={varazslatok} />}
        {spells.some(v => v.szint === 3) && <VarazskonyvSzint osztaly={osztaly} level={4} varazslatok={varazslatok} />}
        {spells.some(v => v.szint === 4) && <VarazskonyvSzint osztaly={osztaly} level={5} varazslatok={varazslatok} />}
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