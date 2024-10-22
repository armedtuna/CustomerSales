using FluentValidation;

namespace Api.Entities.Validation
{
    public class SalesOpportunityValidator : AbstractValidator<SalesOpportunity>
    {
        public SalesOpportunityValidator()
        {
            RuleFor(x => x.SalesOpportunityId).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
         }
    }
}