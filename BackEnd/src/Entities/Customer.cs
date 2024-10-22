// todo-at: test swagger?
// todo-at: should xml code comments be added? also could / would the swagger use that?
namespace Api.Entities
{
    // todo-at: should this be a `record` instead of a class?
    public class Customer
    {
        public Guid CustomerId { get; set; } // todo-at: should there a set here? or should the ctor handle this?
        public CustomerStatusEnum Status { get; set; }
        public DateTime UtcCreatedAt { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
        // typically phone numbers are digits, but:
        // - it's possible someone could use the letters on the digits for their number?
        // - and / or they want to record a plus symbol (+)?
        // if something more complex than a string is needed, then the phone number should probably become a class.
        public string? PhoneNumber { get; set; }
        public List<SalesOpportunity> SalesOpportunities { get; set; }

        public Customer()
        {
            // todo-at: test how this works with deserialization
            CustomerId = Guid.NewGuid();
            Status = CustomerStatusEnum.Unknown;
            UtcCreatedAt = DateTime.UtcNow;
            Name = string.Empty;
            SalesOpportunities = [];
        }
    }
}
