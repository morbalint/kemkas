import React from "react";
import {getClassLevels} from "../domain-models/szintlepes";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {characterSelector} from "../domain-models/characterSlice";
import {Osztaly2E} from "../domain-models/osztaly2E";
import Varazskonyv from "./Varazskonyv";

function Varazslatok() {
    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const classLevels = getClassLevels(karakter.szintlepesek)

    return <>
        {classLevels[Osztaly2E.Varazslo] > 0 && <Varazskonyv osztaly={Osztaly2E.Varazslo} varazslatok={karakter.varazslatok.filter(x => x.osztaly === Osztaly2E.Varazslo)} />}
        {classLevels[Osztaly2E.Illuzionista] > 0 && <Varazskonyv osztaly={Osztaly2E.Illuzionista} varazslatok={karakter.varazslatok.filter(x => x.osztaly === Osztaly2E.Illuzionista)} />}
        {classLevels[Osztaly2E.Vandor] > 0 && <Varazskonyv osztaly={Osztaly2E.Vandor} varazslatok={karakter.varazslatok.filter(x => x.osztaly === Osztaly2E.Vandor)} />}
        {classLevels[Osztaly2E.Dalnok] > 0 && <Varazskonyv osztaly={Osztaly2E.Dalnok} varazslatok={karakter.varazslatok.filter(x => x.osztaly === Osztaly2E.Dalnok)} />}
    </>
}

export default Varazslatok;