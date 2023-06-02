namespace CvCreator.API.Model.DTOs.LanguageSkill
{
    public class LanguageSkillGetDto
    {
        public Guid Id { get; set; }
        public string ForeignLanguage { get; set; }
        public string ReadingLevel { get; set; }
        public string WritingLevel { get; set; }
        public string SpeakingLevel { get; set; }
        public string ListeningLevel { get; set; }
    }
}
