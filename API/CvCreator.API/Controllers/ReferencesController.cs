using CvCreator.API.Model.DTOs.Reference;
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
    public class ReferencesController : ControllerBase
    {
        readonly ICV_ReferenceReadRepository _referenceReadRepository;
        readonly ICV_ReferenceWriteRepository _referenceWriteRepository;
        readonly UserManager<AppUser> _userManager;

        public ReferencesController(ICV_ReferenceReadRepository referenceReadRepository, ICV_ReferenceWriteRepository referenceWriteRepository, UserManager<AppUser> userManager)
        {
            _referenceReadRepository = referenceReadRepository;
            _referenceWriteRepository = referenceWriteRepository;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var references = _referenceReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<ReferenceGetDto> referenceDtos = new List<ReferenceGetDto>();
                foreach (var reference in references)
                {
                    ReferenceGetDto referenceDto = new ReferenceGetDto
                    {
                        Id = reference.Id,
                        Name = reference.Name,
                        Surname = reference.Surname,
                        Title = reference.Title,
                        Phone = reference.Phone,
                        Email = reference.Email,
                        Description = reference.Description,
                    };
                    referenceDtos.Add(referenceDto);
                }
                return Ok(referenceDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, ReferenceAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                await _referenceWriteRepository.AddAsync(new CV_Reference
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Surname = model.Surname,
                    Title = model.Title,
                    Phone = model.Phone,
                    Email = model.Email,
                    Description = model.Description,
                    PersonId = user.PersonId.Value
                });
                await _referenceWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");
        }

        [HttpPut]
        public async Task<IActionResult> Put(string referenceId, [FromBody] ReferenceUpdateDto model)
        {
            var reference = await _referenceReadRepository.GetByIdAsync(referenceId);
            if (reference != null)
            {
                reference.Name = model.Name;
                reference.Surname = model.Surname;
                reference.Title = model.Title;
                reference.Phone = model.Phone;
                reference.Email = model.Email;
                reference.Description = model.Description;

                _referenceWriteRepository.Update(reference);
                await _referenceWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest("Başarısız!");
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(string referenceId)
        {
            var reference = await _referenceReadRepository.GetByIdAsync(referenceId);
            if (reference != null)
            {
                reference.IsActive = false;

                _referenceWriteRepository.Update(reference);
                await _referenceWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest("Başarısız!");
        }
    }
}
