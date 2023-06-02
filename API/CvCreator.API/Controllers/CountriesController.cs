using CvCreator.API.Data.Repositories.Abstractions;
using CvCreator.API.Model.DTOs.Country;
using CvCreator.API.Model.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        readonly ICV_CountryWriteRepository _countryWriteRepository;
        readonly ICV_CountryReadRepository _countryReadRepository;

        public CountriesController(ICV_CountryWriteRepository countryWriteRepository, ICV_CountryReadRepository countryReadRepository)
        {
            _countryWriteRepository = countryWriteRepository;
            _countryReadRepository = countryReadRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CountryDTO model)
        {
            CV_Country country = new CV_Country
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
            };
            await _countryWriteRepository.AddAsync(country);
            await _countryWriteRepository.SaveAsync();
            return Ok(country); 
        }
        [HttpGet]
        public IActionResult Get()
        {
            var countries = _countryReadRepository.GetAll().Select(x=>x.Name);
            return Ok(countries);
        }
    }
}
