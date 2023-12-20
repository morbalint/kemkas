import {KarakterInputs} from "../domain-models/karakter";
import * as axios from "axios";

export async function StoreNewCharacter(karakter: KarakterInputs) {
    let response = await axios.default.post(`${window.location.origin}/Character/`, karakter, {
        withCredentials: true,
    })
    if (response.status < 300){
        return response.data as string
    }
    else {
        return Error(response.statusText)
    }
}
