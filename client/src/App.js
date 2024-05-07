import "./App.css";
import "./assets/css/style.css";
import { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { ROUTES } from "./utils/routes";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {ROUTES.map((route, idx) => (
        <Route
          key={idx}
          exact
          {...route}
        />
      ))}
    </>
  );
}

export default App;
