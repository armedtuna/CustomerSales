using Api.Entities;

namespace Api.Data.Provider
{
    public interface ICustomersDataProvider
    {
        static abstract ICustomersDataProvider Instance { get; }

        Customer? RetrieveCustomer(Guid customerId);
        
        Customer[] RetrieveCustomers(Dictionary<string, string>? filterFields, Dictionary<string, string>? sortFields);

        bool? StoreCustomer(Customer customer);

        void StoreCustomers(Customer[] customers);
    }
}
