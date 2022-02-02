import axios from "axios";
import React, { useState } from "react";
import Canvas from "../canvas/Canvas";
import Terminal from "../terminal/Terminal";
import CanvasDraw from "react-canvas-draw";
import ConfidenceBars from "./ConfidenceBars";
import Prediction from "../../types/Prediction";
import BetterCanvasDraw from "../../types/BetterCanvasDraw";

const FINE_API_URL = "https://fine.haidousm.com/api/predict";

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
        setPrediction(null);
        canvas!.clear();
    };

    const startAnimatingPrediction = () => {
        animationIntervalId = setInterval(() => {
            setPrediction({
                confidence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        <div className="container flex flex-col items-center">
            <div
                className="
                container
                hidden
                w-5/12
                lg:block
                text-mac-gray-176
                text-base
                relative
                px-5
            "
            >
                <div className="flex flex-col p-0">
                    <div className="flex items-center">
                        <button
                            className="
                            w-3
                            h-3
                            rounded-full
                            ml-2
                            mr-1
                            bg-yellow-500
                            hover:bg-yellow-700
                        "
                        ></button>
                        <p>: Clear Drawing</p>
                    </div>
                </div>
            </div>
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
                                    {prediction
                                        ? prediction?.prediction
                                        : "---"}
                                </span>
                            </p>
                        }
                        redHandler={() => {
                            window.location.href = "/";
                        }}
                        orangeHandler={() => {
                            clearCanvas();
                        }}
                    >
                        <Canvas
                            canvas={canvas}
                            setCanvas={setCanvas}
                            onChange={onChange}
                        />
                    </Terminal>
                </div>
                <ConfidenceBars
                    className="hidden lg:block"
                    confidence={
                        prediction?.confidence ?? [
                            0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03,
                            0.03, 0.03,
                        ]
                    }
                    textSizeClassName="text-xl"
                    barHeightClassName="h-4"
                />
            </div>
        </div>
    );
}

export default FineDemo;
