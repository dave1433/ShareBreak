using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddForeignKeysForTablesManual : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Ensure indexes exist before creating FK constraints.
            migrationBuilder.Sql("CREATE INDEX IF NOT EXISTS \"IX_Friends_UserId\" ON \"Friends\" (\"UserId\");");
            migrationBuilder.Sql("CREATE INDEX IF NOT EXISTS \"IX_Friends_FriendId\" ON \"Friends\" (\"FriendId\");");
            migrationBuilder.Sql("CREATE INDEX IF NOT EXISTS \"IX_CategoryBadges_UserId\" ON \"CategoryBadges\" (\"UserId\");");
            migrationBuilder.Sql("CREATE UNIQUE INDEX IF NOT EXISTS \"IX_ProfileBadges_UserId\" ON \"ProfileBadges\" (\"UserId\");");
            migrationBuilder.Sql("CREATE INDEX IF NOT EXISTS \"IX_Challenges_CategoryId\" ON \"Challenges\" (\"CategoryId\");");
            migrationBuilder.Sql("CREATE INDEX IF NOT EXISTS \"IX_UserChallenges_UserId\" ON \"UserChallenges\" (\"UserId\");");
            migrationBuilder.Sql("CREATE INDEX IF NOT EXISTS \"IX_UserChallenges_ChallengeId\" ON \"UserChallenges\" (\"ChallengeId\");");

            // Drop same-name constraints first when they already exist with older definitions.
            migrationBuilder.Sql("ALTER TABLE \"CategoryBadges\" DROP CONSTRAINT IF EXISTS \"FK_CategoryBadges_Users_UserId\";");
            migrationBuilder.Sql("ALTER TABLE \"ProfileBadges\" DROP CONSTRAINT IF EXISTS \"FK_ProfileBadges_Users_UserId\";");
            migrationBuilder.Sql("ALTER TABLE \"Friends\" DROP CONSTRAINT IF EXISTS \"FK_Friends_Users_UserId\";");
            migrationBuilder.Sql("ALTER TABLE \"Friends\" DROP CONSTRAINT IF EXISTS \"FK_Friends_Users_FriendId\";");
            migrationBuilder.Sql("ALTER TABLE \"Challenges\" DROP CONSTRAINT IF EXISTS \"FK_Challenges_Categories_CategoryId\";");
            migrationBuilder.Sql("ALTER TABLE \"UserChallenges\" DROP CONSTRAINT IF EXISTS \"FK_UserChallenges_Users_UserId\";");
            migrationBuilder.Sql("ALTER TABLE \"UserChallenges\" DROP CONSTRAINT IF EXISTS \"FK_UserChallenges_Challenges_ChallengeId\";");

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_CategoryBadges_Users_UserId') THEN
                        ALTER TABLE \"CategoryBadges\"
                            ADD CONSTRAINT \"FK_CategoryBadges_Users_UserId\"
                            FOREIGN KEY (\"UserId\") REFERENCES \"Users\" (\"Id\") ON DELETE CASCADE;
                    END IF;
                END $$;
                """);

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_ProfileBadges_Users_UserId') THEN
                        ALTER TABLE \"ProfileBadges\"
                            ADD CONSTRAINT \"FK_ProfileBadges_Users_UserId\"
                            FOREIGN KEY (\"UserId\") REFERENCES \"Users\" (\"Id\") ON DELETE CASCADE;
                    END IF;
                END $$;
                """);

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_Friends_Users_UserId') THEN
                        ALTER TABLE \"Friends\"
                            ADD CONSTRAINT \"FK_Friends_Users_UserId\"
                            FOREIGN KEY (\"UserId\") REFERENCES \"Users\" (\"Id\") ON DELETE CASCADE;
                    END IF;
                END $$;
                """);

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_Friends_Users_FriendId') THEN
                        ALTER TABLE \"Friends\"
                            ADD CONSTRAINT \"FK_Friends_Users_FriendId\"
                            FOREIGN KEY (\"FriendId\") REFERENCES \"Users\" (\"Id\") ON DELETE NO ACTION;
                    END IF;
                END $$;
                """);

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_Challenges_Categories_CategoryId') THEN
                        ALTER TABLE \"Challenges\"
                            ADD CONSTRAINT \"FK_Challenges_Categories_CategoryId\"
                            FOREIGN KEY (\"CategoryId\") REFERENCES \"Categories\" (\"Id\") ON DELETE CASCADE;
                    END IF;
                END $$;
                """);

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_UserChallenges_Users_UserId') THEN
                        ALTER TABLE \"UserChallenges\"
                            ADD CONSTRAINT \"FK_UserChallenges_Users_UserId\"
                            FOREIGN KEY (\"UserId\") REFERENCES \"Users\" (\"Id\") ON DELETE CASCADE;
                    END IF;
                END $$;
                """);

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_UserChallenges_Challenges_ChallengeId') THEN
                        ALTER TABLE \"UserChallenges\"
                            ADD CONSTRAINT \"FK_UserChallenges_Challenges_ChallengeId\"
                            FOREIGN KEY (\"ChallengeId\") REFERENCES \"Challenges\" (\"Id\") ON DELETE CASCADE;
                    END IF;
                END $$;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("ALTER TABLE \"UserChallenges\" DROP CONSTRAINT IF EXISTS \"FK_UserChallenges_Challenges_ChallengeId\";");
            migrationBuilder.Sql("ALTER TABLE \"UserChallenges\" DROP CONSTRAINT IF EXISTS \"FK_UserChallenges_Users_UserId\";");
            migrationBuilder.Sql("ALTER TABLE \"Challenges\" DROP CONSTRAINT IF EXISTS \"FK_Challenges_Categories_CategoryId\";");
            migrationBuilder.Sql("ALTER TABLE \"Friends\" DROP CONSTRAINT IF EXISTS \"FK_Friends_Users_FriendId\";");
            migrationBuilder.Sql("ALTER TABLE \"Friends\" DROP CONSTRAINT IF EXISTS \"FK_Friends_Users_UserId\";");
            migrationBuilder.Sql("ALTER TABLE \"ProfileBadges\" DROP CONSTRAINT IF EXISTS \"FK_ProfileBadges_Users_UserId\";");
            migrationBuilder.Sql("ALTER TABLE \"CategoryBadges\" DROP CONSTRAINT IF EXISTS \"FK_CategoryBadges_Users_UserId\";");

            migrationBuilder.Sql("DROP INDEX IF EXISTS \"IX_UserChallenges_ChallengeId\";");
            migrationBuilder.Sql("DROP INDEX IF EXISTS \"IX_UserChallenges_UserId\";");
            migrationBuilder.Sql("DROP INDEX IF EXISTS \"IX_Challenges_CategoryId\";");
            migrationBuilder.Sql("DROP INDEX IF EXISTS \"IX_ProfileBadges_UserId\";");
            migrationBuilder.Sql("DROP INDEX IF EXISTS \"IX_CategoryBadges_UserId\";");
            migrationBuilder.Sql("DROP INDEX IF EXISTS \"IX_Friends_FriendId\";");
            migrationBuilder.Sql("DROP INDEX IF EXISTS \"IX_Friends_UserId\";");
        }
    }
}

