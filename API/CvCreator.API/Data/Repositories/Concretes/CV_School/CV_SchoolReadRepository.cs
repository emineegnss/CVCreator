using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_SchoolReadRepository : ReadRepository<CV_School>, ICV_SchoolReadRepository
    {
        public CV_SchoolReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

