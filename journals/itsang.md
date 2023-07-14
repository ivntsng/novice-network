# Journal

## Over the past week June 28 - July 5

During the past week, I worked on the following tasks:

## Adding Get All Jobs Endpoint and Fix Create Job Documentation
* Implemented the GET endpoint to fetch all jobs.
* Fixed the issue where the create job POST endpoint was not appearing in the API documentation.
* Tested the changes to ensure proper functionality.

## Adding Delete Single Job Endpoint
* Completed the endpoint for deleting a single job.
* Integrated proper error handling with HTTPExceptions.
* Ensured the MR was ready for submission.

## Created the Frontend Template (Navbar and Page Sections)
* Worked on the frontend template, including the navbar and different sections of the page.
* Designed and implemented the navbar component.
* Created various sections of the page.
* Integrated the necessary styles, interactions, and responsiveness for the new template.

## Implemented ListJobs Component and Fetch Job Listings
* Worked on the ListJobs.js and App.js files.
* Implemented conditional rendering and styled the job postings table in ListJobs.js.
* Added state and an asynchronous function getJobs in App.js to fetch job listings.
* Configured routing and passed the listJobs prop to the ListJobs component.
* Tested the changes and ensured they met the requirements.

## July 8 - July 9

During July 8 and July 9, I focused on the create job listing page and successfully implemented the functionality for submitting job listings. The key activities during this period include:

* Created the frontend form for job listing creation.
* Implemented the necessary validations and error handling for the form fields.
* Integrated the form submission with the backend API.
* Made adjustments to the UI and form layout for improved user experience.

## July 10:

* Implemented the job posting deletion functionality.
* Tested the deletion feature to ensure proper functionality and user experience.

## July 11:

* Fixed UI bugs related to deleting a job and the job list not refreshing afterward.
* Ensured that the job list refreshes correctly after deleting a job.
* Implemented the redirection to the job list after successfully creating a new job.

## July 12:

* Worked on revamping the UI for job details.
* Added additional UI elements for job details, improving the overall design.
* Updated the background color to an off-white shade.
* Added edit and delete buttons to the job details page for enhanced functionality.

## July 13:

* Reworked the navigation bar to display edit and delete buttons only when inside the job details page.
* Implemented conditional rendering of the edit and delete buttons based on the current page.
* Modified the format of the date display for better readability.
