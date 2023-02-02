# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Add custom agent id field in the Agents table

- Acceptance Criteria:
  - A new column "custom_agent_id" is added to the Agents table in the database
  - The custom_agent_id column can store a string of up to 50 characters
  - The custom_agent_id column is nullable
  - The custom_agent_id column is accessible through the API
- Time/Effort Estimate: 2 hours
- Implementation Details:
  - ALTER the Agents table to add the new custom_agent_id column
  - Update the API to include the custom_agent_id in the returned data for each Agent

Ticket 2: Update the getShiftsByFacility function to use custom agent id

- Acceptance Criteria:
  - The getShiftsByFacility function now returns the custom_agent_id in its response instead of the internal database id for each Agent
  - The internal database id is still stored in the Shifts table and is accessible if needed
- Time/Effort Estimate: 1 hour
- Implementation Details:
  - Update the getShiftsByFacility function to query the Agents table for each Agent's custom_agent_id and include it in the returned data
  - Test the updated getShiftsByFacility function to ensure it is returning the correct data

Ticket 3: Update the generateReport function to use custom agent id

- Acceptance Criteria:
  - The generateReport function now uses the custom_agent_id in the report instead of the internal database id for each Agent
- Time/Effort Estimate: 1 hour
- Implementation Details:
  - Update the generateReport function to use the custom_agent_id in its report generation
  - Test the updated generateReport function to ensure it is generating reports correctly

Ticket 4: Add ability for Facilities to update custom agent id for each Agent

- Acceptance Criteria:
  - Facilities can now update the custom_agent_id for each Agent through the API
- Time/Effort Estimate: 2 hours
- Implementation Details:
  - Add an endpoint to the API to allow Facilities to update the custom_agent_id for each Agent
  - Update the API to include the custom_agent_id in the request data for updating the Agent
  - Test the updated API to ensure it is updating the custom_agent_id correctly

Ticket 5: Update the database to ensure data integrity

- Acceptance Criteria:
  - The custom_agent_id is unique for each Agent
- Time/Effort Estimate: 1 hour
- Implementation Details:
  - Add a unique constraint to the custom_agent_id column in the Agents table
  - Test the database to ensure it is enforcing the unique constraint on the custom_agent_id column
