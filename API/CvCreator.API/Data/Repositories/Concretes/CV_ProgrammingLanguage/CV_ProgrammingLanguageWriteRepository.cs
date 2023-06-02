using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ProgrammingLanguageWriteRepository : WriteRepository<CV_ProgrammingLanguage>, ICV_ProgrammingLanguageWriteRepository
    {
        public CV_ProgrammingLanguageWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

