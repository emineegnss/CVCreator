namespace CvCreator.API.Model.DTOs.Conference
{
    public class ConferenceUpdateDto
    {
        public string Name { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public IFormFile File { get; set; }
    }
}
