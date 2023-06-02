namespace CvCreator.Model.Entities
{
    public class CV_Conference : BaseEntity
    {
        public string Name { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public byte[] FileData { get; set; }

        public Guid PersonId { get; set; }
        public virtual CV_Person Person { get; set; }
    }
}
