import React, { MouseEvent, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { renderMedia, renderText } from "../../common/image.utils";

export type TextElem = {
  height?: number;
  text: string;
  width?: number;
  x: number;
  y: number;
};

type Props = {
  "data-testid": string;
  isVisible: boolean;
  image: Blob;
  updateTextElems?: (params: TextElem[]) => void;
  textElems?: TextElem[];
};

export function CanvasElem(props: Props) {
  const {
    "data-testid": testid,
    image,
    updateTextElems,
    textElems = [],
  } = props;
  const classes = useStyles(props);
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(-1);

  useEffect(() => {
    draw(image, testid, textElems);
  }, [image, testid, textElems]);

  function draw(image: Blob, testid: string, textElems: TextElem[]) {
    const canvas = document.querySelector(`#${testid}`) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // renderMedia(canvas, image);

    const img = new Image();
    img.onload = (event: any) => {
      // URL.revokeObjectURL(event.target.src); // Once it loaded the resource, then you can free it at the beginning.
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    textElems.forEach((elem) => {
      elem.width = ctx.measureText(elem.text).width;
      elem.height = 16;

        console.log("getting triggered");

        // renderText(canvas, elem);

        // Text attributes
        ctx.font = "30pt Impact";
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillStyle = "white";

        ctx.fillText(elem.text, elem.x, elem.y);
        ctx.strokeText(elem.text, elem.x, elem.y);
    });
    };
    img.src = URL.createObjectURL(image);
  }

  function textHittest(x: number, y: number, textIndex: number) {
    var text = textElems[textIndex];
    return (
      text.width &&
      text.height &&
      x <= text.x + text.width &&
      y >= text.y - text.height &&
      y <= text.y
    );
  }

  function handleMouseDown(e: MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();

    const canvas = document.querySelector(`#${testid}`) as Element;
    const canvasOffset = canvas.getBoundingClientRect();

    const offsetX = canvasOffset.left;
    const offsetY = canvasOffset.top;

    const startX = e.clientX - offsetX;
    const startY = e.clientY - offsetY;

    // Put your mousedown stuff here
    for (var i = 0; i < textElems.length; i++) {
      const isTextHit = textHittest(startX, startY, i);
      if (isTextHit) {
        setSelectedTextIndex(i);
      }
    }
  }

  function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();

    if (selectedTextIndex < 0) {
      return;
    }

    const canvas = document.querySelector(`#${testid}`) as Element;
    const canvasOffset = canvas.getBoundingClientRect();

    const offsetX = canvasOffset.left;
    const offsetY = canvasOffset.top;

    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;

    const startX = e.clientX - offsetX;
    const startY = e.clientY - offsetY;

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;

    textElems.forEach((text, index) => {
      if (index === selectedTextIndex) {
        text.x += dx;
        text.y += dy;
      }
    });

    draw(image, testid, textElems);

    // if (updateTextElems) updateTextElems(texts);
  }

  function handleMouseUp(e: MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();
    setSelectedTextIndex(-1);
  }

  function handleMouseOut(e: MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();
    setSelectedTextIndex(-1);
  }

  return (
    <canvas
      className={classes.canvasElem}
      id={testid}
      onMouseDown={handleMouseDown}
      onMouseOut={handleMouseOut}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width="500"
      height="500"
    ></canvas>
  );
}

const useStyles = makeStyles(() => {
  const canvasVisible = (props: Props) => {
    if (props["isVisible"]) {
      return "block";
    }
    return "none";
  };

  return {
    canvasElem: {
      display: (props: Props) => canvasVisible(props),
      height: "100%",
      objectFit: "fill",
      position: "relative",
      width: "100%",
    },
  };
});
