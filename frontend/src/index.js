import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import './index.css';
import App from './App';
import Login from "./pages/Login";

ReactDOM.render(
  <Router>
    <LastLocationProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/home" hasPermissions={["ROLE_ADMIN"]} component={App} />
        <ProtectedRoute path="/home2" hasPermissions={["ROLE_USER"]} component={App} />
        <Redirect path="*" to="/login" />
      </Switch>
    </LastLocationProvider>
  </Router>,
  document.getElementById('root')
);
