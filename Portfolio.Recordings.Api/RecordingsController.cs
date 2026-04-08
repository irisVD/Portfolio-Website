using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.Recordings.Services;

namespace Portfolio.Recordings.Api;

[Route("api/recordings")]
[ApiController]
public class RecordingsController (IRecordingsService recordingsService) : ControllerBase
{
        [HttpGet("{fileName}")]
        [EnableRateLimiting("recording-limiter")]
        public async Task<IActionResult> GetRecordingAsync([FromRoute] string fileName)
        {
            Console.WriteLine("Get method called in controller");
            var result = await recordingsService.GetRecordingStreamAsync(fileName);

            if (result == null)
            {
                return NotFound($"No recording found with filename {fileName}");
            }
            return File(result.Content, "video/mp4", enableRangeProcessing: true);
        }      
}
