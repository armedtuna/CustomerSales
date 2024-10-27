using Api.Data.Provider;
using Api.Entities;
using Api.Entities.Validation;
using FluentValidation.Results;

namespace Api.Models
{
    public class CustomerModel : ICustomerModel
    {
        private readonly ICustomersDataProvider _customersDataProvider = CustomersDataProvider.Instance;

        public static ICustomerModel Instance => new CustomerModel();

        public Customer? RetrieveCustomer(Guid customerId)
        {
            return _customersDataProvider.RetrieveCustomer(customerId);
        }

        public Customer[] RetrieveCustomers(string? filterName, string? filterStatus, string? sortName,
            string? sortStatus)
        {
            // todo-at: should this be extracted to a method? and perhaps public? both test use, and testing?
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

        public bool? SaveCustomer(Customer customer)
        {
            ValidationResult? validation = new CustomerValidator().Validate(customer);
            if (validation == null) throw new FluentValidation.ValidationException("Validation unavailable");
            if (!validation.IsValid) throw new FluentValidation.ValidationException(string.Join(' ', validation.Errors));
            
            return _customersDataProvider.StoreCustomer(customer);
        }

        public bool? UpsertSalesOpportunity(Guid customerId, SalesOpportunity salesOpportunity)
        {
            ValidationResult? validation = new SalesOpportunityValidator().Validate(salesOpportunity);
            if (validation == null) throw new FluentValidation.ValidationException("Validation unavailable");
            if (!validation.IsValid) throw new FluentValidation.ValidationException(string.Join(' ', validation.Errors));
        
            Customer? customer = RetrieveCustomer(customerId);
            if (customer == null) throw new NullReferenceException($"Customer not found: '{customerId}'");

            SalesOpportunity? existingOpportunity = customer.SalesOpportunities?.FirstOrDefault(x =>
                x.SalesOpportunityId == salesOpportunity.SalesOpportunityId);
            if (existingOpportunity == null)
            {
                customer.SalesOpportunities ??= new List<SalesOpportunity>();
                customer.SalesOpportunities.Add(salesOpportunity);
            }
            else
            {
                existingOpportunity.Status = salesOpportunity.Status;
                existingOpportunity.Name = salesOpportunity.Name;
            }

            _customersDataProvider.StoreCustomer(customer);

            return true;
        }
    }
}
