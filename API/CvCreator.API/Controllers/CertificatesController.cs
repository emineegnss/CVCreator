using CvCreator.API.Model.DTOs.Certificate;
using CvCreator.API.Model.DTOs.Conference;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using CVCreator.Model.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificatesController : ControllerBase
    {
        readonly ICV_CertificateReadRepository _certificateReadRepository;
        readonly ICV_CertificateWriteRepository _certificateWriteRepository;
        readonly UserManager<AppUser> _userManager;

        public CertificatesController(ICV_CertificateReadRepository certificateReadRepository, ICV_CertificateWriteRepository certificateWriteRepository, UserManager<AppUser> userManager)
        {
            _certificateReadRepository = certificateReadRepository;
            _certificateWriteRepository = certificateWriteRepository;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && user.PersonId.HasValue)
            {
                var certificates = _certificateReadRepository.GetWhere(x => x.PersonId == user.PersonId && x.IsActive == true);
                List<CertificateGetDto> certificateDtos = new List<CertificateGetDto>();
                foreach (var certificate in certificates)
                {
                    CertificateGetDto certificateDto = new CertificateGetDto
                    {
                        Id = certificate.Id,
                        Name = certificate.Name,
                        Organization = certificate.Organization,
                        Date = certificate.Date,
                        Description = certificate.Description,
                        FileData = certificate.FileData,
                    };
                    certificateDtos.Add(certificateDto);
                }
                return Ok(certificateDtos);
            }
            return BadRequest("Kayıt Bulunamadı");
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string userId, [FromForm] CertificateAddDto model)
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

                var certificate = new CV_Certificate
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Date = model.Date,
                    Organization = model.Organization,
                    Description = model.Description,
                    FileData = fileData,
                    PersonId = user.PersonId.Value
                };

                await _certificateWriteRepository.AddAsync(certificate);
                await _certificateWriteRepository.SaveAsync();
                return Ok("Başarılı");
            }

            return BadRequest("Başarısız");
        }
        //[HttpPut]
        //public async Task<IActionResult> Put(string certificateId, [FromBody] CertificateUpdateDto model)
        //{
        //    var certificate = await _certificateReadRepository.GetByIdAsync(certificateId);
        //    if (certificate != null)
        //    {
        //        certificate.Name = model.Name;
        //        certificate.Date = model.Date;
        //        certificate.Organization = model.Organization;
        //        certificate.FileName = model.FileName;
        //        certificate.Description = model.Description;

        //        _certificateWriteRepository.Update(certificate);
        //        await _certificateWriteRepository.SaveAsync();

        //        return Ok("Başarılı");
        //    }
        //    return BadRequest("Sertifika bulunamadı!");
        //}
        [HttpDelete]
        public async Task<IActionResult> Delete(string certificateId)
        {
            var certificate = await _certificateReadRepository.GetByIdAsync(certificateId);
            if (certificate != null)
            {
                certificate.IsActive = false;

                _certificateWriteRepository.Update(certificate);
                await _certificateWriteRepository.SaveAsync();

                return Ok("Sertifika silindi");
            }
            return BadRequest("Sertifika bulunamadı!");
        }
    }
}
