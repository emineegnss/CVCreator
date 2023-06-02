using CvCreator.API.Model.DTOs;
using CvCreator.API.Model.DTOs.User;
using CvCreator.API.Services;
using CVCreator.DTOs;
using CVCreator.Model.Entities.Identity;
using CVCreator.Token;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Web;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly UserManager<AppUser> _userManager;
        readonly SignInManager<AppUser> _signInManager;
        readonly ITokenHandler _tokenHandler;
        readonly IMailService _mailService;

        public UsersController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenHandler tokenHandler, IMailService mailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
            _mailService = mailService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<CreateUserResponse> Register(RegisterDTO model)
        {
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                Email = model.Email,
                Name = model.Name,
                Surname = model.Surname,
                UserName = model.Email
            }, model.Password);

            CreateUserResponse response = new() { Succeeded = result.Succeeded };

            if (result.Succeeded)
                response.Message = "Kullanıcı başarıyla oluşturulmuştur.";
            else
                foreach (var error in result.Errors)
                    response.Message += $"{error.Code} - {error.Description}\n";

            return response;
        }
        [HttpPost]
        [Route("Login")]
        public async Task<LoginUserCommandResponse> Login(LoginDTO model)
        {
            AppUser user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                throw new Exception("Email veya şifre yanlış");
            }

            Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (result.Succeeded)
            {
                Token token = _tokenHandler.CreateAccessToken(1);
                
                return new LoginUserSuccessCommandResponse()
                {
                    Token = token,
                    Id = user.Id
                };
            }
            return new LoginUserErrorCommandResponse()
            {
                Message = "Hatalı"
            };
        }

        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Başarıyla çıkış yapıldı.");
        }


        [HttpPost]
        [Route("PasswordReset")]
        public async Task<IActionResult> PasswordReset(string email)
        {
            AppUser user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

                //byte[] tokenBytes = Encoding.UTF8.GetBytes(resetToken);
                //resetToken = WebEncoders.Base64UrlEncode(tokenBytes);
                resetToken = HttpUtility.UrlEncode(resetToken);

                await _mailService.SendPasswordResetMailAsync(email, user.Id, resetToken);
            }
            return Ok("Ok");
        }

        //private bool IsValidEmail(string email)
        //{
        //    const string pattern = @"^[^@\s]+@havelsan\.com\.tr$";
        //    var regex = new Regex(pattern, RegexOptions.IgnoreCase);
        //    return regex.IsMatch(email);
        //}
    }
}
