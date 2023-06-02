using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ProgrammingLanguageReadRepository : ReadRepository<CV_ProgrammingLanguage>, ICV_ProgrammingLanguageReadRepository
    {
        public CV_ProgrammingLanguageReadRepository(CvCreatorDbContext context) : base(context)
        {
        }

        public IQueryable<CV_ProgrammingLanguage> GetListByIds(List<Guid> ids)
        {
            return Table.Where(x => ids.Contains(x.Id));
        }
    }
}

