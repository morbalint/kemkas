import React from "react";
import {KarakterClass, KarakterInputs} from "../domain-models/karakter";
import {SignedNumberToText} from "./Helpers";

function Level2(props: {
    karakter: KarakterInputs
    rolledHP: number
    changeRolledHP: (hp: number) => void,
}) {
    const {karakter, rolledHP, changeRolledHP} = props
    const karakterClass = new KarakterClass(karakter)

    return <>
        <div className='row'>
            <h5 className='col align-self-center'>2. Szint</h5>
        </div>
        <div className='row'>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Plusz dobott HP{' '}</label>
                    <div className='col-sm-2 col'>
                        <input
                            className='form-control'
                            maxLength={2}
                            type='number'
                            value={rolledHP}
                            min={1}
                            max={12}
                            onChange={e => changeRolledHP(Number(e.target.value))} />
                    </div>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Támadás bónusz növekedés{' '}</label>
                    <span className='col col-form-label'>+1</span>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Elsődleges mentő{' '}</label>
                    <span className='col col-form-label'>+1</span>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Új HP{' '}</label>
                    <span className='col col-form-label'>{karakterClass.HP()}</span>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Új Támadás bónusz{' '}</label>
                    <span className='col col-form-label'>{karakterClass.TamadasBonusz().map(SignedNumberToText).join("/")}</span>
                </div>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Új Mentő{' '}</label>
                    <span className='col col-form-label'>{SignedNumberToText(karakterClass.KitartasMentoAlap())}</span>
                </div>
            </div>
        </div>
    </>
}

export default Level2