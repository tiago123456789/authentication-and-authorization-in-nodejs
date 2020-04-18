import React from "react";
import AuthService from "../../services/Auth";
import TokenUtil from "../../util/Token";
import CONSTANTS from "../../constants/App";

const tokenUtil = new TokenUtil();
const authService = new AuthService();

export default (props) => {
    const isHasPermissionNeed = authService.hasPermission(props.hasPermissions)

    if (isHasPermissionNeed) {
        return props.children;
    }

    return false;
}