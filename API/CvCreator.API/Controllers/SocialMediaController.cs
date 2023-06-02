using CvCreator.API.Model.DTOs.Social;
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

    public class SocialMediaController : ControllerBase
    {
        readonly ICV_SocialMediaReadRepository _socialMediaReadRepository;
        readonly ICV_SocialMediaWriteRepository _socialMediaWriteRepository;
        readonly UserManager<AppUser> _userManager;

        public SocialMediaController(ICV_SocialMediaReadRepository socialMediaReadRepository, ICV_SocialMediaWriteRepository socialMediaWriteRepository, UserManager<AppUser> userManager)
        {
            _socialMediaReadRepository = socialMediaReadRepository;
            _socialMediaWriteRepository = socialMediaWriteRepository;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var socailMedias = _socialMediaReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<SocialMediaGetDto> socialMediaDtos = new List<SocialMediaGetDto>();
                foreach (var socialMedia in socailMedias)
                {
                    SocialMediaGetDto socialMediaDto = new SocialMediaGetDto
                    {
                        Id = socialMedia.Id,
                        SocialMediaToolName = socialMedia.SocialMediaToolName,
                        Url = socialMedia.Url
                    };
                    socialMediaDtos.Add(socialMediaDto);
                }
                return Ok(socialMediaDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, SocialMediaAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                await _socialMediaWriteRepository.AddAsync(new CV_SocialMedia
                {
                    Id = Guid.NewGuid(),
                    SocialMediaToolName = model.SocialMediaToolName,
                    Url = model.Url,
                    PersonId = user.PersonId.Value

                });
                await _socialMediaWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(string socialMediaId, [FromBody] SocialMediaUpdateDto model)
        {
            var socailMedia = await _socialMediaReadRepository.GetByIdAsync(socialMediaId);
            if (socailMedia != null)
            {
                socailMedia.SocialMediaToolName = model.SocialMediaToolName;
                socailMedia.Url = model.Url;
                _socialMediaWriteRepository.Update(socailMedia);
                await _socialMediaWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest("Sosyal Medya bulunamadı!");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string socialMediaId)
        {
            var socialMedia = await _socialMediaReadRepository.GetByIdAsync(socialMediaId);
            if (socialMedia != null)
            {
                socialMedia.IsActive = false;
                _socialMediaWriteRepository.Update(socialMedia);
                await _socialMediaWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest();

        }

    }
}
