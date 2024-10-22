using Api.Entities;

namespace Api.Models;

public interface ICustomerModel
{
    static abstract ICustomerModel Instance { get; }

    Customer[] RetrieveCustomers(string? filterName, CustomerStatusEnum? filterStatus, string? sortName,
        CustomerStatusEnum? sortStatus);

    void StoreCustomers(Customer[] customers);
}