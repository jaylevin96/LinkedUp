import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Posts from "./components/Posts";
import ProfileDetails from "./components/ProfileDetails";
import CreatePost from "./components/Posts/CreatePost";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/home">
            <Navigation isLoaded={isLoaded} />
            <CreatePost />
            <Posts />
          </Route>
          <Route path="/profile/:userId">
            <Navigation isLoaded={isLoaded} />
            <ProfileDetails />
          </Route>
          <LandingPage />
        </Switch>
      )}
    </>
  );
}

export default App;
