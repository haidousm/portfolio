import axios from "axios";
import React from "react";
import Canvas from "../canvas/Canvas";
import Terminal from "../terminal/Terminal";

interface Prediction {
    confidence: number[];
    prediction: number;
}

const FINE_API_URL = "http://0.0.0.0:8080/api/predict";

function FineDemo() {
    const [prediction, setPrediction] = React.useState<Prediction | null>(null);

    const onChange = async (dataUrl: string) => {
        const base64 = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
        const res = await axios.post(FINE_API_URL, {
            type: "base64",
            data: base64,
        });
        setPrediction(res.data);
    };
    return (
        <div
            className="h-96 shadow-xl-heavy rounded-md m-4 w-3/4 lg:w-1/3 border border-mac-gray-74
"
        >
            <Terminal
                statusBarHTML={
                    <p className="text-center text-sm">
                        Prediction: {prediction ? prediction?.prediction : "--"}
                    </p>
                }
            >
                <Canvas onChange={onChange} />
            </Terminal>
        </div>
    );
}

export default FineDemo;
