namespace CvCreator.API.Model.DTOs.Conference
{
    public class ConferenceGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public byte[] FileData { get; set; }
    }
}
