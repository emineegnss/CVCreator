using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_WorkExperienceWriteRepository : WriteRepository<CV_WorkExperience>, ICV_WorkExperienceWriteRepository
    {
        public CV_WorkExperienceWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

