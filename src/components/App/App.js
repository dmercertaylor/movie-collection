import React, {useEffect} from 'react';
import { Switch, HashRouter as Router, Route, Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import AddEntryPage from '../Pages/AddEntryPage';
import ManageGenresPage from '../Pages/ManageGenresPage';

let A = 1;
let B = 2;

export default function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Movie Database</h1>
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/" render={
            () => <Redirect to="/addEntry" />
          } />
          <Route path="/addEntry">
            <AddEntryPage />
          </Route>
          <Route path="/manageGenres">
            <ManageGenresPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
