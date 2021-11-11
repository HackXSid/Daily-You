import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { loginFunc, logoutFunc } from './redux/actions/authentication.actions';
import { store, persistor } from './redux/stores';
import { Landing } from './screens/landing.screen';
import { DailyYouScreen } from './screens/daily_you.screen';

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const authReducer = useSelector(state => state.authenticationReducer);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutFunc());
  };

  const login = (user, token) => {
    dispatch(loginFunc(user, token));
  };

  if (authReducer.isAuthenticated) {
    return (
      <SafeAreaView>
        <DailyYouScreen logout={logout} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Landing login={login} />
      </SafeAreaView>
    );
  }
};
export default Main;
