namespace Api.Entities
{
    public record Customer
    {
        private CustomerStatusEnum _status;
        
        public Guid CustomerId { get; set; }

        public string Status
        {
            get => _status.ToString();
            set => _status = (CustomerStatusEnum)Enum.Parse(typeof(CustomerStatusEnum), value);
        }
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
            CustomerId = Guid.NewGuid();
            _status = CustomerStatusEnum.Unknown;
            UtcCreatedAt = DateTime.UtcNow;
            Name = string.Empty;
            SalesOpportunities = [];
        }
    }
}
