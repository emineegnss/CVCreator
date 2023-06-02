using CvCreator.API.Data.Repositories.Abstractions;
using CvCreator.API.Data.Repositories.Concretes.CV_City;
using CvCreator.API.Data.Repositories.Concretes.CV_Country;
using CvCreator.API.Model.DTOs.Education;
using CvCreator.API.Services;
using CvCreator.Data.Context;
using CvCreator.Model.Entities;
using CvCreator.Repositories.Abstractions;
using CVCreator.Data.Token;
using CVCreator.Model.Entities.Identity;
using CVCreator.Token;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace CvCreator.Data
{
    public static class ServiceRegistration
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddDbContext<CvCreatorDbContext>(options => options.UseSqlServer(Configuration.ConnectionString));
            services.AddIdentity<AppUser, AppRole>(options =>
            {
                options.Password.RequiredLength = 2;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.User.RequireUniqueEmail = true;
         
            }).AddEntityFrameworkStores<CvCreatorDbContext>()
            .AddTokenProvider<DataProtectorTokenProvider<AppUser>>("Default"); ;

            services.AddScoped<ITokenHandler, TokenHandler>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<ICV_CertificateReadRepository, CV_CertificateReadRepository>();
            services.AddScoped<ICV_CertificateReadRepository, CV_CertificateReadRepository>();
            services.AddScoped<ICV_CertificateWriteRepository, CV_CertificateWriteRepository>();
            services.AddScoped<ICV_ConferenceReadRepository, CV_ConferenceReadRepository>();
            services.AddScoped<ICV_ConferenceWriteRepository, CV_ConferenceWriteRepository>();
            services.AddScoped<ICV_DigitalSkillReadRepository, CV_DigitalSkillReadRepository>();
            services.AddScoped<ICV_DigitalSkillWriteRepository, CV_DigitalSkillWriteRepository>();
            services.AddScoped<ICV_EducationReadRepository, CV_EducationReadRepository>();
            services.AddScoped<ICV_EducationWriteRepository, CV_EducationWriteRepository>();
            services.AddScoped<ICV_ForeignLanguageReadRepository, CV_ForeignLanguageReadRepository>();
            services.AddScoped<ICV_ForeignLanguageWriteRepository, CV_ForeignLanguageWriteRepository>();
            services.AddScoped<ICV_ForeignLanguageExamReadRepository, CV_ForeignLanguageExamReadRepository>();
            services.AddScoped<ICV_ForeignLanguageExamWriteRepository, CV_ForeignLanguageExamWriteRepository>();
            services.AddScoped<ICV_HobbyReadRepository, CV_HobbyReadRepository>();
            services.AddScoped<ICV_HobbyWriteRepository, CV_HobbyWriteRepository>();
            services.AddScoped<ICV_InternReadRepository, CV_InternReadRepository>();
            services.AddScoped<ICV_InternWriteRepository, CV_InternWriteRepository>();
            services.AddScoped<ICV_LanguageSkillReadRepository, CV_LanguageSkillReadRepository>();
            services.AddScoped<ICV_LanguageSkillWriteRepository, CV_LanguageSkillWriteRepository>();
            services.AddScoped<ICV_PersonReadRepository, CV_PersonReadRepository>();
            services.AddScoped<ICV_PersonWriteRepository, CV_PersonWriteRepository>();
            services.AddScoped<ICV_ProgrammingLanguageReadRepository, CV_ProgrammingLanguageReadRepository>();
            services.AddScoped<ICV_ProgrammingLanguageWriteRepository, CV_ProgrammingLanguageWriteRepository>();
            services.AddScoped<ICV_ReferenceReadRepository, CV_ReferenceReadRepository>();
            services.AddScoped<ICV_ReferenceWriteRepository, CV_ReferenceWriteRepository>();
            services.AddScoped<ICV_SchoolReadRepository, CV_SchoolReadRepository>();
            services.AddScoped<ICV_SchoolWriteRepository, CV_SchoolWriteRepository>();
            services.AddScoped<ICV_SocialMediaReadRepository, CV_SocialMediaReadRepository>();
            services.AddScoped<ICV_SocialMediaWriteRepository, CV_SocialMediaWriteRepository>();
            services.AddScoped<ICV_WorkExperienceReadRepository, CV_WorkExperienceReadRepository>();
            services.AddScoped<ICV_WorkExperienceWriteRepository, CV_WorkExperienceWriteRepository>();
            services.AddScoped<ICV_CountryReadRepository, CV_CountryReadRepository>();
            services.AddScoped<ICV_CountryWriteRepository, CV_CountryWriteRepository>();
            services.AddScoped<ICV_CityReadRepository, CV_CityReadRepository>();
            services.AddScoped<ICV_CityWriteRepository, CV_CityWriteRepository>();
        }
    }
}
