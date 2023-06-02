using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_HobbyReadRepository : ReadRepository<CV_Hobby>, ICV_HobbyReadRepository
    {
        public CV_HobbyReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

