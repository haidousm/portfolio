/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import CanvasDraw from "react-canvas-draw";

interface Props {
    onChange: (dataUrl: string) => void;
    canvas: BetterCanvasDraw | null;
    setCanvas: (canvas: BetterCanvasDraw | null) => void;
}

interface BetterCanvasDraw extends CanvasDraw {
    getDataURL(
        fileType: string,
        useBgImage: boolean,
        backgroundColour: string
    ): string;
}

function Canvas({ onChange, canvas, setCanvas }: Props) {
    const handleChange = async () => {
        const dataUrl = canvas!.getDataURL("png", false, "#000000");
        onChange(dataUrl);
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
