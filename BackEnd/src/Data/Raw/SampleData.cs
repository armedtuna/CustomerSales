using Api.Entities;
using Newtonsoft.Json;

namespace Api.Data.Raw
{
    public class SampleData
    {
        // todo-at: should the path be more specific, and not application root? root is probably a bit messy.
        private const string DataFilePath = "data/customers.json";

        public static Customer[] BuildSampleData() =>
        [
            BuildCustomer(CustomerStatusEnum.Active, "Aelinos Cicele", "aelinos@mail.com", "1234"),
            BuildCustomer(CustomerStatusEnum.Active, "Contanc Herrion", "contanc@herrion.com", "0800CONTANC"),
            BuildCustomer(CustomerStatusEnum.Lead, "Jennia Orthek", "jort@email.com", "5908"),
            BuildCustomer(CustomerStatusEnum.Active, "Prakrommir Wolum", "wolum.p@mail.com", "2345"),
            BuildCustomer(CustomerStatusEnum.NonActive, "Adami Edmundan", "na@nomail.com", "5693")
        ];

        public static void WriteSampleDataToDisk(Customer[] customers)
        {
            // indented formatting for demo only. if it was production, then at least we'd write using bytes instead.
            string customersJson = JsonConvert.SerializeObject(customers, Formatting.Indented);
            File.WriteAllText(DataFilePath, customersJson);
        }

        public static Customer[] ReadSampleDataFromDisk()
        {
            string customersJson = File.ReadAllText(DataFilePath);
            var customers = JsonConvert.DeserializeObject<Customer[]>(customersJson);
            if (customers == null)
            {
                // todo-at: is there a more appropriate / specific exception type?
                throw new Exception($"Customer JSON deserialization failed, path: '${DataFilePath}'");
            }
            
            return customers;
        }

        private static Customer BuildCustomer(CustomerStatusEnum status, string name, string email,
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
