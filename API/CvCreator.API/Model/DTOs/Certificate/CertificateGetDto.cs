namespace CvCreator.API.Model.DTOs.Certificate
{
    public class CertificateGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Organization { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
        public byte[] FileData { get; set; }
    }
}
