const userFake = require("../fakeDatas/User");
const CONSTANTES = require("../config/Constantes");

module.exports = {

    authenticate(credentials) {
        if (!credentials.email || !credentials.password) {
            throw new Error("Is necessary informate email and password!");
        }

        if (credentials.email != userFake.email || credentials.password != userFake.password) {
            throw new Error("The credentials invalid!");
        }

        return userFake;
    },

    hasPermission(permissionsNecessary = [], permissionsUser) {
        if (typeof permissionsNecessary == "string") {
            permissionsNecessary = [ permissionsNecessary ];
        }

        const valueIndicatorNotFoundValueInArray = -1;
        const permissionsHasUser = permissionsNecessary
            .filter(permissionNecessary => permissionsUser.indexOf(permissionNecessary) > valueIndicatorNotFoundValueInArray);
            
        const isHasAccessResource = permissionsNecessary.length == permissionsHasUser.length;

        return isHasAccessResource;
    }
}