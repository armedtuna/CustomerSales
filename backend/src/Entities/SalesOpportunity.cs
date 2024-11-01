namespace Api.Entities
{
    public record SalesOpportunity
    {
        private SalesOpportunityStatusEnum _status;
        
        public Guid SalesOpportunityId { get; set; }

        public string Status
        {
            get => _status.ToString();
            set => _status = (SalesOpportunityStatusEnum)Enum.Parse(typeof(SalesOpportunityStatusEnum), value);
        }
        public string Name { get; set; }

        public SalesOpportunity()
        {
            SalesOpportunityId = Guid.NewGuid();
            _status = SalesOpportunityStatusEnum.Unknown;
            Name = string.Empty;
        }
    }
}