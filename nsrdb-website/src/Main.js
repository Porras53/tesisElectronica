import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Docs from "./Documentacion";
import Prediction from "./Prediction";
import MainToolbar from "./components/mainToolbar";

function Main() {
  return (
    <div>
      <Router>
        <MainToolbar />
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/docs">
            <Docs />
          </Route>
          <Route path="/prediction">
            <Prediction />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Main;
