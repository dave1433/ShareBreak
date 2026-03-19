using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddFriendsFeature : Migration
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

            migrationBuilder.AddColumn<DateTime>(
                name: "LastSeen",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

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

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "ProfileBadges",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Friends",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<Guid>(
                name: "FriendId",
                table: "Friends",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "InteractionScore",
                table: "Friends",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestedAt",
                table: "Friends",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "RequesterId",
                table: "Friends",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Friends",
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

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "CategoryBadges",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_UserChallenges_ChallengeId",
                table: "UserChallenges",
                column: "ChallengeId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_UserChallenges_Challenges_ChallengeId",
                table: "UserChallenges",
                column: "ChallengeId",
                principalTable: "Challenges",
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

            migrationBuilder.DropForeignKey(
                name: "FK_UserChallenges_Challenges_ChallengeId",
                table: "UserChallenges");

            migrationBuilder.DropIndex(
                name: "IX_UserChallenges_ChallengeId",
                table: "UserChallenges");

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
                name: "LastSeen",
                table: "Users");

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
                name: "InteractionScore",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "RequestedAt",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "RequesterId",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Friends");

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

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Friends",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "FriendId",
                table: "Friends",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "CategoryBadges",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
