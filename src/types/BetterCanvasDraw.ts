import CanvasDraw from "react-canvas-draw";

export default interface BetterCanvasDraw extends CanvasDraw {
    getDataURL(
        fileType: string,
        useBgImage: boolean,
        backgroundColour: string
    ): string;
}
