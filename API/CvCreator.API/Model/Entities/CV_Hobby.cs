namespace CvCreator.Model.Entities
{
    public class CV_Hobby : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public Guid PersonId { get; set; }
        public virtual CV_Person Person { get; set; }
    }
}
