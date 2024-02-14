using System.ComponentModel.DataAnnotations;

namespace Kemkas.Web.Db.Enums;

public static class KepzettsegExtensions
{
    public static Kepzettseg1E Convert1E(string kepzettseg)
    {
        return kepzettseg switch
        {
            "k_alkimia" => Kepzettseg1E.Alkimia,
            "k_alcazas" => Kepzettseg1E.Alcazas,
            "k_allatidomitas" => Kepzettseg1E.Allatidomitas,
            "k_csapdak" => Kepzettseg1E.Csapdak,
            "k_csillagjoslas" => Kepzettseg1E.Csillagjoslas,
            "k_egyensulyozas" => Kepzettseg1E.Egyensulyozas,
            "k_eloadas" => Kepzettseg1E.Eloadas,
            "k_ertekbecsles" => Kepzettseg1E.Ertekbecsles,
            "k_gyogyitas" => Kepzettseg1E.Gyogyitas,
            "k_hajozas" => Kepzettseg1E.Hajozas,
            "k_hallgatozas" => Kepzettseg1E.Hallgatozas,
            "k_hamisitas" => Kepzettseg1E.Hamisitas,
            "k_jelek_olvasasa" => Kepzettseg1E.JelekOlvasasa,
            "k_koncentracio" => Kepzettseg1E.Koncentracio,
            "k_lovaglas" => Kepzettseg1E.Lovaglas,
            "k_maszas" => Kepzettseg1E.Maszas,
            "k_megfigyeles" => Kepzettseg1E.Megfigyeles,
            "k_meregkeveres" => Kepzettseg1E.Meregkeveres,
            "k_mesterseg" => Kepzettseg1E.Mesterseg,
            "k_nyomkereses" => Kepzettseg1E.Nyomkereses,
            "k_osonas" => Kepzettseg1E.Osonas,
            "k_rejtozes" => Kepzettseg1E.Rejtozes,
            "k_szabadulomuveszet" => Kepzettseg1E.Szabadulomuveszet,
            "k_tudas" => Kepzettseg1E.Tudas,
            "k_ugras" => Kepzettseg1E.Ugras,
            "k_uszas" => Kepzettseg1E.Uszas,
            "k_varazslatismeret" => Kepzettseg1E.Varazslatismeret,
            "k_zarnyitas" => Kepzettseg1E.Zarnyitas,
            "k_zsebmetszes" => Kepzettseg1E.Zsebmetszes,
            _ => throw new ValidationException("invalid kepzettseg: " + kepzettseg),
        };
    }
    
    public static Kepzettseg2E Convert2E(string kepzettseg)
    {
        return kepzettseg switch
        {
            "k_alkimia" => Kepzettseg2E.Alkimia,
            "k_alcazas" => Kepzettseg2E.Alcazas,
            "k_allatidomitas" => Kepzettseg2E.Allatidomitas,
            "k_csapdak" => Kepzettseg2E.Csapdak,
            "k_csillagjoslas" => Kepzettseg2E.Csillagjoslas,
            "k_egyensulyozas" => Kepzettseg2E.Egyensulyozas,
            "k_eloadas" => Kepzettseg2E.Eloadas,
            "k_ertekbecsles" => Kepzettseg2E.Ertekbecsles,
            "k_gyogyitas" => Kepzettseg2E.Gyogyitas,
            "k_hajozas" => Kepzettseg2E.Hajozas,
            "k_hallgatozas" => Kepzettseg2E.Hallgatozas,
            "k_hamisitas" => Kepzettseg2E.Hamisitas,
            "k_herbalizmus" => Kepzettseg2E.Herbalizmus,
            "k_historia" => Kepzettseg2E.Historia,
            "k_jelek_olvasasa" => Kepzettseg2E.JelekOlvasasa,
            "k_lovaglas" => Kepzettseg2E.Lovaglas,
            "k_maszas" => Kepzettseg2E.Maszas,
            "k_megfigyeles" => Kepzettseg2E.Megfigyeles,
            "k_meregkeveres" => Kepzettseg2E.Meregkeveres,
            "k_mesterseg" => Kepzettseg2E.Mesterseg,
            "k_nyomkereses" => Kepzettseg2E.Nyomkereses,
            "k_okkultizmus" => Kepzettseg2E.Okkultizmus,
            "k_osonas" => Kepzettseg2E.Osonas,
            "k_szabadulomuveszet" => Kepzettseg2E.Szabadulomuveszet,
            "k_ugras" => Kepzettseg2E.Ugras,
            "k_uszas" => Kepzettseg2E.Uszas,
            "k_vadonjaras" => Kepzettseg2E.Vadonjaras,
            "k_zarnyitas" => Kepzettseg2E.Zarnyitas,
            "k_zsebmetszes" => Kepzettseg2E.Zsebmetszes,
            _ => throw new ValidationException("invalid kepzettseg: " + kepzettseg),
        };
    }

