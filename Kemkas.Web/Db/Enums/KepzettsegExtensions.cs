using System.ComponentModel.DataAnnotations;

namespace Kemkas.Web.Db.Enums;

public static class KepzettsegExtensions
{
    public static Kepzettseg Convert(string kepzettseg)
    {
        return kepzettseg switch
        {
            "k_alkimia" => Kepzettseg.Alkimia,
            "k_alcazas" => Kepzettseg.Alcazas,
            "k_allatidomitas" => Kepzettseg.Allatidomitas,
            "k_csapdak" => Kepzettseg.Csapdak,
            "k_csillagjoslas" => Kepzettseg.Csillagjoslas,
            "k_egyensulyozas" => Kepzettseg.Egyensulyozas,
            "k_eloadas" => Kepzettseg.Eloadas,
            "k_ertekbecsles" => Kepzettseg.Ertekbecsles,
            "k_gyogyitas" => Kepzettseg.Gyogyitas,
            "k_hajozas" => Kepzettseg.Hajozas,
            "k_hallgatozas" => Kepzettseg.Hallgatozas,
            "k_hamisitas" => Kepzettseg.Hamisitas,
            "k_jelek_olvasasa" => Kepzettseg.JelekOlvasasa,
            "k_koncentracio" => Kepzettseg.Koncentracio,
            "k_lovaglas" => Kepzettseg.Lovaglas,
            "k_maszas" => Kepzettseg.Maszas,
            "k_megfigyeles" => Kepzettseg.Megfigyeles,
            "k_meregkeveres" => Kepzettseg.Meregkeveres,
            "k_mesterseg" => Kepzettseg.Mesterseg,
            "k_nyomkereses" => Kepzettseg.Nyomkereses,
            "k_osonas" => Kepzettseg.Osonas,
            "k_rejtozes" => Kepzettseg.Rejtozes,
            "k_szabadulomuveszet" => Kepzettseg.Szabadulomuveszet,
            "k_tudas" => Kepzettseg.Tudas,
            "k_ugras" => Kepzettseg.Ugras,
            "k_uszas" => Kepzettseg.Uszas,
            "k_varazslatismeret" => Kepzettseg.Varazslatismeret,
            "k_zarnyitas" => Kepzettseg.Zarnyitas,
            "k_zsebmetszes" => Kepzettseg.Zsebmetszes,
            _ => throw new ValidationException("invalid kepzettseg: " + kepzettseg),
        };
    }

    public static string Convert(this Kepzettseg kepzettseg)
    {
        return kepzettseg switch
        {
            Kepzettseg.Alkimia => "k_alkimia",
            Kepzettseg.Alcazas => "k_alcazas",
            Kepzettseg.Allatidomitas => "k_allatidomitas",
            Kepzettseg.Csapdak => "k_csapdak",
            Kepzettseg.Csillagjoslas => "k_csillagjoslas",
            Kepzettseg.Egyensulyozas => "k_egyensulyozas",
            Kepzettseg.Eloadas => "k_eloadas",
            Kepzettseg.Ertekbecsles => "k_ertekbecsles",
            Kepzettseg.Gyogyitas => "k_gyogyitas",
            Kepzettseg.Hajozas => "k_hajozas",
            Kepzettseg.Hallgatozas => "k_hallgatozas",
            Kepzettseg.Hamisitas => "k_hamisitas",
            Kepzettseg.JelekOlvasasa => "k_jelek_olvasasa",
            Kepzettseg.Koncentracio => "k_koncentracio",
            Kepzettseg.Lovaglas => "k_lovaglas",
            Kepzettseg.Maszas => "k_maszas",
            Kepzettseg.Megfigyeles => "k_megfigyeles",
            Kepzettseg.Meregkeveres => "k_meregkeveres",
            Kepzettseg.Mesterseg => "k_mesterseg",
            Kepzettseg.Nyomkereses => "k_nyomkereses",
            Kepzettseg.Osonas => "k_osonas",
            Kepzettseg.Rejtozes => "k_rejtozes",
            Kepzettseg.Szabadulomuveszet => "k_szabadulomuveszet",
            Kepzettseg.Tudas => "k_tudas",
            Kepzettseg.Ugras => "k_ugras",
            Kepzettseg.Uszas => "k_uszas",
            Kepzettseg.Varazslatismeret => "k_varazslatismeret",
            Kepzettseg.Zarnyitas => "k_zarnyitas",
            Kepzettseg.Zsebmetszes => "k_zsebmetszes",
            _ => throw new ValidationException("invalid kepzettseg: " + kepzettseg),
        };
    }
}