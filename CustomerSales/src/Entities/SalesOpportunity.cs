namespace Api.Entities
{
    public record SalesOpportunity
    {
        public Guid SalesOpportunityId { get; set; }
        public string Name { get; set; }

        public SalesOpportunity()
        {
            SalesOpportunityId = Guid.NewGuid();
            Name = string.Empty;
        }
    }
}