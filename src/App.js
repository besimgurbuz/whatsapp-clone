import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ): (
      <div className="app_body">
        <Router>
          <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <h2>Welcome to the app</h2>
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
