using Api.Data.Raw;
using Api.Entities;

namespace test.Data.Provider;

public class TestSampleData : ISampleData
{
    public Customer[] BuildSampleData()
    {
        throw new NotImplementedException();
    }

    public Customer[] ReadSampleDataFromDisk() =>
    [
        // todo-at: consider changing the test data (so as to exercise more data scenarios)?
        BuildCustomer(CustomerStatusEnum.Active, "A1", "a1@mail.com", "1"),
        BuildCustomer(CustomerStatusEnum.Active, "Letter B", "letterb@herrion.com", "XYZ"),
        BuildCustomer(CustomerStatusEnum.Lead, "CCC", "ccc@email.com", "234"),
        BuildCustomer(CustomerStatusEnum.Active, "Not Number But Letter D", "nnlbd@mail.com", "001"),
        BuildCustomer(CustomerStatusEnum.NonActive, "Yyy Zzz", "yz@nomail.com", "+002")
    ];

    public void WriteSampleDataToDisk(Customer[] customers)
    {
        throw new NotImplementedException();
    }

    private static Customer BuildCustomer(CustomerStatusEnum status, string name, string email,
        string phoneNumber) =>
        BuildCustomer(status.ToString(), name, email, phoneNumber);

    private static Customer BuildCustomer(string status, string name, string email,
        string phoneNumber) =>
        new()
        {
            Status = status,
            Name = name,
            Email = email,
            PhoneNumber = phoneNumber
        };
}