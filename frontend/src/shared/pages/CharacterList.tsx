import * as React from "react";
import {useLoaderData} from "react-router-dom";
import CharacterListItem from "../components/CharacterListItem";
import {Faj, FajLabel as FajLabel1E} from "../../first-edition/domain-models/faj";
import {Faj2E, FajLabel as FajLabel2E} from "../../second-edition/domain-models/faj2E";
import {Osztaly, OsztalyLabel as OsztalyLabel1E} from "../../first-edition/domain-models/osztaly";
import {Osztaly2E, OsztalyLabel as OsztalyLabel2E} from "../../second-edition/domain-models/osztaly2E";

export interface CharacterListItemViewModel {
    id: string,
    name: string,
    szint: number,
    faj: string,
    osztaly: string,
    edition: "1e" | "2e"
}

interface CharacterListItemDto1E {
    id: string,
    name: string,
    szint: number,
    faj: Faj,
    osztaly: Osztaly,
    edition: "1e"
}

interface CharacterListItemDto2E {
    id: string,
    name: string,
    szint: number,
    faj: Faj2E,
    osztaly: Osztaly2E,
    edition: "2e"
}

type CharacterListItemDto = CharacterListItemDto1E | CharacterListItemDto2E;

function mapDtoToViewModel(dto: CharacterListItemDto): CharacterListItemViewModel {
    if (dto.edition === "1e") {
        return {
            id: dto.id,
            name: dto.name,
            edition: dto.edition,
            szint: dto.szint,
            faj: FajLabel1E(dto.faj),
            osztaly: OsztalyLabel1E(dto.osztaly),
        }
    }
    else {
        return {
            id: dto.id,
            name: dto.name,
            edition: dto.edition,
            szint: dto.szint,
            faj: FajLabel2E(dto.faj),
            osztaly: OsztalyLabel2E(dto.osztaly),
        }
    }
}

function CharacterList(props: {}) {
    const characters = useLoaderData() as CharacterListItemDto[];

    return <div className="container">
        <div className="container-fluid p-5 bg-black text-white text-center">
            <h1>Karakterek</h1>
        </div>
        <div className="row">
            <div className="col-6">
                <div className="d-grid gap-1 m-3 m-lg-5">
                    <a className="btn btn-dark btn-lg" href="/2e/karakter/" type="button">Új 2e karakter létrehozása</a>
                </div>
            </div>
            <div className="col-6">
                <div className="d-grid gap-1 m-3 m-lg-5">
                    <a className="btn btn-dark btn-lg" href="/1e/karakter/" type="button">Új 1e karakter létrehozása</a>
                </div>
            </div>
        </div>
        <table className="table mt-3">
            <thead>
            <tr>
                <th scope="col">Név</th>
                <th scope="col">Szint</th>
                <th scope="col">Faj</th>
                <th scope="col">Osztály</th>
                <th scope="col">Kiadás</th>
            </tr>
            </thead>
            <tbody>
            {characters.map(c => (
                <tr key={c.id}>
                    <CharacterListItem character={mapDtoToViewModel(c)}/>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}

export default CharacterList;
