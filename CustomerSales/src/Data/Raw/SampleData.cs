using Api.Entities;
using Newtonsoft.Json;

namespace Api.Data.Raw
{
    public class SampleData : ISampleData
    {
        private const string DataFilePath = "data/customers.json";
        
        public static ISampleData Instance { get; } = new SampleData();

        public Customer[] BuildSampleData() =>
        [
            // name data obtained online from a random name generator
            BuildCustomer(CustomerStatusEnum.Active, "Aelinos Cicele", "aelinos@mail.com", "1234"),
            BuildCustomer(CustomerStatusEnum.Active, "Contanc Herrion", "contanc@herrion.com", "0800CONTANC"),
            BuildCustomer(CustomerStatusEnum.Lead, "Jennia Orthek", "jort@email.com", "5908"),
            BuildCustomer(CustomerStatusEnum.Active, "Prakrommir Wolum", "wolum.p@mail.com", "2345"),
            BuildCustomer(CustomerStatusEnum.NonActive, "Adami Edmundan", "na@nomail.com", "5693")
        ];

        public void WriteSampleDataToDisk(Customer[] customers)
        {
            // indented formatting for demo only. if it was production, then at least we'd write using bytes instead.
            string customersJson = JsonConvert.SerializeObject(customers, Formatting.Indented);
            File.WriteAllText(DataFilePath, customersJson);
        }

        public Customer[] ReadSampleDataFromDisk()
        {
            string customersJson = File.ReadAllText(DataFilePath);
            var customers = JsonConvert.DeserializeObject<Customer[]>(customersJson);
            if (customers == null)
            {
                throw new JsonSerializationException($"Customer JSON deserialization failed, path: '${DataFilePath}'");
            }

            // todo-at: remove this when done testing
            customers[0].SalesOpportunities =
            [
                new SalesOpportunity()
                {
                    SalesOpportunityId = Guid.NewGuid(),
                    Name = "One"
                }
            ];
            
            return customers;
        }

        private static Customer BuildCustomer(CustomerStatusEnum status, string name, string email,
            string phoneNumber) =>
            BuildCustomer(status.ToString(), name, email, phoneNumber);

        private static Customer BuildCustomer(string status, string name, string email,
            string phoneNumber) =>
            new()
            {
                Status = status,
                Name = name,
                Email = email,
                PhoneNumber = phoneNumber
            };
    }
}
