using Kemkas.Web.Db.Enums;
using Kemkas.Web.Db.Models;
using Kemkas.Web.ViewModels;

namespace Kemkas.Web.Services.SecondEdition.Character;

public interface ICharacterDbModelToDto2EService
{
    public Character2eDto Convert(V2Karakter entity);
}

public class CharacterDbModelToDto2EService : ICharacterDbModelToDto2EService
{
    public Character2eDto Convert(V2Karakter entity)
    {
        return new Character2eDto
        {
            Nev = entity.Nev,
            Nem = entity.Nem,
            Kor = entity.Kor,
            Jellem = entity.Jellem.Convert(),
            Isten = entity.Isten,
            Faj = entity.Faj.Convert(),
            Tulajdonsagok = new KarakterTulajdonsagokDto
            {
                Ero = entity.Ero,
                Ugy = entity.Ugyesseg,
                Egs = entity.Egeszseg,
                Int = entity.Intelligencia,
                Bol = entity.Bolcsesseg,
                Kar = entity.Karizma,
            },
            Kepzettsegek = entity.KarakterKepzettsegek.Where(x => !x.IsTolvajKepzettseg).Select(x => x.Kepzettseg.Convert()).ToList(),
            Tolvajkepzettsegek = entity.KarakterKepzettsegek.Where(x => x.IsTolvajKepzettseg).Select(x => x.Kepzettseg.Convert()).ToList(),
            Szint = entity.Szint,
            Felszereles = new KarakterFelszerelesDto
            {
                PajzsId = entity.Pajzs,
                PancelId = entity.Pancel,
                FegyverIds = entity.Felszereles.Where(x => x.IsFegyver).Select(x => x.TargyId).ToList(),
            },
            IsPublic = entity.IsPublic,
            Szintlepesek = entity.Szintlepesek.OrderBy(x => x.KarakterSzint).Select(sz => new Szintlepes
            {
                Osztaly = sz.Osztaly.Convert(),
                KalozKritikus = sz.Osztaly == Osztaly2E.Tengeresz ? sz.FegyverSpecializacio : null,
                HarcosFegyver = sz.Osztaly == Osztaly2E.Harcos ? sz.FegyverSpecializacio : null,
                TulajdonsagNoveles = sz.TulajdonsagNoveles?.Convert(),
                HProll = sz.HpRoll,
                TolvajExtraKepzettseg = sz.TolvajExtraKepzettseg?.Convert()
            }).ToList()
        };
    }
}