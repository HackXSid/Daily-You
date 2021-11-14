import "./App.css";
import { Login } from "./Login";
import { Home } from "./Home";
import { store, persistor } from "./redux/stores";
import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { loginFunc, logoutFunc } from "./redux/actions/authentication.actions";

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

function App() {
  const authReducer = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutFunc());
  };

  const login = (user, token) => {
    dispatch(loginFunc(user, token));
  };

  if (authReducer.isAuthenticated) {
    return <Home logout={logout} />;
  } else {
    return <Login login={login} />;
  }
}

export default Main;
