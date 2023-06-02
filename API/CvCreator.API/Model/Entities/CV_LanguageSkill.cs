namespace CvCreator.Model.Entities
{
    public class CV_LanguageSkill : BaseEntity
    {
        public Guid PersonId { get; set; }
        public virtual CV_Person Person { get; set; }

        public string ForeignLanguage { get; set; }
        public string ReadingLevel { get; set; }
        public string WritingLevel { get; set; }
        public string SpeakingLevel { get; set; }
        public string ListeningLevel { get; set; }
    }
}
