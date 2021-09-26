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

export { renderMedia };
