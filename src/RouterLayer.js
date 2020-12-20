import React from 'react';
import App from './App.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Topics from './constants/Topics.js';


class RouterLayer extends React.Component {

  render() {
    return (<Router>
      <div>
        <Switch>
          <Route exact path="/" key={-1}>
            <Redirect to={`/${Topics[0]}`} />
          </Route>
          {Topics.map((topic, idx) => {
            return (<Route path={`/${topic}`} key={idx}>
              <App topic={topic}></App>
            </Route>)
          })}
        </Switch>
      </div>
    </Router>)
  }
}

export default RouterLayer;
