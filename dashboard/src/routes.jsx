import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import WizardPage from './pages/WizardPage';
import UserPage from './pages/UserPage';
import SiteTemplate from './components/SiteTemplate';

const PrivateRoute = ({ component:Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <SiteTemplate>        
        <PrivateRoute path="/" component={Home} />
        <PrivateRoute path="/wizard" component={WizardPage} />
        <PrivateRoute path="/user" component={UserPage} />
      </SiteTemplate>
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;