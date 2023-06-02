using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_InternWriteRepository : WriteRepository<CV_Intern>, ICV_InternWriteRepository
    {
        public CV_InternWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

