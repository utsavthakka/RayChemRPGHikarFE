import React from "react";
import "./App.css";
import "./containers/SendDocs/index.css";
import Header from "./components/Header/Header";
import AuthenticationRoutes from "./routes/AuthenticationRoutes";
import UnAuthenticationRoutes from "./routes/UnAuthenticationRoutes";
import { useSelector } from "react-redux";

function App() {
  const { email, token } = useSelector((state) => state.userState);
  return (
    <div className="App">
      {email && token ? (
        <>
          {" "}
          <Header />
          <AuthenticationRoutes />
        </>
      ) : (
        <UnAuthenticationRoutes />
      )}
    </div>
  );
}
export default App;
