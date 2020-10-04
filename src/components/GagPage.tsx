import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

import { GetPostTO } from "../api/api.types";
import { getPost } from "../api/get-post.api";

import CircularProgress from "@material-ui/core/CircularProgress";

import { CommentsSection } from "./Comments";

type GagProps = any;

const Gag = (props: GagProps) => {
  let { id } = useParams();
  const [post, setPost] = useState<GetPostTO | undefined>();
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

  if (loading || !post) {
    return <CircularProgress />;
  }

  return (
    <div>
      <CommentsSection />
    </div>
  );
};

export const GagWithRouter = withRouter(Gag);
