using CvCreator.API.Data.Repositories.Abstractions;
using CvCreator.Data.Context;
using CvCreator.Repositories.Concretes;

namespace CvCreator.API.Data.Repositories.Concretes.CV_City
{
    public class CV_CityWriteRepository : WriteRepository<Model.Entities.CV_City>, ICV_CityWriteRepository
    {
        public CV_CityWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}
