// todo-at: which config files should be removed from `git` history?
// - ideally these are never added, but at the moment i don't have any build server configs or indeed any secrets
//   - there are ports, but these are possibly defaults... still maybe not great to be committed
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

// todo-at: how to do nested routes, for example /customersales/somethingelse
app.MapGet("/customersales/dumpjson", () =>
{
    Api.Data.SampleData.WriteSampleDataToDisk();
})
.WithName("GetCustomerSalesDumpJson")
.WithOpenApi();

app.MapGet("/customersales/readdumpjson", () =>
{
    return Api.Data.SampleData.ReadSampleDataFromDisk();
})
.WithName("GetCustomerSalesReadDumpJson")
.WithOpenApi();

// todo-at: remove all of the weather stuff
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
