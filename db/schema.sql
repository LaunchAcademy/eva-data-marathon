-- Create a crew_members table. This should have a primary key and name of the crew member.
-- CREATE TABLE crew_members (
--   id SERIAL PRIMARY KEY,
--   member_name VARCHAR(225) NOT NULL
-- );

-- You'll also have to modify your excursions table so that it no longer has a crew column. 
-- Otherwise, it should be populated with the same data as before.
-- CREATE TABLE excursions (
--   id SERIAL PRIMARY KEY,
--   country VARCHAR(255),
--   vehicle VARCHAR(255),
--   occurred_on DATE,
--   duration_hours SMALLINT,
--   duration_minutes SMALLINT,
--   purpose TEXT
-- );

-- Create an excursion_participants table. It should relate a crew_member to an excursion. 
-- Note: this table is a join table, and it's primary purpose is to keep track of a relationship between a crew member and an exercusion. 
-- As such, it should contain foriegn key columns for a crew_member id and excursion id
-- CREATE TABLE excursion_participants (
--   id SERIAL PRIMARY KEY,
--   crew_member_id INTEGER references crew_members(id),
--   excursion_id INTEGER references excursions(id)
-- );

-- Modify your seed script so that there is a unique list of names in crew_members for each crew member found in eva-data.csv. 

-- Your seed script should populate the excursion_participants table so that excursions and crew members are properly related.