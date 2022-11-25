using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class LanguageTest : PageTest
{
    [Test]
    public async Task UserCanChangeLanguage()
    {
        await Page.GotoAsync("https://am-ui.azurewebsites.net/");
        await Page.ClickAsync("#btn-language");
        await Page.ClickAsync("#lang-menu > li:nth-child(2)");
        var signInLabel = await Page.Locator("span.signin-label").TextContentAsync();

        Assert.AreEqual("sign in", signInLabel);
    }
}