import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { HomeWithRouter } from "./Home";
import { PostDetailsWithRouter } from "./PostDetails";
import { NotFoundPage } from "./NotFoundPage";
import { LeftDrawer } from "../components/organisms/LeftDrawer";
import { CreatePostWithRouter } from "./CreatePost";
import { ProtectedRoute } from "../components/organisms/ProtectedRoute";

type MainContentProps = {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
};

export const MainContent = (props: MainContentProps) => {
  const { handleDrawerToggle, mobileOpen } = props;
  const classes = useStyles();
  const location = useLocation();

  const isDrawerHidden = location.pathname.indexOf("/create/post") !== -1;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container>
        {!isDrawerHidden && (
          <Grid item md={3} lg={2}>
            <LeftDrawer
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
            />
          </Grid>
        )}
        <Grid item className={classes.cardContent} md={9} lg={10} xs={12}>
          <Switch>
            <Route path="/gag/:id">
              <PostDetailsWithRouter />
            </Route>
            <ProtectedRoute
              path="/create/post"
              component={CreatePostWithRouter}
            />
            <Route exact path="/">
              <HomeWithRouter />
            </Route>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Grid>
      </Grid>
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
    },
    contentContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
  };
});
