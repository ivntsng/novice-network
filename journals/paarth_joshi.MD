### week of June 19- June 23

- Finalized our project concept to be Novice Network, a networking platform for coding bootcamp graduates to connect to mentors, job recruiters, and other graduates.
- Created wireframes.
- As a group we initialized our project using Docker and FastAPI.

### week of June 26 - 30

- created a working endpoint for creating replies using the GET
- Familiarized myself with FastAPI and specifically how to test endpoints using FastAPI

### week of July 10 - July 14

During the past week, I worked on the following tasks:

- Implemented Get All Comments and Replies Endpoints
- Developed the GET endpoint to fetch all comments and replies.
- Added error handling for fetching scenarios where there are no comments or replies yet.
- Ensured the endpoints were correctly exposed in the API documentation.
- Conducted necessary testing via FastAPI docs to ensure the current endpoints return appropriate data.
- Implemented Delete Single Comment and Reply Endpoints
- Created the DELETE endpoints for both comments and replies.
- Added relevant HTTPException handling for situations where comments or replies to be deleted do not exist.

### July 17 - July 21

- Fixed update comment endpoint and created update reply endpoint
- Included HTTPExceptions for situations where comments or replies to be updated do not exist.
- Conducted thorough testing via FastAPI docs to ensure correct functionality for all endpoints
- Created frontend components via React.js that corresponded with the 5 endpoints for comments and 5 endpoints for replies
- created forms to create comment and create reply
- created comment section component to properly display both replies and comments
- created delete functionality on front end for replies and comments
- ensured front end functionality was working by thoroughly testing the backend (fastapi) and testing the frontend using React
- helped fix small bugs in my code that would make front end and bac end deployment successful

### July 24 - July 28

- Deployment working
- refactored front end code to ensure front end functionality causes no pipeline failures and is still logically sound.
  - specifically commentssection.js which was redundant at first and contained unneccessary functionality
- fixed delete button error: delete button and reply button will only show up for users who made the initial comment or reply.
- fixed issue with usernames not being displayed properly for comments and replies
- added improved css styling for all front end components
