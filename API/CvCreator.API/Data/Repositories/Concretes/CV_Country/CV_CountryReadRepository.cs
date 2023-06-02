using CvCreator.API.Data.Repositories.Abstractions;
using CvCreator.Data.Context;
using CvCreator.Repositories.Concretes;

namespace CvCreator.API.Data.Repositories.Concretes.CV_Country
{
    public class CV_CountryReadRepository : ReadRepository<Model.Entities.CV_Country>, ICV_CountryReadRepository
    {
        public CV_CountryReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}
