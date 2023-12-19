namespace Kemkas.Web.Db.Enums;

[Flags]
public enum Jellem : byte
{
    Semleges = 0,
    Torvenyes = 1,
    Kaotikus = 2,
    Jo = 4,
    TorvenyesJo = Torvenyes | Jo, // 5
    KaotikusJo = Kaotikus | Jo, // 6
    Gonosz = 8,
    TorvenyesGonosz = Torvenyes | Gonosz, // 9
    KaotikusGonosz = Kaotikus | Gonosz, // 10
}