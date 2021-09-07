import React, { ReactNode, useEffect, useState } from "react";

import { withRouter } from "react-router-dom";

import { PostTO } from "../api/api.types";
import { getPosts } from "../api/posts/posts.api";

import CircularProgress from "@material-ui/core/CircularProgress";
import { PostCard } from "../components/organisms/PostCard";
import Grid from "@material-ui/core/Grid";

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

  function viewPost(postId: number) {
    history.push(`/gag/${postId}`);
  }

  let content: ReactNode = ``;

  if (loading || !posts) {
    content = <CircularProgress />;
  }

  if (posts && !loading) {
    content = posts.map((post, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <PostCard post={post} handleOnClick={viewPost} />
      </Grid>
    ));
  }

  return (
    <Grid container justify={"center"} spacing={2}>
      {content}
    </Grid>
  );
};

export const HomeWithRouter = withRouter(Home);
