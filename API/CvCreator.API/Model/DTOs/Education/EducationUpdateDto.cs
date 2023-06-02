namespace CvCreator.API.Model.DTOs.Education
{
    public class EducationUpdateDto
    {
        public string EducationDegree { get; set; }
        public string SchoolName { get; set; }
        public string Department { get; set; }
        public string StartDate { get; set; }
        public string FinishDate { get; set; }
        public bool IsContinuing { get; set; } = false;
        public string GradingSystem { get; set; }
        public string Grade { get; set; }
        public string EducationLanguage { get; set; }
        public string Description { get; set; }
    }
}
