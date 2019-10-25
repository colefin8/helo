import React from "react";
import "./App.css";
import routes from "./routes";
import Nav from "./Components/Nav/Nav";
import { withRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

function App(props) {
  console.log(props);
  return (
    <Provider store={store}>
      <div className="App">
        {props.location.pathname === "/" ? null : <Nav />}
        {routes}
      </div>
    </Provider>
  );
}

export default withRouter(App);
