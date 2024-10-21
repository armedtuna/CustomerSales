namespace Api.Models
{
    // todo-at: should this be a `record` instead of a class?
    public class SalesOpportunity
    {
        public Guid SalesOpportunityId { get; set; } // todo-at: should there a set here? or should the ctor handle this?
        public string Name { get; set; }

        public SalesOpportunity()
        {
            SalesOpportunityId = Guid.NewGuid();
            Name = string.Empty;
        }
    }
}