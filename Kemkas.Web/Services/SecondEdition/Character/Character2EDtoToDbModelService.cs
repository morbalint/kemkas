using Kemkas.Web.Db.Enums;
using Kemkas.Web.Db.Models;
using Kemkas.Web.ViewModels;

namespace Kemkas.Web.Services.SecondEdition.Character;

public interface ICharacter2EDtoToDbModelService
{
    public V2Karakter Convert(Character2eDto dto);

    public void Update(V2Karakter original, Character2eDto dto);
}

public class Character2EDtoToDbModelService : ICharacter2EDtoToDbModelService
{
    public V2Karakter Convert(Character2eDto dto)
    {
        var karakter = new V2Karakter
        {
            Nev = dto.Nev,
            Nem = dto.Nem,
            Kor = dto.Kor,
            Isten = dto.Isten,
            Jellem = JellemExtensions.Convert(dto.Jellem),
            Faj = FajExtensions.Convert2E(dto.Faj),
            Ero = dto.Tulajdonsagok.Ero,
            Ugyesseg = dto.Tulajdonsagok.Ugy,
            Egeszseg = dto.Tulajdonsagok.Egs,
            Intelligencia = dto.Tulajdonsagok.Int,
            Bolcsesseg = dto.Tulajdonsagok.Bol,
            Karizma = dto.Tulajdonsagok.Kar,
            Szint = dto.Szint,
            Pajzs = dto.Felszereles.PancelId,
            Pancel = dto.Felszereles.PancelId
        };
        
        karakter.KarakterKepzettsegek = ConvertKarakterKepzettsegek(dto, karakter);
        karakter.Felszereles = dto.Felszereles.FegyverIds.Select(x => new V2Felszereles
        {
            Karakter = karakter,
            IsFegyver = true,
            TargyId = x,
        }).ToList();
        karakter.Szintlepesek = dto.Szintlepesek.Select((x, i) => new V2Szintlepes
        {
            Karakter = karakter,
            Osztaly = OsztalyExtensions.Convert2E(x.Osztaly),
            KarakterSzint = (byte)(i + 1),
            HpRoll = x.HProll,
            FegyverSpecializacio = x.HarcosFegyver ?? x.KalozKritikus,
            TulajdonsagNoveles = x.TulajdonsagNoveles == null ? null : TulajdonsagExtensions.Convert(x.TulajdonsagNoveles),
            TolvajExtraKepzettseg = x.TolvajExtraKepzettseg == null ? null : KepzettsegExtensions.Convert2E(x.TolvajExtraKepzettseg),
        }).ToList();

        return karakter;
    }

    public void Update(V2Karakter original, Character2eDto dto)
    {
        original.Nev = dto.Nev;
        original.Nem = dto.Nem;
        original.Kor = dto.Kor;
        original.Isten = dto.Isten;
        original.Jellem = JellemExtensions.Convert(dto.Jellem);
        original.Faj = FajExtensions.Convert2E(dto.Faj);
        original.Ero = dto.Tulajdonsagok.Ero;
        original.Ugyesseg = dto.Tulajdonsagok.Ugy;
        original.Egeszseg = dto.Tulajdonsagok.Egs;
        original.Intelligencia = dto.Tulajdonsagok.Int;
        original.Bolcsesseg = dto.Tulajdonsagok.Bol;
        original.Karizma = dto.Tulajdonsagok.Kar;
        original.Szint = dto.Szint;
        original.Pajzs = dto.Felszereles.PajzsId;
        original.Pancel = dto.Felszereles.PancelId;
        original.KarakterKepzettsegek = ConvertKarakterKepzettsegek(dto, original);
        original.Felszereles = dto.Felszereles.FegyverIds.Select(x => new V2Felszereles
        {
            Karakter = original,
            IsFegyver = true,
            TargyId = x,
        }).ToList();
        original.Szintlepesek = dto.Szintlepesek.Select((x, i) => new V2Szintlepes
        {
            Karakter = original,
            Osztaly = OsztalyExtensions.Convert2E(x.Osztaly),
            KarakterSzint = (byte)(i + 1),
            HpRoll = x.HProll,
            FegyverSpecializacio = x.HarcosFegyver ?? x.KalozKritikus,
            TulajdonsagNoveles = x.TulajdonsagNoveles == null ? null : TulajdonsagExtensions.Convert(x.TulajdonsagNoveles),
            TolvajExtraKepzettseg = x.TolvajExtraKepzettseg == null ? null : KepzettsegExtensions.Convert2E(x.TolvajExtraKepzettseg),
        }).ToList();
    }

    private static List<V2KarakterKepzettseg> ConvertKarakterKepzettsegek(Character2eDto dto, V2Karakter karakter)
    {
        var kepzettsegek = dto.Kepzettsegek.Select(x => new V2KarakterKepzettseg
        {
            Karakter = karakter,
            IsTolvajKepzettseg = false,
            Kepzettseg = KepzettsegExtensions.Convert2E(x),
        }).ToList();
        if (dto.Tolvajkepzettsegek != null) 
        {
            kepzettsegek.AddRange(dto.Tolvajkepzettsegek.Select(x => new V2KarakterKepzettseg
            {
                Karakter = karakter,
                IsTolvajKepzettseg = true,
                Kepzettseg = KepzettsegExtensions.Convert2E(x),
            }));
        }
        return kepzettsegek;
    }
}