using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kemkas.Web.Db.Migrations
{
    /// <inheritdoc />
    public partial class AddSecondEditionModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Karakterek2E",
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
                    table.PrimaryKey("PK_Karakterek2E", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Karakterek2E_AspNetUsers_OwnerUserId",
                        column: x => x.OwnerUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Felszerelesek2E",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterId = table.Column<Guid>(type: "uuid", nullable: false),
                    TargyId = table.Column<string>(type: "text", nullable: false),
                    IsFegyver = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Felszerelesek2E", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Felszerelesek2E_Karakterek2E_KarakterId",
                        column: x => x.KarakterId,
                        principalTable: "Karakterek2E",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KarakterKepzettsegek2E",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterId = table.Column<Guid>(type: "uuid", nullable: false),
                    Kepzettseg = table.Column<int>(type: "integer", nullable: false),
                    IsTolvajKepzettseg = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KarakterKepzettsegek2E", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KarakterKepzettsegek2E_Karakterek2E_KarakterId",
                        column: x => x.KarakterId,
                        principalTable: "Karakterek2E",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Szintlepesek2E",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterId = table.Column<Guid>(type: "uuid", nullable: false),
                    KarakterSzint = table.Column<byte>(type: "smallint", nullable: false),
                    Osztaly = table.Column<int>(type: "integer", nullable: false),
                    HpRoll = table.Column<byte>(type: "smallint", nullable: false),
                    TulajdonsagNoveles = table.Column<byte>(type: "smallint", nullable: true),
                    FegyverSpecializacio = table.Column<string>(type: "text", nullable: true),
                    TolvajExtraKepzettseg = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Szintlepesek2E", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Szintlepesek2E_Karakterek2E_KarakterId",
                        column: x => x.KarakterId,
                        principalTable: "Karakterek2E",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Felszerelesek2E_KarakterId",
                table: "Felszerelesek2E",
                column: "KarakterId");

            migrationBuilder.CreateIndex(
                name: "IX_Karakterek2E_OwnerUserId",
                table: "Karakterek2E",
                column: "OwnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_KarakterKepzettsegek2E_KarakterId",
                table: "KarakterKepzettsegek2E",
                column: "KarakterId");

            migrationBuilder.CreateIndex(
                name: "IX_Szintlepesek2E_KarakterId",
                table: "Szintlepesek2E",
                column: "KarakterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Felszerelesek2E");

            migrationBuilder.DropTable(
                name: "KarakterKepzettsegek2E");

            migrationBuilder.DropTable(
                name: "Szintlepesek2E");

            migrationBuilder.DropTable(
                name: "Karakterek2E");
        }
    }
}
