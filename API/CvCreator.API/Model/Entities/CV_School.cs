namespace CvCreator.Model.Entities
{
    public class CV_School : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<CV_Education> Educations { get; set; }
    }
}
