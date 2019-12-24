const auth = require("../security/Auth");
const token = require("../security/Token");
const CONSTANTES = require("../config/Constantes");

module.exports = {

    hasPermission(permissionsNecessary = []) {
        return async (request, response, next) => {
            try {
                let accessToken = request.headers[CONSTANTES.HEADER_PARAM_AUTHORIZATION];

                if (!accessToken)  {
                    return response.status(401)
                    .json({ msg: "Is necessary informate token in header request!" });
                }
    
                accessToken = accessToken.replace(CONSTANTES.HEADER_PREFIX_TOKEN_PARAM, "");

                await token.isValid(accessToken);
                const roles = await token.getValueInPayload("roles", accessToken);
                const isHasAccessResource = auth.hasPermission(permissionsNecessary, roles);

                if (!isHasAccessResource) {
                    return response.status(403)
                    .json({ msg: "You don't access to the resources!" });
                }

                next();
            } catch(error) {
                return response.status(401)
                .json({ msg: "Token informated is invalid!" });
            }
        }
    }
}