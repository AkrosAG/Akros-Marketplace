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
        var user = userStore.GetUser("fiedfi@akros.ch");

        await Page.GotoAsync("https://am-ui.azurewebsites.net/");
        await Page.ClickAsync("#btn-signin");
        await Page.ClickAsync("#user-menu > li:first-of-type");
        await Page.FillAsync("#username", user.Username);
        await Page.FillAsync("#password", user.Password);
        await Page.ClickAsync("#kc-login");
        await Page.WaitForTimeoutAsync(1500);

        var signInLabel = await Page.Locator("span.signin-label").TextContentAsync();
        
        Assert.IsTrue(signInLabel.Contains(user.FirstName));
    }
}