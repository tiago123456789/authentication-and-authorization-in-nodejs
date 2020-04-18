const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routesApp = require("./../routes");
require("./LoaderEnvironmentVariable");


// Setting middleware make parse datas to json.
app.use(bodyParser.json());

// Setting middleware enable cors on application.
app.use(cors());

// Set routes applications.
routesApp(app);

module.exports = app;