    public static string Convert(this Kepzettseg1E kepzettseg)
    {
        return kepzettseg switch
        {
            Kepzettseg1E.Alkimia => "k_alkimia",
            Kepzettseg1E.Alcazas => "k_alcazas",
            Kepzettseg1E.Allatidomitas => "k_allatidomitas",
            Kepzettseg1E.Csapdak => "k_csapdak",
            Kepzettseg1E.Csillagjoslas => "k_csillagjoslas",
            Kepzettseg1E.Egyensulyozas => "k_egyensulyozas",
            Kepzettseg1E.Eloadas => "k_eloadas",
            Kepzettseg1E.Ertekbecsles => "k_ertekbecsles",
            Kepzettseg1E.Gyogyitas => "k_gyogyitas",
            Kepzettseg1E.Hajozas => "k_hajozas",
            Kepzettseg1E.Hallgatozas => "k_hallgatozas",
            Kepzettseg1E.Hamisitas => "k_hamisitas",
            Kepzettseg1E.JelekOlvasasa => "k_jelek_olvasasa",
            Kepzettseg1E.Koncentracio => "k_koncentracio",
            Kepzettseg1E.Lovaglas => "k_lovaglas",
            Kepzettseg1E.Maszas => "k_maszas",
            Kepzettseg1E.Megfigyeles => "k_megfigyeles",
            Kepzettseg1E.Meregkeveres => "k_meregkeveres",
            Kepzettseg1E.Mesterseg => "k_mesterseg",
            Kepzettseg1E.Nyomkereses => "k_nyomkereses",
            Kepzettseg1E.Osonas => "k_osonas",
            Kepzettseg1E.Rejtozes => "k_rejtozes",
            Kepzettseg1E.Szabadulomuveszet => "k_szabadulomuveszet",
            Kepzettseg1E.Tudas => "k_tudas",
            Kepzettseg1E.Ugras => "k_ugras",
            Kepzettseg1E.Uszas => "k_uszas",
            Kepzettseg1E.Varazslatismeret => "k_varazslatismeret",
            Kepzettseg1E.Zarnyitas => "k_zarnyitas",
            Kepzettseg1E.Zsebmetszes => "k_zsebmetszes",
            _ => throw new ValidationException("invalid kepzettseg: " + kepzettseg),
        };
    }
    
    public static string Convert(this Kepzettseg2E kepzettseg)
    {
        return kepzettseg switch
        {
            Kepzettseg2E.Alkimia => "k_alkimia",
            Kepzettseg2E.Alcazas => "k_alcazas",
            Kepzettseg2E.Allatidomitas => "k_allatidomitas",
            Kepzettseg2E.Csapdak => "k_csapdak",
            Kepzettseg2E.Csillagjoslas => "k_csillagjoslas",
            Kepzettseg2E.Egyensulyozas => "k_egyensulyozas",
            Kepzettseg2E.Eloadas => "k_eloadas",
            Kepzettseg2E.Ertekbecsles => "k_ertekbecsles",
            Kepzettseg2E.Gyogyitas => "k_gyogyitas",
            Kepzettseg2E.Hajozas => "k_hajozas",
            Kepzettseg2E.Hallgatozas => "k_hallgatozas",
            Kepzettseg2E.Hamisitas => "k_hamisitas",
            Kepzettseg2E.Herbalizmus => "k_herbalizmus",
            Kepzettseg2E.Historia => "k_historia",
            Kepzettseg2E.JelekOlvasasa => "k_jelek_olvasasa",
            Kepzettseg2E.Lovaglas => "k_lovaglas",
            Kepzettseg2E.Maszas => "k_maszas",
            Kepzettseg2E.Megfigyeles => "k_megfigyeles",
            Kepzettseg2E.Meregkeveres => "k_meregkeveres",
            Kepzettseg2E.Mesterseg => "k_mesterseg",
            Kepzettseg2E.Nyomkereses => "k_nyomkereses",
            Kepzettseg2E.Okkultizmus => "k_okkultizmus",
            Kepzettseg2E.Osonas => "k_osonas",
            Kepzettseg2E.Szabadulomuveszet => "k_szabadulomuveszet",
            Kepzettseg2E.Ugras => "k_ugras",
            Kepzettseg2E.Uszas => "k_uszas",
            Kepzettseg2E.Vadonjaras => "k_vadonjaras",
            Kepzettseg2E.Zarnyitas => "k_zarnyitas",
            Kepzettseg2E.Zsebmetszes => "k_zsebmetszes",
            _ => throw new ValidationException("invalid kepzettseg: " + kepzettseg),
        };
    }
}