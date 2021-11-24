import React, { useState } from "react";
import { render } from "react-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import { Provider } from "react-redux";
import { appStore } from "./slices/app-store";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import { Header } from "./components/organisms/Header";
import { MainContent } from "./pages/MainContent";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { hrefPrehashContains } from "./common/href-prehash-contains";
import { ThemeProvider } from "@material-ui/core/styles";

const queryClient = new QueryClient();

export const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Provider store={appStore}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <CssBaseline />
              <Header handleDrawerToggle={handleDrawerToggle} />
              <MainContent
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
              />
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
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

if (process.env.NODE_ENV === "development") {
  if (hrefPrehashContains("mock=1")) {
    const { worker } = require("./mocks/browser");
    worker.start();
  }
}

render(<App />, document.getElementById("root"));
