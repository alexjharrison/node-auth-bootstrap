import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="container">
        <Router className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
