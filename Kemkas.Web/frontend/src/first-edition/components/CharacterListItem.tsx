import * as React from "react";
import {Osztaly, OsztalyLabel} from "../domain-models/osztaly";
import {Faj, FajLabel} from "../domain-models/faj";

export interface CharacterListItemDto {
    id: string,
    name: string,
    szint: number,
    faj: Faj,
    osztaly: Osztaly,
    edition: "1e" | "2e"
}

function CharacterListItem(props: {
    character: CharacterListItemDto,
}) {
    const {character:c} = props
    return <>
        <td><a href={`/${c.edition}/karakter/${c.id}`}>{c.name}</a></td>
        <td>{c.szint}. szintű</td>
        <td>{FajLabel(c.faj)}</td>
        <td>{OsztalyLabel(c.osztaly)}</td>
    </>
}

export default CharacterListItem;