using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ForeignLanguageExamReadRepository : ReadRepository<CV_ForeignLanguageExam>, ICV_ForeignLanguageExamReadRepository
    {
        public CV_ForeignLanguageExamReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

