using Api.Entities;

namespace Api.Data.Raw;

public interface ISampleData
{
    Customer[] BuildSampleData();

    Customer[] ReadSampleDataFromDisk();

    void WriteSampleDataToDisk(Customer[] customers);
}