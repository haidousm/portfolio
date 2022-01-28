import React from "react";
import CanvasDraw from "react-canvas-draw";

function Canvas() {
    return (
        <CanvasDraw
            gridColor="rgba(255, 255, 255, 1)"
            hideInterface={true}
            backgroundColor="#1e1e1e"
            hideGrid={true}
            canvasWidth={"200px"}
        />
    );
}

export default Canvas;
