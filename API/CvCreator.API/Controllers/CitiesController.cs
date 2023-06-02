using CvCreator.API.Data.Repositories.Abstractions;
using CvCreator.API.Model.DTOs.City;
using CvCreator.API.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        readonly ICV_CityReadRepository _cityReadRepository;
        readonly ICV_CityWriteRepository _cityWriteRepository;
        readonly ICV_CountryReadRepository _countryReadRepository;

        public CitiesController(ICV_CityReadRepository cityReadRepository, ICV_CityWriteRepository cityWriteRepository, ICV_CountryReadRepository countryReadRepository)
        {
            _cityReadRepository = cityReadRepository;
            _cityWriteRepository = cityWriteRepository;
            _countryReadRepository = countryReadRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CityDTO model)
        {
            Guid countryId = await _countryReadRepository.GetWhere(c => c.Name == model.CountryName).Select(x => x.Id).FirstOrDefaultAsync();

            CV_City city = new CV_City
            {
                Name = model.Name,
                CountryId = countryId
            };
            await _cityWriteRepository.AddAsync(city);
            await _cityWriteRepository.SaveAsync();
            return Ok(model);
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string countryName)
        {
            Guid countryId = await _countryReadRepository.GetWhere(c => c.Name == countryName).Select(x => x.Id).FirstOrDefaultAsync();
            var citiesName = _cityReadRepository.GetWhere(c => c.CountryId == countryId).Select(x => x.Name);
            return Ok(citiesName);
        }

    }
}
