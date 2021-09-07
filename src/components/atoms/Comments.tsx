import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PostCommentTO } from "../../api/api.types";
import { getPostComments } from "../../api/get-post-comment.api";

import CircularProgress from "@material-ui/core/CircularProgress";

type CommentsProps = any;

export function CommentsSection(props: CommentsProps) {
  const { id } = useParams<any>();
  const [postComments, setPostComments] = useState<
    PostCommentTO[] | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPostComments({ id })
      .then((data) => {
        setPostComments(data);
      })
      .catch((error) => {
        // TODO error handling
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading || !postComments) {
    return <CircularProgress />;
  }

  return <div>{postComments[0].body}</div>;
}
