namespace Kemkas.Web.Db.Enums;

public static class FajExtensions
{
    public static Faj1E Convert1E(string faj)
    {
        return faj switch
        {
            "f_ember" => Faj1E.Ember,
            "f_amazon" => Faj1E.Amazon,
            "f_birodalmi" => Faj1E.Birodalmi,
            "f_etuniai" => Faj1E.Etuniai,
            "f_eszaki" => Faj1E.Eszaki,
            "f_osember" => Faj1E.Osember,
            "f_elf" => Faj1E.Elf,
            "f_felelf" => Faj1E.Felelf,
            "f_felork" => Faj1E.Felork,
            "f_felszerzet" => Faj1E.Felszerzet,
            "f_gnom" => Faj1E.Gnom,
            "f_torpe" => Faj1E.Torpe,
            _ => throw new Exception("invalid faj: " + faj)
        };
    }
    
    public static Faj2E Convert2E(string faj)
    {
        return faj switch
        {
            "f_2e_ember" => Faj2E.Ember,
            "f_2e_amazon" => Faj2E.Amazon,
            "f_2e_birodalmi" => Faj2E.Birodalmi,
            "f_2e_nomad" => Faj2E.Nomad,
            "f_2e_eszaki" => Faj2E.Eszaki,
            "f_2e_osember" => Faj2E.Osember,
            "f_2e_elf" => Faj2E.Elf,
            "f_2e_felelf" => Faj2E.Felelf,
            "f_2e_felork" => Faj2E.Felork,
            "f_2e_felszerzet" => Faj2E.Felszerzet,
            "f_2e_gnom" => Faj2E.Gnom,
            "f_2e_torpe" => Faj2E.Torpe,
            _ => throw new Exception("invalid faj: " + faj)
        };
    }

    public static string Convert(this Faj1E faj)
    {
        return faj switch
        {
            Faj1E.Ember => "f_ember",
            Faj1E.Amazon => "f_amazon",
            Faj1E.Birodalmi => "f_birodalmi",
            Faj1E.Etuniai => "f_etuniai",
            Faj1E.Eszaki => "f_eszaki",
            Faj1E.Osember => "f_osember",
            Faj1E.Elf => "f_elf",
            Faj1E.Felelf => "f_felelf",
            Faj1E.Felork => "f_felork",
            Faj1E.Felszerzet => "f_felszerzet",
            Faj1E.Gnom => "f_gnom",
            Faj1E.Torpe => "f_torpe",
            _ => throw new Exception("invalid faj: " + faj)
        };
    }
    
    public static string Convert(this Faj2E faj)
    {
        return faj switch
        {
            Faj2E.Ember => "f_2e_ember",
            Faj2E.Amazon => "f_2e_amazon",
            Faj2E.Birodalmi => "f_2e_birodalmi",
            Faj2E.Nomad => "f_2e_nomad",
            Faj2E.Eszaki => "f_2e_eszaki",
            Faj2E.Osember => "f_2e_osember",
            Faj2E.Elf => "f_2e_elf",
            Faj2E.Felelf => "f_2e_felelf",
            Faj2E.Felork => "f_2e_felork",
            Faj2E.Felszerzet => "f_2e_felszerzet",
            Faj2E.Gnom => "f_2e_gnom",
            Faj2E.Torpe => "f_2e_torpe",
            _ => throw new Exception("invalid faj: " + faj)
        };
    }
}