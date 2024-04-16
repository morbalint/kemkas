import React from "react";
import {
    KarakterTulajdonsagok,
    Tulajdonsag2E,
} from "../domain-models/tulajdonsag2E";
import TulajdonsagInput from "../display-components/TulajdonsagInput2E";
import {Faj2E, TulajdonsagModositokFajokra} from "../domain-models/faj2E";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {
    rollAbilities,
    setBolcsesseg,
    setEgeszseg,
    setEro,
    setIntelligencia,
    setKarizma,
    setUgyesseg,
} from "../domain-models/characterSlice";
import {characterSelector} from "../domain-models/characterSlice";

function Tulajdonsagok(props: {
    currentFaj?: Faj2E,
    tulajdonsagok?: KarakterTulajdonsagok
    dispatch?: (action: any) => any
}) {
    const karakter = useSelector.withTypes<RootState>()(characterSelector)
    const dispatch = props.dispatch ?? useDispatch.withTypes<AppDispatch>()()
    const currentFaj = props.currentFaj ?? karakter.faj
    const tulajdonsagok = props.tulajdonsagok ?? karakter.tulajdonsagok
    return <>
        <div className='row'>
            <h5 className='col-lg-2 col-sm-4 align-self-center'>Tulajdonságok</h5>
            <div className='col-sm-2 m-2'>
                <button className='btn btn-dark' type='button' data-testid="tulajdonsag-dobas"
                        onClick={() => dispatch(rollAbilities())}>Dobás
                </button>
            </div>
        </div>
        <TulajdonsagInput
            tulajdonsag='Erő'
            currentValue={tulajdonsagok.t_ero}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag2E.Ero)}
            changeValue={(val: number) => dispatch(setEro(val))}
            tooLowError='Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!'
            tooHighError='Szét szakadtak az izmaid!'
            dataTestId={"t_ero"}
        />
        <TulajdonsagInput
            tulajdonsag='Ügyesség'
            currentValue={tulajdonsagok.t_ugy}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag2E.Ugyesseg)}
            changeValue={(val: number) => dispatch(setUgyesseg(val))}
            tooLowError='Orrabuktál jelentkezés helyett!'
            tooHighError='Emberfeletti zsonglörködésedre záptojással válaszoltak a helyiek!'
            dataTestId={"t_ugy"}
        />
        <TulajdonsagInput
            tulajdonsag='Egészség'
            currentValue={tulajdonsagok.t_egs}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag2E.Egeszseg)}
            changeValue={(val: number) => dispatch(setEgeszseg(val))}
            tooLowError='Túl beteg vagy ahhoz, hogy kalandozni menj!'
            tooHighError='Kicsattanó egészségedet csak a diambroid állíthatja meg, minő véletlen, hogy pont az arcodba robbant...'
            dataTestId={"t_egs"}
        />
        <TulajdonsagInput
            tulajdonsag='Intelligencia'
            currentValue={tulajdonsagok.t_int}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag2E.Intelligencia)}
            changeValue={(val: number) => dispatch(setIntelligencia(val))}
            tooLowError='Elfelejtetted, hogy mikor is kéne kalandozni indulni!'
            tooHighError='Ilyen tudás és logika birtokában mi szükséged van új információkra? Mindent le tudsz vezetni a már meglévő ismereteidből, és ezt azonnal beláttad.'
            dataTestId={"t_int"}
        />
        <TulajdonsagInput
            tulajdonsag='Bölcsesség'
            currentValue={tulajdonsagok.t_bol}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag2E.Bolcsesseg)}
            changeValue={(val: number) => dispatch(setBolcsesseg(val))}
            tooLowError='Nem bírtál ellenállni a kíváncsiságodnak, hogy közelebbről is megvizsgáld a tőr hegyét. Nagyon közelről.'
            tooHighError='Hatalmas bölcsességedben beláttad a kalandozás veszélyeit és inkább más tevékenységbe fogtál.'
            dataTestId={"t_bol"}
        />
        <TulajdonsagInput
            tulajdonsag='Karizma'
            currentValue={tulajdonsagok.t_kar}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag2E.Karizma)}
            changeValue={(val: number) => dispatch(setKarizma(val))}
            tooLowError='Mintha taszítanád az embereket, sose sikerült kalandozó csapatot találnod.'
            tooHighError='Az ellenkező nem tagjai nem engedték, hogy útnak indulj.'
            dataTestId={"t_kar"}
        />
    </>
}

export default Tulajdonsagok