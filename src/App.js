import React from "react";

import AuthComponent from "./components/login/LoginComponent";
import Project from "./pages/Project";
// import {useSession} from '@inrupt/solid-ui-react'
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { getAuthentication } from "./components/login/functions";
import { useEffect, useState } from "react";
import { propagate, sessionTrigger as t } from "./atoms";
import conf from "./util/config";
import { useRecoilState, useRecoilValue } from "recoil";
import Dashboard from "./util/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useNavigate, 
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { v4 } from "uuid";
import SdkDemo from "./pages/Documentation";
import DemoPage from "./pages/DemoPage";
import Enrichment from "./pages/Enrichment";
import GridTest from "./pages/GridTest";
import Exploded from "./pages/Exploded";
import creds from "../devCredentials";
import LayoutPage from "./pages/LayoutPage";
import { Store } from "n3";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import Gallerij from "./pages/Gallerij";

export const StoreContext = React.createContext(new Store());

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Passion One", "cursive"].join(","),
    },
  });

  const [trigger, setTrigger] = useRecoilState(t);
  const config = useRecoilValue(conf);
  const [update, setUpdate] = useRecoilState(propagate);

  const pages = [,

    { label: "HOME", path: "/", component: HomePage, props: {} },
    // { label: "experimental", path: "/", component: Project, props: { initialLayout: config } },
    { label: "DE BUNKER", path: "/enrichment", component: GridTest, props: {} },
    { label: "GALLERIJ", path: "/gallerij", component: Gallerij, props: {} },

  
  ];

  useEffect(() => {
    getAuthentication()
      .then(() => {
        setUpdate(v4());
      })
      .catch((error) => {
        console.log("error", error);
        // window.location = window.location.pathname
      });
  }, [trigger]);

  return (
    <ThemeProvider theme={theme}>
      <div id={update}>
        <StoreContext.Provider value={new Store()}>
          <Header pages={pages} />
          <Routes>
            {pages.map((page) => {
              const Element = page.component;
              return (
                <Route
                  key={page.label}
                  exact
                  path={page.path}
                  element={<Element {...page.props} />}
                />
              );
            })}
          </Routes>
          <Footer />
          {/* <AuthComponent/>
      <Child/> */}
        </StoreContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
