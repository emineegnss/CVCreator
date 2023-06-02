using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_DigitalSkillWriteRepository : WriteRepository<CV_DigitalSkill>, ICV_DigitalSkillWriteRepository
    {
        public CV_DigitalSkillWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

