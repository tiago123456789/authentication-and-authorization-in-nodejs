import React, { Component } from "react";
import "../assets/css/login.css";
import CONSTANTS from "../constants/App";
import AuthService from "../services/Auth";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "", password: ""
        }
        this.changeValueInput = this.changeValueInput.bind(this);
        this.submit = this.submit.bind(this);
        this._authService = new AuthService();
    }

    changeValueInput(key, value) {
        this.setState({ [key]: value });
    }

    async submit(event) {
        event.preventDefault();
        const datas = await this._authService
            .authenticate({
                email: this.state.email,
                password: this.state.password
            });
        localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, datas.accessToken);
        this.props.history.push("/home");
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent" style={{ 'padding': "10px"}}>
                    <div className="fadeIn first" style={{ "margin-top": "15px" }}>
                       <h3>Login</h3>
                    </div>

                    <form>
                        <input type="text" id="login"
                            className="fadeIn second" name="login"
                            placeholder="login" value={this.state.email}
                            onChange={event => this.changeValueInput("email", event.target.value)}
                        />
                        <input type="password" id="password"
                            className="fadeIn third" name="login"
                            placeholder="password" value={this.state.password}
                            onChange={event => this.changeValueInput("password", event.target.value)}
                        />
                        <input type="submit" className="fadeIn fourth" value="Log In"
                            onClick={this.submit} />
                            <br/>
                    </form>

                </div>
            </div>
        )
    }
}
export default Login;
