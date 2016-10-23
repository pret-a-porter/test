import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Flights from 'containers/Flights';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Flights} />
  </Route>
)
