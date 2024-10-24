using Api.Entities;

namespace Api.Models;

public interface ICustomerStatusModel
{
    // todo-at: test how this responds for unit tests
    static abstract ICustomerStatusModel Instance { get; }

    string[] RetrieveCustomerStatuses();
}