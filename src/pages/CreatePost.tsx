import React, { ReactNode, useState } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { CustomDialog } from "../components/organisms/CustomDialog";
import { CustomImageGallery } from "../components/organisms/CustomImageGallery";
import { MemeLayout } from "../components/organisms/MemeLayout";
import { Separator } from "../components/atoms/Separator";

import { getMemes } from "../api/get-memes.api";

const CreatePost = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<ReactNode>("");
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const classes = useStyles();

  function getImgFlipTemplates() {
    getMemes().then((data) => {
      setOpen(true);
      setDialogTitle("Custom Available Meme templates");
      setDialogContent(<CustomImageGallery itemData={data.memes} />);
    });
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
              value={""}
              onChange={(evt) => {
                setImgUrl(evt.target.value);
              }}
            />
          </Grid>
          <Separator text={"( OR )"} />
          <Grid
            container
            className={classes.dropZoneArea}
            justifyContent="center"
          >
            <MemeLayout imgUrl={imgUrl} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={6}>
        <Grid container justifyContent={"space-around"}>
          <Grid item>
            <Button
              color={"primary"}
              onClick={getImgFlipTemplates}
              variant={"contained"}
            >
              Save template
            </Button>
          </Grid>
          <Grid item>
            <Button color={"primary"} variant={"contained"}>
              Create Post
            </Button>
          </Grid>
        </Grid>
        <Grid
          alignItems={"center"}
          container
          className={classes.createPostActionsContainer}
          direction={"column"}
          justifyContent={"center"}
          spacing={2}
        >
          <Grid className={classes.actionGrpBtn} item>
            <Button
              color={"primary"}
              onClick={getImgFlipTemplates}
              variant={"contained"}
              fullWidth
            >
              Use custom memes
            </Button>
          </Grid>

          <Grid className={classes.actionGrpBtn} item>
            <Button color={"primary"} variant={"contained"} fullWidth>
              Add caption
            </Button>
          </Grid>
        </Grid>

        <CustomDialog
          open={open}
          setOpen={setOpen}
          title={dialogTitle}
          content={dialogContent}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => {
  return {
    actionGrpBtn: {
      minWidth: 240,
    },
    createPostActionsContainer: {
      height: "80vh",
    },
    createPostContainer: {
      backgroundColor: "white",
    },
    dropZoneArea: {
      borderRadius: 5,
      flexGrow: 1,
      minHeight: "calc(80vh - 20px)",
      padding: 10,
      position: "relative",
      textAlign: "center",
    },
  };
});

export const CreatePostWithRouter = withRouter(CreatePost);
