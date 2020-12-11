import React from "react";
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

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -2,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

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
        <IconButton aria-label="like">
          <StyledBadge
            badgeContent={post.socialStats.upvotes}
            color="secondary"
            max={999}
          >
            <ThumbUpIcon />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="dislike">
          <StyledBadge
            badgeContent={post.socialStats.downvotes}
            color="secondary"
            max={999}
          >
            <ThumbDownIcon />
          </StyledBadge>
        </IconButton>

        <div className={classes.iconBtn}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={364} max={999} color="secondary">
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

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 20,
    maxWidth: 500
  },
  iconBtn: {
    marginLeft: "auto"
  }
}));
