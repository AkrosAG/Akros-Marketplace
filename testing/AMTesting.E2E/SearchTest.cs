using System.Text.RegularExpressions;
using System.Threading.Tasks;
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

        //TODO
    }
}