using System;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Concretes;

namespace CvCreator.Repositories.Abstractions
{
    public class CV_CertificateWriteRepository : WriteRepository<CV_Certificate>, ICV_CertificateWriteRepository
    {
        public CV_CertificateWriteRepository(CvCreatorDbContext context) : base(context)
        {
        }
    }
}

