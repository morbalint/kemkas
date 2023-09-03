import React from "react";
import {
    KarakterTulajdonsagok,
    RollAllAbilities,
    Tulajdonsag,
    TulajdonsagModositokFajokra
} from "../domain-models/tulajdonsag";
import TulajdonsagInput from "./TulajdonsagInput";
import {Faj} from "../domain-models/faj";

function Tulajdonsagok(props: {
    currentFaj: Faj,
    tulajdonsagok: KarakterTulajdonsagok
    changeTulajdonsagok: (tulajdonsagok: KarakterTulajdonsagok) => void
}) {
    const {currentFaj, tulajdonsagok, changeTulajdonsagok} = props
    return <>
        <div className='row'>
            <h5 className='col-lg-2 col-sm-4 align-self-center'>Tulajdonságok</h5>
            <div className='col-sm-2 m-2'>
                <button className='btn btn-dark' type='button'
                        onClick={() => RollAllAbilities(changeTulajdonsagok)}>Dobás
                </button>
            </div>
        </div>
        <TulajdonsagInput
            tulajdonsag='Erő'
            currentValue={tulajdonsagok.t_ero}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Ero)}
            changeValue={(val: number) => changeTulajdonsagok({...tulajdonsagok, t_ero: val})}
            tooLowError='Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!'
            tooHighError='Szét szakadtak az izmaid!'
        />
        <TulajdonsagInput
            tulajdonsag='Ügyesség'
            currentValue={tulajdonsagok.t_ugy}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Ugyesseg)}
            changeValue={(val: number) => changeTulajdonsagok({...tulajdonsagok, t_ugy: val})}
            tooLowError='Orrabuktál jelentkezés helyett!'
            tooHighError='Emberfeletti zsonglörködésedre záptojással válaszoltak a helyiek!'
        />
        <TulajdonsagInput
            tulajdonsag='Egészség'
            currentValue={tulajdonsagok.t_egs}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Egeszseg)}
            changeValue={(val: number) => changeTulajdonsagok({...tulajdonsagok, t_egs: val})}
            tooLowError='Túl beteg vagy ahhoz, hogy kalandozni menj!'
            tooHighError='Kicsattanó egészségedet csak a diambroid állíthatja meg, minő véletlen, hogy pont az arcodba robbant...'
        />
        <TulajdonsagInput
            tulajdonsag='Intelligencia'
            currentValue={tulajdonsagok.t_int}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Intelligencia)}
            changeValue={(val: number) => changeTulajdonsagok({...tulajdonsagok, t_int: val})}
            tooLowError='Elfelejtetted, hogy mikor is kéne kalandozni indulni!'
            tooHighError='Ilyen tudás és logika birtokában mi szükséged van új információkra? Mindent le tudsz vezetni a már meglévő ismereteidből, és ezt azonnal beláttad.'
        />
        <TulajdonsagInput
            tulajdonsag='Bölcsesség'
            currentValue={tulajdonsagok.t_bol}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Bolcsesseg)}
            changeValue={(val: number) => changeTulajdonsagok({...tulajdonsagok, t_bol: val})}
            tooLowError='Nem bírtál ellenállni a kíváncsiságodnak, hogy közelebbről is megvizsgáld a tőr hegyét. Nagyon közelről.'
            tooHighError='Hatalmas bölcsességedben beláttad a kalandozás veszélyeit és inkább más tevékenységbe fogtál.'
        />
        <TulajdonsagInput
            tulajdonsag='Karizma'
            currentValue={tulajdonsagok.t_kar}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Karizma)}
            changeValue={(val: number) => changeTulajdonsagok({...tulajdonsagok, t_kar: val})}
            tooLowError='Mintha taszítanád az embereket, sose sikerült kalandozó csapatot találnod.'
            tooHighError='Az ellenkező nem tagjai nem engedték, hogy útnak indulj.'
        />

    </>
}

export default Tulajdonsagok