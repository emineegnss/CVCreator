using System;
using CvCreator.Repositories.Concretes;
using CvCreator.Model.Entities;
using CvCreator.Data.Context;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_EducationReadRepository : ReadRepository<CV_Education>, ICV_EducationReadRepository
    {
        public CV_EducationReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

