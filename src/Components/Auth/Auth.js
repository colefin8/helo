import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";

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
        const { id, username, profile_pic } = res.data;
        updateUser(id, username, profile_pic);
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
        const { id, username, profile_pic } = res.data;
        updateUser(id, username, profile_pic);
        this.props.history.push("/dashboard");
      })
      .catch(err => console.log(`front end error: ${err}`));
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <input
          name="username"
          value={this.state.username}
          onChange={e => this.handleInput(e)}
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={e => this.handleInput(e)}
        />
        <button onClick={this.loginUser}>Login</button>
        <button onClick={this.registerUser}>Register</button>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(Auth);
