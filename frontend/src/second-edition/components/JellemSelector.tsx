import React from "react";
import {AllJellemIDs, GetJellem, JellemID} from "../domain-models/jellem";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {characterSelector, setJellem} from "../domain-models/characterSlice";

function JellemSelector(props: {selected?: JellemID, changeJellem?: (val: JellemID) => void}) {
    const character = useSelector.withTypes<RootState>()(characterSelector)
    const selected = props.selected ?? character.jellem
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const changeJellem = props.changeJellem ?? (val => dispatch(setJellem(val)))
    const jellem = GetJellem(selected)
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Jellem</label>
            <select
                className='col form-select'
                value={selected}
                data-testid="jellem"
                onChange={e => changeJellem(e.target.value as JellemID)}
            >
                {AllJellemIDs.map((id) => (
                    <option key={id} value={id}>{GetJellem(id).Label}</option>
                ))}
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 form-label'></label>
            <div className='col'>
                <p className='row pt-2' data-testid="jellem-description">
                    {jellem.Description}
                </p>
            </div>
        </div>
    </>
}

export default JellemSelector