using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_InternReadRepository : ReadRepository<CV_Intern>, ICV_InternReadRepository
    {
        public CV_InternReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

