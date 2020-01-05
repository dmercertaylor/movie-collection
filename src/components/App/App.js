import React, {useCallback, useEffect} from 'react';
import { Switch, HashRouter as Router, Route, Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import NavBar from '../NavBar/NavBar';
import AddEntryPage from '../Pages/AddEntryPage';
import ManageGenresPage from '../Pages/ManageGenresPage';

export default function App() {

  const dispatch = useCallback(useDispatch(), []);

  useEffect(() => {
    dispatch({type: 'GET_GENRES'});
  }, [dispatch]);

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
