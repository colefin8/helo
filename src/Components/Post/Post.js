import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img: "",
      content: "",
      username: "",
      profilePic: ""
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    console.log(this.props.match);
    axios.get(`/api/post/${this.props.match.params.postid}`).then(res => {
      const { title, img, content, username, profile_pic } = res.data;
      this.setState({ title, img, content, username, profilePic: profile_pic });
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.title}</h1>
          <img alt="post" src={this.state.img} />
        </div>
        <div>
          <div>
            <p>{`by ${this.state.username}`}</p>
            <img alt="user" src={this.state.profilePic} />
          </div>
          <p>{this.state.content}</p>
        </div>
      </div>
    );
  }
}

export default Post;
