import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";
import "./Auth.css";
import index from "./index.png";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUser = () => {
    axios
      .post("/auth/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        const { username, profile_pic } = res.data;
        updateUser(username, profile_pic);
        this.props.history.push("/dashboard");
      })
      .catch(err => console.log(`front end error: ${err}`));
  };

  loginUser = () => {
    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        const { username, profile_pic } = res.data;
        updateUser(username, profile_pic);
        this.props.history.push("/dashboard");
      })
      .catch(err => console.log(`front end error: ${err}`));
  };

  render() {
    // console.log(this.props);
    return (
      <div className="authBox">
        <div className="inputBox">
          <img src={index} />
          <h1 id="authHeader">Helo</h1>
          <div className="authInput">
            <span className="authInputText">Username:</span>
            <input
              name="username"
              value={this.state.username}
              onChange={e => this.handleInput(e)}
            />
          </div>
          <div className="authInput">
            <span className="authInputText">Password:</span>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={e => this.handleInput(e)}
            />
          </div>
          <div className="buttonBox">
            <button className="button" onClick={this.loginUser}>
              Login
            </button>
            <button className="button" onClick={this.registerUser}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(Auth);
