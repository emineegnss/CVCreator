using CvCreator.Model.Entities;

namespace CvCreator.API.Model.DTOs.DigitalSkill
{
    public class DigitalSkillGetDto
    {
        public Guid Id { get; set; }
        public ICollection<CV_ProgrammingLanguage> ProgrammingLanguages { get; set; }
    }
}
