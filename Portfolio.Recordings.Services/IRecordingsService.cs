using System;
using Portfolio.Recordings.Persistence;

namespace Portfolio.Recordings.Services;

public interface IRecordingsService
{

}

public class RecordingsService : IRecordingsService
{
    private readonly RecordingsRepository _recordingsRepo;

    public RecordingsService(IRecordingsRepository recordingsRepo)
    {
        _recordingsRepo = (RecordingsRepository?)recordingsRepo;

    }
}
