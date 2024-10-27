# Customer Sales

Note that this is my first React project, and I might be not aware of best practices. Also note that I tried splitting the components into separate JavaScript files which produced a runtime error -- see below.

Upon reviewing the Assessment notes, I see that I missed the mention of TypeScript (under Notes, bullet point 2). This was probably because I was so excited by learning more about and working with React. I am definitely a big fan of TypeScript and have encouraged the adoption of it at at-least two companies. In those companies we used it for backend scripts.  

# Getting Started

## Entities

In short: a list of **Clients** with zero or more **Sales Opportunities**.

## Data Store

A JSON file. Sample data can be produced using the `/customersales/dumpjson` endpoint either from `API.http` or the Swagger.

## UI

Some attempts were made to make the UI presentable, but overall there's a lot more that could / should be done in that area.

Essentially:
- The column headings `Name`, and `Status` enabling sorting.
  - There is limited support for sorting on both fields at the same time.
  - Thus there is a `Clear Sort` button.
- The controls in the green heading section are for filtering.
  - It is case-sensitive
  - The `Filter` button needs to be pressed to apply the filter.
  - To clear filtering, clear out the related inputs, and press the `Filter` button again.
- There is currently no UI feature to add a new customer.
  - A developer could use the Swagger.
  - The intent was that the sample JSON data will be used. See Data Store above. 
- Clicking on a customer row will show / hide an editing row.
  - Note that there are two separate `Save ...` buttons.
  - A new sales opportunity can be added, by selecting `Add Opportunity`.
  - See Known Bugs below re sales opportunities.
- Only the `Save Customer` button has a status indicator showing "Saving...".
  - This is displayed for a minimum of 1 second, since otherwise it might produce a mysterious flicker.

## Project Structure

- `API`
  - `wwwroot`: Default Web server static files root
  - `Data`: The sample JSON data, as well as a provider wrapper around that. The expectation being that the sample JSON data could be replaced by a database.
  - `Entities`: The C# contracts, and enums.
  - `Models`: The expected backend layer that respond / receive requests.
    - I took some shortcuts for:
      - `dumpjson` endpoint, for example calling the `Data.Raw` layer directly. I did that, because I expect the sample JSON data to be temporary.
      - `testsave` endpoint, since I wanted a very quick test to ensure that saving was working.
- Backend unit tests

# Known Bugs

1. Editing a Sales Opportunity doesn't pre-select the correct value in the HTML select. The value is being set in React state, and browser debugging seems to show it running correctly, but the state didn't change after being set.

# Possible Improvements

## User Facing

- Status values are being displayed as for example `NonActive`, `ClosedWon`, etc. Ideally these should be displayed with appropriate spaces, perhaps using internationalization?
- Should filtering and sorting be made case-insensitive?
- Add frontend validation.
  - In addition, the methods in `fetchLib.js` currently expect the backend to return JSON. If however the backend validation fails, it throws an exception, and thus no JSON is returned, meaning that the fetch method will also fail. The resolution is probably one of:
    - The frontend should handle the scenario where JSON isn't returned, and ideally also present the backend validation errors to the user.
    - Change the backend validation to JSON, instead of just an exception.
    - The solution may also be a mix of both points.
- Address this issue showing in the browser Dev Tools, Console: `Inline Babel script:137 Warning: Each child in a list should have a unique "key" prop. Check the render method of ``CustomersList`.
  - While this mentions Babel -- which will changed for production -- it sounds like it may be an important issue to resolve anyway.

## Development Team

- Sorting is currently based on two strings `asc`, and `desc`, and it might be better to turn those into enums instead.
- Extract the components into separate JavaScript files. When I did that, at runtime it produced an error `Uncaught SyntaxError: Unexpected token <`.
  - This appears to be a Web server configuration issue. and it seems that the Web server is having difficulty with JSX?
  - To ensure that my components weren't at fault, I also tried with the sample components from https://react.dev/learn/importing-and-exporting-components.
  - I see others online describe the same error, but the resolution isn't perfectly clear.
  - Note that I intentionally made a minimal ASP.NET Core project, as I wanted to learn exactly how React is set up and configured. I considered using ReactJS.NET, but felt that it may obscure some of the learning opportunities, and thus didn't use it as a starting point for this project. 
- Change the JavaScript to TypeScript so that the frontend can benefit from entity contracts, and stronger typing.
- Configure a default document, for example `default.html`.
- The Swagger may be more useful with descriptions. It should be checked if the addition of XML comments in C# can perhaps also appear in Swagger.
- Change the data source from JSON to a database.
  - How will this affect filtering and paging?
- Add label elements for all the HTML editing elements.

# Production

There are at least these points to consider to be production ready:

- React Babel has to be changed to something that is more efficient. Babel should only be used in development environments. 
- For better maintenance, components should be extracted from the default HTML page. This would help to decrease the chance of conflicts in a development team making changes.
- The specific environment config files would probably need to be removed from source control, likely after a discussion re deployment / build servers. 
