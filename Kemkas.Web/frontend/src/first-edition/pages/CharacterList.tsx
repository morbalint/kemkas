import * as React from "react";
import {useLoaderData} from "react-router-dom";
import CharacterListItem, {CharacterListItemDto} from "../components/CharacterListItem";
import {Faro} from "@grafana/faro-web-sdk";

function CharacterList(props: {faro?: Faro}) {
    const {faro} = props
    const characters = useLoaderData() as CharacterListItemDto[];

    return <div className="container">
        <div className="container-fluid p-5 bg-black text-white text-center">
            <h1>Karakterek</h1>
        </div>
        <div className="d-grid gap-2 m-5">
            <a className="btn btn-dark btn-lg" href="/" type="button">Új karakter létrehozása</a>
        </div>
        <table className="table mt-3">
            <thead>
            <tr>
                <th scope="col">Név</th>
                <th scope="col">Szint</th>
                <th scope="col">Faj</th>
                <th scope="col">Osztály</th>
            </tr>
            </thead>
            <tbody>
            {characters.map(c => (
                <tr key={c.id}>
                    <CharacterListItem character={c}/>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}

export default CharacterList;