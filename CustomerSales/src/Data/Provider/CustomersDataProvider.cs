using Api.Data.Raw;
using Api.Entities;

namespace Api.Data.Provider;

public class CustomersDataProvider : ICustomersDataProvider
{
    public static ICustomersDataProvider Instance => new CustomersDataProvider();
    private readonly ISampleData _sampleData;

    public CustomersDataProvider()
        : this(Raw.SampleData.Instance)
    {
    }

    public CustomersDataProvider(ISampleData sampleData)
    {
        _sampleData = sampleData;
    }

    public Customer? RetrieveCustomer(Guid customerId)
    {
        Customer[] customers = _sampleData.ReadSampleDataFromDisk();
        return customers.FirstOrDefault(c => c.CustomerId == customerId);
    }

    public Customer[] RetrieveCustomers(Dictionary<string, string>? filterFields,
        Dictionary<string, string>? sortFields)
    {
        // typically filtering / sorting would probably be closer to the data level, but for simplicity doing it here
        Customer[] customers = _sampleData.ReadSampleDataFromDisk();
        if (filterFields != null)
        {
            customers = FilterCustomers(customers, filterFields);
        }

        if (sortFields != null)
        {
            customers = SortCustomers(customers, sortFields);
        }
        
        return customers;
    }

    // todo-at: extract to new class?
    // todo-at: tests for new class?
    // todo-at: would a regex filter be fun? it could be a search that starts and ends with '/' like browser dev tools does?
    private static Customer[] FilterCustomers(Customer[] customers, Dictionary<string, string> filterFields)
    {
        foreach (KeyValuePair<string, string> filterField in filterFields)
        {
            customers = filterField.Key switch
            {
                "name" => customers
                    .Where(customer => customer.Name.Contains(filterField.Value))
                    .ToArray(),
                "status" =>
                    customers
                    .Where(customer => customer.Status.ToString().Equals(filterField.Value))
                    .ToArray(),
                _ => customers
            };
        }
        
        return customers;
    }

    // todo-at: extract to new class?
    // todo-at: tests for new class?
    private static Customer[] SortCustomers(Customer[] customers, Dictionary<string, string> sortFields)
    {
        foreach (KeyValuePair<string, string> sortField in sortFields)
        {
            customers = sortField.Key switch
            {
                "name" => sortField.Value == "desc"
                    ? customers.OrderByDescending(customer => customer.Name).ToArray()
                    : customers.OrderBy(customer => customer.Name).ToArray(),
                "status" => sortField.Value == "desc"
                    ? customers.OrderByDescending(customer => customer.Status).ToArray()
                    : customers.OrderBy(customer => customer.Status).ToArray(),
                _ => customers
            };
        }
        
        return customers;
    }

    public void StoreCustomers(Customer[] customers)
    {
        _sampleData.WriteSampleDataToDisk(customers);
    }
}
