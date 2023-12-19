using System.ComponentModel.DataAnnotations;
using Kemkas.Web.Db.Enums;
using Kemkas.Web.Db.Models;
using Kemkas.Web.ViewModels;

namespace Kemkas.Web.Services.Character;

public interface ICharacterDtoToDbModelService
{
    public V1Karakter Convert(CharacterDto dto);
}

public class CharacterDtoToDbModelService : ICharacterDtoToDbModelService
{
    public V1Karakter Convert(CharacterDto dto)
    {
        var karakter = new V1Karakter
        {
            Nev = dto.Name,
            Nem = dto.Nem,
            Kor = dto.Kor,
            Jellem = JellemExtensions.Convert(dto.Jellem),
            Isten = dto.Isten,
            Faj = FajExtensions.Convert(dto.Faj),
            Osztaly = OsztalyExtensions.Convert(dto.Osztaly),
            Ero = dto.Tulajdonsagok.T_Ero,
            Ugyesseg = dto.Tulajdonsagok.T_Ugy,
            Egeszseg = dto.Tulajdonsagok.T_Egs,
            Intelligencia = dto.Tulajdonsagok.T_Int,
            Bolcsesseg = dto.Tulajdonsagok.T_Bol,
            Karizma = dto.Tulajdonsagok.T_Kar,
            Szint = dto.Szint,
        };
        karakter.KarakterKepzettsegek = ConvertKepzettsegek(dto, karakter);
        karakter.Pajzs = dto.Felszereles.PajzsId;
        karakter.Pancel = dto.Felszereles.PancelId;
        karakter.Felszereles = dto.Felszereles.FegyverIds.Select(x => new V1Felszereles
        {
            Karakter = karakter,
            IsFegyver = true,
            Name = x,
        }).ToList();
        karakter.Szintlepesek = ConvertSzintLepes(dto, karakter);
        
        return karakter;
    }

    // TODO: this is unnecessary duplication of business logic!!
    private static List<V1Szintlepes> ConvertSzintLepes(CharacterDto dto, V1Karakter karakter)
    {
        if (dto.HpRolls.Count < dto.Szint - 2)
        {
            throw new ValidationException("not enough HP rolls for a level " + dto.Szint + " character!");
        }

        var expectedNumberOfFighterSpec = (int)Math.Ceiling(dto.Szint / 2.0);
        if (dto.HarcosSpecializaciok.Count > 0 && dto.HarcosSpecializaciok.Count < expectedNumberOfFighterSpec)
        {
            throw new ValidationException("not enough weapon specialization for a level " + dto.Szint + " fighter!");
        }
        
        if (dto.KalozKritikus.Count > 0 && dto.KalozKritikus.Count < dto.Szint/3)
        {
            throw new ValidationException("not enough crit specialization for a level " + dto.Szint + " pirate!");
        }

        var level1 = new V1Szintlepes()
        {
            Karakter = karakter,
            KarakterSzint = 1,
            // for multiclass characters
            // Osztaly = karakter.Osztaly,
            // OsztalySzint = 1,
            HpRoll = karakter.Osztaly switch // TODO: duplication of logic!!
            {
                Osztaly.Barbar => 12,
                Osztaly.Amazon or Osztaly.Harcos or Osztaly.Kaloz or Osztaly.Ijasz => 10,
                Osztaly.Pap => 8,
                Osztaly.Tolvaj => 6,
                Osztaly.Varazslo or Osztaly.Illuzionista => 4,
                _ => throw new ArgumentOutOfRangeException(nameof(karakter.Osztaly), karakter.Osztaly,
                    "invalid osztaly!")
            },
            FegyverSpecializacio = karakter.Osztaly == Osztaly.Harcos ? dto.HarcosSpecializaciok[0] : null,
        };
        
        return Enumerable.Range(2, count: dto.Szint - 1).Select(szint =>
        {
            var harcosFegyverSpec = dto.HarcosSpecializaciok.Count > 0 && szint % 2 == 1
                ? dto.HarcosSpecializaciok[szint / 2 ]
                : null;
            var kalozFegyverKrit = dto.KalozKritikus.Count > 0 && szint % 3 == 0 ? dto.KalozKritikus[szint / 3 - 1] : null;
            return new V1Szintlepes
            {
                Karakter = karakter,
                KarakterSzint = (byte)szint,
                HpRoll = dto.HpRolls[szint - 2],
                FegyverSpecializacio = harcosFegyverSpec ?? kalozFegyverKrit,
                TulajdonsagNoveles = szint % 4 == 0 ? TulajdonsagExtensions.Convert(dto.TulajdonsagNovelesek[szint / 4 - 1]) : null,
            };
        }).Prepend(level1).ToList();
    }

    private static List<V1KarakterKepzettseg> ConvertKepzettsegek(CharacterDto dto, V1Karakter karakter)
    {
        var kepzettsegek = dto.Kepzettsegek.Select(x => new V1KarakterKepzettseg
        {
            Karakter = karakter,
            IsTolvajKepzettseg = false,
            Kepzettseg = KepzettsegExtensions.Convert(x),
        }).ToList();
        if (dto.Tolvajkepzettsegek != null) 
        {
            kepzettsegek.AddRange(dto.Tolvajkepzettsegek.Select(x => new V1KarakterKepzettseg
            {
                Karakter = karakter,
                IsTolvajKepzettseg = true,
                Kepzettseg = KepzettsegExtensions.Convert(x),
            }));
        }
        return kepzettsegek;
    }
}