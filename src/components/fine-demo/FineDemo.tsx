import axios from "axios";
import React, { useState } from "react";
import Canvas from "../canvas/Canvas";
import Terminal from "../terminal/Terminal";
import CanvasDraw from "react-canvas-draw";
import ConfidenceBars from "./ConfidenceBars";

interface Prediction {
    confidence: number[];
    prediction: number;
}
interface BetterCanvasDraw extends CanvasDraw {
    getDataURL(
        fileType: string,
        useBgImage: boolean,
        backgroundColour: string
    ): string;
}

const FINE_API_URL = "http://0.0.0.0:8000/api/predict";

function FineDemo() {
    const [canvas, setCanvas] = useState<BetterCanvasDraw | null>(null);
    const [prediction, setPrediction] = React.useState<Prediction | null>(null);

    let animationIntervalId: NodeJS.Timer | null = null;

    const onChange = async (dataUrl: string) => {
        const base64 = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");

        startAnimatingPrediction();
        const res = await axios.post(FINE_API_URL, {
            type: "base64",
            data: base64,
        });
        stopAnimatingPrediction();
        setPrediction(res.data);
    };

    const clearCanvas = () => {
        // setPrediction(null);
        // canvas!.clear();
        setPrediction({
            confidence: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            prediction: 0,
        });
    };

    const startAnimatingPrediction = () => {
        animationIntervalId = setInterval(() => {
            setPrediction({
                confidence: [0.5, 0.5, 0.5],
                prediction: randomIntFromInterval(0, 10),
            });
        }, 50);
    };

    const stopAnimatingPrediction = () => {
        animationIntervalId && clearInterval(animationIntervalId);
    };

    const randomIntFromInterval = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return (
        <div className="container flex items-center justify-center">
            <div
                className="h-96 shadow-xl-heavy rounded-md m-4 w-3/4 lg:w-1/2 xl:w-1/3  border border-mac-gray-74
            
"
            >
                <Terminal
                    statusBarHTML={
                        <p className="text-sm flex items-center">
                            <span className="hidden lg:inline">
                                Prediction:{" "}
                            </span>
                            <span
                                className="
                                    lg:ml-1
                                    text-green-500 text-3xl
                                    lg:text-xl
                                "
                            >
                                {prediction ? prediction?.prediction : "---"}
                            </span>
                        </p>
                    }
                    orangeHandler={() => {
                        clearCanvas();
                    }}
                >
                    {/* <Canvas
                        canvas={canvas}
                        setCanvas={setCanvas}
                        onChange={onChange}
                    /> */}
                    <h1></h1>
                </Terminal>
            </div>
            <ConfidenceBars
                className="hidden lg:block"
                confidence={
                    prediction?.confidence ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            />
        </div>
    );
}

export default FineDemo;
