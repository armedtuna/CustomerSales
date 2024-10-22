using Api.Entities.Validation;
using Api.Entities;
using FluentAssertions;

// todo-at: why is rider complaining about this? api.csproj is similar in style AFAICT
namespace Tests.Entities.Validation
{
    public class SalesOpportunityTests
    {
        [Fact]
        public void EmptySalesOpportunity_ShouldFailValidation()
        {
            SalesOpportunity opportunity = new();
            SalesOpportunityValidator sut = new();

            var result = sut.Validate(opportunity);

            result.IsValid.Should().BeFalse();
            result.Errors.Count.Should().Be(2);
        }

        [Theory]
        [InlineData("Name 1", true, 0)]
        [InlineData("", false, 1)]
        public void SalesOpportunity_ShouldPassValidation(string name, bool expectedIsValid, int expectedErrorsCount)
        {
            SalesOpportunity opportunity = new()
            {
                Name = name
            };
            SalesOpportunityValidator sut = new();

            var result = sut.Validate(opportunity);

            result.IsValid.Should().Be(expectedIsValid);
            result.Errors.Count.Should().Be(expectedErrorsCount);
        }
    }
}
