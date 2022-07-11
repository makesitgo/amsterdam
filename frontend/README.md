# Amsterdam Billiards League Site

Can be found at: https://makesitgo.github.io/amsterdam

Currently, registration is not supported so log in as "Guest" though there's no promises data access rights don't change in the future and prevent anonymous authentication from working.

## Development

### Local

To develop locally, you'll need:

* Atlas App Services running locally at http://localhost:8080
* a local MongoDB instance running with the `amsterdam` database cloned
* an Atlas App Services app created with a data source (and rules) configured to connect to a local instance of the `amsterdam` database

To get set up, reach out to nick@makes.life for any help (you'll need it, this repo alone is not sufficient to get started).

After that, simply run:

```cmd
yarn run start
```

### Production

Once the site is ready to be deployed, simply run:

```cmd
yarn run deploy
```

Everything else is configured to talk to the Production version of the Atlas App Service app configured to connect to the `amsterdam` database's live instance

---

> NOTE: the below was auto-generated by create-react-app, any site specific knowledge can be found above here

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).