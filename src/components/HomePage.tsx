import React, { useEffect, useState } from "react";

import { withRouter } from "react-router-dom";

import { GetPostTO } from "../api/api.types";
import { getPosts } from "../api/get-posts.api";

import CircularProgress from "@material-ui/core/CircularProgress";
import { GagCard } from "./GagCard";

type HomeProps = any;

const Home = (props: HomeProps) => {
  const { history } = props;
  const [posts, setPosts] = useState<GetPostTO[]>([]);
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
    console.log(gagId);
    history.push(`/gag/${gagId}`);
  }

  if (loading || !posts) {
    return <CircularProgress />;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <GagCard key={index} post={post} handleOnClick={viewGag} />
      ))}
    </div>
  );
};

export const HomeWithRouter = withRouter(Home);
