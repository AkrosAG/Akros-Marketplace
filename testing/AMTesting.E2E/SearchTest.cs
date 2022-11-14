using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright;
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
            Headless = false,
            SlowMo = 100
        });

        var page = await browser.NewPageAsync();

        await page.GotoAsync("https://am-ui.azurewebsites.net/");
        await page.PauseAsync();
        await page.ClickAsync("search-component form > a");

        await page.WaitForSelectorAsync("search-results-component");
    }
}