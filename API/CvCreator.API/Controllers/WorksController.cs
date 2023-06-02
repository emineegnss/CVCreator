using CvCreator.API.Model.DTOs.Work;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using CVCreator.Model.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorksController : ControllerBase
    {
        readonly ICV_WorkExperienceWriteRepository _workExperienceWriteRepository;
        readonly ICV_WorkExperienceReadRepository _workExperienceReadRepository;
        readonly UserManager<AppUser> _userManager;

        public WorksController(ICV_WorkExperienceWriteRepository workExperienceWriteRepository, ICV_WorkExperienceReadRepository workExperienceReadRepository, UserManager<AppUser> userManager)
        {
            _workExperienceWriteRepository = workExperienceWriteRepository;
            _workExperienceReadRepository = workExperienceReadRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var works = _workExperienceReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<WorkGetDto> workDtos = new List<WorkGetDto>();
                foreach (var work in works)
                {
                    WorkGetDto workDto = new WorkGetDto
                    {
                        Id = work.Id,
                        CompanyName = work.CompanyName,
                        Position = work.Position,
                        Department = work.Department,
                        IsContinuing = work.IsContinuing,
                        StartDate = work.StartDate,
                        EndDate = work.EndDate,
                        Projects = work.Projects,
                        ProjectsDetails = work.ProjectsDetails,
                        CompanyAddress = work.CompanyAddress,
                        CompanyPhoneNumber = work.CompanyPhoneNumber,
                        Description = work.Description,
                        ProgrammingLanguages = work.ProgrammingLanguages,
                    };
                    workDtos.Add(workDto);
                }
                return Ok(workDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, WorkAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                await _workExperienceWriteRepository.AddAsync(new CV_WorkExperience
                {
                    Id = Guid.NewGuid(),
                    CompanyName = model.CompanyName,
                    Position = model.Position,
                    Department = model.Department,
                    IsContinuing = model.IsContinuing,
                    StartDate = model.StartDate,
                    EndDate = model.EndDate,
                    Projects = model.Projects,
                    ProjectsDetails = model.ProjectsDetails,
                    CompanyAddress = model.CompanyAddress,
                    CompanyPhoneNumber = model.CompanyPhoneNumber,
                    Description = model.Description,
                    ProgrammingLanguages = model.ProgrammingLanguages,
                    PersonId = user.PersonId.Value
                });
                await _workExperienceWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");
        }

        [HttpPut]
        public async Task<IActionResult> Put(string workId, [FromBody] WorkUpdateDto model)
        {
            var work = await _workExperienceReadRepository.GetByIdAsync(workId);
            if (work != null)
            {
                work.CompanyName = model.CompanyName;
                work.Position = model.Position;
                work.Department = model.Department;
                work.IsContinuing = model.IsContinuing;
                work.StartDate = model.StartDate;
                work.EndDate = model.EndDate;
                work.Projects = model.Projects;
                work.ProjectsDetails = model.ProjectsDetails;
                work.CompanyAddress = model.CompanyAddress;
                work.CompanyPhoneNumber = model.CompanyPhoneNumber;
                work.Description = model.Description;
                work.ProgrammingLanguages = model.ProgrammingLanguages;

                _workExperienceWriteRepository.Update(work);
                await _workExperienceWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(string workId)
        {
            var work = await _workExperienceReadRepository.GetByIdAsync(workId);
            if (work != null)
            {
                work.IsActive = false;

                _workExperienceWriteRepository.Update(work);
                await _workExperienceWriteRepository.SaveAsync();

                return Ok("İş silindi");
            }
            return BadRequest("İş bulunamadı!");
        }
    }
}
