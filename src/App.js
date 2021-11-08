import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import { selectSubscriptionStatus } from './features/subscriptionStatus';

function App() {
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscriptionStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {                                      //listens for user login persistence
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    // return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
        <Switch>
          <Route exact path="/profile">
              <ProfileScreen />
            </Route>
            <Route exact path="/">
              {subscription ? <HomeScreen /> : <Redirect to="/profile" /> }
            </Route>
            
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
