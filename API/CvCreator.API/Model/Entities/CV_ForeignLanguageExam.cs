namespace CvCreator.Model.Entities
{
    public class CV_ForeignLanguageExam : BaseEntity
    {
        public string Name { get; set; }
        public int Point { get; set; }

        public Guid PersonId { get; set; }
        public virtual CV_Person Person { get; set; }

    }
}
