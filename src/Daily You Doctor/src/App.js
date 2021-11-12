import "./App.css";
import { Login } from "./Login";
import { Home } from "./Home";
import { useState } from "react";

function App() {
  const [authInfo, setAuthInfo] = useState({
    isAuthorized: false,
    user: null,
    token: "",
  });

  if (authInfo.isAuthorized) {
    return (
      <Home
        logout={() =>
          setAuthInfo({
            isAuthorized: false,
            user: null,
            token: "",
          })
        }
      />
    );
  } else {
    return (
      <Login
        login={(user, token) => {
          setAuthInfo({
            ...authInfo,
            user,
            token,
            isAuthorized: true,
          });
        }}
      />
    );
  }
}

export default App;
