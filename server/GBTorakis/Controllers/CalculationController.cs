using Microsoft.AspNetCore.Mvc;

namespace GBTorakis.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CalculationController : ControllerBase
    {
        private static readonly string[] Countries = new[]
        {
            "Austria", "United Kingdom", "Portugal", "Singapore"
        };

        private static readonly VatRate[] VatRates = new[]
        {
            new VatRate
            {
                Country = "Austria",
                Rates = new[] { 5, 10, 13, 20 }
            },
            new VatRate
            {
                Country = "United Kingdom",
                Rates = new[] { 5, 20 }
            },
            new VatRate
            {
                Country = "Portugal",
                Rates = new[] { 6, 13, 23 }
            },
            new VatRate
            {
                Country = "Singapore",
                Rates = new[] { 7 }
            }
        };


        [HttpGet(Name = "GetCountries")]
        public IEnumerable<string> GetCountries()
        {
            return Countries.ToArray();
        }
        
        [HttpGet(Name = "GetVatRates")]
        public IEnumerable<VatRate> GetVatRates()
        {
            return VatRates.ToArray();
        }
    }
}