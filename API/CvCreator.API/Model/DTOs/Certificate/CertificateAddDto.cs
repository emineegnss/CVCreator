namespace CvCreator.API.Model.DTOs.Certificate
{
    public class CertificateAddDto
    {
        public string Name { get; set; }
        public string Organization { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
        public IFormFile File { get; set; }
    }
}
