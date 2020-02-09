import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import './App.css';

import { increment } from './constants/constants';
import List from './components/List';
import Details from './components/Details';

const App = () => {
  const [limit, setLimit] = useState(increment);
  const [posY, setPosY] = useState(0);
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/offers"
            render={(props) => <List
              {...props}
              increment={increment}
              limit={limit}
              posY={posY}
              setLimit={setLimit}
              setPosY={setPosY}
            />}
          />
          <Route exact path="/offers/:id" render={(props) => <Details {...props} />} />
          <Redirect from="/" to="/offers" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
