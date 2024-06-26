import React from "react";
import {
    Osztaly2E,
    OsztalyDescription,
    OsztalyLabel,
    OsztalyProperties,
    OsztalySpecialSkills
} from "../domain-models/osztaly2E";
import {Faj2E, SzintKorlatokFajokra} from "../domain-models/faj2E";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {characterSelector, setLevel1Osztaly} from "../domain-models/characterSlice";

export function OsztalySelector2E() {
    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const currentFaj = karakter.faj
    const currentOsztaly = karakter.szintlepesek[0].osztaly
    const changeOsztaly = (o: Osztaly2E) => dispatch(setLevel1Osztaly(o))
    return <OsztalySelector2EPresenter
        currentOsztaly={currentOsztaly}
        changeOsztaly={changeOsztaly}
        currentFaj={currentFaj}
    />
}

export function OsztalySelector2EPresenter(props: {
    currentFaj: Faj2E,
    currentOsztaly: Osztaly2E,
    changeOsztaly: (newOsztaly: Osztaly2E) => void
}) {
    const {currentFaj, currentOsztaly, changeOsztaly} = props;

    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Osztály</label>
            <select
                className="col form-select"
                value={currentOsztaly}
                onChange={(e) => changeOsztaly(e.target.value as Osztaly2E)}
                data-testid="osztaly"
            >
                <optgroup label='Harcos'>
                    <option value={Osztaly2E.Harcos}>{OsztalyLabel(Osztaly2E.Harcos)}</option>
                    {SzintKorlatokFajokra(currentFaj)[Osztaly2E.Amazon] > 0 && (
                        <option value={Osztaly2E.Amazon}>{OsztalyLabel(Osztaly2E.Amazon)}</option>)}
                    <option value={Osztaly2E.Barbar}>{OsztalyLabel(Osztaly2E.Barbar)}</option>
                    <option value={Osztaly2E.Ijasz}>{OsztalyLabel(Osztaly2E.Ijasz)}</option>
                    <option value={Osztaly2E.Tengeresz}>{OsztalyLabel(Osztaly2E.Tengeresz)}</option>
                </optgroup>
                <option value={Osztaly2E.Pap}>{OsztalyLabel(Osztaly2E.Pap)}</option>
                <option value={Osztaly2E.Tolvaj}>{OsztalyLabel(Osztaly2E.Tolvaj)}</option>
                <optgroup label='Varázsló'>
                    <option value={Osztaly2E.Varazslo}>{OsztalyLabel(Osztaly2E.Varazslo)}</option>
                    <option value={Osztaly2E.Illuzionista}>{OsztalyLabel(Osztaly2E.Illuzionista)}</option>
                </optgroup>
                <optgroup label='Opcionális'>
                    <option value={Osztaly2E.Dalnok}>{OsztalyLabel(Osztaly2E.Dalnok)}</option>
                    <option value={Osztaly2E.Druida}>{OsztalyLabel(Osztaly2E.Druida)}</option>
                    <option value={Osztaly2E.Vandor}>{OsztalyLabel(Osztaly2E.Vandor)}</option>
                </optgroup>
            </select>
        </div>
        <div className='row m-2'>
        <label className='col-md-2 col-sm-3 form-label'></label>
            <div className='col'>
                <p className='row pt-2' data-testid="osztaly-description">
                    {OsztalyDescription(currentOsztaly)}
                </p>
                <ul data-testid="osztaly-properties">
                    {OsztalyProperties(currentOsztaly).map(((special, i) => (<li key={currentOsztaly + i}>{special}</li>)))}
                </ul>
                <div className='col' data-testid="osztaly-specials">
                    {OsztalySpecialSkills(currentOsztaly).map(skill =>
                        <div key={skill.Id}>
                            <strong className='d-inline'>
                                {skill.Name}
                            </strong>
                            {' '}
                            {skill.Description}
                            {skill.ExtendedDescription && (
                                <ol>
                                    {skill.ExtendedDescription.map((ext, i) =>
                                        (<li key={skill.Id + '-' + i}>{ext}</li>))}
                                </ol>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
}

export default OsztalySelector2E;