namespace CvCreator.Model.Entities
{
    public class CV_ProgrammingLanguage : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<CV_DigitalSkill> DigitalSkills { get; set; }
    }
}
