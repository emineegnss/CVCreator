using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_WorkExperienceReadRepository : ReadRepository<CV_WorkExperience>, ICV_WorkExperienceReadRepository
    {
        public CV_WorkExperienceReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

