using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ForeignLanguageReadRepository : ReadRepository<CV_ForeignLanguage>, ICV_ForeignLanguageReadRepository
    {
        public CV_ForeignLanguageReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

