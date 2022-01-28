/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
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

    const handleChange = () => {
        const dataUrl = canvas!.getDataURL("png", false, "#000000");
        const base64 = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
    };

    return (
        <CanvasDraw
            ref={(canvasDraw) => setCanvas(canvasDraw as BetterCanvasDraw)}
            onChange={handleChange}
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
