import React, { useState } from "react";

import { withRouter } from "react-router";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import { Collapsible } from "../components/atoms/Collapsible";
import { CustomImageGallery } from "../components/organisms/CustomImageGallery";
import { MemeLayout } from "../components/organisms/MemeLayout";
import { Separator } from "../components/atoms/Separator";
import {
  ToastNotification,
  ToastProps,
} from "../components/atoms/ToastNotification";

import { getMemes } from "../api/get-memes.api";
import { MemeTO } from "../api/api.types";
import { TextElem } from "../components/atoms/CanvasElem";

function CreatePost() {
  const [imgUrl, setImgUrl] = useState<any>();
  const [post, setPost] = useState<any>();
  const [memes, setMemes] = useState<MemeTO[]>([]);
  const [toastProps, setToastProps] = useState<
    Omit<ToastProps, "onCloseToast">
  >({
    severity: "info",
    open: false,
    toastMessage: "",
  });
  const [captionCount, setCaptionCount] = useState<number>(0);
  const [captions, setCaptions] = useState<TextElem[] | undefined>();

  const classes = useStyles();

  function getImgFlipTemplates() {
    getMemes().then((data) => {
      setMemes(data.memes);
    });
  }

  function handleClose() {
    setToastProps({ ...toastProps, open: false });
  }

  function fetchImageFromUrl(url: string) {
    fetch(url)
      .then((res) => res.blob()) // Gets the response and returns it as a blob
      .then((blob) => {
        setImgUrl(blob);
        setToastProps({
          severity: "success",
          open: true,
          toastMessage: "Fetched Image!",
        });
        setPost(blob);
      })
      .catch((err) => {
        setToastProps({
          severity: "error",
          open: true,
          toastMessage: "Failed to fetch image",
        });
      });
  }

  function createPost() {
    if (post) {
      const url = URL.createObjectURL(post);
      // setDialogContent(<img src={url} alt="post" />);
      // setOpenDialog(true);
      var fd = new FormData();
      fd.append("file", post);
      fd.append("title", "Post");
      fetch("/api/v1/posts", {
        method: "post",
        body: fd,
      }).then((data) => {
        console.log(data);
      });
    }
  }

  function handleAddCaption() {
    setCaptionCount((prevValue) => (prevValue += 1));
  }

  return (
    <Grid container className={classes.createPostContainer} spacing={2}>
      <Grid item lg={6} md={6}>
        <Grid container direction="column">
          <Grid item lg={12}>
            <TextField
              id="standard-adornment-amount"
              fullWidth
              placeholder="Paste URL"
              size={"small"}
              variant="outlined"
              onChange={(evt) => {
                fetchImageFromUrl(evt.target.value);
              }}
            />
          </Grid>
          <Separator text={"( OR )"} />
          <Grid container direction="column" className={classes.postArea}>
            <MemeLayout img={imgUrl} setPost={setPost} textElems={captions} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={6}>
        <Grid container>
          <Collapsible title={"Use Custom Memes"} onClick={getImgFlipTemplates}>
            <CustomImageGallery itemData={memes} />
          </Collapsible>
        </Grid>
        <Grid alignItems={"center"} container spacing={2}>
          {imgUrl && (
            <Grid item>
              <Tooltip title="Feature work in progress">
                <Button
                  color={"primary"}
                  fullWidth
                  onClick={handleAddCaption}
                  variant={"contained"}
                >
                  Add caption
                </Button>
              </Tooltip>
            </Grid>
          )}
          <Grid item>
            <Button
              color={"primary"}
              variant={"contained"}
              fullWidth
              onClick={createPost}
            >
              Create post
            </Button>
          </Grid>
        </Grid>
        <Grid container direction={"column"}>
          {Array(captionCount)
            .fill(1)
            .map((value, index) => (
              <TextField
                InputProps={{
                  startAdornment: (
                    <Typography component="span">{index + 1}.</Typography>
                  ),
                }}
                onBlur={(e) => {
                  let captionsCopy = captions ? [...captions] : [];
                  captionsCopy.push({
                    text: e.target.value,
                    x: 250,
                    y: 40 * (index + 1),
                  });
                  setCaptions(captionsCopy);
                }}
              />
            ))}
        </Grid>
      </Grid>
      <ToastNotification {...toastProps} onCloseToast={handleClose} />
    </Grid>
  );
}

const useStyles = makeStyles(() => {
  return {
    createPostContainer: {
      backgroundColor: "white",
    },
    dropZoneArea: {
      borderRadius: 5,
      flexGrow: 1,
      position: "relative",
      textAlign: "center",
    },
    postArea: {
      padding: 10,
    },
  };
});

export const CreatePostWithRouter = withRouter(CreatePost);
