using CvCreator.API.Model.DTOs.Intern;
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
    public class InternshipsController : ControllerBase
    {
        readonly ICV_InternReadRepository _internReadRepository;
        readonly ICV_InternWriteRepository _internWriteRepository;
        readonly UserManager<AppUser> _userManager;

        public InternshipsController(ICV_InternReadRepository internReadRepository, ICV_InternWriteRepository internWriteRepository, UserManager<AppUser> userManager)
        {
            _internReadRepository = internReadRepository;
            _internWriteRepository = internWriteRepository;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var interns = _internReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<InternGetDto> internDtos = new List<InternGetDto>();
                foreach (var intern in interns)
                {
                    InternGetDto internDto = new InternGetDto
                    {
                        Id = intern.Id,
                        CompanyName = intern.CompanyName,
                        Department = intern.Department,
                        Position = intern.Position,
                        StartDate = intern.StartDate,
                        EndDate = intern.EndDate,
                        IsContinuing = intern.IsContinuing,
                        Projects = intern.Projects,
                        Languages = intern.Languages,
                        ProjectDetails = intern.ProjectDetails,
                        Country = intern.Country,
                        City = intern.City,
                        CompanyAddress = intern.CompanyAddress,
                        CompanyPhoneNumber = intern.CompanyPhoneNumber,
                        Description = intern.Description
                    };
                    internDtos.Add(internDto);
                }

                return Ok(internDtos);
            }
            return BadRequest("Kayıtlı staj bilgisi yok");
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, InternAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                await _internWriteRepository.AddAsync(new CV_Intern
                {
                    Id = Guid.NewGuid(),
                    CompanyName = model.CompanyName,
                    Department = model.Department,
                    Position = model.Position,
                    StartDate = model.StartDate,
                    EndDate = model.EndDate,
                    IsContinuing = model.IsContinuing,
                    Projects = model.Projects,
                    Languages = model.Languages,
                    ProjectDetails = model.ProjectDetails,
                    Country = model.Country,
                    City = model.City,
                    CompanyAddress = model.CompanyAddress,
                    CompanyPhoneNumber = model.CompanyPhoneNumber,
                    Description = model.Description,
                    PersonId = user.PersonId.Value
                });
                await _internWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");
        }
        [HttpPut]
        public async Task<IActionResult> Put(string internshipId, [FromBody] InternUpdateDto model)
        {
            var intern = await _internReadRepository.GetByIdAsync(internshipId);
            if (intern != null)
            {
                intern.CompanyName = model.CompanyName;
                intern.Department = model.Department;
                intern.Position = model.Position;
                intern.StartDate = model.StartDate;
                intern.EndDate = model.EndDate;
                intern.IsContinuing = model.IsContinuing;
                intern.Projects = model.Projects;
                intern.Languages = model.Languages;
                intern.ProjectDetails = model.ProjectDetails;
                intern.Country = model.Country;
                intern.City = model.City;
                intern.CompanyAddress = model.CompanyAddress;
                intern.CompanyPhoneNumber = model.CompanyPhoneNumber;
                intern.Description = model.Description;

                _internWriteRepository.Update(intern);
                await _internWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest();
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(string internshipId)
        {
            var intern = await _internReadRepository.GetByIdAsync(internshipId);
            if (intern != null)
            {
                intern.IsActive = false;
                _internWriteRepository.Update(intern);
                await _internWriteRepository.SaveAsync();

                return Ok("Staj silindi");
            }
            return BadRequest("Staj bulunamadı!");
        }

    }
}
