import React, { Fragment, useEffect, useState } from "react";

import { withRouter } from "react-router-dom";

import { PostTO } from "../api/api.types";
import { getPosts } from "../api/posts/posts.api";

import CircularProgress from "@material-ui/core/CircularProgress";
import { GagCard } from "./GagCard";

type HomeProps = any;

const Home = (props: HomeProps) => {
  const { history } = props;
  const [posts, setPosts] = useState<PostTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPosts()
      .then((data) => {
        setPosts(data.items);
      })
      .catch((error) => {
        //TODO error handling
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function viewGag(gagId: number) {
    history.push(`/gag/${gagId}`);
  }

  if (loading || !posts) {
    return <CircularProgress />;
  }

  return (
    <Fragment>
      {posts.map((post, index) => (
        <GagCard key={index} post={post} handleOnClick={viewGag} />
      ))}
    </Fragment>
  );
};

export const HomeWithRouter = withRouter(Home);
