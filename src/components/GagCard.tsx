import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ReportIcon from "@material-ui/icons/Report";

import { PostTO } from "../api/api.types";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { SocialMediaShare } from "./SocialMediaShare";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Collapse from "@material-ui/core/Collapse";
import CardHeader from "@material-ui/core/CardHeader";

const GifPlayer = require("react-gif-player");

type GagCardProps = {
  post: PostTO;
  handleOnClick: Function;
};

export function GagCard(props: GagCardProps) {
  const { post, handleOnClick } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader onClick={() => handleOnClick(post.id)} title={post.title} />
      <CardMedia>
        <GifPlayer className={classes.responsiveImg} gif={post.content.url} />
      </CardMedia>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <ThumbDownIcon />
        </IconButton>
        <div className={classes.iconBtn}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Top comments:</Typography>
          <Typography variant="body1">{post.content.url}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {},
  iconBtn: {
    marginLeft: "auto",
  },
  responsiveImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",
  },
  root: {
    maxWidth: 600,
    "&:not(last-child)": {
      marginBottom: 20,
    },
  },
  votes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
