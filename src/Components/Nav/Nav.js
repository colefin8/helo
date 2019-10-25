import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, clearUser } from "../../redux/reducer";
import axios from "axios";
import "./Nav.css";
import home from "./home.png";
import logout from "./logout.png";
import newPost from "./newPost.png";

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
      <nav>
        <div className="topNav">
          <div
            className="profileBorder"
            style={{ backgroundImage: `url(${this.props.profilePic})` }}
          ></div>
          <h3>{this.props.usersname}</h3>
          <Link to="/dashboard">
            <img className="navButton" alt="home" src={home} />
          </Link>
          <Link to="/new">
            <img className="navButton" alt="new post" src={newPost} />
          </Link>
        </div>
        <div>
          <Link to="/">
            <img
              className="navButton"
              alt="logout"
              src={logout}
              onClick={this.logout}
            />
          </Link>
        </div>
      </nav>
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
