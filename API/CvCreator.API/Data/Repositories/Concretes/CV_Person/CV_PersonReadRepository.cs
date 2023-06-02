using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_PersonReadRepository : ReadRepository<CV_Person>, ICV_PersonReadRepository
    {
        public CV_PersonReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

