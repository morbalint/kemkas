import * as React from "react";
import {CharacterListItemViewModel} from "../pages/CharacterList";



function CharacterListItem(props: {
    character: CharacterListItemViewModel,
}) {
    const {character:c} = props
    return <>
        <td><a href={`/${c.edition}/karakter/${c.id}`}>{c.name}</a></td>
        <td>{c.szint}. szintű</td>
        <td>{c.faj}</td>
        <td>{c.osztaly}</td>
        <td>{c.edition}</td>
    </>
}

export default CharacterListItem;