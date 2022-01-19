import React, { forwardRef, useEffect, useState } from "react";

import { Stage, Layer, Text, Image } from "react-konva";
import useImage from "use-image";

type Props = {
    "data-testid": string;
    imageUrl: string;
    isVisible: boolean;
    texts: string[];
};

export type TextElem = {
    height: number;
    text: string;
    width: number;
    x: number;
    y: number;
};

function CanvasElem(props: Props, ref: any) {
    const { "data-testid": testid, texts = [""], imageUrl, isVisible } = props;
    const [textElems, setTextElems] = useState<TextElem[]>([]);
    const [image] = useImage(imageUrl, "anonymous");

    useEffect(() => {
        const elems: TextElem[] = texts.map((text, index) => {
            return {
                height: 100,
                text,
                width: 100,
                x: 250,
                y: index * 100 + 100,
            };
        });

        setTextElems(elems);
    }, [texts]);

    function handleDragEnd(e: any, index: number) {
        const captions = [...textElems];

        captions[index].x = e.target.x();
        captions[index].y = e.target.y();

        setTextElems(captions);
    }

    return (
        <Stage
            data-testid={testid}
            ref={ref}
            visible={isVisible}
            height={486}
            width={526}
        >
            <Layer>
                <Image height={486} image={image} width={526} />
                {textElems.map((elem: TextElem, index: number) => (
                    <Text
                        text={elem.text}
                        x={elem.x}
                        y={elem.y}
                        fontSize={30}
                        draggable
                        fill={"white"}
                        stroke={"black"}
                        fontFamily={"Impact"}
                        width={elem.width}
                        onDragEnd={(e) => handleDragEnd(e, index)}
                        key={index}
                    />
                ))}
            </Layer>
        </Stage>
    );
}

export default forwardRef(CanvasElem);
