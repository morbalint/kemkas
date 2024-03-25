import {Faj2E, SzintKorlatokFajokra} from "../domain-models/faj2E";
import {Osztaly2E, OsztalyLabel} from "../domain-models/osztaly2E";
import React from "react";

function MultiClassOsztalySelector2E(props: {
    faj: Faj2E,
    osztaly: Osztaly2E,
    changeOsztaly: (o: Osztaly2E) => void,
    osztalySzint: number,
    dataTestId?: string,
}) {
    const {faj, osztaly, changeOsztaly, osztalySzint, dataTestId} = props
    return <>
        <div className='row'>
            <div className="col-lg-6">
                <div className="row m-md-2">
                    <label className='col-8 col-sm-6 col-form-label'>Osztály</label>
                    <div className="col">
                        <select className="col form-select"
                                value={osztaly}
                                onChange={(e) => changeOsztaly(e.target.value as Osztaly2E)}
                                data-testid={dataTestId}
                        >
                            <optgroup label='Harcos'>
                                <option value={Osztaly2E.Harcos}>{OsztalyLabel(Osztaly2E.Harcos)}</option>
                                {SzintKorlatokFajokra(faj)[Osztaly2E.Amazon] > 0 && (
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
                                {/* Druida nem lehet tobb osztalyu karakter! */}
                                <option value={Osztaly2E.Vandor}>{OsztalyLabel(Osztaly2E.Vandor)}</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="row m-2">
                    <label className='col-sm-6 col-8 col-form-label'>Új {OsztalyLabel(osztaly)} szint{' '}</label>
                    <span className='col col-form-label'>{osztalySzint}</span>
                </div>
            </div>
        </div>
    </>
}

export default MultiClassOsztalySelector2E