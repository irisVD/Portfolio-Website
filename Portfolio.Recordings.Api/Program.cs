using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.Recordings.Services;

namespace Portfolio.Recordings.Api;
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add CORS policy
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowCertainOrigins", policy =>
            {
            policy.WithOrigins("https://irisvandamme.com", "https://www.irisvandamme.com", "salmon-tree-01520e21e.2.azurestaticapps.net")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        // ratelimiting
        builder.Services.AddRateLimiter(_ => _.AddFixedWindowLimiter(policyName: "recording-limiter", options =>
        {
            options.PermitLimit = 40;
            options.Window = TimeSpan.FromSeconds(10);
            options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
            options.QueueLimit = 20;
        }));


        // configure service options
        builder.Services.Configure<RecordingsServiceOptions>(
            builder.Configuration.GetSection(nameof(RecordingsServiceOptions)));

        // inject service
        builder.Services.AddScoped<IRecordingsService, RecordingsService>();

        builder.Services.AddControllers()
            .AddMvcOptions(options =>
            {
                options.SuppressAsyncSuffixInActionNames = false;
            }
        );
        

        var app = builder.Build();

        app.UseRateLimiter();

        // Configure the HTTP request pipeline.

        app.UseHttpsRedirection();

        // Use CORS
        app.UseCors("AllowCertainOrigins");

        app.MapControllers();
        app.Run();
    }
}