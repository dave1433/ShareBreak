namespace server.Util;

public static class RequiredEnvVariables
{
    public static string[] GetRequiredEnvVars()
    {
        return
        [
            "DEV_DB_CONNECTION", "SECRET", "SUPER_USER_EMAIL", "SUPER_PASSWORD"
        ];
    }
}