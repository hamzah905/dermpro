import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import './index.css';
import SignUp from './Components/Auth/SignUp'
import Login from './Components/Auth/Login'
import ForgetPassword from './Components/Auth/ForgetPassword'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

    <Router>
      <Switch>
          <Route path="/" exact>
            <App />
          </Route>
            <Route path="/patients/:patient_id" exact>
                <App />
            </Route>
            <Route path="/patients/:patient_id/reminder" exact>
                <App />
            </Route>
            <Route path="/patients" exact>
                <App />
            </Route>
            <Route path="/payment" exact>
                <App />
            </Route>
            <Route path="/query_spots/:query_spot_id/feedback" exact>
                <App />
            </Route>
            <Route path="/contact_us" exact>
                <App />
            </Route>
            <Route path="/users/:user_id/edit" exact>
                <App />
            </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/sign_up" exact>
            <SignUp />
          </Route>
          <Route path="/forget_password" exact>
            <ForgetPassword />
          </Route>
        </Switch>
    </Router>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
