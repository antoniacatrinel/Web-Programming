namespace VacantionDestinationsAPI.Models
{
    public class Destination
    {
        public long Id { get; set; }
        public string? Location { get; set; }
        public string? Country { get; set; }
        public string? Description { get; set; }
        public string? TouristTargets { get; set; }
        public double Cost { get; set; }
    }
}
