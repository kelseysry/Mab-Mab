import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SingleBusinessPage from "./components/SingleBusinessPage";
import AllBusiness from "./components/AllBusiness";
import CreateBusinessForm from "./components/CreateBusiness";
import EditBusinessForm from "./components/EditBusinessForm";
// import OneBusinessTile from "./components/OneBusinessTile";
import EditOneReview from "./components/EditOneReview";
import HitError from "./components/HitError";

import { useSelector } from "react-redux";


import HomePage from "./components/HomePage";
import pictures from '../src/data/pictures'

// import Maps from "./components/Maps/Maps";
import MapContainer from "./components/Maps/index.js";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  // const userId = sessionUser.id

  // console.log("sessionUser in app", sessionUser)

  // isLoaded - don't want to render routes unless user logged in

  // use restore user thunk action after App component's first render
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);




  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage pictures={pictures}/>
            {/* <AllBusiness /> */}
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          {/* {sessionUser && */}
          <Route exact path='/business/:businessId'>
            <SingleBusinessPage />
          </Route>
           {/* } */}

          {/* {sessionUser && */}
          <Route exact path='/business'>
            {/* <CreateBusinessForm /> */}
            <AllBusiness />
          </Route>
          {/* } */}
          {sessionUser &&
          <Route path='/createBusiness'>
            <CreateBusinessForm />
          </Route>
          }
          {sessionUser &&
          <Route exact path='/business/:businessId/reviews/:reviewId'>
            <EditOneReview />
          </Route>
          }
          <Route>
            <HitError />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
