using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VacantionDestinationsAPI.Context;
using VacantionDestinationsAPI.Models;
using VacantionDestinationsAPI.Validation;

namespace VacantionDestinationsAPI.Controllers
{
    [Route("api/Destinations")]
    [ApiController]
    public class DestinationsController : ControllerBase
    {
        private readonly DestinationContext _context;
        private readonly DestinationValidator _validator;

        public DestinationsController(DestinationContext context)
        {
            _context = context;
            _validator = new DestinationValidator();
        }

        // GET: api/Destinations/count/10
        [HttpGet("count/{pageSize}")]
        public async Task<int> GetTotalNumberOfPages(int pageSize = 10)
        {
            int total = await _context.Destinations.CountAsync();
            int totalPages = total / pageSize;
            if (total % pageSize > 0)
                totalPages++;

            return totalPages;
        }

        // GET: api/Destinations/0/10
        [HttpGet("{page}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinationsPaginated(int page = 0, int pageSize = 10)
        {
            if (_context.Destinations == null)
                return NotFound();

            return await _context.Destinations
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        // GET: api/Destinations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinations()
        {
          if (_context.Destinations == null)
          {
              return NotFound();
          }
            return await _context.Destinations.ToListAsync();
        }

        // GET: api/Destinations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Destination>> GetDestination(long id)
        {
          if (_context.Destinations == null)
          {
              return NotFound();
          }
           
           var destination = await _context.Destinations.FirstOrDefaultAsync(x => x.Id == id);

            if (destination == null)
           {
                return NotFound();
           }

           return destination;
        }

        // PUT: api/Destinations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDestination(long id, Destination destination)
        {
            if (id != destination.Id)
            {
                return BadRequest();
            }

            // Extract user id from the JWT token
            /*if (!long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out long userId))
            {
                return Unauthorized("Invalid token.");
            }*/


            // validate the destination
            /*var validationResult = _validator.ValidateDestination(destination);
            if (validationResult != string.Empty)
                return BadRequest(validationResult);*/

            _context.Entry(destination).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!DestinationExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Destinations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Destination>> PostDestination(Destination destination)
        {
          if (_context.Destinations == null)
          {
              return Problem("Entity set 'DestinationContext.Destinations'  is null.");
          }

            // Extract user id from the JWT token
            /*if (!long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out long userId))
            {
                return Unauthorized("Invalid token.");
            }*/

            // validate the destination
            /*var validationResult = _validator.ValidateDestination(destination);
            if (validationResult != string.Empty)
                return BadRequest(validationResult);*/

            _context.Destinations.Add(destination);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDestinations), new { id = destination.Id }, destination);
        }

        // DELETE: api/Destinations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDestination(long id)
        {
            if (_context.Destinations == null)
            {
                return NotFound();
            }
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null)
            {
                return NotFound();
            }

            // Extract user id from the JWT token
            /*if (!long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out long userId))
            {
                return Unauthorized("Invalid token.");
            }*/

            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // FILTER: api/Destinations/filter/0/10?country=Spain
        [HttpGet("filter/{page}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<Destination>>> FilterByCountry(string country, int page = 0, int pageSize = 10)
        {
            if (_context.Destinations == null)
                return NotFound();

            var destinations = await _context.Destinations
                .Where(x => x.Country == country)
                .Skip(page * pageSize)
                .Take(pageSize)
                .AsNoTracking()
                .ToListAsync();

            if (!destinations.Any())
                return NotFound();

            return Ok(destinations);
        }

        // GET: api/Destinations/filter/count/10?country=Spain
        [HttpGet("filter/count/{pageSize}")]
        public async Task<int> CountryFilterNumberOfPages(string country, int pageSize = 10)
        {
            int total = await _context.Destinations
                .Where(x => x.Country == country)
                .AsNoTracking()
                .CountAsync();

            int totalPages = total / pageSize;
            if (total % pageSize > 0)
                totalPages++;

            return totalPages;
        }

        [HttpGet("countries")]
        public async Task<ActionResult<IEnumerable<string>>> GetCountries()
        {
            var countries = await _context.Destinations
                .Select(d => d.Country)
                .Distinct()
                .ToListAsync();

            return Ok(countries);
        }

        private bool DestinationExists(long id)
        {
            return (_context.Destinations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
