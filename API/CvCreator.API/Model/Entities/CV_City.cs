using CvCreator.Model;

namespace CvCreator.API.Model.Entities
{
    public class CV_City : BaseEntity
    {
        public string Name { get; set; }

        public Guid CountryId { get; set; }
        public virtual CV_Country Country { get; set; }
    }
}
