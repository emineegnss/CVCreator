using CvCreator.API.Model.DTOs.Education;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using CVCreator.Model.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EducationsController : ControllerBase
    {
        readonly ICV_EducationWriteRepository _educationWriteRepository;
        readonly ICV_EducationReadRepository _educationReadRepository;
        readonly ICV_SchoolReadRepository _schoolReadRepository;
        readonly UserManager<AppUser> _userManager;

        public EducationsController(ICV_EducationWriteRepository educationWriteRepository, ICV_SchoolReadRepository schoolReadRepository, UserManager<AppUser> userManager, ICV_EducationReadRepository educationReadRepository)
        {
            _educationWriteRepository = educationWriteRepository;
            _schoolReadRepository = schoolReadRepository;
            _userManager = userManager;
            _educationReadRepository = educationReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var educations = _educationReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<EducationGetDto> educationDtos = new List<EducationGetDto>();
                var schoolList = await _schoolReadRepository.GetAll().Select(x => new { x.Name, x.Id }).ToListAsync();

                foreach (var education in educations)
                {
                    var schoolName = schoolList.Where(x => x.Id == education.SchoolId).Select(x => x.Name).FirstOrDefault();
                    EducationGetDto educationDto = new EducationGetDto
                    {
                        Id = education.Id,
                        Department = education.Department,
                        EducationDegree = education.EducationDegree,
                        SchoolName = schoolName,
                        StartDate = education.StartDate,
                        FinishDate = education.FinishDate,
                        IsContinuing = education.IsContinuing,
                        GradingSystem = education.GradingSystem,
                        Grade = education.Grade,
                        EducationLanguage = education.EducationLanguage,
                        Description = education.Description
                    };
                    educationDtos.Add(educationDto);
                }
                return Ok(educationDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, EducationAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var schoolId = _schoolReadRepository.GetWhere(x=>x.Name == model.SchoolName).Select(x=>x.Id).FirstOrDefault();
                await _educationWriteRepository.AddAsync(new CV_Education
                {
                    Id = Guid.NewGuid(),
                    Department = model.Department,
                    EducationDegree = model.EducationDegree,
                    SchoolId = schoolId,
                    StartDate = model.StartDate,
                    FinishDate = model.FinishDate,
                    IsContinuing = model.IsContinuing,
                    GradingSystem = model.GradingSystem,
                    Grade = model.Grade,
                    EducationLanguage = model.EducationLanguage,
                    Description = model.Description,
                    PersonId = user.PersonId.Value
                });
                await _educationWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }
            return BadRequest("Başarısız");
        }
        [HttpPut]
        public async Task<IActionResult> Put(string educationId, [FromBody] EducationUpdateDto model)
        {
            var education = await _educationReadRepository.GetByIdAsync(educationId);
            if (education != null)
            {
                var schoolId = _schoolReadRepository.GetWhere(x => x.Name == model.SchoolName).Select(x => x.Id).FirstOrDefault();

                education.Department = model.Department;
                education.EducationDegree = model.EducationDegree;
                education.SchoolId = schoolId;
                education.StartDate = model.StartDate;
                education.FinishDate = model.FinishDate;
                education.IsContinuing = model.IsContinuing;
                education.GradingSystem = model.GradingSystem;
                education.Grade = model.Grade;
                education.EducationLanguage = model.EducationLanguage;
                education.Description = model.Description;

                _educationWriteRepository.Update(education);
                await _educationWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest("Eğitim bulunamadı!");
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(string educationId)
        {
            var education = await _educationReadRepository.GetByIdAsync(educationId);
            if (education != null)
            {
                education.IsActive = false;

                _educationWriteRepository.Update(education);
                await _educationWriteRepository.SaveAsync();

                return Ok("Eğitim silindi");
            }
            return BadRequest("Eğitim bulunamadı!");
        }
    }
}
