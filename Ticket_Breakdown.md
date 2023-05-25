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

Ticket 1: Add custom ID field for Facilities to store Agent IDs

Description:
Currently, the system uses internal database IDs for Agents on generated reports. To provide more flexibility, we need to add a custom ID field for Facilities to save their own Agent IDs. This will allow Facilities to use their preferred identification system when generating reports.

Acceptance Criteria:

A new custom ID field is added to the Agents table in the database.
Facilities can enter and save custom IDs for each Agent they work with.
The custom ID field is displayed and editable in the Facility's user interface.
Custom IDs are associated with the respective Agents in the system.
Implementation Details:

Add a new column named "custom_id" to the Agents table in the database.
Update the Agents model and schema to include the new "custom_id" field.
Create an API endpoint to handle updating and retrieving custom IDs for Agents.
Update the Facility user interface to display and allow editing of the custom ID field.
Update the existing code that generates reports to use the custom ID instead of the internal database ID.
Time/Effort Estimate: 4-6 hours

Ticket 2: Update generateReport function to use custom IDs for Agents

Description:
Currently, the generateReport function uses the internal database ID for Agents when generating reports. To incorporate the newly added custom ID field, we need to update the generateReport function to use the custom ID instead.

Acceptance Criteria:

The generateReport function retrieves the custom ID of each Agent from the database.
The custom ID is used in the report generation process instead of the internal database ID.
The generated reports display the custom ID for each Agent.
Implementation Details:

Modify the generateReport function to retrieve the custom ID of each Agent using the updated database query.
Update the report generation code to use the custom ID instead of the internal database ID.
Verify that the generated reports display the custom ID correctly.
Time/Effort Estimate: 2-4 hours

Ticket 3: Update getShiftsByFacility function to include custom Agent IDs

Description:
Currently, the getShiftsByFacility function returns Shifts for a given Facility, including some metadata about the assigned Agents. To include the custom IDs of Agents in the returned Shifts, we need to update the getShiftsByFacility function.

Acceptance Criteria:

The getShiftsByFacility function retrieves the custom ID of each Agent from the database.
The custom ID is included in the metadata about the assigned Agents returned by the function.
Implementation Details:

Update the getShiftsByFacility function to retrieve the custom ID of each Agent using the updated database query.
Modify the returned Shifts data structure to include the custom ID in the metadata about the assigned Agents.
Time/Effort Estimate: 2-4 hours

Ticket 4: Update report generation process to include custom IDs in PDF

Description:
Currently, the report generation process converts Shifts into a PDF for submission. To reflect the changes made for custom IDs, we need to update the report generation process to include the custom IDs in the generated PDF.

Acceptance Criteria:

The report generation process retrieves the custom ID of each Agent from the database.
The custom ID is included in the PDF generated for each Shift.
Implementation Details:

Modify the report generation code to retrieve the custom ID of each Agent using the updated database query.
Update the PDF generation code to include the custom ID in the generated PDF for each Shift.
Time/Effort Estimate: 3-5 hours

Note: Depending on the complexity and existing codebase, these tickets can be further split or combined if needed to optimize implementation and effort.