using Api.Entities;

namespace Api.Models;

public interface ICustomerModel
{
    static abstract ICustomerModel Instance { get; }

    Customer? RetrieveCustomer(Guid customerId);

    Customer[] RetrieveCustomers(string? filterName, string? filterStatus, string? sortName, string? sortStatus);

    void StoreCustomers(Customer[] customers);

    bool? SaveCustomer(Customer customer);

    bool? UpsertSalesOpportunity(Guid customerId, SalesOpportunity salesOpportunity);
}