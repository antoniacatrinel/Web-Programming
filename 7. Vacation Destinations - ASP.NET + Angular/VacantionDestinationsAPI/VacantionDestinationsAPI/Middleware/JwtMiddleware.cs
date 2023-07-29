using System.Net;
using System.Text.Json;
using System.Text;
using VacantionDestinationsAPI.Controllers;
using VacantionDestinationsAPI.Validation;
using VacantionDestinationsAPI.Models;

namespace VacantionDestinationsAPI.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly DestinationValidator _validator;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
            _validator = new DestinationValidator();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            bool skip = false;

            var request = context.Request;

            if (!request.Path.Value!.ToLower().Contains("api/destinations"))
                skip = true;

            if (context.Request.Method != HttpMethods.Post && context.Request.Method != HttpMethods.Put)
                skip = true;

            if (skip)
            {
                await _next(context);
                return;
            }

            request.EnableBuffering();
            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            var requestContent = Encoding.UTF8.GetString(buffer);
            request.Body.Position = 0;

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            Destination destination = JsonSerializer.Deserialize<Destination>(requestContent, options)!;

            var validationResult = _validator.ValidateDestination(destination);
            if (validationResult != string.Empty)
            {
                context.Response.Clear();
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(validationResult);
                return;
            }

            await _next(context);
        }
    }
}
