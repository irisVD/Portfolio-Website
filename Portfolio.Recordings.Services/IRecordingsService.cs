using System;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Options;

namespace Portfolio.Recordings.Services;

public interface IRecordingsService
{
    Task<BlobDownloadStreamingResult> GetRecordingStreamAsync(string fileName);
}

public class RecordingsService (IOptions<RecordingsServiceOptions> options) : IRecordingsService
{

public async Task<BlobDownloadStreamingResult> GetRecordingStreamAsync(string fileName)
    {
        Console.WriteLine("fileName: ", fileName);
        var blob = GetBlobClient(fileName);
        var content = await blob.DownloadStreamingAsync();
        return content.Value;

    }

    private BlobClient GetBlobClient(string fileName)
    {
        var client = new BlobServiceClient(options.Value.ConnectionStringBlob); // kom binnen op hoogste niveau van storage account
        var containerClient = client.GetBlobContainerClient(options.Value.ContainerNameBlob);
        return containerClient.GetBlobClient(fileName);
    }

}
