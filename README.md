# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

A perfect description is “This is a backend API — a little request-handling machine.
When someone makes a request, it travels through routes (which decide where it should go), then the controllers do the actual work using the models (which talk to the database), and finally it sends back the response.”

When in the midst of the building process, it does not "feel" that one is accomplishing this, but once complete the delivery system is in place.

Features:

- Full CRUD operations for clothing items
- User ownership validation (users can only delete their own items)
- Like / Dislike system using MongoDB array operations
- Proper error handling (400, 403, 404, 500)
- Input validation using Celebrate/Joi
- MongoDB schema with validation rules (name, weather, imageUrl, owner, likes)
- Secure ownership checks on delete operations

Technologies Used

- **Node.js** + **NPM**
- **Express.js** - Web framework
- **MongoDB** + **Mongoose** - Database and ODM
- **Celebrate + Joi** - Request validation
- **ESLint** - Code linting

## Running the Project

From the terminal:
`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Postman was used to test all functions for proper user communication of errors.
This is sprint 12 as docukemted in the "sprint.tx" file.

Future Improvements
--User authentication & authorization
--Advanced search and filtering by weather
