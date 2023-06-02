namespace CvCreator.Model.Entities
{
    public class CV_Person : BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string About { get; set; }
        public string IdentityNumber { get; set; }
        public string LivingCountry { get; set; }
        public string LivingCity { get; set; }
        public string Address { get; set; }
        public byte[] ImageFile { get; set; }

        public ICollection<CV_DigitalSkill> DigitalSkills { get; set; }
        public ICollection<CV_WorkExperience> WorkExperiences { get; set; }
        public ICollection<CV_Education> Educations { get; set; } 
        public ICollection<CV_SocialMedia> SocialMedias { get; set; } 
        public ICollection<CV_Intern> Interns { get; set; }
        public ICollection<CV_Certificate> Awards { get; set; } 
        public ICollection<CV_Reference> References { get; set; } 
        public ICollection<CV_Conference> Conferences { get; set; }
        public ICollection<CV_Hobby> Hobbies { get; set; } 
        public ICollection<CV_LanguageSkill> LanguageSkills { get; set; }
    }
}
