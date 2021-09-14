import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import CommentIcon from "@material-ui/icons/Comment";
import ReportIcon from "@material-ui/icons/Report";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import { PostTO } from "../../api/api.types";
import { SocialMediaShare } from "../atoms/SocialMediaShare";

type GagCardProps = {
  post: PostTO;
  handleOnClick: Function;
  handleOnExpandPostClick?: Function;
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

export function PostCard(props: GagCardProps) {
  const { post, handleOnClick, handleOnExpandPostClick } = props;
  const classes = useStyles();
  const [postLiked, setPostLiked] = useState<boolean>(false);
  const [postDisliked, setPostDisliked] = useState<boolean>(false);
  const [postUpvotes, setPostUpvotes] = useState(post.socialStats.upvotes);
  const [postDownvotes, setPostDownvotes] = useState(
    post.socialStats.downvotes
  );

  // eslint-disable-next-line
  const [postGag, setPostGag] = useState(post);

  useEffect(() => {
    const imgElem = document.getElementById(`img-${postGag.id}`);
    if (imgElem) {
      imgElem.onload = () => {
        document.getElementById(`img-overlay-${postGag.id}`)!.style.display =
          imgElem && imgElem.clientHeight <= 363 ? "none" : "block";
      };
    }
  });

  const onPostLikeToggle = () => {
    setPostLiked((postLiked) => {
      if (!postLiked) {
        setPostUpvotes((postUpvotes) => postUpvotes + 1);
        setPostDownvotes(post.socialStats.downvotes);
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
        setPostUpvotes(post.socialStats.upvotes);
      } else {
        setPostDownvotes(post.socialStats.downvotes);
      }
      return !postDisliked;
    });
    setPostLiked(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Tooltip
            title={postGag.title}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <Typography variant="h6" noWrap>
              <Link
                onClick={() => handleOnClick(postGag.id)}
                underline={"none"}
              >
                <strong>{postGag.title}</strong>
              </Link>
            </Typography>
          </Tooltip>
        </CardContent>
        <div className={classes.cardMedia}>
          <CardMedia
            component="img"
            classes={{ root: classes.imgMedia }}
            id={`img-${postGag.id}`}
            image={postGag.content.url}
            title={postGag.title}
          />
        </div>
        <div id={`img-overlay-${postGag.id}`} className={classes.imgOverlay}>
          {handleOnExpandPostClick && (
            <Link onClick={() => handleOnExpandPostClick(postGag)}>
              <p>Click to expand the post</p>
            </Link>
          )}
        </div>
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
            <StyledBadge badgeContent={postGag.socialStats.comments} max={999}>
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
  cardMedia: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    maxHeight: 363,
    minHeight: 363,
    objectFit: "unset",
    overflow: "hidden",
    padding: 10,
    position: "relative",
    [theme.breakpoints.down("md")]: {
      maxHeight: 800,
    },
  },
  imgOverlay: {
    backgroundColor: "white",
    bottom: 0,
    boxShadow: "0 -4px 8px 0 rgba(0,0,0,0.2)",
    height: "50px",
    position: "absolute",
    textAlign: "center",
    width: "100%",
  },
  imgMedia: {
    position: "absolute",
    top: 0,
    [theme.breakpoints.down("md")]: {
      position: "relative",
    },
  },
  root: {
    marginBottom: 20,
    maxWidth: 600,
  },
  iconBtn: {
    marginLeft: "auto",
  },
}));
