import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";

type Props = {
  component: any;
  path: string;
};

export function ProtectedRoute(props: Props) {
  const { component: Component, path } = props;
  // eslint-disable-next-line
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  return (
    <Route
      exact
      path={path}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
