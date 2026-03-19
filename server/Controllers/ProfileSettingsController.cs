using Microsoft.AspNetCore.Mvc;
using ShareBreak.Dtos;
using ShareBreak.Services;

namespace ShareBreak.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileSettingsController : ControllerBase
{
    private readonly ProfileSettingsService _profileSettingsService;
    private readonly PrivacyService _privacyService;

    public ProfileSettingsController(
        ProfileSettingsService profileSettingsService,
        PrivacyService privacyService)
    {
        _profileSettingsService = profileSettingsService;
        _privacyService = privacyService;
    }

    /// <summary>
    /// Get profile settings for the current user
    /// Requires authentication
    /// </summary>
    [HttpGet("my-settings")]
    public async Task<ActionResult<ProfileSettingsResponse>> GetMySettings()
    {
        // TODO: Get current user ID from authentication context
        int userId = GetCurrentUserId();

        var settings = await _profileSettingsService.GetProfileSettingsAsync(userId);
        if (settings == null)
            return NotFound("Profile settings not found");

        return Ok(settings);
    }

    /// <summary>
    /// Get privacy settings for the current user
    /// </summary>
    [HttpGet("privacy")]
    public async Task<ActionResult<PrivacySettingsResponse>> GetPrivacySettings()
    {
        int userId = GetCurrentUserId();
        var settings = await _profileSettingsService.GetProfileSettingsAsync(userId);

        if (settings == null)
            return NotFound("Privacy settings not found");

        return Ok(settings.PrivacySettings);
    }

    /// <summary>
    /// Update privacy settings for the current user
    /// </summary>
    [HttpPut("privacy")]
    public async Task<ActionResult<PrivacySettingsResponse>> UpdatePrivacySettings(
        [FromBody] UpdatePrivacySettingsRequest request)
    {
        int userId = GetCurrentUserId();
        var updated = await _profileSettingsService.UpdatePrivacySettingsAsync(userId, request);
        return Ok(updated);
    }

    /// <summary>
    /// Get notification preferences for the current user
    /// </summary>
    [HttpGet("notifications")]
    public async Task<ActionResult<NotificationPreferencesResponse>> GetNotificationPreferences()
    {
        int userId = GetCurrentUserId();
        var settings = await _profileSettingsService.GetProfileSettingsAsync(userId);

        if (settings == null)
            return NotFound("Notification preferences not found");

        return Ok(settings.NotificationPreferences);
    }

    /// <summary>
    /// Update notification preferences for the current user
    /// </summary>
    [HttpPut("notifications")]
    public async Task<ActionResult<NotificationPreferencesResponse>> UpdateNotificationPreferences(
        [FromBody] UpdateNotificationPreferencesRequest request)
    {
        int userId = GetCurrentUserId();
        var updated = await _profileSettingsService.UpdateNotificationPreferencesAsync(userId, request);
        return Ok(updated);
    }

    /// <summary>
    /// Get language preference for the current user
    /// </summary>
    [HttpGet("language")]
    public async Task<ActionResult<object>> GetLanguage()
    {
        int userId = GetCurrentUserId();
        var settings = await _profileSettingsService.GetProfileSettingsAsync(userId);

        if (settings == null)
            return NotFound("Language preference not found");

        return Ok(new { language = settings.Language });
    }

    /// <summary>
    /// Update language preference for the current user
    /// </summary>
    [HttpPut("language")]
    public async Task<ActionResult<object>> UpdateLanguage([FromBody] UpdateLanguageRequest request)
    {
        int userId = GetCurrentUserId();
        var language = await _profileSettingsService.UpdateLanguageAsync(userId, request.Language);
        return Ok(new { language });
    }

    /// <summary>
    /// Update all profile settings at once
    /// </summary>
    [HttpPut("all")]
    public async Task<ActionResult<ProfileSettingsResponse>> UpdateAllSettings(
        [FromBody] UpdateProfileSettingsRequest request)
    {
        int userId = GetCurrentUserId();
        var updated = await _profileSettingsService.UpdateProfileSettingsAsync(userId, request);
        return Ok(updated);
    }

    // TODO: Implement endpoints for viewing other users' profiles with privacy filters
    // GET /api/profiles/{userId} - Get public profile with privacy filters applied

    /// <summary>
    /// Helper method to get current user ID from authentication context
    /// TODO: Replace with actual authentication implementation
    /// </summary>
    private int GetCurrentUserId()
    {
        // TODO: Extract from JWT token or authentication context
        // Stand-in: return 1
        return int.TryParse(User.FindFirst("sub")?.Value, out var userId) ? userId : 1;
    }
}
