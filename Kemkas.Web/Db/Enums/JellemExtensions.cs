using System.ComponentModel.DataAnnotations;

namespace Kemkas.Web.Db.Enums;

public static class JellemExtensions
{
    public static Jellem Convert(string jellem)
    {
        return jellem switch
        {
            "TJ" => Jellem.TorvenyesJo,
            "SJ" => Jellem.Jo,
            "KJ" => Jellem.KaotikusJo,
            "TS" => Jellem.Torvenyes,
            "S" => Jellem.Semleges,
            "KS" => Jellem.Kaotikus,
            "TG" => Jellem.TorvenyesGonosz,
            "SG" => Jellem.Gonosz,
            "KG" => Jellem.KaotikusGonosz,
            _ => throw new ValidationException("invalid jellem: " + jellem)
        };
    }

    public static string Convert(this Jellem jellem)
    {
        return jellem switch
        {
            Jellem.TorvenyesJo => "TJ",
            Jellem.Jo => "SJ",
            Jellem.KaotikusJo => "KJ",
            Jellem.Torvenyes => "TS",
            Jellem.Semleges => "S",
            Jellem.Kaotikus => "KS",
            Jellem.TorvenyesGonosz => "TG",
            Jellem.Gonosz => "SG",
            Jellem.KaotikusGonosz => "KG",
            _ => throw new ValidationException("invalid jellem: " + (byte)jellem)
        };
    }
}