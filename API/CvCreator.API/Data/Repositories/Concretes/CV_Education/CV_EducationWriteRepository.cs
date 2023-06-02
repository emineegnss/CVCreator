using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_EducationWriteRepository : WriteRepository<CV_Education>, ICV_EducationWriteRepository
    {
        public CV_EducationWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

