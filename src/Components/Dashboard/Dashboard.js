import React, { Component } from "react";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      myPosts: true,
      posts: []
    };
  }

  handleInput = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = e => {
    console.log(e.target);
    if (e.target.value) {
      this.setState({ myPosts: !this.state.myPosts });
      console.log(this.state.myPosts);
    }
  };

  mapper = () => {
    const mapped = this.state.posts.map((e, i) => {
      return (
        <div>
          <h2>{e.title}</h2>
          <h3>{e.username}</h3>
          <img alt="profile" src={e.img} />
        </div>
      );
    });
    return mapped;
  };

  render() {
    return (
      <div>
        <div>
          <input
            name="searchInput"
            value={this.state.searchInput}
            onChange={e => this.handleInput(e)}
          />
          <button>Search</button>
          <button>Reset</button>
          <input
            type="checkbox"
            id="myPosts"
            name="myPosts"
            value="literally anything"
            checked={this.state.myPosts}
            onChange={e => this.handleToggle(e)}
          />
          <label htmlFor="myPosts">My Posts</label>
        </div>
        <div>{this.mapper()}</div>
      </div>
    );
  }
}

export default Dashboard;
