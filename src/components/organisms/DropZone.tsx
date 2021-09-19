import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ClearIcon from "@material-ui/icons/Clear";

type Props = {
  orderIndex: string;
};

export function DropZone(props: Props) {
  const { orderIndex } = props;
  const classes = useStyles();
  const canvasId = `drop-zone-${orderIndex}`;
  const overlayElemId = `overlay-elem-${orderIndex}`;
  const removeBtnId = `remove-${orderIndex}`;

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
  }

  function redrawMeme(image: CanvasImageSource) {
    const removeTempBtn = document.querySelector(
      `#${removeBtnId}`
    ) as HTMLButtonElement;

    const overlayElem = document.querySelector(
      `#${overlayElemId}`
    ) as HTMLDivElement;
    overlayElem.style.display = "none";
    removeTempBtn.style.display = "block";

    // Get Canvas2DContext
    var canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
    canvas.style.display = "block";
    if (canvas) {
      var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      if (image != null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Text attributes
      // ctx.font = "30pt Impact";
      // ctx.textAlign = "center";
      // ctx.strokeStyle = "black";
      // ctx.lineWidth = 3;
      // ctx.fillStyle = "white";
    }

    // if (topLine != null) {
    //   ctx.fillText(topLine, canvas.width / 2, 40);
    //   ctx.strokeText(topLine, canvas.width / 2, 40);
    // }

    // if (bottomLine != null) {
    //   ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
    //   ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
    // }
  }

  const onDrop = useCallback((acceptedFiles) => {
    var file = acceptedFiles[0];

    var reader = new FileReader();
    reader.onload = function (fileObject: any) {
      var data = fileObject?.target.result;

      // Create an image object
      var image = new Image();
      image.onload = function () {
        (window as any).imageSrc = this;
        redrawMeme((window as any).imageSrc);
      };

      // Set image data to background image.
      image.src = data;
    };
    reader.readAsDataURL(file);
    // eslint-disable-next-line
  }, []);

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
      <canvas className={classes.canvasElem} id={`${canvasId}`}></canvas>
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
      position: "relative",
      width: "100%",
      objectFit: "fill",
    },
    overlayElem: {
      top: 0,
      left: 0,
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    root: {
      border: "2px dotted #3f51b5",
      borderRadius: 5,
      width: "100%",
      height: "100%",
      lineHeight: "100%",
      position: "relative",
      textAlign: "center",
    },
  };
});
