using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;
namespace CvCreator.Repositories.Abstractions
{
    public class CV_LanguageSkillWriteRepository : WriteRepository<CV_LanguageSkill>, ICV_LanguageSkillWriteRepository
    {
        public CV_LanguageSkillWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

