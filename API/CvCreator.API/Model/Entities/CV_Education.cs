namespace CvCreator.Model.Entities
{
    public class CV_Education : BaseEntity
    {
        public string EducationDegree { get; set; }
        public string StartDate { get; set; }
        public string FinishDate { get; set; }
        public bool IsContinuing { get; set; } = false;
        public string Department { get; set; }
        public string GradingSystem { get; set; }
        public string Grade { get; set; }
        public string EducationLanguage { get; set; }
        public string Description { get; set; }

        public Guid PersonId { get; set; }
        public virtual CV_Person Person { get; set; }

        public Guid SchoolId { get; set; }
        public virtual CV_School School { get; set; }
    }
}
