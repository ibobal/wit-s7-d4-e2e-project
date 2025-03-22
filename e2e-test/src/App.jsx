import Success from "./components/Success";

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
      <LocationDisplay />
    </>
  );
}

export default App;
