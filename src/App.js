import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// ** redux configration
import { Provider } from 'react-redux';
import { store } from './redux/storeConfig/store';
import * as _redux from './redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

import AppLayout from './layouts/AppLayout';

const LandingPage = React.lazy(() =>
  import(/* webpackChunkName: "landing" */ "./pages/landing")
);

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "homepage" */ "./pages/home")
);

const Collection = React.lazy(() =>
  import(/* webpackChunkName: "collection" */ "./pages/collection")
);

const MyGFT = React.lazy(() =>
  import(/* webpackChunkName: "mygft" */ "./pages/mygft")
);

const Welcome = React.lazy(() =>
  import(/* webpackChunkName: "mint" */ "./pages/welcome")
);

const MoonpayResult = React.lazy(() =>
  import(/* webpackChunkName: "faq" */ "./pages/moonpayresult")
);

const ReceiveGFT = React.lazy(() =>
  import(/* webpackChunkName: "error" */ "./pages/receivegft")
);

// ** Setup Axios
_redux.setupAxios(axios, store)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Suspense fallback={<div className="loading" />}>
          <Router>
            <AppLayout>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={(props) => <LandingPage {...props} />}
                />
                <Route
                  path="/testdemo"
                  exact
                  render={(props) => <HomePage {...props} />}
                />
                <Route
                  path="/holiday_edition"
                  exact
                  render={(props) => <Collection {...props} />}
                />
                <Route
                  path="/confirm/:code"
                  render={(props) => <Welcome {...props} />}
                />
                <Route
                  path="/mygft"
                  exact
                  render={(props) => <MyGFT {...props} />}
                />
                <Route
                  path="/moonpayresult/:id"
                  exact
                  render={(props) => <MoonpayResult {...props} />}
                />
                <Route
                  path="/receive-gft/:id"
                  exact
                  render={(props) => <ReceiveGFT {...props} />}
                />
                <Route
                  path="/resetpassword"
                  exact
                  render={(props) => <HomePage {...props} />}
                />
                {/* <Redirect to="/error" /> */}
              </Switch>
            </AppLayout>
          </Router>
          <ToastContainer />
        </Suspense>
      </Provider>
    );
  }
}

export default App;
