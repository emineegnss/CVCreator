using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForeignLanguagesController : ControllerBase
    {
        readonly ICV_ForeignLanguageReadRepository _cvForeignLanguageReadRepository;

        public ForeignLanguagesController(ICV_ForeignLanguageReadRepository cvForeignLanguageReadRepository)
        {
            _cvForeignLanguageReadRepository = cvForeignLanguageReadRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CV_ForeignLanguage>>> Get()
        {
            var result = await _cvForeignLanguageReadRepository.GetAll().ToListAsync();
            return Ok(result);
        }
    }
}
