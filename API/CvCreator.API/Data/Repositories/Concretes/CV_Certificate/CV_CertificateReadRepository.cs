using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_CertificateReadRepository : ReadRepository<CV_Certificate>, ICV_CertificateReadRepository
    {
        public CV_CertificateReadRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

