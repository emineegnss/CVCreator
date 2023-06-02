using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_HobbyWriteRepository : WriteRepository<CV_Hobby>, ICV_HobbyWriteRepository
    {
        public CV_HobbyWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

