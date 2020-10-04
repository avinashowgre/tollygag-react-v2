import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ReportIcon from "@material-ui/icons/Report";

import { GetPostTO } from "../api/api.types";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { SocialMediaShare } from "./SocialMediaShare";
import Tooltip from "@material-ui/core/Tooltip";

type GagCardProps = {
  post: GetPostTO;
  handleOnClick: Function;
};

export function GagCard(props: GagCardProps) {
  const { post, handleOnClick } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleOnClick(post.id)}>
        <CardContent>
          <Tooltip title={post.title}>
            <Typography variant="h6" noWrap>
              {post.title}
            </Typography>
          </Tooltip>
        </CardContent>
        <CardMedia
          component="img"
          image={post.content.url}
          title={post.title}
        />
      </CardActionArea>
      <CardActions disableSpacing>
        <div className={classes.votes}>
          <IconButton aria-label="add to favorites">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="caption">{post.socialStats.upvotes}</Typography>
        </div>
        <div className={classes.votes}>
          <IconButton aria-label="remove from favorites">
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="caption">
            {post.socialStats.downvotes}
          </Typography>
        </div>
        <SocialMediaShare />
        <IconButton aria-label="report post">
          <ReportIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
    maxWidth: 500,
  },
  votes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
