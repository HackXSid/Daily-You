import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Landing } from './screens/landing.screen';

const DEFAULT_STATE = {
  user: null,
};

const App = () => {
  const [authInfo, setAuthInfo] = useState(DEFAULT_STATE);

  const logout = () => {
    setAuthInfo(DEFAULT_STATE);
  };

  const login = user => {
    setAuthInfo({ ...authInfo, user });
  };

  if (authInfo.user) {
    // Logged In
  } else {
    return (
      <SafeAreaView>
        <Landing login={login} />
      </SafeAreaView>
    );
  }
};
export default App;
