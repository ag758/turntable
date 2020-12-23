import React from 'react';
import App from './App.js';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Topics from './constants/Topics.js';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const trackingId = process.env.REACT_APP_GA_KEY;
ReactGA.initialize(trackingId);

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});


class RouterLayer extends React.Component {

  render() {
    return (<Router history={history}>
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
