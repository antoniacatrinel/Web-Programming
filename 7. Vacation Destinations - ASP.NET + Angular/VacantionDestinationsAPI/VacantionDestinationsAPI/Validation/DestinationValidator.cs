using VacantionDestinationsAPI.Models;

namespace VacantionDestinationsAPI.Validation
{
    public class DestinationValidator
    {
        public DestinationValidator() { }

        private static bool IsStringNonEmpty(string? value)
        {
            if (value == null)
            {
                return false;
            }

            return value.Length != 0;
        }

        private static bool IsNumberPositive(double? num)
        {
            if (num == null)
            {
                return false;
            }

            return num >= 0;
        }

        public String ValidateDestination(Destination destination)
        {
            String errors = "";

            if (!IsStringNonEmpty(destination.Location))
            {
                errors += "Location of Destination must be non-empty.\n";
            }

            if (!IsStringNonEmpty(destination.Country))
            {
                errors += "Country of Destination must be non-empty.\n";
            }

            if (!IsStringNonEmpty(destination.Description))
            {
                errors += "Description of Destination must be non-empty.\n";
            }

            if (!IsStringNonEmpty(destination.TouristTargets))
            {
                errors += "Tourist Targets of Destination must be non-empty.\n";
            }

            if (!IsNumberPositive(destination.Cost))
            {
                errors += "Cost of Destination must be a positive number.\n";
            }

            return errors;
        }

    }
}
