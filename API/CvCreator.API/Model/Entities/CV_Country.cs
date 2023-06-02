using CvCreator.Model;

namespace CvCreator.API.Model.Entities
{
    public class CV_Country : BaseEntity
    {
        public string Name { get; set; }
        public ICollection<CV_City> Cities { get; set; }
    }
}
