using Api.Entities;

namespace Api.Models;

public class CustomerStatusModel : ICustomerStatusModel
{
    public static ICustomerStatusModel Instance => new CustomerStatusModel();

    public string[] RetrieveCustomerStatuses()
    {
        List<string> statuses = [];
        foreach (CustomerStatusEnum status in Enum.GetValues<CustomerStatusEnum>())
        {
            // there's probably some translation resources missing here, for example ideally:
            // "NonActive" would be displayed as "Inactive", or "Non-active", etc.
            statuses.Add(status == CustomerStatusEnum.Unknown
                ? string.Empty
                : status.ToString()
            );
        }
        
        return statuses.ToArray();
    }
}