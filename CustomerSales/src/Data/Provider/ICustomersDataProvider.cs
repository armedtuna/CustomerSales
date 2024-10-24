using Api.Entities;

namespace Api.Data.Provider
{
    public interface ICustomersDataProvider
    {
        static abstract ICustomersDataProvider Instance { get; }
        
        Customer[] RetrieveCustomers(Dictionary<string, string>? filterFields, Dictionary<string, string>? sortFields);

        void StoreCustomers(Customer[] customers);
    }
}