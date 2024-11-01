using Api.Entities;

namespace Api.Models;

public class SalesOpportunityStatusModel : ISalesOpportunityStatusModel
{
    public static ISalesOpportunityStatusModel Instance = new SalesOpportunityStatusModel();
    
    public string[] RetrieveSalesOpportunityStatuses()
    {
        List<string> statuses = [];
        IEnumerable<SalesOpportunityStatusEnum> values = Enum.GetValues<SalesOpportunityStatusEnum>()
            .Where(x => x != SalesOpportunityStatusEnum.Unknown);
        foreach (SalesOpportunityStatusEnum status in values)
        {
            // there's probably some translation resources missing here, for example ideally:
            // "ClosedWon" would be displayed as "Closed Won", or "Closed-won", etc.
            statuses.Add(status.ToString());
        }
        
        return statuses.ToArray();
    }
}