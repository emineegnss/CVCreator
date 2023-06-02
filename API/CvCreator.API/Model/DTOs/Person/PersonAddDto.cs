namespace CvCreator.API.Model.DTOs.Person
{
    public class PersonAddDto
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
        public IFormFile? File { get; set; }
    }
}
