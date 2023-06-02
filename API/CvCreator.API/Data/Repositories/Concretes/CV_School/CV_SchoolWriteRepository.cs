using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_SchoolWriteRepository : WriteRepository<CV_School>, ICV_SchoolWriteRepository
    {
        public CV_SchoolWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

