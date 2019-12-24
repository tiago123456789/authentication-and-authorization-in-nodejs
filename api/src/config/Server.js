const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routesApp = require("./../routes");
require("./LoaderEnvironmentVariable");


// Setting middleware make parse datas to json.
app.use(bodyParser.json());

// Set routes applications.
routesApp(app);

module.exports = app;