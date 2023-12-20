import {KarakterInputs} from "../domain-models/karakter";
import axios from "axios";

export async function StoreNewCharacter(karakter: KarakterInputs) {
    let response = await axios.post(`${window.location.origin}/Character/`, karakter, {
        withCredentials: true,
    })
    if (response.status < 300){
        return response.data as string
    }
    else {
        throw Error(response.statusText)
    }
}
