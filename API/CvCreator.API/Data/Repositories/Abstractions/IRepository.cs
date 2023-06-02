using System;
using CvCreator.Model;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.Repositories.Abstractions
{
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}

