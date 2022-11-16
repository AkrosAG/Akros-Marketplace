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
        await Page.GotoAsync("https://am-ui.azurewebsites.net/");
        await Page.ClickAsync("search-component form > a");
        await Page.WaitForSelectorAsync("search-results-component");
    }
}