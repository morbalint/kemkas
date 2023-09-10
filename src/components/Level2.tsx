import React from "react";
import {Osztaly} from "../domain-models/osztaly";
import {SignedNumberToText} from "./Helpers";
import {Modifier} from "../domain-models/tulajdonsag";

function Level2(props: {
    osztaly: Osztaly
    rolledHP: number
    t_egs: number
}) {
    const {osztaly, rolledHP, t_egs} = props
    return <>
        <div className='row'>
            <h5 className='col align-self-center'>2. Szint</h5>
        </div>
        <div className='row'>
            <div className='col-lg-4'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Extra Életerő{' '}</label>
                    <span className='col col-form-label'>{SignedNumberToText(rolledHP + Modifier(t_egs))}</span>
                </div>
            </div>
            <div className='col-lg-4'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Támadás bónusz{' '}</label>
                    <span className='col col-form-label'>+1</span>
                </div>
            </div>
            <div className='col-lg-4'>
                <div className='row m-2'>
                    <label className='col-sm-6 col-8 col-form-label'>Elsődleges mentő{' '}</label>
                    <span className='col col-form-label'>+1</span>
                </div>
            </div>
        </div>
    </>
}

export default Level2