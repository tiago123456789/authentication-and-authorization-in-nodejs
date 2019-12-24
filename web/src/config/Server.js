const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const routesApp = require("./../routes");
const auth = require("../security/Auth");
require("./LoaderEnvironmentVariable");

// Set template engine and directory views.
app.set("view engine", "ejs");

// Set directory assets.
app.use(express.static(path.join(__dirname, "/../../public")));

// Setting middleware make parse form datas to json.
app.use(bodyParser.urlencoded({ extended: true }));

// Set middleware work session in application.  
app.use(session({
    name: 'app.sid',
    secret: process.env.SECRET_COOKIE,
    resave: true,
}));

// Set middleware make variable accessibles in all aplication.
app.use((request, response, next) => {
    const isUserAuthenticated = request.session.user || false;
    if (isUserAuthenticated) {
        app.locals.user = request.session.user;
        app.locals.hasPermission = (permissionNecessary) => {
            return auth.hasPermission(permissionNecessary, request.session.user.roles);
        }
    }
    next();
});

// Set routes applications.
routesApp(app);

module.exports = app;