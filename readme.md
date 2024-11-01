# Customer Sales

Note that this is my first React project, and I might be not aware of best practices.

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
  - Thus, there is a `Clear Sort` button.
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
- `Save ...` buttons have a status indicator showing "Saving...".
  - This is displayed for a minimum of 1 second, since otherwise it might produce a mysterious flicker.

## Project Structure

Essentially there are two projects: backend, and frontend. The backend uses an ASP.NET Core API, and the frontend node React TypeScript. The split exists, because the backend may need more scaling up, since it runs more code on the Web server. Whereas in contrast the frontend is mostly static files which are processed on the viewing Web browser. Having said that a static files Web server may still need scaling up depending on number of concurrent users.

Folders overview:
- `backend`
  - `API`
    - `Data`: The sample JSON data, as well as a provider wrapper around that. The expectation being that the sample JSON data could be replaced by a database.
    - `Entities`: The C# contracts, and enums.
    - `Models`: The expected backend layer that responds to / receives requests.
      - I took some shortcuts for:
        - `dumpjson` endpoint, for example calling the `Data.Raw` layer directly. I did that, because I expect the sample JSON data to be temporary.
        - `testsave` endpoint, since I wanted a very quick test to ensure that saving was working.
  - Backend unit tests
- `frontend`
  - `src`
    - `Components`: Parts and views extracted to keep main application simple.
    - `Entities`: The TypeScript version of the backend contracts.
    - `Library`: Some useful code extracted.

## TODO Comments

As I'm working I often leave `todo-at` comments for later consideration or work. I've removed quite a few of those after either considering them or since I've covered them in this document. However, some still remain, and I'm not ready to remove them yet. 

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
- The Swagger may be more useful with descriptions. It should be checked if the addition of XML comments in C# can perhaps also appear in Swagger.
- Change the data source from JSON to a database.
  - How will this affect filtering and paging?
- Add label elements for all the HTML editing elements.
- It may be beneficial and / or simpler to change the React TypeScript Web server to also be an ASP.NET Core Web server, since then both will have similar maintenance / security topics.

# Production

There are at least these points to consider to be production ready:

- React Babel has to be changed to something that is more efficient. Babel should only be used in development environments. 
- The specific environment config files would probably need to be removed from source control, likely after a discussion re deployment / build servers. 
