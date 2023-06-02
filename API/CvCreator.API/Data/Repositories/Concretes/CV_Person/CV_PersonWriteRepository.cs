using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_PersonWriteRepository : WriteRepository<CV_Person>, ICV_PersonWriteRepository
    {
        public CV_PersonWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

