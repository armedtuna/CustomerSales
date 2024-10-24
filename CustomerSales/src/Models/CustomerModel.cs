using Api.Data.Provider;
using Api.Entities;

namespace Api.Models
{
    public class CustomerModel : ICustomerModel
    {
        private readonly ICustomersDataProvider _customersDataProvider = CustomersDataProvider.Instance;

        public static ICustomerModel Instance => new CustomerModel();

        public Customer[] RetrieveCustomers(string? filterName, string? filterStatus, string? sortName,
            string? sortStatus)
        {
            Dictionary<string, string> filterFields = new();
            if (!string.IsNullOrWhiteSpace(filterName))
            {
                filterFields.Add("name", filterName);
            }

            // a blank status filter is simplest to ignore (and thus include all statuses).
            if (!string.IsNullOrWhiteSpace(filterStatus))
            {
                // todo-at: refine this a bit more... maybe it can be more elegant / enum-like? different dictionary value type
                filterFields.Add("status", filterStatus);
            }
            
            Dictionary<string, string> sortFields = new();
            if (sortName != null)
            {
                sortFields.Add("name", sortName);
            }

            if (sortStatus != null)
            {
                sortFields.Add("status", sortStatus);
            }

            return _customersDataProvider.RetrieveCustomers(filterFields, sortFields);
        }

        public void StoreCustomers(Customer[] customers)
        {
            _customersDataProvider.StoreCustomers(customers);
        }
    }
}
