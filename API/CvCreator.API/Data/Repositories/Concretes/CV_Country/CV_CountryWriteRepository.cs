using CvCreator.API.Data.Repositories.Abstractions;
using CvCreator.Data.Context;
using CvCreator.Repositories.Concretes;

namespace CvCreator.API.Data.Repositories.Concretes.CV_Country
{
    public class CV_CountryWriteRepository : WriteRepository<Model.Entities.CV_Country>, ICV_CountryWriteRepository
    {
        public CV_CountryWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}
