using Api.Data.Provider;
using Api.Entities;

// todo-at: find all of the capitalized `API` and ensure it's all consistent as `Api`
namespace Api.Models
{
    public class CustomerModel : ICustomerModel
    {
        private readonly ICustomersDataProvider _customersDataProvider = CustomersDataProvider.Instance;

        public static ICustomerModel Instance => new CustomerModel();

        public Customer[] RetrieveCustomers(string? filterName, CustomerStatusEnum? filterStatus, string? sortName,
            CustomerStatusEnum? sortStatus)
        {
            Dictionary<string, string> filterFields = new();
            if (!string.IsNullOrWhiteSpace(filterName))
            {
                filterFields.Add("name", filterName);
            }
            
            if (filterStatus != null)
            {
                // todo-at: refine this a bit more... maybe it can be more elegant / enum-like? different dictionary value type
                filterFields.Add("status", filterStatus.ToString());
            }
            
            Dictionary<string, string> sortFields = new();
            if (!string.IsNullOrWhiteSpace(sortName))
            {
                sortFields.Add("name", sortName);
            }

            if (sortStatus != null)
            {
                sortFields.Add("status", sortStatus.ToString());
            }

            return _customersDataProvider.RetrieveCustomers(filterFields, sortFields);
        }

        public void StoreCustomers(Customer[] customers)
        {
            _customersDataProvider.StoreCustomers(customers);
        }
    }
}
