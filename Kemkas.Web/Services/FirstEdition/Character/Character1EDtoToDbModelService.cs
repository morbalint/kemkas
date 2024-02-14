using System.ComponentModel.DataAnnotations;
using Kemkas.Web.Db.Enums;
using Kemkas.Web.Db.Models;
using Kemkas.Web.ViewModels;

namespace Kemkas.Web.Services.FirstEdition.Character;

public interface ICharacter1EDtoToDbModelService
{
    public V1Karakter Convert(Character1eDto dto);

    public void Update(V1Karakter original, Character1eDto dto);
}

public class Character1EDtoToDbModelService : ICharacter1EDtoToDbModelService
{
    public V1Karakter Convert(Character1eDto dto)
    {
        var karakter = new V1Karakter
        {
            Nev = dto.Name,
            Nem = dto.Nem,
            Kor = dto.Kor,
            Jellem = JellemExtensions.Convert(dto.Jellem),
            Isten = dto.Isten,
            Faj = FajExtensions.Convert1E(dto.Faj),
            Osztaly = OsztalyExtensions.Convert1E(dto.Osztaly),
            Ero = dto.Tulajdonsagok.Ero,
            Ugyesseg = dto.Tulajdonsagok.Ugy,
            Egeszseg = dto.Tulajdonsagok.Egs,
            Intelligencia = dto.Tulajdonsagok.Int,
            Bolcsesseg = dto.Tulajdonsagok.Bol,
            Karizma = dto.Tulajdonsagok.Kar,
            Szint = dto.Szint,
            Pajzs = dto.Felszereles.PajzsId,
            Pancel = dto.Felszereles.PancelId
        };
        karakter.KarakterKepzettsegek = ConvertKepzettsegek(dto, karakter);
        karakter.Felszereles = dto.Felszereles.FegyverIds.Select(x => new V1Felszereles
        {
            Karakter = karakter,
            IsFegyver = true,
            Name = x,
        }).ToList();
        karakter.Szintlepesek = ConvertSzintLepes(dto, karakter);
        
        return karakter;
    }

    public void Update(V1Karakter original, Character1eDto dto)
    {
        original.Nev = dto.Name;
        original.Nem = dto.Nem;
        original.Kor = dto.Kor;
        original.Jellem = JellemExtensions.Convert(dto.Jellem);
        original.Isten = dto.Isten;
        original.Faj = FajExtensions.Convert1E(dto.Faj);
        original.Osztaly = OsztalyExtensions.Convert1E(dto.Osztaly);
        original.Ero = dto.Tulajdonsagok.Ero;
        original.Ugyesseg = dto.Tulajdonsagok.Ugy;
        original.Egeszseg = dto.Tulajdonsagok.Egs;
        original.Intelligencia = dto.Tulajdonsagok.Int;
        original.Bolcsesseg = dto.Tulajdonsagok.Bol;
        original.Karizma = dto.Tulajdonsagok.Kar;
        original.Szint = dto.Szint;
        original.Pajzs = dto.Felszereles.PajzsId;
        original.Pancel = dto.Felszereles.PancelId;
        original.KarakterKepzettsegek = ConvertKepzettsegek(dto, original);
        original.Felszereles = dto.Felszereles.FegyverIds.Select(x => new V1Felszereles
        {
            Karakter = original,
            IsFegyver = true,
            Name = x,
        }).ToList();
        original.Szintlepesek = ConvertSzintLepes(dto, original);
    }

    // TODO: this is unnecessary duplication of business logic!!
    private static List<V1Szintlepes> ConvertSzintLepes(Character1eDto dto, V1Karakter karakter)
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
                Osztaly1E.Barbar => 12,
                Osztaly1E.Amazon or Osztaly1E.Harcos or Osztaly1E.Kaloz or Osztaly1E.Ijasz => 10,
                Osztaly1E.Pap => 8,
                Osztaly1E.Tolvaj => 6,
                Osztaly1E.Varazslo or Osztaly1E.Illuzionista => 4,
                _ => throw new ArgumentOutOfRangeException(nameof(karakter.Osztaly), karakter.Osztaly,
                    "invalid osztaly!")
            },
            FegyverSpecializacio = karakter.Osztaly == Osztaly1E.Harcos ? dto.HarcosSpecializaciok[0] : null,
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

    private static List<V1KarakterKepzettseg> ConvertKepzettsegek(Character1eDto dto, V1Karakter karakter)
    {
        var kepzettsegek = dto.Kepzettsegek.Select(x => new V1KarakterKepzettseg
        {
            Karakter = karakter,
            IsTolvajKepzettseg = false,
            Kepzettseg = KepzettsegExtensions.Convert1E(x),
        }).ToList();
        if (dto.Tolvajkepzettsegek != null) 
        {
            kepzettsegek.AddRange(dto.Tolvajkepzettsegek.Select(x => new V1KarakterKepzettseg
            {
                Karakter = karakter,
                IsTolvajKepzettseg = true,
                Kepzettseg = KepzettsegExtensions.Convert1E(x),
            }));
        }
        return kepzettsegek;
    }
}