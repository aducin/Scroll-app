import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import './App.css';

import List from './components/List';
import Details from './components/Details';

const increment = 10;

const App = () => {
  const [limit, setLimit] = useState<number>(increment);
  const [posY, setPosY] = useState<number>(0);
  
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
