using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class LoginTest : PageTest
{
    UserStore userStore = new UserStore();

    [Test]
    public async Task UserCanLogin()
    {
        await using var browser = await Playwright.Chromium.LaunchAsync(new()
        {
            Headless = true
        });

        var page = await browser.NewPageAsync();

        var user = userStore.GetUser("fiedfi@akros.ch");

        await page.GotoAsync("https://am-ui.azurewebsites.net/");
        await page.ClickAsync("#btn-signin");
        await page.ClickAsync("#user-menu > li:first-of-type");
        // await page.PauseAsync();
        await page.FillAsync("#username", user.Username);
        await page.FillAsync("#password", user.Password);
        await page.ClickAsync("#kc-login");
        await page.WaitForTimeoutAsync(1500);

        var signInLabel = await page.Locator("span.signin-label").TextContentAsync();
        
        Assert.IsTrue(signInLabel.Contains(user.FirstName));
    }
}