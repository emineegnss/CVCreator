namespace CvCreator.Model.Entities
{
    public class CV_SocialMedia : BaseEntity
    {
        public string SocialMediaToolName { get; set; }
        public string Url { get; set; }

        public Guid PersonId { get; set; }
        public virtual CV_Person Person { get; set; }
    }
}
