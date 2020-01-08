import React, {useCallback, useEffect, useState } from 'react';
import { Switch, HashRouter as Router, Route, Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import NavBar from '../NavBar/NavBar';
import AddEntryPage from '../Pages/AddEntryPage';
import ManageGenresPage from '../Pages/ManageGenresPage';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles({
  header: {
    textAlign: 'center'
  }
})

export default function App() {

  // This setTheme to 'light' or 'dark'
  const [theme, setTheme] = useState({
    palette: {
      type: 'dark'
    }
  });

  const classes = useStyles();
  const muiTheme = createMuiTheme(theme);
  const dispatch = useCallback(useDispatch(), []);

  // Get genre when app first renders.
  useEffect(() => {
    dispatch({type: 'GET_GENRES'});
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <header className={classes.header}>
          <Typography variant='h2' component='h1'>
            Movie Database
          </Typography>
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
    </MuiThemeProvider>
  );
}
