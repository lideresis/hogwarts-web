import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SiteTemplate from './components/SiteTemplate';

import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import WizardPage from './pages/WizardPage';

const App = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(true);
    return (
      <>
        <BrowserRouter>
        {isLoggedIn ? (
          <SiteTemplate>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Home />}
              />
              <Route
                exact
                path="/wizard"
                render={(props) => <WizardPage />}
              />
            </Switch>
          </SiteTemplate>
        ) : (
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => <LoginPage />}
            />
          </Switch>
        )}
        </BrowserRouter>
        <GlobalStyles />
      </>
    )
}

export default App;
