import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { CustomDialog } from "../components/organisms/CustomDialog";
import { CustomImageGallery } from "../components/organisms/CustomImageGallery";
import { getMemes } from "../api/get-memes.api";
import { Button } from "@material-ui/core";

const CreatePost = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogContent, setDialogContent] = useState<any>([]);

  function getImgFlipTemplates() {
    getMemes().then((data) => {
      setOpen(true);
      setDialogTitle("Custom Available Meme templates");
      setDialogContent(data.memes);
    });
  }

  return (
    <Grid container className={classes.createPostContainer} spacing={2}>
      <Grid item lg={8}>
        <Grid container direction="column">
          <Grid item lg={12}>
            <TextField
              id="standard-adornment-amount"
              fullWidth
              placeholder="Paste URL"
              size={"small"}
              value={""}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={12}>
            Grid 1-2
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4}>
        Grid 2
        <Button
          onClick={getImgFlipTemplates}
          color={"primary"}
          variant={"contained"}
        >
          Use custom memes
        </Button>
        <CustomDialog
          open={open}
          setOpen={setOpen}
          title={dialogTitle}
          content={<CustomImageGallery itemData={dialogContent} />}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => {
  return {
    createPostContainer: {
      backgroundColor: "white",
      height: "100vh",
    },
  };
});

export const CreatePostWithRouter = withRouter(CreatePost);
