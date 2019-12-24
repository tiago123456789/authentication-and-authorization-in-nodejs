const auth = require("../security/Auth");
const CONSTANTES = require("../config/Constantes");

module.exports = {

    hasPermission(permissionsNecessary = []) {
        return (request, response, next) => {
            const user = request.session.user || null;

            if (!user) {
                return response.redirect("/auth/login?error=Necessary is authenticated!");
            }

            const isHasAccessResource = auth.hasPermission(permissionsNecessary, user.roles);

            if (!isHasAccessResource) {
                return response.redirect(`/auth/login?error=You don't access to the resources!`);
            }

            next();
        }
    }
}