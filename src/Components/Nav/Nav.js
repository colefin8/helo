import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends Component {
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
          <button>Logout</button>
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

export default connect(mapStateToProps)(Nav);
