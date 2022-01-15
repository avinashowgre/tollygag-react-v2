import React, { MouseEvent, useEffect, useState } from "react";

import canvasTxt from "canvas-txt";

import { makeStyles } from "@material-ui/core/styles";

export type TextElem = {
    height: number;
    text: string;
    width: number;
    x: number;
    y: number;
};

type Props = {
    "data-testid": string;
    isVisible: boolean;
    image: Blob;
    updateTextElems?: (params: TextElem[]) => void;
    texts: string[];
};

export function CanvasElem(props: Props) {
    const { "data-testid": testid, image, texts = [] } = props;

    const classes = useStyles(props);

    // eslint-disable-next-line
    const [imageBlob, setImageBlob] = useState<Blob>(image);
    const [selectedTextIndex, setSelectedTextIndex] = useState<number>(-1);
    const [textElems, setTextElems] = useState<TextElem[]>([]);

    let offsetX: number, offsetY: number, startX: number, startY: number;

    useEffect(() => {
        const canvas = document.querySelector(
            `#${testid}`
        ) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const elems: TextElem[] = texts.map((text, index) => {
            return {
                height: 100,
                text,
                width: 200,
                x: 250,
                y: index * 20 + 100,
            };
        });

        setTextElems(elems);

        draw();

        const rect = canvas.getBoundingClientRect();
        const canvasOffset = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
        };

        // eslint-disable-next-line
        offsetX = canvasOffset.left;

        // eslint-disable-next-line
        offsetY = canvasOffset.top;

        // eslint-disable-next-line
    }, [texts]);

    function draw() {
        const canvas = document.querySelector(
            `#${testid}`
        ) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const img = new Image();
        img.onload = (event: any) => {
            console.log(img);
            // URL.revokeObjectURL(event.target.src); // Once it loaded the resource, then you can free it at the beginning.
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            textElems.forEach((elem) => {
                // Text attributes
                ctx.textAlign = "center";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 3;
                ctx.fillStyle = "white";

                canvasTxt.fontSize = 24;
                canvasTxt.font = "Impact";

                canvasTxt.drawText(
                    ctx,
                    elem.text,
                    elem.x,
                    elem.y,
                    elem.width,
                    elem.height
                );
            });
        };
        img.src = URL.createObjectURL(imageBlob);
    }

    function textHittest(x: number, y: number, textIndex: number) {
        var text = textElems[textIndex];
        return (
            text.width &&
            text.height &&
            x >= text.x &&
            x <= text.x + text.width &&
            y >= text.y - text.height &&
            y <= text.y
        );
    }

    function handleMouseDown(e: MouseEvent<HTMLCanvasElement>) {
        e.preventDefault();

        startX = e.pageX - offsetX;
        startY = e.pageY - offsetY;

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

        let mouseX = e.pageX - offsetX;
        let mouseY = e.pageY - offsetY;

        // Put your mousemove stuff here
        let dx = mouseX - startX;
        let dy = mouseY - startY;

        startX = mouseX;
        startY = mouseY;

        const updatedTextElems = textElems.map((text, index) => {
            if (index === selectedTextIndex) {
                text.x += dx;
                text.y += dy;
            }
            return text;
        });

        setTextElems(updatedTextElems);

        draw();
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
