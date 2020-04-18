import React from "react";
import AuthService from "../../services/Auth";
import { Redirect, Route } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';

const authService = new AuthService();

export default ({ component: Component, hasPermissions, ...rest }) => {
    const previousRoute = useLastLocation();
    if (!authService.isAuthenticated()) {
        return <Redirect to="/login"/>
    }
     
    return (
        <Route {...rest} render={(props) => (
            (
                authService.isAuthenticated() == true &&
                authService.hasPermission(hasPermissions) == true
            )
                ? <Component {...props} />
                : <Redirect to={previousRoute}/>
        )} />
    )
}