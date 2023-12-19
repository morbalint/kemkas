using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kemkas.Web.Db.Migrations
{
    /// <inheritdoc />
    public partial class AddV1Character : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Karakterek",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    OwnerUserId = table.Column<int>(type: "integer", nullable: true),
                    Nev = table.Column<string>(type: "text", nullable: false),
                    Nem = table.Column<string>(type: "text", nullable: true),
                    Kor = table.Column<double>(type: "double precision", nullable: true),
                    Jellem = table.Column<byte>(type: "smallint", nullable: false),
                    Isten = table.Column<string>(type: "text", nullable: true),
                    Faj = table.Column<int>(type: "integer", nullable: false),
                    Osztaly = table.Column<int>(type: "integer", nullable: false),
                    Ero = table.Column<byte>(type: "smallint", nullable: false),
                    Ugyesseg = table.Column<byte>(type: "smallint", nullable: false),
                    Egeszseg = table.Column<byte>(type: "smallint", nullable: false),
                    Intelligencia = table.Column<byte>(type: "smallint", nullable: false),
                    Bolcsesseg = table.Column<byte>(type: "smallint", nullable: false),
                    Karizma = table.Column<byte>(type: "smallint", nullable: false),
                    Szint = table.Column<byte>(type: "smallint", nullable: false),
                    Pancel = table.Column<string>(type: "text", nullable: true),
                    Pajzs = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Karakterek", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Karakterek_AspNetUsers_OwnerUserId",
                        column: x => x.OwnerUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Felszerelesek",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsFegyver = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Felszerelesek", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Felszerelesek_Karakterek_KarakterId",
                        column: x => x.KarakterId,
                        principalTable: "Karakterek",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KarakterKepzettsegek",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterId = table.Column<Guid>(type: "uuid", nullable: false),
                    Kepzettseg = table.Column<int>(type: "integer", nullable: false),
                    IsTolvajKepzettseg = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KarakterKepzettsegek", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KarakterKepzettsegek_Karakterek_KarakterId",
                        column: x => x.KarakterId,
                        principalTable: "Karakterek",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Szintlepesek",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterId = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterSzint = table.Column<byte>(type: "smallint", nullable: false),
                    HpRoll = table.Column<byte>(type: "smallint", nullable: false),
                    TulajdonsagNoveles = table.Column<byte>(type: "smallint", nullable: true),
                    FegyverSpecializacio = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Szintlepesek", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Szintlepesek_Karakterek_KarakterId",
                        column: x => x.KarakterId,
                        principalTable: "Karakterek",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Felszerelesek_KarakterId",
                table: "Felszerelesek",
                column: "KarakterId");

            migrationBuilder.CreateIndex(
                name: "IX_Karakterek_OwnerUserId",
                table: "Karakterek",
                column: "OwnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_KarakterKepzettsegek_KarakterId",
                table: "KarakterKepzettsegek",
                column: "KarakterId");

            migrationBuilder.CreateIndex(
                name: "IX_Szintlepesek_KarakterId",
                table: "Szintlepesek",
                column: "KarakterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Felszerelesek");

            migrationBuilder.DropTable(
                name: "KarakterKepzettsegek");

            migrationBuilder.DropTable(
                name: "Szintlepesek");

            migrationBuilder.DropTable(
                name: "Karakterek");
        }
    }
}
