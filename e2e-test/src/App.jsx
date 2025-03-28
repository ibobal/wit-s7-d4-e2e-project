import { Switch, Route } from "react-router-dom";

import Success from "./components/Success";
import Login from "./components/Login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="content-section">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/error">
            <h1>Error Page Placeholder</h1>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
