using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_SocialMediaWriteRepository : WriteRepository<CV_SocialMedia>, ICV_SocialMediaWriteRepository
    {
        public CV_SocialMediaWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

