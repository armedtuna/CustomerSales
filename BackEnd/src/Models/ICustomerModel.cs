using Api.Entities;

namespace Api.Models;

public interface ICustomerModel
{
    // todo-at: test how this responds for unit tests
    static abstract ICustomerModel Instance { get; }

    Customer[] RetrieveCustomers(string? filterName, string? filterStatus, string? sortName, string? sortStatus);

    void StoreCustomers(Customer[] customers);
}