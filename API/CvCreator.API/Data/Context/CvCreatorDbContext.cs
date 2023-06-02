using CvCreator.API.Model.Entities;
using CvCreator.API.Model.Entities.Configurations;
using CvCreator.Model.Entities;
using CVCreator.Model.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CvCreator.Data.Context
{
    public class CvCreatorDbContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public CvCreatorDbContext(DbContextOptions options) : base(options)
        { }

        public DbSet<CV_Certificate> CV_Certificates { get; set; }
        public DbSet<CV_Conference> CV_Conferences { get; set; }
        public DbSet<CV_DigitalSkill> CV_DigitalSkill { get; set; }
        public DbSet<CV_Education> CV_Educations { get; set; }
        public DbSet<CV_ForeignLanguage> CV_ForeignLanguages { get; set; }
        public DbSet<CV_ForeignLanguageExam> CV_ForeignLanguageExams { get; set; }
        public DbSet<CV_Hobby> CV_Hobbies { get; set; }
        public DbSet<CV_Intern> CV_Interns { get; set; }
        public DbSet<CV_LanguageSkill> CV_LanguageSkills { get; set; }
        public DbSet<CV_Person> CV_People { get; set; }
        public DbSet<CV_ProgrammingLanguage> CV_ProgrammingLanguages { get; set; }
        public DbSet<CV_Reference> CV_References { get; set; }
        public DbSet<CV_School> CV_Schools { get; set; }
        public DbSet<CV_SocialMedia> CV_SocialMedias { get; set; }
        public DbSet<CV_WorkExperience> CV_WorkExperiences { get; set; }
        public DbSet<CV_Country> CV_Countries { get; set; }
        public DbSet<CV_City> CV_Cities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new CV_EducationConfiguration());

            builder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });
            });

            builder.Entity<IdentityUserRole<string>>().HasNoKey();

            builder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });
            });
        }
        //public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        //{
        //    var datas = ChangeTracker.Entries<BaseEntity>();
        //    foreach (var data in datas)
        //    {
        //        var _ = data.State switch
        //        {
        //            EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
        //            EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
        //        };
        //    }
        //    return await base.SaveChangesAsync(cancellationToken);
        //}
    }
}
