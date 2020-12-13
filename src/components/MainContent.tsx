import React from "react";
import { Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { HomeWithRouter } from "./HomePage";
import { GagWithRouter } from "./GagPage";
import { NotFoundPage } from "./NotFoundPage";
import { LeftDrawer } from "./LeftDrawer";
import { CreatePostWithRouter } from "./CreatePost";

type MainContentProps = any;

export const MainContent = (props: MainContentProps) => {
  const { handleDrawerToggle, mobileOpen } = props;
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container className={classes.contentContainer}>
        <Grid container>
          <Grid item>
            <LeftDrawer
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
            />
          </Grid>
          <Grid item className={classes.cardContent}>
            <Switch>
              <Route exact path="/gag/:id">
                <GagWithRouter />
              </Route>
              <Route exact path="/create/post">
                <CreatePostWithRouter />
              </Route>
              <Route exact path="/">
                <HomeWithRouter />
              </Route>
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Grid>
        </Grid>
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
    cardContent: {
      padding: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    contentContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
  };
});
