import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      myPosts: true,
      posts: []
    };
  }

  componentDidMount = () => {
    this.search();
  };

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

  search = () => {
    axios
      .get(
        this.state.searchInput
          ? `/api/posts/?userposts=${this.state.myPosts}&search=${this.state.searchInput}`
          : `/api/posts/?userposts=${this.state.myPosts}`
      )
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  reset = () => {
    axios
      .get(`/api/posts/?userposts=${this.state.myPosts}`)
      .then(res => {
        this.setState({ posts: res.data, searchInput: "" });
      })
      .catch(err => console.log(err));
  };

  render() {
    const mapped = this.state.posts.map((e, i) => {
      return (
        <Link to={`/post/${e.id}`}>
          <div key={`post#:${i}`}>
            <h2>{e.title}</h2>
            <h3>{e.username}</h3>
            <img alt="profile" src={e.img} />
          </div>
        </Link>
      );
    });
    return (
      <div>
        <div>
          <input
            name="searchInput"
            value={this.state.searchInput}
            onChange={e => this.handleInput(e)}
          />
          <button onClick={this.search}>Search</button>
          <button onClick={this.reset}>Reset</button>
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
        <div>{mapped}</div>
      </div>
    );
  }
}

export default Dashboard;
