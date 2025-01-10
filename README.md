# A fitness dashboard built with Recharts

## Running the app

### Step 1: Start the API

From the root directory of the project, navigate to the `api` folder:

```bash
$ cd api
```

Then start the server:

```bash
$ npm start 
```

The API will be served at port `3000`.

### Step 2: Start the app

In a new terminal window, from the root directory of the project, start the front-end app:

```bash
$ npm start
```

The front-end will run at port `3001`. The port number is configurable in the `.env` file.

## Fetching data

### Choosing a data source

We can choose to get data:
* from the API we span up in the previous section, or
* from a static file mocking the API data

We can switch between these two sources by setting the value of the `REACT_APP_DATA_SOURCE` environment variable in the `.env` file located in the project's root directory. Set the variable to `API` to fetch from the API or to `MOCK` to fetch from the mock source.

**_IMPORTANT: The front-end must be restarted in order for the changes to take effect._**

For convenience, the dashboard displays a small toast in the bottom right corner that indicates where the data is served from.