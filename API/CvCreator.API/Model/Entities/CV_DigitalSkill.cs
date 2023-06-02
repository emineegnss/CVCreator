namespace CvCreator.Model.Entities
{
    public class CV_DigitalSkill : BaseEntity
    {
        public virtual ICollection<CV_ProgrammingLanguage> ProgrammingLanguages { get; set; }

        public Guid PersonId { get; set; }
        public virtual CV_Person Person { get; set; }
    }
}
