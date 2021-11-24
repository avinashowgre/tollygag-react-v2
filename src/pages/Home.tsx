import React, { ReactNode, useState } from "react";

import { useQuery } from "react-query";

import { withRouter } from "react-router-dom";

import { PostTO } from "../api/api.types";
import { getPosts } from "../api/posts/posts.api";

import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import { PostCard } from "../components/organisms/PostCard";
import { CustomDialog } from "../components/organisms/CustomDialog";

type HomeProps = any;

const Home = (props: HomeProps) => {
  const { history } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<ReactNode>();
  const [dialogContent, setDialogContent] = useState<ReactNode>();

  const { data, error, isError, isLoading } = useQuery("posts", getPosts);

  function viewPost(postId: number) {
    history.push(`/gag/${postId}`);
  }

  function expandPost(post: PostTO) {
    setOpen(true);
    setDialogTitle(post.title);
    setDialogContent(
      <CardMedia
        component="img"
        id={`img-${post.id}`}
        image={post.content.url}
        title={post.title}
      />
    );
  }

  let content: ReactNode = ``;

  if (isLoading || !data) {
    content = <CircularProgress />;
  }

  if (data && !isLoading) {
    content = data.items.map((post, index) => (
      <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
        <PostCard
          post={post}
          handleOnClick={viewPost}
          handleOnExpandPostClick={expandPost}
        />
      </Grid>
    ));
  }

  return (
    <Grid container justifyContent={"center"} spacing={2}>
      {content}
      <CustomDialog
        content={dialogContent}
        title={dialogTitle}
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  );
};

export const HomeWithRouter = withRouter(Home);
