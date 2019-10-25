using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ITWORK.API.Migrations
{
    public partial class ExpendedOrganizationClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrganizationFollows",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FollowerId = table.Column<int>(nullable: false),
                    FolloweeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationFollows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationFollows_Organizations_FolloweeId",
                        column: x => x.FolloweeId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationFollows_Users_FollowerId",
                        column: x => x.FollowerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false),
                    PublicID = table.Column<string>(nullable: true),
                    OrganizationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationPhotos_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationFollows_FolloweeId",
                table: "OrganizationFollows",
                column: "FolloweeId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationFollows_FollowerId",
                table: "OrganizationFollows",
                column: "FollowerId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationPhotos_OrganizationId",
                table: "OrganizationPhotos",
                column: "OrganizationId");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationFollows");

            migrationBuilder.DropTable(
                name: "OrganizationPhotos");
        }
    }
}
