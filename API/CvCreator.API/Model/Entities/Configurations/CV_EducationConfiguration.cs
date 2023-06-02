using CvCreator.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CvCreator.API.Model.Entities.Configurations
{
    public class CV_EducationConfiguration : IEntityTypeConfiguration<CV_Education>
    {
        public void Configure(EntityTypeBuilder<CV_Education> builder)
        {
            //builder.Property(e => e.GNO).HasColumnType("decimal(4, 2)");
        }
    }
}
