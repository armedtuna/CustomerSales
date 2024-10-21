using Api.Models;
using Newtonsoft.Json;
using System.IO;

namespace Api.Data
{
    public class SampleData
    {
        public static Customer[] BuildSampleData() =>
            new Customer[]
            {
                BuildCustomer(CustomerStatusEnum.Active, "Aelinos Cicele", "aelinos@mail.com", "1234"),
                BuildCustomer(CustomerStatusEnum.Active, "Contanc Herrion", "contanc@herrion.com", "0800CONTANC"),
                BuildCustomer(CustomerStatusEnum.Lead, "Jennia Orthek", "jort@email.com", "5908"),
                BuildCustomer(CustomerStatusEnum.Active, "Prakrommir Wolum", "wolum.p@mail.com", "2345"),
                BuildCustomer(CustomerStatusEnum.NonActive, "Adami Edmundan", "na@nomail.com", "5693")
            };

        // todo-at: send path as a parameter?
        public static void WriteSampleDataToDisk()
        {
            Customer[] customers = BuildSampleData();
            string customersJson = JsonConvert.SerializeObject(customers, Formatting.Indented);
            File.WriteAllText("customers.json", customersJson);
        }

        // todo-at: send path as a parameter?
        public static Customer[] ReadSampleDataFromDisk()
        {
            string customersJson = File.ReadAllText("customers.json");
            return JsonConvert.DeserializeObject<Customer[]>(customersJson);
        }

        private static Customer BuildCustomer(CustomerStatusEnum status, string name, string email, string phoneNumber) =>
            new Customer()
            {
                Status = status,
                Name = name,
                Email = email,
                PhoneNumber = phoneNumber
            };
    }
}
