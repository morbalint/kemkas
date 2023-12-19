using Kemkas.Web.Db.Enums;
using Kemkas.Web.Db.Models;
using Kemkas.Web.ViewModels;

namespace Kemkas.Web.Services.Character;

public interface ICharacterDbModelToDtoService
{
    public CharacterDto Convert(V1Karakter entity);
}

public class CharacterDbModelToDtoService : ICharacterDbModelToDtoService
{
    public CharacterDto Convert(V1Karakter entity)
    {
        return new CharacterDto
        {
            Name = entity.Nev,
            Nem = entity.Nem,
            Kor = entity.Kor,
            Jellem = entity.Jellem.Convert(),
            Isten = entity.Isten,
            Faj = entity.Faj.Convert(),
            Osztaly = entity.Osztaly.Convert(),
            Tulajdonsagok = new KarakterTulajdonsagokDto
            {
                T_Ero = entity.Ero,
                T_Ugy = entity.Ugyesseg,
                T_Egs = entity.Egeszseg,
                T_Int = entity.Intelligencia,
                T_Bol = entity.Bolcsesseg,
                T_Kar = entity.Karizma,
            },
            Kepzettsegek = entity.KarakterKepzettsegek.Where(x => !x.IsTolvajKepzettseg).Select(x => x.Kepzettseg.Convert()).ToList(),
            Tolvajkepzettsegek = entity.KarakterKepzettsegek.Where(x => x.IsTolvajKepzettseg).Select(x => x.Kepzettseg.Convert()).ToList(),
            Szint = entity.Szint,
            HpRolls = entity.Szintlepesek.OrderBy(x => x.KarakterSzint).Skip(1).Select(x => x.HpRoll).ToList(),
            TulajdonsagNovelesek = entity.Szintlepesek.OrderBy(x => x.KarakterSzint).Select(x => x.TulajdonsagNoveles).Where(x => x is not null).Cast<Tulajdonsag>().Select(x => x.Convert()).ToList(),
            HarcosSpecializaciok = entity.Osztaly == Osztaly.Harcos ? entity.Szintlepesek.OrderBy(x => x.KarakterSzint).Select(x => x.FegyverSpecializacio).Where(x => x != null).Cast<string>().ToList() : [],
            KalozKritikus = entity.Osztaly == Osztaly.Kaloz ? entity.Szintlepesek.OrderBy(x => x.KarakterSzint).Select(x => x.FegyverSpecializacio).Where(x => x != null).Cast<string>().ToList() : [],
            Felszereles = new KarakterFelszerelesDto
            {
                PajzsId = entity.Pajzs,
                PancelId = entity.Pancel,
                FegyverIds = entity.Felszereles.Where(x => x.IsFegyver).Select(x => x.Name).ToList(),
            },
        };
    }
}