import React from "react";
import { Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { HomeWithRouter } from "./HomePage";
import { GagWithRouter } from "./GagPage";
import { NotFoundPage } from "./NotFoundPage";

type MainContentProps = any;

export const MainContent = (props: MainContentProps) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container className={classes.contentContainer}>
        <Switch>
          <Route exact path="/gag/:id">
            <GagWithRouter />
          </Route>
          <Route exact path="/">
            <HomeWithRouter />
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
    </main>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    containerLayout: {
      maxWidth: 800,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    contentContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(5),
      flexDirection: "column",
    },
  };
});
