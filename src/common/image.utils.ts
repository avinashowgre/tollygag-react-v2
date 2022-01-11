import { TextElem } from "../components/atoms/CanvasElem";

function renderMedia(canvas: HTMLCanvasElement, blob: Blob) {
  const ctx = canvas.getContext("2d", {
    alpha: false,
  }) as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = true;

  switch (blob.type) {
    case "image/jpeg": // Normally, you don't need it (switch), but if you have a special case, then you can consider it.
    case "image/png":
      const img = new Image();
      img.onload = (event: any) => {
        URL.revokeObjectURL(event.target.src); // Once it loaded the resource, then you can free it at the beginning.
        ctx.drawImage(event.target, 0, 0, canvas.width, canvas.height);
      };
      img.src = URL.createObjectURL(blob);
      break;
  }
}

function renderText(canvas: HTMLCanvasElement, textElem: TextElem) {
  const ctx = canvas.getContext("2d", {
    alpha: false,
  }) as CanvasRenderingContext2D;

  // Text attributes
  ctx.font = "30pt Impact";
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.fillStyle = "white";

  ctx.fillText(textElem.text, textElem.x, textElem.y);
  ctx.strokeText(textElem.text, textElem.x, textElem.y);
}

export { renderMedia, renderText };
