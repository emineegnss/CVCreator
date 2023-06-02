using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_ConferenceReadRepository : ReadRepository<CV_Conference>, ICV_ConferenceReadRepository
    {
        public CV_ConferenceReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

