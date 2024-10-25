// todo-at: which config files should be removed from `git` history?
// - ideally these are never added, but at the moment i don't have any build server configs or indeed any secrets
//   - there are ports, but these are possibly defaults... still maybe not great to be committed

using Api.Data.Raw;
using Api.Entities;
using Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

SetUpRoutes(app);

// todo-at: figure out how to specify a default file, for default.html
app.UseStaticFiles();
app.UseAntiforgery();

app.Run();
return;

void SetUpRoutes(WebApplication webApplication)
{
    const string customerSalesRoot = "/customersales";
    
    webApplication.MapGet($"{customerSalesRoot}/dumpjson", () =>
        {
            Customer[] customers = SampleData.Instance.BuildSampleData();
            CustomerModel.Instance.StoreCustomers(customers);
        })
        .WithName("GetCustomerSalesDumpJson")
        .WithOpenApi();

    webApplication.MapGet($"{customerSalesRoot}/customers",
            Customer[] (string? filterName, string? filterStatus, string? sortName, string? sortStatus) =>
            {
                Customer[] customers =
                    CustomerModel.Instance.RetrieveCustomers(filterName, filterStatus, sortName, sortStatus);
                return customers;
            })
        .WithName("GetCustomerSalesReadCustomers")
        .WithOpenApi();

    // todo-at: is currently used? or is the data just obtained from the full list?
    webApplication.MapGet($"{customerSalesRoot}/customers/{{customerId}}",
            Customer? (Guid customerId) =>
                CustomerModel.Instance.RetrieveCustomer(customerId))
        .WithName("GetCustomerSalesReadCustomer")
        .WithOpenApi();

    webApplication.MapGet($"{customerSalesRoot}/statuses",
            string[] () =>
                CustomerStatusModel.Instance.RetrieveCustomerStatuses())
        .WithName("GetCustomerSalesCustomerStatuses")
        .WithOpenApi();
}
