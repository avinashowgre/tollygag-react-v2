import React, { ReactNode, useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

import { PostTO } from "../api/api.types";
import { getPost } from "../api/post/post.api";

import CircularProgress from "@material-ui/core/CircularProgress";

import { CommentsSection } from "../components/atoms/Comments";
import Grid from "@material-ui/core/Grid";

type PostProps = any;

const PostDetails = (props: PostProps) => {
  let { id } = useParams<any>();
  const [post, setPost] = useState<PostTO | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPost({ id })
      .then((data) => {
        setPost(data[0]);
      })
      .catch((err) => {
        // TODO error handling
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  let content: ReactNode = ``;

  if (loading || !post) {
    content = <CircularProgress />;
  }

  if (!loading && post) {
    content = <CommentsSection />;
  }

  return (
    <Grid container justify={"center"} spacing={2}>
      {content}
    </Grid>
  );
};

export const PostDetailsWithRouter = withRouter(PostDetails);
