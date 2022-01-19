import React, {
    createRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useDropzone } from "react-dropzone";

import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import ClearIcon from "@material-ui/icons/Clear";

import CanvasElem from "../atoms/CanvasElem";

type Props = {
    img?: string;
    clearMeme: () => void;
    orderIndex: string;
    setPost: (img: any) => void;
    texts: string[];
};

export function DropZone(props: Props) {
    const { img, orderIndex, texts = [""] } = props;
    const [canvasVisible, setCanvasVisible] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const canvasRef = createRef<HTMLCanvasElement>();

    const classes = useStyles();

    const canvasId = `drop-zone-${orderIndex}`;
    const overlayElemId = `overlay-elem-${orderIndex}`;
    const removeBtnId = `remove-${orderIndex}`;

    useEffect(() => {
        if (!img) {
            return;
        }

        const overlayElem = document.querySelector(
            `#${overlayElemId}`
        ) as HTMLDivElement;
        const clearMemeBtn = document.querySelector(
            `#${removeBtnId}`
        ) as HTMLButtonElement;

        overlayElem.style.display = "none";
        clearMemeBtn.style.display = "block";
        setCanvasVisible(true);
        setSelectedImage(img);
    }, [img, overlayElemId, removeBtnId]);

    function handleClearMeme() {
        const overlayElem = document.querySelector(
            `#${overlayElemId}`
        ) as HTMLDivElement;
        const clearMemeBtn = document.querySelector(
            `#${removeBtnId}`
        ) as HTMLButtonElement;

        overlayElem.style.display = "block";
        clearMemeBtn.style.display = "none";
        setSelectedImage("");
        setCanvasVisible(false);
    }

    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            // const blob = new Blob(
            //     [file],
            //     { type: file.type } // If the type is unknown, default is empty string.
            // );
            setSelectedImage(URL.createObjectURL(file));

            // var fd = new FormData();
            // fd.append("file", file);

            // fetch("/upload", { method: "post", body: fd }).then((data) => {
            //   console.log(data);
            // });

            setCanvasVisible(true);
            // setPost(file);
            const overlayElem = document.querySelector(
                `#${overlayElemId}`
            ) as HTMLDivElement;
            const clearMemeBtn = document.querySelector(
                `#${removeBtnId}`
            ) as HTMLButtonElement;

            overlayElem.style.display = "none";
            clearMemeBtn.style.display = "block";
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
                onClick={handleClearMeme}
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

            {selectedImage && (
                <CanvasElem
                    data-testid={canvasId}
                    imageUrl={selectedImage}
                    isVisible={canvasVisible}
                    ref={canvasRef}
                    texts={texts}
                />
            )}
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
            height: 500,
            lineHeight: "100%",
            padding: 5,
            position: "absolute",
            textAlign: "center",
            width: 540,
        },
    };
});
