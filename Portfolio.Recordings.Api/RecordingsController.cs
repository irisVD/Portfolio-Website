using System;
using System.Reflection.Metadata;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Recordings.Services;
using Portfolio.Recordings.Services.Contracts;

namespace Portfolio.Recordings.Api;

[Route("api/recordings")]
[ApiController]
public class RecordingsController (IRecordingsService recordingsService) : ControllerBase
{
        [HttpGet("{fileName}")]
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
