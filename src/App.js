import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from './pages/Main'

function App() {
    
  return (
    <>
    <Switch>
      <Route path="/" exact component={Main}/>
    </Switch>
    </>
  );
}

export default App;
