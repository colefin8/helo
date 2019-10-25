import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, clearUser } from "../../redux/reducer";
import axios from "axios";

class Nav extends Component {
  componentDidMount() {
    this.getMe();
  }

  getMe = () => {
    axios.get("/auth/me").then(res => {
      const { username, profile_pic } = res.data;
      console.log(username, profile_pic);
      this.props.updateUser(username, profile_pic);
    });
    //correctly receiving the user, path is res.data.username, res.data.profilepic
  };

  logout = () => {
    axios.post("/auth/logout").then(() => {
      clearUser();
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <img alt="profile" src={this.props.profilePic} />
        <h3>{this.props.usersname}</h3>
        <Link to="/dashboard">
          <button>Home</button>
        </Link>
        <Link to="/new">
          <button>New Post</button>
        </Link>
        <Link to="/">
          <button onClick={this.logout}>Logout</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { username, profilePic } = reduxState;
  return {
    username,
    profilePic
  };
};

export default connect(
  mapStateToProps,
  { updateUser, clearUser }
)(Nav);
