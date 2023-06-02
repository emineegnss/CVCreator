using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ForeignLanguageExamWriteRepository : WriteRepository<CV_ForeignLanguageExam>, ICV_ForeignLanguageExamWriteRepository
    {
        public CV_ForeignLanguageExamWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

