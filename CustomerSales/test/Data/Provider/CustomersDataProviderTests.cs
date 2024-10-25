using Api.Data.Provider;
using Api.Entities;
using FluentAssertions;

namespace test.Data.Provider;

public class CustomersDataProviderTests
{
    [Theory]
    [InlineData(null, null, 5)]
    [InlineData("Letter B", null, 1)]
    [InlineData("yyy", null, 0)]
    [InlineData("Yyy", null, 1)]
    [InlineData(null, "Active", 3)]
    [InlineData(null, "Lead", 1)]
    [InlineData(null, "NonActive", 1)]
    [InlineData(null, "Unknown", 0)]
    [InlineData("x", "NonActive", 0)]
    public void CustomerFilters_ShouldBeCount(string? filterName, string? filterStatus, int expectedCount)
    {
        Dictionary<string, string> filters = BuildFilters(filterName, filterStatus);

        CustomersDataProvider sut = new(new TestSampleData());

        Customer[] customers = sut.RetrieveCustomers(filters, null);

        customers.Length.Should().Be(expectedCount);
    }

    [Theory]
    [InlineData("asc", null, 5, new string[] { "A1", "CCC", "Letter B", "Not Number But Letter D", "Yyy Zzz" })]
    [InlineData("desc", null, 5, new string[] { "Yyy Zzz", "Not Number But Letter D", "Letter B", "CCC", "A1" })]
    [InlineData("", null, 5, new string[] { "A1", "Letter B", "CCC", "Not Number But Letter D", "Yyy Zzz" })]
    [InlineData(null, "asc", 5, new string[] { "A1", "Letter B", "Not Number But Letter D", "CCC", "Yyy Zzz" })]
    [InlineData(null, "desc", 5, new string[] { "Yyy Zzz", "CCC", "Not Number But Letter D", "Letter B", "A1" })]
    [InlineData("asc", "asc", 5, new string[] { "A1", "Letter B", "Not Number But Letter D", "CCC", "Yyy Zzz" })]
    public void CustomerSort_ShouldBeCountAndSequence(string? sortName, string? sortStatus, int expectedCount,
        string[] expectedNamesSequence)
    {
        Dictionary<string, string> sort = BuildSort(sortName, sortStatus);

        CustomersDataProvider sut = new(new TestSampleData());

        Customer[] customers = sut.RetrieveCustomers(null, sort);

        customers.Length.Should().Be(expectedCount);
        customers.Select(x => x.Name).ToArray()
            .Should().BeEquivalentTo(expectedNamesSequence);
    }
    
    // todo-at: test combined filtering and sorting
    [Theory]
    [InlineData("A", null, "asc", null, 1, new string[] { "A1" })]
    [InlineData("e", null, "desc", null, 2, new string[] { "Not Number But Letter D", "Letter B" })]
    [InlineData(null, "Unknown", null, null, 0, new string[] { })]
    [InlineData(null, "Unknown", "e", null, 0, new string[] { })]
    [InlineData("", "Active", "asc", null, 3, new string[] { "A1", "Letter B", "Not Number But Letter D" })]
    [InlineData("e", "Active", "asc", null, 2, new string[] { "Letter B", "Not Number But Letter D" })]
    [InlineData("", "Lead", null, null, 1, new string[] { "CCC" })]
    public void FilteringAndSorting_ShouldBe(string? filterName, string? filterStatus, string? sortName, string? sortStatus, int expectedCount,
        string[] expectedNamesSequence)
    {
        Dictionary<string, string> filters = BuildFilters(filterName, filterStatus);
        Dictionary<string, string> sort = BuildSort(sortName, sortStatus);

        CustomersDataProvider sut = new(new TestSampleData());

        Customer[] customers = sut.RetrieveCustomers(filters, sort);

        customers.Length.Should().Be(expectedCount);
        customers.Select(x => x.Name).ToArray()
            .Should().BeEquivalentTo(expectedNamesSequence);
    }

    private static Dictionary<string, string> BuildFilters(string? filterName, string? filterStatus)
    {
        Dictionary<string, string> filterFields = new();
        if (!string.IsNullOrWhiteSpace(filterName))
        {
            filterFields.Add("name", filterName);
        }

        // a blank status filter is simplest to ignore (and thus include all statuses).
        if (!string.IsNullOrWhiteSpace(filterStatus))
        {
            // todo-at: refine this a bit more... maybe it can be more elegant / enum-like? different dictionary value type
            filterFields.Add("status", filterStatus);
        }

        return filterFields;
    }

    private static Dictionary<string, string> BuildSort(string? sortName, string? sortStatus)
    {
        Dictionary<string, string> sortFields = new();
        if (sortName != null)
        {
            sortFields.Add("name", sortName);
        }

        if (sortStatus != null)
        {
            sortFields.Add("status", sortStatus);
        }
        
        return sortFields;
    }

    // todo-at: can / should the sample test building be in this file?
}