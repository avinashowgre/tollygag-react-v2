import React, { useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import ClearIcon from "@material-ui/icons/Clear";

import { useDropzone } from "react-dropzone";
import { renderMedia } from "../../common/image.utils";

type Props = {
  img?: Blob;
  orderIndex: string;
  setPost: (img: any) => void;
};

export function DropZone(props: Props) {
  const { img, orderIndex, setPost } = props;

  const classes = useStyles();

  const canvasId = `drop-zone-${orderIndex}`;
  const overlayElemId = `overlay-elem-${orderIndex}`;
  const removeBtnId = `remove-${orderIndex}`;

  if (img) {
    displayMeme(img);
  }

  function clearMeme() {
    const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    const overlayElem = document.querySelector(
      `#${overlayElemId}`
    ) as HTMLDivElement;
    const clearMemeBtn = document.querySelector(
      `#${removeBtnId}`
    ) as HTMLButtonElement;

    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    canvas.style.display = "none";
    overlayElem.style.display = "block";
    clearMemeBtn.style.display = "none";
    setPost("");
  }

  function displayMeme(blob: Blob) {
    const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    const overlayElem = document.querySelector(
      `#${overlayElemId}`
    ) as HTMLDivElement;
    const clearMemeBtn = document.querySelector(
      `#${removeBtnId}`
    ) as HTMLButtonElement;

    overlayElem.style.display = "none";
    canvas.style.display = "block";
    clearMemeBtn.style.display = "block";

    renderMedia(canvas, blob);
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const blob = new Blob(
        [file],
        { type: file.type } // If the type is unknown, default is empty string.
      );

      // var fd = new FormData();
      // fd.append("file", file);

      // fetch("/upload", { method: "post", body: fd }).then((data) => {
      //   console.log(data);
      // });

      clearMeme();
      displayMeme(blob);
      setPost(file);
    },
    // eslint-disable-next-line
    []
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="delete"
        id={`${removeBtnId}`}
        className={classes.closeButton}
        onClick={clearMeme}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
      <div
        className={classes.overlayElem}
        {...getRootProps()}
        id={`${overlayElemId}`}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <canvas
        className={classes.canvasElem}
        id={`${canvasId}`}
        width="500"
        height="500"
      ></canvas>
    </div>
  );
}

const useStyles = makeStyles(() => {
  return {
    closeButton: {
      background: "white",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      display: "none",
      padding: 8,
      position: "absolute",
      right: "-19px",
      top: "-19px",
      zIndex: 10,
      "&:hover": {
        background: "white",
      },
    },
    canvasElem: {
      display: "none",
      height: "100%",
      objectFit: "fill",
      position: "relative",
      width: "100%",
    },
    overlayElem: {
      top: 0,
      left: 0,
      position: "absolute",
      width: "100%",
      height: "100%",
      "& > p": {
        position: "relative",
        top: "50%",
      },
    },
    root: {
      border: "2px dotted #3f51b5",
      borderRadius: 5,
      width: "100%",
      height: "100%",
      lineHeight: "100%",
      position: "absolute",
      textAlign: "center",
    },
  };
});
