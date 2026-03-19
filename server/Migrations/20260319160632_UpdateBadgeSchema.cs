using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBadgeSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "ProfileBadges");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ProfileBadges");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "CategoryBadges");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "CategoryBadges",
                newName: "Category");

            migrationBuilder.AddColumn<int>(
                name: "TotalPoints",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EarnedAt",
                table: "ProfileBadges",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Tier",
                table: "ProfileBadges",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ProfileBadges",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EarnedAt",
                table: "CategoryBadges",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Tier",
                table: "CategoryBadges",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "CategoryBadges",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProfileBadges_UserId",
                table: "ProfileBadges",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Friends_UserId",
                table: "Friends",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryBadges_UserId",
                table: "CategoryBadges",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryBadges_Users_UserId",
                table: "CategoryBadges",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_Users_UserId",
                table: "Friends",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileBadges_Users_UserId",
                table: "ProfileBadges",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryBadges_Users_UserId",
                table: "CategoryBadges");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_Users_UserId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfileBadges_Users_UserId",
                table: "ProfileBadges");

            migrationBuilder.DropIndex(
                name: "IX_ProfileBadges_UserId",
                table: "ProfileBadges");

            migrationBuilder.DropIndex(
                name: "IX_Friends_UserId",
                table: "Friends");

            migrationBuilder.DropIndex(
                name: "IX_CategoryBadges_UserId",
                table: "CategoryBadges");

            migrationBuilder.DropColumn(
                name: "TotalPoints",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EarnedAt",
                table: "ProfileBadges");

            migrationBuilder.DropColumn(
                name: "Tier",
                table: "ProfileBadges");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ProfileBadges");

            migrationBuilder.DropColumn(
                name: "EarnedAt",
                table: "CategoryBadges");

            migrationBuilder.DropColumn(
                name: "Tier",
                table: "CategoryBadges");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CategoryBadges");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "CategoryBadges",
                newName: "Name");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "ProfileBadges",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ProfileBadges",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "CategoryBadges",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
