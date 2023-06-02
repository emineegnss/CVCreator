using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{

    public class CV_ConferenceWriteRepository : WriteRepository<CV_Conference>, ICV_ConferenceWriteRepository
    {
        public CV_ConferenceWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

