import React, { MouseEvent, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { renderMedia, renderText } from "../../common/image.utils";

export type TextElem = {
  height: number;
  text: string;
  width: number;
  x: number;
  y: number;
};

// export type RenderElem = TextElem | ReactNode;

type Props = {
  "data-testid": string;
  isVisible: boolean;
  image: Blob;
  updateTextElems: (params: TextElem[]) => void;
  textElems: TextElem[];
};

// Check the custom type of a variable
// function isTextElem(elem: any): elem is TextElem {
//   return (elem as TextElem) !== undefined;
// }

export function CanvasElem(props: Props) {
  const { "data-testid": testid, image, updateTextElems, textElems } = props;
  const classes = useStyles(props);
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(-1);
  const [textList, setTextList] = useState<TextElem[]>(textElems);

  useEffect(() => {
    const canvas = document.querySelector(`#${testid}`) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    renderMedia(canvas, image);

    for (var i = 0; i < textList.length; i++) {
      var text = textList[i];
      text.width = ctx.measureText(text.text).width;
      text.height = 16;
    }

    textList.forEach((elem) => {
      renderText(canvas, elem);
    });
  }, [image, testid, textList]);

  function textHittest(x: number, y: number, textIndex: number) {
    var text = textList[textIndex];
    return (
      x >= text.x &&
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

    console.log(startX, startY);

    // Put your mousedown stuff here
    for (var i = 0; i < textList.length; i++) {
      if (textHittest(startX, startY, i)) {
        setSelectedTextIndex(i);
      }
    }
  }

  function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {}

  function handleMouseUp(e: MouseEvent<HTMLCanvasElement>) {}

  function handleMouseOut(e: MouseEvent<HTMLCanvasElement>) {}

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
  const isCanvasVisible = (props: Props) => {
    if (props["isVisible"]) {
      return "block";
    }
    return "none";
  };

  return {
    canvasElem: {
      display: (props: Props) => isCanvasVisible(props),
      height: "100%",
      objectFit: "fill",
      position: "relative",
      width: "100%",
    },
  };
});
