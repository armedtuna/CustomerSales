using Api.Data.Raw;
using Api.Entities;

namespace Api.Data.Provider;

public class CustomersDataProvider : ICustomersDataProvider
{
    // todo-at: dependency injection or the below static instance?
    // - i think i prefer dependency injection,
    // - but as long as the below can be overridden for tests then it's cheap and okay for the scope of this project
    // todo-at: test this in a test to ensure that it's done correctly / can be overridden
    public static ICustomersDataProvider Instance => new CustomersDataProvider();

    public Customer? RetrieveCustomer(Guid customerId)
    {
        Customer[] customers = SampleData.ReadSampleDataFromDisk();
        return customers.FirstOrDefault(c => c.CustomerId == customerId);
    }

    public Customer[] RetrieveCustomers(Dictionary<string, string>? filterFields,
        Dictionary<string, string>? sortFields)
    {
        // typically filtering / sorting would probably be closer to the data level, but for simplicity doing it here
        Customer[] customers = SampleData.ReadSampleDataFromDisk();
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
    // todo-at: tests
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
                        // todo-at: test that the enum works properly here with to-string
                        // - if UI is translated to another language, then what would happen?
                        //   - that seems to imply that UI should send a number instead?
                    .Where(customer => customer.Status.ToString().Equals(filterField.Value))
                    .ToArray(),
                _ => customers
            };
        }
        
        return customers;
    }

    // todo-at: extract to new class?
    // todo-at: tests
    private static Customer[] SortCustomers(Customer[] customers, Dictionary<string, string> sortFields)
    {
        foreach (KeyValuePair<string, string> sortField in sortFields)
        {
            customers = sortField.Key switch
            {
                // todo-at: there's a problem here, since the field is optional... will it be required to choose `asc` or `desc`?
                // todo-at: logical bug here: a `desc` value will never get here... dictionary is sending something else...
                // todo-at: should there be an enum for asc, desc?
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
        SampleData.WriteSampleDataToDisk(customers);
    }
}
