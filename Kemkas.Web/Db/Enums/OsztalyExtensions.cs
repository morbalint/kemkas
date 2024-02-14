using System.ComponentModel.DataAnnotations;

namespace Kemkas.Web.Db.Enums;

public static class OsztalyExtensions
{
    public static Osztaly1E Convert1E(string osztaly)
    {
        return osztaly switch
        {
            "o_harcos" => Osztaly1E.Harcos,
            "o_ijasz" => Osztaly1E.Ijasz,
            "o_amazon" => Osztaly1E.Amazon,
            "o_kaloz" => Osztaly1E.Kaloz,
            "o_barbar" => Osztaly1E.Barbar,
            "o_pap" => Osztaly1E.Pap,
            "o_tolvaj" => Osztaly1E.Tolvaj,
            "o_varazslo" => Osztaly1E.Varazslo,
            "o_illuzionista" => Osztaly1E.Illuzionista,
            _ => throw new ValidationException("unknown osztaly: " + osztaly)
        };
    }
    
    public static Osztaly2E Convert2E(string osztaly)
    {
        return osztaly switch
        {
            "o_2e_harcos" => Osztaly2E.Harcos,
            "o_2e_ijasz" => Osztaly2E.Ijasz,
            "o_2e_amazon" => Osztaly2E.Amazon,
            "o_2e_kaloz" => Osztaly2E.Kaloz,
            "o_2e_barbar" => Osztaly2E.Barbar,
            "o_2e_pap" => Osztaly2E.Pap,
            "o_2e_tolvaj" => Osztaly2E.Tolvaj,
            "o_2e_varazslo" => Osztaly2E.Varazslo,
            "o_2e_illuzionista" => Osztaly2E.Illuzionista,
            "o_2e_dalnok" => Osztaly2E.Dalnok,
            "o_2e_druida" => Osztaly2E.Druida,
            "o_2e_vandor" => Osztaly2E.Vandor,
            _ => throw new ValidationException("unknown osztaly: " + osztaly)
        };
    }
    
    public static string Convert(this Osztaly1E osztaly)
    {
        return osztaly switch
        {
            Osztaly1E.Harcos => "o_harcos",
            Osztaly1E.Ijasz => "o_ijasz",
            Osztaly1E.Amazon => "o_amazon",
            Osztaly1E.Kaloz => "o_kaloz",
            Osztaly1E.Barbar => "o_barbar",
            Osztaly1E.Pap => "o_pap",
            Osztaly1E.Tolvaj => "o_tolvaj",
            Osztaly1E.Varazslo => "o_varazslo",
            Osztaly1E.Illuzionista => "o_illuzionista",
            _ => throw new ValidationException("invalid osztaly!")
        };
    }
    
    public static string Convert(this Osztaly2E osztaly)
    {
        return osztaly switch
        {
            Osztaly2E.Harcos => "o_2e_harcos",
            Osztaly2E.Ijasz => "o_2e_ijasz",
            Osztaly2E.Amazon => "o_2e_amazon",
            Osztaly2E.Kaloz => "o_2e_kaloz",
            Osztaly2E.Barbar => "o_2e_barbar",
            Osztaly2E.Pap => "o_2e_pap",
            Osztaly2E.Tolvaj => "o_2e_tolvaj",
            Osztaly2E.Varazslo => "o_2e_varazslo",
            Osztaly2E.Illuzionista => "o_2e_illuzionista",
            Osztaly2E.Dalnok => "o_2e_dalnok",
            Osztaly2E.Druida => "o_2e_druida",
            Osztaly2E.Vandor => "o_2e_vandor",
            _ => throw new ValidationException("invalid osztaly!")
        };
    }
}