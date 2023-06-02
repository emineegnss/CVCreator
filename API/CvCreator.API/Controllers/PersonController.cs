using CvCreator.API.Model.DTOs.Person;
using CvCreator.API.Model.DTOs.User;
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
    public class PersonController : ControllerBase
    {
        readonly ICV_PersonWriteRepository _personWriteRepository;
        readonly ICV_PersonReadRepository _personReadRepository;
        readonly UserManager<AppUser> _userManager;
        readonly CV_Person _personManager;
       
        public PersonController(ICV_PersonWriteRepository cvPersonWriteRepository, ICV_PersonReadRepository personReadRepository, UserManager<AppUser> userManager)
        {
            _personWriteRepository = cvPersonWriteRepository;
            _personReadRepository = personReadRepository;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                if (user.PersonId.HasValue)
                {
                    var person = await _personReadRepository.GetByIdAsync(user.PersonId.ToString());
                    var personData = new PersonGetDto
                    {
                        Name = person.Name,
                        Surname = person.Surname,
                        About = person.About,
                        Address = person.Address,
                        Gender = person.Gender,
                        IdentityNumber = person.IdentityNumber,
                        LivingCity = person.LivingCity,
                        LivingCountry = person.LivingCountry,
                        Nationality = person.Nationality,
                        PhoneNumber = person.PhoneNumber,
                        ImageFile = person.ImageFile,
                    };

                    return Ok(personData);
                }

                var userData = new UserDTO
                {
                    Name = user.Name,
                    Surname = user.Surname,
                };
                return Ok(userData);
            }

            return NotFound();
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] string id, [FromForm] PersonAddDto model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                if (!user.PersonId.HasValue)
                {
                    var file = model.File;

                    if (file!=null)
                    {
                        byte[] fileData;
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            file.CopyTo(memoryStream);
                            fileData = memoryStream.ToArray();
                        }
                        var person = new CV_Person
                        {
                            Id = Guid.NewGuid(),
                            Name = model.Name,
                            Surname = model.Surname,
                            PhoneNumber = model.PhoneNumber,
                            Gender = model.Gender,
                            Nationality = model.Nationality,
                            About = model.About,
                            IdentityNumber = model.IdentityNumber,
                            LivingCountry = model.LivingCountry,
                            LivingCity = model.LivingCity,
                            Address = model.Address,
                            ImageFile = fileData,
                        };
                        user.Name = model.Name;
                        user.Surname = model.Surname;

                        await _personWriteRepository.AddAsync(person);
                        await _personWriteRepository.SaveAsync();

                        user.PersonId = person.Id;

                        try
                        {
                            await _userManager.UpdateAsync(user);
                        }
                        catch (Exception ex)
                        {
                            return Ok(ex.Message);
                        }
                    }
                }
                   
                else
                {
                    var person = await _personReadRepository.GetByIdAsync(user.PersonId.ToString());
                    var file = model.File;
                    
                    if (person != null)
                    {
                        // Var olan kişiyi güncelle
                        person.Name = model.Name;
                        person.Surname = model.Surname;
                        person.PhoneNumber = model.PhoneNumber;
                        person.Gender = model.Gender;
                        person.Nationality = model.Nationality;
                        person.About = model.About;
                        person.IdentityNumber = model.IdentityNumber;
                        person.LivingCountry = model.LivingCountry;
                        person.LivingCity = model.LivingCity;
                        person.Address = model.Address;

                        if (file != null)
                        {
                            byte[] fileData;
                            using (MemoryStream memoryStream = new MemoryStream())
                            {
                                file.CopyTo(memoryStream);
                                fileData = memoryStream.ToArray();
                            }
                            person.ImageFile = fileData;
                        }
                       
                        _personWriteRepository.Update(person);
                        await _personWriteRepository.SaveAsync();
                    }
                }
                return Ok("İşlem başarılı");
            }
            return BadRequest("Kullanıcı bulunamadı");
        }
        [HttpGet]
        [Route("GetFirstName")]
        public async Task<string> GetFirstName(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                return user.Name;
            }
            return "";
        }

        [HttpGet]
        [Route("GetPhoto")]
        public async Task<byte[]> GetPhoto(string id)

        {
            var user = await _userManager.FindByIdAsync(id);
            if(user != null)
            {
                var person = await _personReadRepository.GetByIdAsync(user.PersonId.ToString());
                return person.ImageFile;
            }
            return null;


        }
        [HttpGet]
        [Route("GetName")]
        public async Task<string> GetName(string id)

        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var person = await _personReadRepository.GetByIdAsync(user.PersonId.ToString());
                return person.Name;
            }
            return "";


        }

    }
}
