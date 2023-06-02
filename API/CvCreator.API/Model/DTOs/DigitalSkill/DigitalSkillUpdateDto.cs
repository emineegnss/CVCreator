using CvCreator.Model.Entities;

namespace CvCreator.API.Model.DTOs.DigitalSkill
{
    public class DigitalSkillUpdateDto
    {
        public ICollection<CV_ProgrammingLanguage> ProgrammingLanguages { get; set; }
    }
}
