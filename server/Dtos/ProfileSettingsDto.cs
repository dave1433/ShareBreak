namespace ShareBreak.Dtos;

/// <summary>
/// Request DTO for updating general profile settings (language, notifications, privacy)
/// </summary>
public class UpdateProfileSettingsRequest
{
    public string? Language { get; set; } // "en", "da"
    public UpdateNotificationPreferencesRequest? NotificationPreferences { get; set; }
    public UpdatePrivacySettingsRequest? PrivacySettings { get; set; }
}

/// <summary>
/// Response DTO for getting complete profile settings
/// </summary>
public class ProfileSettingsResponse
{
    public int UserId { get; set; }
    public string Language { get; set; } = "en";
    public NotificationPreferencesResponse NotificationPreferences { get; set; } = new();
    public PrivacySettingsResponse PrivacySettings { get; set; } = new();
}

/// <summary>
/// Request DTO for updating language preference only
/// </summary>
public class UpdateLanguageRequest
{
    public required string Language { get; set; } // "en" or "da"
}
