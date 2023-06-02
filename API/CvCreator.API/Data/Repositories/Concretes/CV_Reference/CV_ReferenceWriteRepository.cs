using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ReferenceWriteRepository : WriteRepository<CV_Reference>, ICV_ReferenceWriteRepository
    {
        public CV_ReferenceWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

