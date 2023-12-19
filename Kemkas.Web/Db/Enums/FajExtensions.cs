namespace Kemkas.Web.Db.Enums;

public static class FajExtensions
{
    public static Faj Convert(string faj)
    {
        return faj switch
        {
            "f_ember" => Faj.Ember,
            "f_amazon" => Faj.Amazon,
            "f_birodalmi" => Faj.Birodalmi,
            "f_etuniai" => Faj.Etuniai,
            "f_eszaki" => Faj.Eszaki,
            "f_osember" => Faj.Osember,
            "f_elf" => Faj.Elf,
            "f_felelf" => Faj.Felelf,
            "f_felork" => Faj.Felork,
            "f_felszerzet" => Faj.Felszerzet,
            "f_gnom" => Faj.Gnom,
            "f_torpe" => Faj.Torpe,
            _ => throw new Exception("invalid faj: " + faj)
        };
    }

    public static string Convert(this Faj faj)
    {
        return faj switch
        {
            Faj.Ember => "f_ember",
            Faj.Amazon => "f_amazon",
            Faj.Birodalmi => "f_birodalmi",
            Faj.Etuniai => "f_etuniai",
            Faj.Eszaki => "f_eszaki",
            Faj.Osember => "f_osember",
            Faj.Elf => "f_elf",
            Faj.Felelf => "f_felelf",
            Faj.Felork => "f_felork",
            Faj.Felszerzet => "f_felszerzet",
            Faj.Gnom => "f_gnom",
            Faj.Torpe => "f_torpe",
            _ => throw new Exception("invalid faj: " + faj)
        };
    }
}