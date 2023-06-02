using CvCreator.API.Model.DTOs.Conference;
using CvCreator.API.Model.DTOs.Hobby;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using CVCreator.Model.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ConferencesController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        readonly ICV_ConferenceReadRepository _conferenceReadRepository;
        readonly ICV_ConferenceWriteRepository _conferenceWriteRepository;
        readonly UserManager<AppUser> _userManager;

        public ConferencesController(IWebHostEnvironment webHostEnvironment, ICV_ConferenceReadRepository conferenceReadRepository, ICV_ConferenceWriteRepository conferenceWriteRepository, UserManager<AppUser> userManager)
        {
            _webHostEnvironment = webHostEnvironment;
            _conferenceReadRepository = conferenceReadRepository;
            _conferenceWriteRepository = conferenceWriteRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var conferences = _conferenceReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<ConferenceGetDto> conferenceDtos = new List<ConferenceGetDto>();
                foreach (var conference in conferences)
                {
                    ConferenceGetDto conferenceDto = new ConferenceGetDto
                    {
                        Id = conference.Id,
                        Name = conference.Name,
                        Date = conference.Date,
                        Location = conference.Location,
                        Description = conference.Description,
                        FileData = conference.FileData,
                    };
                    conferenceDtos.Add(conferenceDto);
                }
                return Ok(conferenceDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, [FromForm] ConferenceAddDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var file = model.File;

                byte[] fileData;
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    fileData = memoryStream.ToArray();
                }

                var conference = new CV_Conference
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Date = model.Date,
                    Location = model.Location,
                    Description = model.Description,
                    FileData = fileData,
                    PersonId = user.PersonId.Value
                };

                await _conferenceWriteRepository.AddAsync(conference);
                await _conferenceWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }

            return BadRequest("Başarısız");
        }

        [HttpPut]
        public async Task<IActionResult> Put(string conferenceId, [FromBody] ConferenceUpdateDto model)
        {
            var conference = await _conferenceReadRepository.GetByIdAsync(conferenceId);
            if (conference != null)
            {
                conference.Name = model.Name;
                conference.Date = model.Date;
                conference.Location = model.Location;
                //conference.FileName = model.FileName;
                conference.Description = model.Description;

                _conferenceWriteRepository.Update(conference);
                await _conferenceWriteRepository.SaveAsync();

                return Ok("Başarılı");
            }
            return BadRequest("Konferans bulunamadı!");
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(string conferenceId)
        {
            var conference = await _conferenceReadRepository.GetByIdAsync(conferenceId);
            if (conference != null)
            {
                conference.IsActive = false;

                _conferenceWriteRepository.Update(conference);
                await _conferenceWriteRepository.SaveAsync();

                return Ok("Konferans silindi");
            }
            return BadRequest("Konferans bulunamadı!");
        }
    }
}
