const Auth = require("./../security/Auth");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

module.exports = (app) => {

    app.get("/home", AuthMiddleware.hasPermission([]), (request, response) => {
        return response.render("home"); 
    });

    app.get("/auth/login", (request, response) => {
        const error = request.query.error || null;
        return response.render("login", { error }); 
    });

    app.get("/auth/logout", (request, response) => {
        request.session.destroy();
        response.redirect(`/auth/login`);
    })
    
    app.post("/auth/login", async (request, response) => {
        try {
            const credentials = request.body;
            const user = Auth.authenticate(credentials);
            request.session.user = { username: user.username, roles: user.roles };
            response.redirect(`/home`);
        } catch (error) {
            response.redirect(`/auth/login?error=${error.message}`);
        }
    });

}