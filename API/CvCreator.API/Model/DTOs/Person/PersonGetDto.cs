namespace CvCreator.API.Model.DTOs.Person
{
    public class PersonGetDto
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
    }
}
