// todo-at: which config files should be removed from `git` history?
// - ideally these are never added, but at the moment i don't have any build server configs or indeed any secrets
//   - there are ports, but these are possibly defaults... still maybe not great to be committed

using Api.Data.Raw;
using Api.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

SetUpRoutes(app);

app.Run();
return;

void SetUpRoutes(WebApplication webApplication)
{
    // todo-at: how to do nested routes, for example /customersales/somethingelse
    webApplication.MapGet("/customersales/dumpjson", () =>
        {
            Customer[] customers = SampleData.BuildSampleData();
            Api.Models.CustomerModel.Instance.StoreCustomers(customers);
        })
        .WithName("GetCustomerSalesDumpJson")
        .WithOpenApi();

    webApplication.MapGet("/customersales/readdumpjson",
            Customer[] (string? filterName, CustomerStatusEnum? filterStatus, string? sortName,
                CustomerStatusEnum? sortStatus) =>
            {
                Customer[] customers =
                    Api.Models.CustomerModel.Instance.RetrieveCustomers(filterName, filterStatus, sortName, sortStatus);
                return customers;
            })
        .WithName("GetCustomerSalesReadDumpJson")
        .WithOpenApi();
}
