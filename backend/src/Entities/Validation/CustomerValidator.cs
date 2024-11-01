using FluentValidation;

namespace Api.Entities.Validation
{
    public class CustomerValidator : AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            RuleFor(x => x.CustomerId).NotEmpty();
            RuleFor(x => x.Status).NotEmpty()
                .NotEqual(CustomerStatusEnum.Unknown.ToString());
            RuleFor(x => x.UtcCreatedAt).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Email).NotEmpty()
                .When(x => string.IsNullOrEmpty(x.PhoneNumber));
            RuleFor(x => x.PhoneNumber).NotEmpty()
                .When(x => string.IsNullOrEmpty(x.Email));
        }
    }
}