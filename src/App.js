import React from "react";
import { useQuery, gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";

const GET_USER = gql`
  query GET_USER {
    me {
      id
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data.me);

  return (
    <Router>
      <div className="App">
        <h2>Auth example</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
