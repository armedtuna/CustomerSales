namespace Api.Entities
{
    public record SalesOpportunity
    {
        private SalesOpportunityStatusEnum _status;
        private Guid _salesOpportunityId;

        public string SalesOpportunityId
        {
            get => _salesOpportunityId.ToString();
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    return;
                }

                _salesOpportunityId = Guid.Parse(value);
            }
        }

        public string Status
        {
            get => _status.ToString();
            set => _status = (SalesOpportunityStatusEnum)Enum.Parse(typeof(SalesOpportunityStatusEnum), value);
        }
        public string Name { get; set; }

        public SalesOpportunity()
        {
            _salesOpportunityId = Guid.NewGuid();
            _status = SalesOpportunityStatusEnum.Unknown;
            Name = string.Empty;
        }
    }
}