using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ForeignLanguageWriteRepository : WriteRepository<CV_ForeignLanguage>, ICV_ForeignLanguageWriteRepository
    {
        public CV_ForeignLanguageWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

