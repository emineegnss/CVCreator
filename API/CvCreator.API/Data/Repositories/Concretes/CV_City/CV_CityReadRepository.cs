using CvCreator.API.Data.Repositories.Abstractions;
using CvCreator.Data.Context;
using CvCreator.Repositories.Concretes;

namespace CvCreator.API.Data.Repositories.Concretes.CV_City
{
    public class CV_CityReadRepository : ReadRepository<Model.Entities.CV_City>, ICV_CityReadRepository
    {
        public CV_CityReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}
