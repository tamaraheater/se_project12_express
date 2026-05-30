# WTWR (What to Wear?): Back End Sprint 12 and 13

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

A perfect description is “This is a backend API — a little request-handling machine.
When someone makes a request, it travels through routes (which decide where it should go), then the controllers do the actual work using the models (which talk to the database), and finally it sends back the response.”

When in the midst of the building process, it does not "feel" that one is accomplishing this, until, once complete, the delivery system is in place.

Features: Sprint 12

- Full CRUD operations for clothing items
- User ownership validation (only authenticated, authorized and  validated users can only delete their own items)
- Like / Dislike system using MongoDB array operations
- Proper error handling (400, 401, 403, 404, 409. 500) with error messaging 
- Input validation using Celebrate/Joi
- MongoDB schema with validation rules (name, weather, imageUrl, owner, likes)
- Secure ownership checks on delete operations

Features Sprint 13
- Authentication, Authorization and Validation of users, prevent duplication of emails 
- Tokenization of Passwords 
- Time out on tokens


## Technologies Used

- **Node.js** + **NPM** - Developer mode and error processing
- **Express.js** - Web framework
- **MongoDB** + **Mongoose** - Database and ODM
- **Celebrate + Joi** - Request validation
- **ESLint** - Code linting highlighting certain errors
- **bcrypt and Salt** - Transforms passwords into a string of letters and numbers, with a salt (a randome value) to resist to brute force attacks. 
- **jsonwebtoken** -Tokenization of passwords for validation
-  **CORS** Resource Sharing

## Running the Project

From the terminal:

-Use `npm run start` — to launch the server

-Use `npm run dev` — to launch the server with the hot reload feature

-Use `npx eslint .` — for code error corrections

### Testing

Postman was used to test all functions for proper user communication of errors.
This is sprint 12 as docukemted in the "sprint.tx" file. GitHub was used to test all file endpoints.

Future Improvements
--Implimenting User authentication, authorization & validation with Project Completeion in Sprint 14 & 15.
--Advanced search and filtering by weather
