import React, { ReactNode, useEffect, useState } from "react";

import { withRouter } from "react-router-dom";

import { PostTO } from "../api/api.types";
import { getPosts } from "../api/posts/posts.api";

import CircularProgress from "@material-ui/core/CircularProgress";
import { PostCard } from "../components/organisms/PostCard";
import Grid from "@material-ui/core/Grid";
import { CustomDialog } from "../components/organisms/CustomDialog";
import CardMedia from "@material-ui/core/CardMedia";

type HomeProps = any;

const Home = (props: HomeProps) => {
  const { history } = props;
  const [posts, setPosts] = useState<PostTO[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<ReactNode>();
  const [dialogContent, setDialogContent] = useState<ReactNode>();

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

  function expandPost(post: PostTO) {
    console.log(post);
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

  if (loading || !posts) {
    content = <CircularProgress />;
  }

  if (posts && !loading) {
    content = posts.map((post, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
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
