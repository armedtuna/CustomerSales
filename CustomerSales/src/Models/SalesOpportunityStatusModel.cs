using Api.Entities;

namespace Api.Models;

public class SalesOpportunityStatusModel : ISalesOpportunityStatusModel
{
    public static ISalesOpportunityStatusModel Instance = new SalesOpportunityStatusModel();
    
    public string[] RetrieveSalesOpportunityStatuses()
    {
        List<string> statuses = [];
        foreach (SalesOpportunityStatusEnum status in Enum.GetValues<SalesOpportunityStatusEnum>())
        {
            // there's probably some translation resources missing here, for example ideally:
            // "ClosedWon" would be displayed as "Closed Won", or "Closed-won", etc.
            statuses.Add(status == SalesOpportunityStatusEnum.Unknown
                ? string.Empty
                : status.ToString()
            );
        }
        
        return statuses.ToArray();
    }
}