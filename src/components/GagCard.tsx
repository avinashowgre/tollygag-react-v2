import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import CommentIcon from "@material-ui/icons/Comment";
import ReportIcon from "@material-ui/icons/Report";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import { PostTO } from "../api/api.types";
import { SocialMediaShare } from "./SocialMediaShare";

type GagCardProps = {
  post: PostTO;
  handleOnClick: Function;
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "gray",
    border: `2px solid ${theme.palette.background.paper}`,
    color: "white",
    padding: "0 4px",
    right: -2,
    top: 6,
  },
}))(Badge);

export function GagCard(props: GagCardProps) {
  const { post, handleOnClick } = props;
  const classes = useStyles();
  const [postLiked, setPostLiked] = useState<boolean>(false);
  const [postDisliked, setPostDisliked] = useState<boolean>(false);
  const [postUpvotes, setPostUpvotes] = useState(post.socialStats.upvotes);
  const [postDownvotes, setPostDownvotes] = useState(
    post.socialStats.downvotes
  );
  const [postGag, setPostGag] = useState(post);

  const onPostLikeToggle = () => {
    setPostLiked((postLiked) => {
      if (!postLiked) {
        setPostUpvotes((postUpvotes) => postUpvotes + 1);
      } else {
        setPostUpvotes(post.socialStats.upvotes);
      }
      return !postLiked;
    });
    setPostDisliked(false);
  };

  const onPostDislikeToggle = () => {
    setPostDisliked((postDisliked) => {
      if (!postDisliked) {
        setPostDownvotes((postDownvotes) => postDownvotes + 1);
      } else {
        setPostDownvotes(post.socialStats.downvotes);
      }
      return !postDisliked;
    });
    setPostLiked(false);
  };

  return (
    <Card className={classes.root}>
      {postUpvotes}
      <CardActionArea onClick={() => handleOnClick(postGag.id)}>
        <CardContent>
          <Tooltip title={postGag.title}>
            <Typography variant="h6" noWrap>
              {postGag.title}
            </Typography>
          </Tooltip>
        </CardContent>
        <CardMedia
          component="img"
          image={postGag.content.url}
          title={postGag.title}
        />
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={(e) => onPostLikeToggle()}>
          <StyledBadge badgeContent={postUpvotes} color="default" max={999}>
            <ThumbUpIcon color={postLiked ? "primary" : undefined} />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="dislike" onClick={(e) => onPostDislikeToggle()}>
          <StyledBadge badgeContent={postDownvotes} color="default" max={999}>
            <ThumbDownIcon color={postDisliked ? "secondary" : undefined} />
          </StyledBadge>
        </IconButton>

        <div className={classes.iconBtn}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={364} max={999}>
              <CommentIcon />
            </StyledBadge>
          </IconButton>

          <SocialMediaShare />

          <IconButton aria-label="report post">
            <ReportIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
    maxWidth: 600,
  },
  iconBtn: {
    marginLeft: "auto",
  },
}));
