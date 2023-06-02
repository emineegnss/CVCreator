using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_SocialMediaReadRepository : ReadRepository<CV_SocialMedia>, ICV_SocialMediaReadRepository
    {
        public CV_SocialMediaReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

