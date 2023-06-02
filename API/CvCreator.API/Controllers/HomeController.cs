using CvCreator.API.Model.DTOs.Person;
using CvCreator.API.Model.DTOs.User;
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
    public class HomeController : ControllerBase
    {
        readonly UserManager<AppUser> _userManager;
        readonly ICV_PersonReadRepository _personReadRepository;

        public HomeController(UserManager<AppUser> userManager, ICV_PersonReadRepository personReadRepository)
        {
            _userManager = userManager;
            _personReadRepository = personReadRepository;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.Identity.Name;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
