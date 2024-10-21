using FluentValidation;

namespace Api.Models.Validation
{
    public class CustomerValidator : AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            RuleFor(x => x.CustomerId).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.UtcCreatedAt).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            // todo-at: confirm if this validation should be "at least one of" or "both of" email and phone number.
            RuleFor(x => x.Email).NotEmpty()
                .When(x => string.IsNullOrEmpty(x.PhoneNumber));
            RuleFor(x => x.PhoneNumber).NotEmpty()
                .When(x => string.IsNullOrEmpty(x.Email));
        }
    }
}