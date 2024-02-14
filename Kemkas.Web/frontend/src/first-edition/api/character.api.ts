import {KarakterInputs} from "../domain-models/karakter";
import axios from "axios";

export async function StoreNewCharacter(karakter: KarakterInputs, isPublic: boolean = false) {
    let response = await axios.post(`${window.location.origin}/api/Character1E/`, karakter, {
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

export async function UpdateCharacter(id: string, karakter: KarakterInputs, isPublic: boolean = false) {
    let response = await axios.post(`${window.location.origin}/api/Character1E/${id}`, karakter, {
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

