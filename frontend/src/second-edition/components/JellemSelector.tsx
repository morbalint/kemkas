import React from "react";
import {AllJellemIDs, GetJellem, JellemID} from "../domain-models/jellem";

function JellemSelector(props: {selected: JellemID, changeJellem: (val: JellemID) => void}) {
    const { selected, changeJellem } = props
    const jellem = GetJellem(selected)
    return <>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 col-form-label'>Jellem</label>
            <select className='col form-select' value={selected} onChange={e => changeJellem(e.target.value as JellemID)}>
                {AllJellemIDs.map((id) => (
                    <option key={id} value={id}>{GetJellem(id).Label}</option>
                ))}
            </select>
        </div>
        <div className='row m-2'>
            <label className='col-md-2 col-sm-3 form-label'></label>
            <div className='col'>
                <p className='row pt-2'>
                    {jellem.Description}
                </p>
            </div>
        </div>
    </>
}

export default JellemSelector