using Microsoft.EntityFrameworkCore;
using VacantionDestinationsAPI.Context;
using VacantionDestinationsAPI.Models;

namespace VacantionDestinationsAPI.Utils
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DestinationContext(serviceProvider.GetRequiredService<DbContextOptions<DestinationContext>>()))
            {
                SeedDestinations(context);
                SeedUsers(context);
            }
        }

        private static void SeedDestinations(DestinationContext context)
        {
            if (context.Destinations.Any())
                return;

            context.Destinations.AddRange(
                new Destination
                {
                    Location = "Paris",
                    Country = "France",
                    Description = "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
                    TouristTargets = "Eiffel Tower, Louvre Museum, Versailles Palace",
                    Cost = 310.1,
                },
                new Destination
                {
                    Location = "Rome",
                    Country = "Italy",
                    Description = "Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale.",
                    TouristTargets = "Colosseum, Vatican City, The Pantheon",
                    Cost = 290.3,
                },
                new Destination
                {
                    Location = "Barcelona",
                    Country = "Spain",
                    Description = "Barcelona, the cosmopolitan capital of Spain’s Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city.",
                    TouristTargets = "Basílica de la Sagrada Família, Bogatell Beach, Gothic Quarter",
                    Cost = 300.6,
                },
                new Destination
                {
                    Location = "London",
                    Country = "England",
                    Description = "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times.",
                    TouristTargets = "Tower of London , The London Eye, Buckingham Palace",
                    Cost = 420.8,
                },
                new Destination
                {
                    Location = "Milan",
                    Country = "Italy",
                    Description = "Milan, a metropolis in Italy's northern Lombardy region, is a global capital of fashion and design.",
                    TouristTargets = "Milan Cathedral, Leonardo da Vinci's Last Supper, Pinacoteca di Brera",
                    Cost = 280.1,
                },
                new Destination
                {
                    Location = "Zurich",
                    Country = "Switzerland",
                    Description = "The city of Zurich, a global center for banking and finance, lies at the north end of Lake Zurich in northern Switzerland.",
                    TouristTargets = "Niederdorf, Uetliberg, Lake Zurich ",
                    Cost = 480.3,
                },
                new Destination
                {
                    Location = "Bern",
                    Country = "Switzerland",
                    Description = "Bern, the capital city of Switzerland, is built around a crook in the Aare River.",
                    TouristTargets = "Kunstmuseum, Einstein Museum, Einstein Haus",
                    Cost = 230.2,
                },
                new Destination
                {
                    Location = "Madrid",
                    Country = "Spain",
                    Description = "Madrid, Spain's central capital, is a city of elegant boulevards and expansive, manicured parks such as the Buen Retiro.",
                    TouristTargets = "Crystal Palace, Museo Nacional del Prado, Royal Palace and Gardens",
                    Cost = 320.1,
                },
                new Destination
                {
                    Location = "Valencia",
                    Country = "Spain",
                    Description = "The port city of Valencia lies on Spain’s southeastern coast, where the Turia River meets the Mediterranean Sea.",
                    TouristTargets = "La Ciutat de les Arts i les Ciències,  Las Fallas Festival, Oceanogràfic de València",
                    Cost = 270.1,
                },
                new Destination
                {
                    Location = "Berlin",
                    Country = "Germany",
                    Description = "Berlin, Germany’s capital, dates to the 13th century. Reminders of the city's turbulent 20th-century history include its Holocaust memorial and the Berlin Wall's graffitied remains.",
                    TouristTargets = "The Brandenburg Gate, The Rebuilt Reichstag, Museum Island",
                    Cost = 310.1,
                },
                new Destination
                {
                    Location = "Frankfurt",
                    Country = "Germany",
                    Description = "Frankfurt, a central German city on the river Main, is a major financial hub that's home to the European Central Bank.",
                    TouristTargets = "Römerberg, Städel Museum, Museumsufer",
                    Cost = 210.1,
                },
                new Destination
                {
                    Location = "Munich",
                    Country = "Germany",
                    Description = "Munich, Bavaria’s capital, is home to centuries-old buildings and numerous museums.",
                    TouristTargets = "Marienplatz,  Nymphenburg Palace, Munich Residenz",
                    Cost = 220.9,
                },
                new Destination
                {
                    Location = "Hamburg",
                    Country = "Germany",
                    Description = "Hamburg, a major port city in northern Germany, is connected to the North Sea by the Elbe River.",
                    TouristTargets = "Port of Hamburg, Miniatur Wunderland, Hamburger Kunsthalle",
                    Cost = 270.3,
                }
            );

            context.SaveChanges();
        }

        private static void SeedUsers(DestinationContext context)
        {
            if (context.Users.Any())
                return;

            context.Users.AddRange(
                new User
                {
                    Username = "maria",
                    Password = "maria123"
                },
               new User
               {
                   Username = "andrei",
                   Password = "andrei123"
               },
               new User
               {
                   Username = "ana",
                   Password = "ana123"
               },
               new User
               {
                   Username = "mihai",
                   Password = "mihai123"
               }
            );

            context.SaveChanges();
        }

    }
}
