using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_LanguageSkillReadRepository : ReadRepository<CV_LanguageSkill>, ICV_LanguageSkillReadRepository
    {
        public CV_LanguageSkillReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

