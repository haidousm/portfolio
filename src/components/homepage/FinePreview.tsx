import { Fragment, useEffect, useRef } from "react";
import ContainerOverlay from "../container-overlay/ContainerOverlay";
import Terminal from "../terminal/Terminal";

function FinePreview() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            drawNumber(canvas, 1);
        }
    }, []);

    const drawNumber = (canvas: HTMLCanvasElement, number: number) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.fillStyle = "white";
        const image = new Image();
    };

    return (
        <ContainerOverlay>
            <Terminal statusBarHTML={<Fragment> Predictions: -- </Fragment>}>
                <canvas ref={canvasRef}></canvas>
            </Terminal>
            <Fragment>
                <h3 className="text-2xl text-white text-center">Fine</h3>
                <div
                    className="
                                    container
                                    flex
                                    items-center
                                    justify-around
                                "
                >
                    <a
                        className="
                                        text-white
                                        border border-white
                                        text-2xl
                                        rounded-xl
                                        p-2
                                        hover:bg-white hover:text-black
                                    "
                        href="/shell"
                    >
                        Demo
                    </a>
                    <a
                        className="
                                         text-white
                                        border border-white
                                        text-2xl
                                        rounded-xl
                                        p-2
                                        hover:bg-white hover:text-black
                                    "
                        href="https://github.com/haidousm/fine"
                    >
                        GitHub
                    </a>
                </div>
            </Fragment>
        </ContainerOverlay>
    );
}

export default FinePreview;
