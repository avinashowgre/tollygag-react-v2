import React, { useState } from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import { appStore } from "./slices/app-store";

import { HashRouter } from "react-router-dom";

import "./index.css";

import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { LeftDrawer } from "./components/LeftDrawer";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

export const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Provider store={appStore}>
        <HashRouter>
          <CssBaseline />
          <Header handleDrawerToggle={handleDrawerToggle} />
          <LeftDrawer
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />
          <MainContent />
        </HashRouter>
      </Provider>
    </div>
  );
};

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
    },
  };
});

render(<App />, document.getElementById("root"));
