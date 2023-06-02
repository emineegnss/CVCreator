using CvCreator.API.Model.DTOs.School;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolsController : ControllerBase
    {
        readonly ICV_SchoolReadRepository _schoolReadRepository; 
        readonly ICV_SchoolWriteRepository _schoolWriteRepository;

        public SchoolsController(ICV_SchoolReadRepository schoolReadRepository, ICV_SchoolWriteRepository schoolWriteRepository)
        {
            _schoolReadRepository = schoolReadRepository;
            _schoolWriteRepository = schoolWriteRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CV_School>> Get()
        {
            var schools = await _schoolReadRepository.GetAll().ToListAsync();
            var result = schools.Select(school => new SchoolDTO
            {
                Id = school.Id,
                Name = school.Name
            }).OrderBy(x => x.Name).ToList();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(SchoolDTO model)
        {
            try
            {
                await _schoolWriteRepository.AddAsync(new CV_School
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                });
                await _schoolWriteRepository.SaveAsync();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
                throw;
            }
        }
    }
}
