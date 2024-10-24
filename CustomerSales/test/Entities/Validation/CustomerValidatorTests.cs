using Api.Entities.Validation;
using Api.Entities;
using FluentAssertions;

// todo-at: why is rider complaining about this? api.csproj is similar in style AFAICT
namespace Tests.Entities.Validation
{
    public class CustomerValidatorTests
    {
        [Fact]
        public void EmptyCustomer_ShouldFailValidation()
        {
            Customer customer = new();
            CustomerValidator sut = new();

            var result = sut.Validate(customer);

            result.IsValid.Should().BeFalse();
            result.Errors.Count.Should().Be(4);
        }

        [Theory]
        [InlineData(CustomerStatusEnum.Active, "Name 1", "name@1.com", "123", true, 0)]
        [InlineData(CustomerStatusEnum.Active, "Name 1", "name@1.com", "", true, 0)]
        [InlineData(CustomerStatusEnum.Active, "Name 1", "", "123", true, 0)]
        [InlineData(CustomerStatusEnum.Active, "Name 1", "", "", false, 2)]
        [InlineData(CustomerStatusEnum.Unknown, "Name 1", "name@1.com", "123", false, 1)]
        [InlineData(CustomerStatusEnum.Unknown, "Name 1", "", "", false, 3)]
        public void Customer_ValidationShouldBe(CustomerStatusEnum status, string name, string email,
            string phoneNumber, bool expectedIsValid, int expectedErrorsCount)
        {
            Customer customer = new()
            {
                Status = status,
                Name = name,
                Email = email,
                PhoneNumber = phoneNumber
            };
            CustomerValidator sut = new();

            var result = sut.Validate(customer);

            result.IsValid.Should().Be(expectedIsValid);
            result.Errors.Count.Should().Be(expectedErrorsCount);
        }
    }
}
