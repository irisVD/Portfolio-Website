using Portfolio.Recordings.Persistence;
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
            options.AddPolicy("AllowAllOrigins", policy =>
            {
            policy.WithOrigins("*")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });




        builder.Services.Configure<RecordingsRepositoryOptions>(
            builder.Configuration.GetSection(nameof(RecordingsRepositoryOptions)));

        builder.Services.AddScoped<IRecordingsService>(provider =>
            new RecordingsService(
                provider.GetRequiredService<IRecordingsRepository>()
            )
        );

        builder.Services.AddControllers()
            .AddMvcOptions(options =>
            {
                options.SuppressAsyncSuffixInActionNames = false;
            }
        );
        

        var app = builder.Build();

        // Configure the HTTP request pipeline.

        app.UseHttpsRedirection();

        // Use CORS
        app.UseCors("AllowAllOrigins");

        app.MapControllers();
        app.Run();
    }
}