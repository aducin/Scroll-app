# Scroll-app

Scroll-app is a demo app that uses infinite scroll functionality.

Project has been developed using React (React Hooks) and TypeScript.
Server-side data has been mocked using [`json-server`](https://www.npmjs.com/package/json-server) and `json-schema-faker`.

To run the project clone the repo locally and install project's dependencies using `npm install` command.
A default file with mocked data (`db.json`) has been attached to the project.
Alternatively it is possible to generate a different data using `json-schema-faker` (faker.json file includes a data schema):
https://json-schema-faker.js.org/

## setup

To enable `json-server` run:

    json-server --watch db.json --port 8000

Then open the app with `npm start` command.

----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
