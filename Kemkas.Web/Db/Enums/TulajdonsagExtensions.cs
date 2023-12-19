using System.ComponentModel.DataAnnotations;

namespace Kemkas.Web.Db.Enums;

public static class TulajdonsagExtensions
{
    public static Tulajdonsag Convert(string tulajdonsag)
    {
        return tulajdonsag switch
        {
            "t_ero" => Tulajdonsag.Ero,
            "t_ugy" => Tulajdonsag.Ugyesseg,
            "t_egs" => Tulajdonsag.Egeszseg,
            "t_int" => Tulajdonsag.Intelligencia,
            "t_bol" => Tulajdonsag.Bolcsesseg,
            "t_kar" => Tulajdonsag.Karizma,
            _ => throw new ValidationException("invalid tulajdonsag: " + tulajdonsag),
        };
    }

    public static string Convert(this Tulajdonsag tulajdonsag)
    {
        return tulajdonsag switch
        {
            Tulajdonsag.Ero => "t_ero",
            Tulajdonsag.Ugyesseg => "t_ugy",
            Tulajdonsag.Egeszseg => "t_egs",
            Tulajdonsag.Intelligencia => "t_int",
            Tulajdonsag.Bolcsesseg => "t_bol",
            Tulajdonsag.Karizma => "t_kar",
            _ => throw new ValidationException("invalid tulajdonsag: "  + tulajdonsag),
        };
    }
}