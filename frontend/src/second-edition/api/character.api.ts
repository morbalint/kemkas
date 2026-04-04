import {postJson} from "../../shared/api/http";
import {Karakter2E} from "../domain-models/karakter2E";

export async function StoreNewCharacter2E(karakter: Karakter2E, isPublic: boolean = false) {
    return postJson<Karakter2E, string>("/api/Character2E/", karakter, {
        params: {
            isPublic,
        }
    })
}

export async function UpdateCharacter2E(id: string, karakter: Karakter2E, isPublic: boolean = false) {
    return postJson<Karakter2E, string>(`/api/Character2E/${id}`, karakter, {
        params: {
            isPublic,
        }
    })
}
