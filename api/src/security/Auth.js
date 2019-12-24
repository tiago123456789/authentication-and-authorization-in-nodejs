const userFake = require("../fakeDatas/User");
const token = require("./Token");
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
        const permissionsHasUser = permissionsNecessary
            .filter(permissionNecessary => permissionsUser.indexOf(permissionNecessary) > -1);
            
        const isHasAccessResource = permissionsNecessary.length == permissionsHasUser.length;

        return isHasAccessResource;
    }
}