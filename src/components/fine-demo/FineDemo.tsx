import React from "react";
import Canvas from "../canvas/Canvas";
import Terminal from "../terminal/Terminal";

function FineDemo() {
    return (
        <div
            className="h-96 shadow-xl-heavy rounded-md m-4 w-3/4 lg:w-1/3 border border-mac-gray-74
"
        >
            <Terminal
                statusBarHTML={
                    <p className="text-center text-sm">Prediction: --</p>
                }
            >
                <Canvas />
            </Terminal>
        </div>
    );
}

export default FineDemo;
