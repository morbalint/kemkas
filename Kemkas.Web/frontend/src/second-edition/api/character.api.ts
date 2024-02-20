import axios from "axios";
import {Karakter2E} from "../domain-models/karakter2E";

export async function StoreNewCharacter2E(karakter: Karakter2E, isPublic: boolean = false) {
    let response = await axios.post(`${window.location.origin}/api/Character2E/`, karakter, {
        withCredentials: true,
        params: {
            isPublic,
        }
    })
    if (response.status < 300){
        return response.data as string
    }
    else {
        throw Error(response.statusText)
    }
}

export async function UpdateCharacter2E(id: string, karakter: Karakter2E, isPublic: boolean = false) {
    let response = await axios.post(`${window.location.origin}/api/Character2E/${id}`, karakter, {
        withCredentials: true,
        params: {
            isPublic,
        }
    })
    if (response.status < 300){
        return response.data as string
    }
    else {
        throw Error(response.statusText)
    }
}
