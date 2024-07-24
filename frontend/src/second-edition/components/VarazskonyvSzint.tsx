import {Osztaly2E} from "../domain-models/osztaly2E";
import {ClassSpells, KarakterVarazslat} from "../domain-models/varazslat";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import VarazslatSelector from "../display-components/VarazslatSelector";
import {addVarazslat, removeVarazslat, setVarazslat} from "../domain-models/characterSlice";
import React from "react";

function VarazskonyvSzint(props: { osztaly: Osztaly2E, level: number, varazslatok: KarakterVarazslat[] }) {
    const {level, osztaly, varazslatok} = props;
    const dispatch = useDispatch.withTypes<AppDispatch>()()

    const classSpells = ClassSpells(osztaly)
    const leveledSpells = classSpells.filter(v => v.szint === level)
    const selectedSpells = varazslatok.map(v => {
        return leveledSpells.find(x => x.id === v.id)
    }).filter(x => !!x)
    const availableSpells = leveledSpells.filter(v => varazslatok.every(x => x.id !== v.id))

    return <>
        <div className='row my-2'>
            <h5 className='col align-self-center'>{level}. Szintű varázslatok</h5>
        </div>
        {selectedSpells.map((v, i) => (
            <React.Fragment key={`VarazslatSelector-${i}`}>
                <div className='row m-2'>
                    <VarazslatSelector
                        selected={v.id}
                        available={[v, ...availableSpells]}
                        dataTestId={`varazskonyv_varazslo_1_${v.id}`}
                        onChange={(next_id) => dispatch(setVarazslat({prev: {id: v.id, osztaly }, next_id: next_id}))}
                    />
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <button
                            className='btn btn-outline-dark w-100'
                            type='button'
                            onClick={() => dispatch(removeVarazslat({id: v.id, osztaly} ))}>Elvesz
                        </button>
                    </div>
                </div>
                <div className="row m-2">
                    <span>{v?.leiras}</span>
                    {v?.megfordithato && <u>Megfordítható{' '}</u>}
                    {v?.komponens && <b>Kötelező komponens: {v.komponens}{' '}</b>}
                    {v?.opcionalis_komponens && <i>Opcionális komponens: {v.opcionalis_komponens}{' '}</i>}
                </div>
            </React.Fragment>))}
        {availableSpells.length > 0 && <button className='btn btn-outline-dark ms-2'
                                               onClick={() => dispatch(addVarazslat({id: availableSpells[0].id, osztaly}))}>
            Új varázslat hozzáadása
        </button>}
    </>;
}

export default VarazskonyvSzint