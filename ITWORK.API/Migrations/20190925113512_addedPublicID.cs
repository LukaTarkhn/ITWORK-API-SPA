using Microsoft.EntityFrameworkCore.Migrations;

namespace ITWORK.API.Migrations
{
    public partial class addedPublicID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Photos",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Photos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PublicID",
                table: "Photos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "PublicID",
                table: "Photos");
        }
    }
}
