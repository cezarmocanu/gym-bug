# Gymbug app

### Changes description

- created 2 folders(sub projects) one for frontend(client) and one for backend(api)
- you can start the project using the `app:install`, `client:dev`, `api:dev` commands. Take a look inside `package.json` to see how those commands are able to start the project


### Setup

To install all packages run

```
npm run app:install
```

To start client

```
npm run client:dev
```

> NOTE: Client requires a `.env` file inside the `client` folder with the API key:

```
VITE_API_KEY=...
```


To start api server

```
npm run api:dev
```

> NOTE: Client requires a `.env` file inside the `api` folder with the API key:

```
JWT_SECRET=...
```

### Solving issues
In the issues tab of the repo will be the bugs that were currently found in the app. In order to solve an issue you need to follow the next steps:
1. Select the issue you are interested into solving
2. Announce on the group that you will be taking that issue
3. Create a new branch from the latest `main` branch following this structure `bugfix/GB-issue-number-short-description` for example `bugfix/GB-2-missaligned-calorie-counter`
   NOTE: To make sure you have the latest `main` branch, do a `git pull` before starting to work on the new branch
4. After finishing the task create a PR towards main

### Stage 3 features
For stage 3 we need to implement a login system which will do requests to `https://torium-systems.com` api server. The API implemented on the server machine is the one available in the `api` folder inside the project. Don't hesitate to take a look inside and formulate questions based on the patterns you are seeing.

NOTE: In order to solve stage 3 feature, you will need to create a branch from `stage-3-before-fix` branch

Requirements:
- Create a new view called for the login page. Follow the naming convention from the other views in the project.
- Make sure the page route is `/login`
- For the login page, create two inputs, one for email and one for password, and a login button
- If the login fails, display and error message
- Once the button is pressed, send that request to the login endpoint(see below)
- Create a new state in the app that tracks if the current user is logged in or not. Using this state, after the app renders for the first time, make sure the user is redirected in the appropriate place:
  - If the user is not logged in navigate the user to the login page
  - If the user is logged in navigate him to the water tracking page

Note: The app should have a bug, as it will not keep the user authenticated, this will be an extra task/addressed in the next course, but take a look in case you have an ideea.

Endpoints:
The endpoint is available on `https://torium-systems.com`. Take into account that this endpoint requires some special properties, so don't forget about those.

-------
POST `/auth/login`
RETURN 200 In case the user is authenticated
RETURN 401 In case the email or password is incorect

Required headers:
```
Header 1:
key: 'Content-Type'
value: 'application/json'
```

Accepted body structure:
```
{
  email: string,
  password: string
}
```
-------

Hints:
- The endpoint handles a POST request, so in this case you will need to send data to it. In order to send data you will need to use the full implementation of the `fetch` function.
  ```
  fetch(url, method, headers, body)

  url - string, indicating the location of the endpoint
  method - the http method for the request
  headers - an object that contains special properties of the request(see the endpoint for requried headers)
  body - a serialized object, that contains the data you send to the backend

  In order to serialize an object you need to use:
  const myObject = {a: 10, b: 'abc'}
  const serializedObject = JSON.stringify(myObject);
  ```
- In order to get access to the accounts explore the api folder, and identify the accounts listed there. Have the feeling another colleague found them earlier, then ask.
- Think about security issues that might cause a problem in the current setup of the project
- Explore the api folder, and identify all the available endpoints, add those endpoints in the description of your PR. Indentify the request method, and give a short description of what you understand about the endpoint.
- Explore the api folder, and in the PR, give a short description of what you think  `controller`, `service` mean in the context of the backend

In case you feel that information is missing, ask, search and add. Edit the readme file in a separate branch and add the missing information.

