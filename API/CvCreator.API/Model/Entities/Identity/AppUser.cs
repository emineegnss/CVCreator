using CvCreator.Model.Entities;
using Microsoft.AspNetCore.Identity;

namespace CVCreator.Model.Entities.Identity
{
    public class AppUser : IdentityUser<string>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Guid? PersonId { get; set; }
        public virtual CV_Person Person { get; set; }
    }
}
