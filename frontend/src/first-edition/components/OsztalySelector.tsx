import React from "react";
import {
    Osztaly,
    OsztalyDescription,
    OsztalyLabel,
    OsztalyProperties,
    OsztalySpecialSkills
} from "../domain-models/osztaly";
import {Faj, SzintKorlatokFajokra} from "../domain-models/faj";

function OsztalySelector(props: {currentFaj: Faj, currentOsztaly: Osztaly, changeOsztaly: (newOsztaly: Osztaly) => void}) {
    const {currentFaj, currentOsztaly, changeOsztaly} = props;

    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Osztály</label>
            <select className="col form-select" value={currentOsztaly} onChange={(e) => changeOsztaly(e.target.value as Osztaly)} >
                <optgroup label='Harcos'>
                    <option value={Osztaly.Harcos}>{OsztalyLabel(Osztaly.Harcos)}</option>
                    {SzintKorlatokFajokra(currentFaj)[Osztaly.Amazon] > 0 && (
                        <option value={Osztaly.Amazon}>{OsztalyLabel(Osztaly.Amazon)}</option>) }
                    <option value={Osztaly.Barbar}>{OsztalyLabel(Osztaly.Barbar)}</option>
                    <option value={Osztaly.Ijasz}>{OsztalyLabel(Osztaly.Ijasz)}</option>
                    <option value={Osztaly.Kaloz}>{OsztalyLabel(Osztaly.Kaloz)}</option>
                </optgroup>
                <option value={Osztaly.Pap}>{OsztalyLabel(Osztaly.Pap)}</option>
                {SzintKorlatokFajokra(currentFaj)[Osztaly.Tolvaj] > 0 && (<option value={Osztaly.Tolvaj}>{OsztalyLabel(Osztaly.Tolvaj)}</option>)}
                {SzintKorlatokFajokra(currentFaj)[Osztaly.Varazslo] > 0 && (
                    <optgroup label='Varázsló'>
                        <option value={Osztaly.Varazslo}>{OsztalyLabel(Osztaly.Varazslo)}</option>
                        <option value={Osztaly.Illuzionista}>{OsztalyLabel(Osztaly.Illuzionista)}</option>
                    </optgroup>
                )}
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 form-label'></label>
            <div className='col' >
                <p className='row pt-2'>
                    {OsztalyDescription(currentOsztaly)}
                </p>
                <ul>
                    {OsztalyProperties(currentOsztaly).map(((special, i) => (<li key={currentOsztaly + i}>{special}</li>)))}
                </ul>
                <div className='col'>
                    {OsztalySpecialSkills(currentOsztaly).map(skill =>
                        <div key={skill.Id} >
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

export default OsztalySelector;