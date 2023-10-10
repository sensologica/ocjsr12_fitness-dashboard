# ocjsr_p12

## Project Setup
### Setting up the backend API
- Installed Node v12.18.4 using `nvm` version 0.39.4
- Installed project dependencies with `npm install`. The installation instructions asked to install with `yarn` but I wanted to try `npm`. Seems to be working.
- The backend of the app is an Express.js server that was written by the course creators and provided in a GitHub repository that I cloned. This server is running in the Node.js environment that is locally installed on my computer.

### How to set up the frontend

#### Create a React app with Create React App

```bash
$ npx create-react-app sportsee
```

When I did this, after the install I moved the files from the newly created `sportsee` folder into the root directory of the project (for easier project navigation in Visual Studio Code's sidebar), and accepted Visual Studio Code’s offer to update node module imports (I am not sure where these imports take place, so I let VS Code deal with it).

#### Install React Router

[React Router](https://reactrouter.com/)

```bash
$ npm install react-router-dom
```

This project only requires us to build one page — the dashboard, so I am not sure we will be needing React Router.

#### Install Recharts

[Recharts](https://recharts.org/) is a library or React components for visualizing data with various types of graphs. We will be using it for building dashboard widgets.

```bash
$ npm install recharts
```

## Fetching data from the API

The API provides several endpoints. Each endpoint serves different types of data:

* `http://localhost:3000/user/${userId}`
* `http://localhost:3000/user/${userId}/activity`
* `http://localhost:3000/user/${userId}/average-sessions`
* `http://localhost:3000/user/${userId}/performance`

Data from all 4 endpoints is needed to populate the dashboard widgets. The widgets of the dashboard are listed below:

*   WidgetDailyActivity
*   WidgetAverageSessions
*   WidgetPerformance
*   WidgetDailyScore
*   WidgetNutritionCard

I've decided to fetch the data in the parent `Dashboard` component and then pass it down to the `Widgets`.

There are several ways to fetch the data from the endpoints, each with its own pros and cons, so we need to measure our goals against the tradeoffs. 

### Option A: Each widget component fetches its own data and then renders it as soon as it’s available

- PRO. Progressive enhancement. Because we fetch data per endpoint/widget, some widgets will be populated with their data quicker than if we were to wait for data for all widgets at once. This means that users get access to some of their data, even while other data is loading. This is a plus for user experience.
- PRO. Per-widget loading and error states vs for the entire dashboard at once. This relates to better UX. If, for some reason, fetching from one of the endpoints fails, users may still have access to some data. The alternative of fetching all data at once would mean that users would have access to none of their data, in case fetching from any of the endpoints fails.
- CON. Might go against the requirement of the brief to avoid fetching data from within components. It’s a vague requirement and we don’t know whether the brief considers useEffect as fetching data from within a component or not.

Each Widget component manages its own state.

If the state of one Widget component changes (for example if new data becomes available), only the instances of that Widget will need to re-render. This is not really relevant in our case because our data doesn’t change.

### Option B: Data for all Widgets is fetched at the Dashboard component level, then passed to individual Widget components for rendering

All Widgets share the same state.

If the state of one Widget component changes (for example if new data becomes available), all instances of that Widget will need to re-render. This is not really relevant in our case because our data doesn’t change. And even if it was our case, React is smart about updating the DOM so, theoretically, it would only update the parts of the UI that really changed. I don’t know the performance tradeoffs between Option A and Option B, so I am just guessing what’s best, not using facts.