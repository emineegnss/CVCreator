using CvCreator.API.Model.DTOs.ProgrammingLanguage;
using CvCreator.API.Model.DTOs.School;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using CVCreator.Model.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgrammingLanguagesController : ControllerBase
    {
        readonly ICV_ProgrammingLanguageReadRepository _programmingLanguageReadRepository;
        readonly ICV_ProgrammingLanguageWriteRepository _programmingLanguageWriteRepository;

        public ProgrammingLanguagesController(ICV_ProgrammingLanguageReadRepository programmingLanguageReadRepository, ICV_ProgrammingLanguageWriteRepository programmingLanguageWriteRepository)
        {
            _programmingLanguageReadRepository = programmingLanguageReadRepository;
            _programmingLanguageWriteRepository = programmingLanguageWriteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var programmingLanguages = await _programmingLanguageReadRepository.GetAll().ToListAsync();
            var result = programmingLanguages.Select(programmingLanguage => new ProgrammingLanguageGetDto
            {
                Id = programmingLanguage.Id,
                Name = programmingLanguage.Name
            }).ToList();
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Post(ProgrammingLanguageAddDto model)
        {
            await _programmingLanguageWriteRepository.AddAsync(new CV_ProgrammingLanguage
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                
            });
            await _programmingLanguageWriteRepository.SaveAsync();
            return Ok(model);
        }

    }
}
