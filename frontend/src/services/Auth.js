import TokenUtil from "../util/Token";
import CONSTANTS from "../constants/App";
import axios from "axios";

class Auth {

    constructor() {
        this._tokenUtil = new TokenUtil();
    }

    logout() {
       localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    }

    authenticate(credenciais) {
        return axios
                    .post(`${CONSTANTS.API_URL}/auth/login`, credenciais)
                    .then(({ data }) => data);
    }

    isAuthenticated() {
        const accessToken = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        return accessToken != null;
    }

    hasPermission(permissionsNeed) {
        const userPermissions = this._getUserPermissions();
        const permissions = permissionsNeed;
        const quantityPermissionNeed = permissions.length;
        const isHasPermissionNeed = permissions
            .filter(permission => {
                const isHasPermission = userPermissions.indexOf(permission) > -1;
                return isHasPermission;
            })
            .length == quantityPermissionNeed;
        return isHasPermissionNeed;
    }

    _getUserPermissions() {
        const accessToken = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        return this._tokenUtil.getValueInPayloadByKey(
            CONSTANTS.TOKEN_KEYS.RULES, accessToken
        );
    }
}

export default Auth;