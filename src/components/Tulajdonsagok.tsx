import React from "react";
import {RollAllAbilities, Tulajdonsag, TulajdonsagModositokFajokra} from "../domain-models/tulajdonsag";
import TulajdonsagInput from "./TulajdonsagInput";
import {Faj} from "../domain-models/faj";
import {FieldValues, UseFormRegister} from "react-hook-form";

const tulajdonsagDefaultOptions = {
    required: true,
    min: 3,
    max: 18,
};

function Tulajdonsagok(props: {
    currentFaj: () => Faj,
    watch: (name: string, defaultValue: any) => any
    setValue: (name: string, value: any) => void
    register:  UseFormRegister<FieldValues>
}) {
    const {currentFaj, watch, setValue, register} = props
    return <>
        <div className='row'>
            <h5 className='col-lg-2 col-sm-4 align-self-center'>Tulajdonságok</h5>
            <div className='col-sm-2 m-2'>
                <button className='btn btn-dark' type='button'
                        onClick={() => RollAllAbilities((name: string, value: number) => setValue('tul.'+name, value))}>Dobás
                </button>
            </div>
        </div>
        <TulajdonsagInput
            tulajdonsag='Erő'
            getCurrentValue={() => Number(watch('tul.'+Tulajdonsag.Ero, 10))}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Ero)}
            register={() => register('tul.'+Tulajdonsag.Ero, tulajdonsagDefaultOptions)}
            tooLowError='Túl gyenge vagy, nem bírtad felemelni a kezed a jelentkezéshez!'
            tooHighError='Szét szakadtak az izmaid!'
        />
        <TulajdonsagInput
            tulajdonsag='Ügyesség'
            getCurrentValue={() => Number(watch('tul.'+Tulajdonsag.Ugyesseg, 10))}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Ugyesseg)}
            register={() => register('tul.'+Tulajdonsag.Ugyesseg, tulajdonsagDefaultOptions)}
            tooLowError='Orrabuktál jelentkezés helyett!'
            tooHighError='Emberfeletti zsonglörködésedre záptojással válaszoltak a helyiek!'
        />
        <TulajdonsagInput
            tulajdonsag='Egészség'
            getCurrentValue={() => Number(watch('tul.'+Tulajdonsag.Egeszseg, 10))}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Egeszseg)}
            register={() => register('tul.'+Tulajdonsag.Egeszseg, tulajdonsagDefaultOptions)}
            tooLowError='Túl beteg vagy ahhoz, hogy kalandozni menj!'
            tooHighError='Kicsattanó egészségedet csak a diambroid állíthatja meg, minő véletlen, hogy pont az arcodba robbant...'
        />
        <TulajdonsagInput
            tulajdonsag='Intelligencia'
            getCurrentValue={() => Number(watch('tul.'+Tulajdonsag.Intelligencia, 10))}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Intelligencia)}
            register={() => register('tul.'+Tulajdonsag.Intelligencia, tulajdonsagDefaultOptions)}
            tooLowError='Elfelejtetted, hogy mikor is kéne kalandozni indulni!'
            tooHighError='Ilyen tudás és logika birtokában mi szükséged van új információkra? Mindent le tudsz vezetni a már meglévő ismereteidből, és ezt azonnal beláttad.'
        />
        <TulajdonsagInput
            tulajdonsag='Bölcsesség'
            getCurrentValue={() => Number(watch('tul.'+Tulajdonsag.Bolcsesseg, 10))}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Bolcsesseg)}
            register={() => register('tul.'+Tulajdonsag.Bolcsesseg, tulajdonsagDefaultOptions)}
            tooLowError='Nem bírtál ellenállni a kíváncsiságodnak, hogy közelebbről is megvizsgáld a tőr hegyét. Nagyon közelről.'
            tooHighError='Hatalmas bölcsességedben beláttad a kalandozás veszélyeit és inkább más tevékenységbe fogtál.'
        />
        <TulajdonsagInput
            tulajdonsag='Karizma'
            getCurrentValue={() => Number(watch('tul.'+Tulajdonsag.Karizma, 10))}
            currentFaj={currentFaj}
            fajiModosito={TulajdonsagModositokFajokra(Tulajdonsag.Karizma)}
            register={() => register('tul.'+Tulajdonsag.Karizma, tulajdonsagDefaultOptions)}
            tooLowError='Mintha taszítanád az embereket, sose sikerült kalandozó csapatot találnod.'
            tooHighError='Az ellenkező nem tagjai nem engedték, hogy útnak indulj.'
        />

    </>
}

export default Tulajdonsagok