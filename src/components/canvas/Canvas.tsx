import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";

interface BetterCanvasDraw extends CanvasDraw {
    getDataURL(
        fileType: string,
        useBgImage: boolean,
        backgroundColour: string
    ): string;
}

function Canvas() {
    const [canvas, setCanvas] = useState<BetterCanvasDraw | null>(null);
    return (
        <CanvasDraw
            ref={(canvasDraw) => setCanvas(canvasDraw as BetterCanvasDraw)}
            onChange={() => {
                console.log(canvas!.getDataURL("png", false, "#000000"));
            }}
            gridColor="rgba(255, 255, 255, 1)"
            hideInterface={true}
            backgroundColor="#1e1e1e"
            hideGrid={true}
            brushColor="#ffffff"
            canvasWidth={"100%"}
            canvasHeight={"100%"}
            className="rounded-md"
        />
    );
}

export default Canvas;
