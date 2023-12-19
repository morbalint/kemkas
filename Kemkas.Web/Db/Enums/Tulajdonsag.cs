namespace Kemkas.Web.Db.Enums;

[Flags]
public enum Tulajdonsag : byte
{
    Ero = 1,
    Ugyesseg = 2,
    Egeszseg = 4,
    Intelligencia = 8,
    Bolcsesseg = 16,
    Karizma = 32,
}