using System.ComponentModel.DataAnnotations;

namespace Kemkas.Web.Db.Enums;

public static class OsztalyExtensions
{
    public static Osztaly Convert(string osztaly)
    {
        return osztaly switch
        {
            "o_harcos" => Osztaly.Harcos,
            "o_ijasz" => Osztaly.Ijasz,
            "o_amazon" => Osztaly.Amazon,
            "o_kaloz" => Osztaly.Kaloz,
            "o_barbar" => Osztaly.Barbar,
            "o_pap" => Osztaly.Pap,
            "o_tolvaj" => Osztaly.Tolvaj,
            "o_varazslo" => Osztaly.Varazslo,
            "o_illuzionista" => Osztaly.Illuzionista,
            _ => throw new ValidationException("unknown osztaly: " + osztaly)
        };
    }
    
    public static string Convert(this Osztaly osztaly)
    {
        return osztaly switch
        {
            Osztaly.Harcos => "o_harcos",
            Osztaly.Ijasz => "o_ijasz",
            Osztaly.Amazon => "o_amazon",
            Osztaly.Kaloz => "o_kaloz",
            Osztaly.Barbar => "o_barbar",
            Osztaly.Pap => "o_pap",
            Osztaly.Tolvaj => "o_tolvaj",
            Osztaly.Varazslo => "o_varazslo",
            Osztaly.Illuzionista => "o_illuzionista",
            _ => throw new ValidationException("invalid osztaly!")
        };
    }
}