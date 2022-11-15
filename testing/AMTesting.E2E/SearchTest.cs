using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class SearchTest : PageTest
{
    [Test]
    public async Task UserCanSearchForObjects()
    {
        await using var browser = await Playwright.Chromium.LaunchAsync(new()
        {
            Headless = true
        });

        var page = await browser.NewPageAsync();

        await page.GotoAsync("https://am-ui.azurewebsites.net/");
        await page.ClickAsync("search-component form > a");
        await page.WaitForSelectorAsync("search-results-component");
    }
}