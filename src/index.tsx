import React, { useState } from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import { appStore } from "./slices/app-store";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import { Header } from "./components/organisms/Header";
import { MainContent } from "./pages/MainContent";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useTheme } from "@material-ui/core/styles";

import { hrefPrehashContains } from "./common/href-prehash-contains";
import { ThemeProvider } from "@material-ui/core/styles";

export const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Provider store={appStore}>
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
    </Provider>
  );
};

if (process.env.NODE_ENV === "development") {
  if (hrefPrehashContains("mock=1")) {
    const { worker } = require("./mocks/browser");
    worker.start();
  }
}

render(<App />, document.getElementById("root"));
