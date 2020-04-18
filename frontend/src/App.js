import React from 'react';
import logo from './logo.svg';
import './App.css';
import AccessControl from './components/auth/AccessControl';
import AuthService from "./services/Auth";

const authService = new AuthService();

function App(props) {
  const logout = () => {
    authService.logout();
    props.history.push("/login");
  }

  return (
    <AccessControl hasPermissions={["ROLE_ADMIN"]} >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            If accessed this page mean than you have permission
        </p>
        <button onClick={logout}>Logout</button>
        </header>
      </div>
    </AccessControl>
  );
}

export default App;
