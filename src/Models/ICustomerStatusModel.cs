namespace Api.Models;

public interface ICustomerStatusModel
{
    static abstract ICustomerStatusModel Instance { get; }

    string[] RetrieveCustomerStatuses();
}