using Api.Data.Provider;
using Api.Data.Raw;
using Api.Entities;
using Api.Models;

// todo-at: set up docker container 
// todo-at: figure how to remove dependency on `wwwroot` folder needing to exist
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

app.UseCors(policyBuilder =>
{
    policyBuilder.AllowAnyHeader()
        .AllowAnyMethod()
        // todo-at: move to appsettings
        .WithOrigins("http://localhost:3000");
});

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

    webApplication.MapGet($"{customerSalesRoot}/customer/{{customerId}}",
            Customer? (Guid customerId) =>
                CustomerModel.Instance.RetrieveCustomer(customerId))
        .WithName("GetCustomerSalesReadCustomer")
        .WithOpenApi();

    webApplication.MapGet($"{customerSalesRoot}/customers/statuses",
            string[] () =>
                CustomerStatusModel.Instance.RetrieveCustomerStatuses())
        .WithName("GetCustomerSalesCustomerStatuses")
        .WithOpenApi();

    webApplication.MapGet($"{customerSalesRoot}/salesopportunity/statuses",
            string[] () =>
                SalesOpportunityStatusModel.Instance.RetrieveSalesOpportunityStatuses())
        .WithName("GetCustomerSalesOpportunityStatuses")
        .WithOpenApi();

    webApplication.MapPost($"{customerSalesRoot}/testsave",
            void () =>
            {
                Customer[] customers =
                    CustomerModel.Instance.RetrieveCustomers(null, null, null, null);
                customers[0].Name += ".";
                CustomersDataProvider.Instance.StoreCustomer(customers[0]);
            })
        .WithName("PostCustomerSalesTestSave")
        .WithOpenApi();

    webApplication.MapPost($"{customerSalesRoot}/customer",
            bool? (Customer customer) =>
                CustomerModel.Instance.SaveCustomer(customer))
        .WithName("PostCustomerSalesCustomer")
        .WithOpenApi();

    webApplication.MapPost($"{customerSalesRoot}/customer/{{customerId}}/salesopportunity",
            bool? (Guid customerId, SalesOpportunity opportunity) =>
                CustomerModel.Instance.UpsertSalesOpportunity(customerId, opportunity))
        .WithName("PostCustomerSalesSalesOpportunity")
        .WithOpenApi();
}
