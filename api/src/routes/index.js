const token = require("./../security/Token");
const Auth = require("./../security/Auth");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

module.exports = (app) => {

    app.post("/auth/login", async (request, response) => {
        try {
            const credentials = request.body;
            const user = Auth.authenticate(credentials);
            const accessToken = await token.build({ username: user.username, roles: user.roles });
            response.json({ accessToken });
        } catch (error) {
            response.status(400).json({ msg: error.message });
        }
    });

    app.get("/admins",
        AuthMiddleware.hasPermission(["ROLE_ADMIN"]),
        (resquest, response) => response.json({ "msg": "Access resources admin!" }));

    app.get("/super-admins",
        AuthMiddleware.hasPermission(["ROLE_SUPER_ADMIN"]),
        (resquest, response) => response.json({ "msg": "Access resources super admin!" }));
}