using CvCreator.API.Model.DTOs.LanguageSkill;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using CVCreator.Model.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class LanguageSkillsController : ControllerBase
    {
        readonly ICV_LanguageSkillWriteRepository _languageSkillWriteRepository;
        readonly ICV_LanguageSkillReadRepository _languageSkillReadRepository;
        readonly UserManager<AppUser> _userManager;

        public LanguageSkillsController(ICV_LanguageSkillWriteRepository languageSkillWriteRepository, ICV_LanguageSkillReadRepository languageSkillReadRepository, UserManager<AppUser> userManager)
        {
            _languageSkillWriteRepository = languageSkillWriteRepository;
            _languageSkillReadRepository = languageSkillReadRepository;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var languages = _languageSkillReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<LanguageSkillGetDto> languageSkillsDtos = new List<LanguageSkillGetDto>();
                foreach (var languageSkill in languages)
                {
                    LanguageSkillGetDto languageSkillDto = new LanguageSkillGetDto
                    {
                        Id = languageSkill.Id,
                        ForeignLanguage = languageSkill.ForeignLanguage,
                        ListeningLevel = languageSkill.ListeningLevel,
                        ReadingLevel = languageSkill.ReadingLevel,
                        WritingLevel = languageSkill.WritingLevel,
                        SpeakingLevel = languageSkill.SpeakingLevel

                    };
                    languageSkillsDtos.Add(languageSkillDto);
                }
                return Ok(languageSkillsDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, LanguageSkillAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                await _languageSkillWriteRepository.AddAsync(new CV_LanguageSkill
                {
                    Id = Guid.NewGuid(),
                    ForeignLanguage = model.ForeignLanguage,
                    ReadingLevel = model.ReadingLevel,
                    WritingLevel = model.WritingLevel,
                    SpeakingLevel = model.SpeakingLevel,
                    ListeningLevel = model.ListeningLevel,
                    PersonId = user.PersonId.Value
                });
                await _languageSkillWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");

        }
        [HttpPut]
        public async Task<IActionResult> Put(string languageSkillId, [FromBody] LanguageSkillUpdateDto model)
        {
            var language = await _languageSkillReadRepository.GetByIdAsync(languageSkillId);
            if (language != null)
            {
                language.ForeignLanguage = model.ForeignLanguage;
                language.ReadingLevel = model.ReadingLevel;
                language.WritingLevel = model.WritingLevel;
                language.SpeakingLevel = model.SpeakingLevel;
                language.ListeningLevel = model.ListeningLevel;

                _languageSkillWriteRepository.Update(language);
                await _languageSkillWriteRepository.SaveAsync();
                return Ok("Başarılı");

            }
            return BadRequest("");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string languageSkillId)
        {
            var language = await _languageSkillReadRepository.GetByIdAsync(languageSkillId);
            if (language != null)
            {
                language.IsActive = false;
                _languageSkillWriteRepository.Update(language);
                await _languageSkillWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest();
        }

    }
}