using CvCreator.API.Model.DTOs.DigitalSkill;
using CvCreator.API.Model.DTOs.Hobby;
using CvCreator.API.Model.DTOs.LanguageSkill;
using CvCreator.API.Model.DTOs.ProgrammingLanguage;
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
    [Authorize]
    public class DigitalSkillsController : ControllerBase
    {
        readonly ICV_DigitalSkillReadRepository _digitalSkillReadRepository;
        readonly ICV_DigitalSkillWriteRepository _digitalSkillWriteRepository;
        readonly ICV_ProgrammingLanguageReadRepository _programmingLanguageReadRepository;
        readonly UserManager<AppUser> _userManager;

        public DigitalSkillsController(ICV_DigitalSkillReadRepository digitalSkillReadRepository, ICV_DigitalSkillWriteRepository digitalSkillWriteRepository, UserManager<AppUser> userManager, ICV_ProgrammingLanguageReadRepository programmingLanguageReadRepository)
        {
            _digitalSkillReadRepository = digitalSkillReadRepository;
            _digitalSkillWriteRepository = digitalSkillWriteRepository;
            _userManager = userManager;
            _programmingLanguageReadRepository = programmingLanguageReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var digitalSkills = await _digitalSkillReadRepository.GetWhere(ds => ds.PersonId == user.PersonId).Include(x => x.ProgrammingLanguages).ToListAsync();

                var programmingLanguages = digitalSkills.SelectMany(ds => ds.ProgrammingLanguages).ToList();

                List<ProgrammingLanguageGetDto> programmingLanguagesDtos = new List<ProgrammingLanguageGetDto>();
                foreach (var programmingLanguage in programmingLanguages)
                {
                    var programmingLanguagesDto = new ProgrammingLanguageGetDto
                    {
                        Id = programmingLanguage.Id,
                        Name = programmingLanguage.Name,
                    };
                    programmingLanguagesDtos.Add(programmingLanguagesDto);
                }
                return Ok(programmingLanguagesDtos);
            }
            return BadRequest("Beceri bulunamadı");
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, DigitalSkillAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var digitalSkills = await _digitalSkillReadRepository.GetWhere(x => x.PersonId == user.PersonId).ToListAsync();

                if (digitalSkills.Any())
                {
                    var digitalSkillToRemove = digitalSkills.FirstOrDefault(x => x.PersonId == user.PersonId.Value);
                    if (digitalSkillToRemove != null)
                    {
                        await _digitalSkillWriteRepository.RemoveAsync(digitalSkillToRemove.Id.ToString());
                        await _digitalSkillWriteRepository.SaveAsync();
                    }
                }

                var programmingLanguages = await _programmingLanguageReadRepository.GetListByIds(model.ProgrammingLanguageIds).ToListAsync();


                var digitalSkill = new CV_DigitalSkill
                {
                    Id = Guid.NewGuid(),
                    ProgrammingLanguages = programmingLanguages,
                    PersonId = user.PersonId.Value
                };

                await _digitalSkillWriteRepository.AddAsync(digitalSkill);
                await _digitalSkillWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");
        }


    }
}
