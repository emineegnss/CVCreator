using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ReferenceReadRepository : ReadRepository<CV_Reference>, ICV_ReferenceReadRepository
    {
        public CV_ReferenceReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

