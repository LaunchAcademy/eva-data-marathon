In this challenge, you'll work to normalize otherwise unstructured data, and build an interactive website based on third party data.

## Getting Started

```no-highlight
et get eva-data-display
cd eva-data-display
yarn install
yarn run dev
```

***if you run into a version error you may need to downgrade to node 12.18.3***

## Modify Your Schema and Seeder

Let's build on the work you did in the `eva-data-seeding` exercise. Drop your old `nasa` database with `dropdb nasa`, because we will need to restructure our database to account for the normalization we wish to execute for this challenge. Then create your `nasa` database once more.

First, we need to make your schema a bit more functional. You probably noticed that multiple crew members can be a given mission

- Create a `crew_members` table. This should have a primary key and name of the crew member. You can retrieve this from `crew.txt`
- Create an `excursions` table, this will be just like the one you made for eva-data-seeding except that it no longer has a `crew` column.


Run your seed script so there is a valid list of excursions and related crew members.

## Core User Stories

Once your database is properly seeded, we can make this data available in our Express application by updating the code in `server.js`.

### View All Excursions

```no-highlight
As a space enthusiast
I want to see all excursions
So that I can learn more about space history
```

Acceptance Criteria:

- I can navigate to `/excursions` and I can see all excursions. Each excursion list item shows its country, vehicle, duration, and purpose.

### Excursion Detail: View Crew Members Per Excursion

```no-highlight
As a space enthusiast
I want to see excursion detail page
So that I can learn specifics about a momentous time in spaceflight
```

Acceptance Criteria:

- I can navigate to `/excursions/:id` and I can see the relevant country, vehicle, duration, and purpose for the excursion
- If the id does not exist in the database, I am presented with a 404
- In addition to the details above, I can also see a list of crew members
- I can easily access excursion detail by clicking on a link for each excursion on `/excursions`

### Sortable Columns

```no-highlight
As a space enthusiast
I want to sort the list of excursions by country or vehicle name
So that I can easily find the excursion I'm looking for
```

Acceptance Criteria:

- When I click on the column header for the Country column on `/excursions`, it will sort my `excursions` alphabetically by Country.
- When I click on the column header for the Vehicle column on `/excursions`, it will sort my `excursions` alphabetically by Vehicle name.
- You may need to dig around the docs to find the best way to sort the data. ***Hint: you can sort when querying using `order_by` or sort after you have the data in your `app.get`

## Non-Core User Stories

- For this story you should read your data from `eva-data.csv`.
- Create an `excursion_participants` table. It should relate a `crew_member` to an `excursion`. Note: this table is a join table, and it's primary purpose is to keep track of a relationship between a crew member and an exercusion. As such, it should contain foriegn key  columns for a `crew_member` id and `excursion` id
- Modify your seed script so that there is a unique list of names in `crew_members` for each crew member found in `eva-data.csv`. Your seed script should populate the `excursion_participants` table so that excursions and crew members are properly related.
- This may require chaining or nesting of promises to get the seed routine to run. This will likely be exceptionally challenging and require you to dig around on the docs and stackoverflow

### Crew Member Detail

```no-highlight
As a space enthusiast
I want to see the excursion details for a crew member
So that I can learn about brave space explorers
```

Acceptance Criteria:

- I can navigate to `/crew_members/:id` and I can see a list of the relevant excursions that the crew member participated in.
- For each excursion, I can see the country, vehicle, duration and purpose for the excursion
- For each excursion, there is a link for me to see that excursion's detail
- When viewing an excursion's detail, I can follow a link that brings me to a crew member's list of excursions