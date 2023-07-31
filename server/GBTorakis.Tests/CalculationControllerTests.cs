using GBTorakis.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace GBTorakis.Tests
{
    public class CalculationControllerTests
    {
        [Theory]
        [InlineData("Austria")]
        [InlineData("United Kingdom")]
        [InlineData("Portugal")]
        [InlineData("Singapore")]
        public void GetCountries(string country)
        {
            var controller = new CalculationController();
            var result = controller.GetCountries();
            var countryRes = result.Where(r => r.Equals(country)).FirstOrDefault();
            Assert.Equal(country, countryRes);
        }

        [Theory]
        [InlineData("Austria", new int[] { 5, 10, 13, 20 })]
        [InlineData("United Kingdom", new int[] { 5, 20 })]
        [InlineData("Portugal", new int[] { 6, 13, 23 })]
        [InlineData("Singapore", new int[] { 7 })]
        public void GetVatRates(string country, int[] vatRates)
        {
            var controller = new CalculationController();
            var result = controller.GetVatRates();
            var countryRes = result.Where(r => r.Country.Equals(country)).FirstOrDefault();
            Assert.Equal(countryRes?.Country, country);
            Assert.Equal(countryRes?.Rates, vatRates);
        }
    }
}