import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: "",
      content: ""
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addPost = () => {
    axios.post(`/api/post/`, { ...this.state }).then(() => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    return (
      <div>
        <h1>New Post</h1>
        <input
          placeholder="title"
          name="title"
          onChange={e => this.handleInput(e)}
        />
        <input
          placeholder="image url"
          name="image"
          onChange={e => this.handleInput(e)}
        />
        <input
          placeholder="content"
          type="textarea"
          name="content"
          onChange={e => this.handleInput(e)}
        />
        <img
          alt="preview"
          src={
            this.state.image
              ? this.state.image
              : "http://securitysolutionsdubai.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default-medium.jpg"
          }
        />
        <button onClick={() => this.addPost}>Post</button>
      </div>
    );
  }
}

export default Form;
