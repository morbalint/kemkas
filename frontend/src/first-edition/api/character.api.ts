import {KarakterInputs} from "../domain-models/karakter";
import {postJson} from "../../shared/api/http";

export async function StoreNewCharacter(karakter: KarakterInputs, isPublic: boolean = false) {
    return postJson<KarakterInputs, string>("/api/Character1E/", karakter, {
        params: {
            isPublic,
        }
    })
}

export async function UpdateCharacter(id: string, karakter: KarakterInputs, isPublic: boolean = false) {
    return postJson<KarakterInputs, string>(`/api/Character1E/${id}`, karakter, {
        params: {
            isPublic,
        }
    })
}
