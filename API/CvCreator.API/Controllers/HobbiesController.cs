using CvCreator.API.Model.DTOs.Hobby;
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
    public class HobbiesController : ControllerBase
    {
        readonly ICV_HobbyReadRepository _cvHobbyReadRepository;
        readonly ICV_HobbyWriteRepository _cvHobbyWriteRepository;
        readonly UserManager<AppUser> _userManager;

        public HobbiesController(ICV_HobbyReadRepository cvHobbyReadRepository, ICV_HobbyWriteRepository cvHobbyWriteRepository, UserManager<AppUser> userManager)
        {
            _cvHobbyReadRepository = cvHobbyReadRepository;
            _cvHobbyWriteRepository = cvHobbyWriteRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var hobbies = _cvHobbyReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<HobbyGetDto> hobbyDtos = new List<HobbyGetDto>();
                foreach (var hobby in hobbies)
                {
                    HobbyGetDto hobbyDto = new HobbyGetDto
                    {
                        Id = hobby.Id,
                        Name = hobby.Name,
                        Description = hobby.Description
                    };
                    hobbyDtos.Add(hobbyDto);
                }
                return Ok(hobbyDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, HobbyAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user!=null && user.PersonId.HasValue)
            {
                await _cvHobbyWriteRepository.AddAsync(new CV_Hobby
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Description = model.Description,
                    PersonId = user.PersonId.Value
                });
                await _cvHobbyWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");
        }

        [HttpPut]
        public async Task<IActionResult> Put(string hobbyId, [FromBody] HobbyUpdateDto model)
        {
            var hobby = await _cvHobbyReadRepository.GetByIdAsync(hobbyId);
            if (hobby != null)
            {
                hobby.Name = model.Name;
                hobby.Description = model.Description;

                _cvHobbyWriteRepository.Update(hobby);
                await _cvHobbyWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest("Hobi bulunamadı!");
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(string hobbyId)
        {
            var hobby = await _cvHobbyReadRepository.GetByIdAsync(hobbyId);
            if (hobby != null)
            {
                hobby.IsActive = false;

                _cvHobbyWriteRepository.Update(hobby);
                await _cvHobbyWriteRepository.SaveAsync();

                return Ok("Hobi silindi");
            }
            return BadRequest("Hobi bulunamadı!");
        }
    }
}
