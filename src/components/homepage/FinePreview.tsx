/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import ConfidenceBars from "../fine-demo/ConfidenceBars";
import ContainerOverlay from "../overlays/HoverOverlay";
import Terminal from "../terminal/Terminal";

const POSSIBLE_PREDICTIONS = [
    [1, [0.1, 0.9, 0.3, 0.2, 0.25, 0.17, 0.43, 0.23, 0.1, 0.24]],
    [2, [0.1, 0.3, 0.9, 0.25, 0.48, 0.23, 0.58, 0.49, 0.25, 0.43]],
    [3, [0.25, 0.1, 0.3, 0.9, 0.28, 0.11, 0.06, 0.32, 0.43, 0.23]],
    [4, [0.12, 0.15, 0.06, 0.3, 0.92, 0.11, 0.26, 0.12, 0.23, 0.53]],
    [5, [0.12, 0.15, 0.06, 0.25, 0.26, 0.92, 0.26, 0.12, 0.23, 0.53]],
    [8, [0.12, 0.15, 0.06, 0.25, 0.26, 0.24, 0.26, 0.12, 0.91, 0.53]],
];

function FinePreview() {
    const [prediction, setPossiblePrediction] = useState(
        POSSIBLE_PREDICTIONS[0]
    );

    let animationIntervalId = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        animationIntervalId.current = setInterval(() => {
            setPossiblePrediction(
                POSSIBLE_PREDICTIONS[
                    Math.floor(Math.random() * POSSIBLE_PREDICTIONS.length)
                ]
            );
        }, 2500);
        return () => {
            animationIntervalId && clearInterval(animationIntervalId.current!);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="h-60 xl:h-96 shadow-xl-heavy rounded-md m-4 w-2/3 overflow-hidden">
                <ContainerOverlay>
                    <Terminal
                        statusBarHTML={
                            <p className="text-center text-xs">
                                {" "}
                                Predictions: {prediction[0]}{" "}
                            </p>
                        }
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-3/4 h-3/4 mt-12 absolute">
                                <Image
                                    alt="Fine Preview Gifs"
                                    src={`/gifs/${prediction[0]}.gif`}
                                    layout="fill"
                                    objectFit="contain"
                                ></Image>
                            </div>
                        </div>
                    </Terminal>
                    <Fragment>
                        <h3 className="text-2xl text-white text-center">
                            Fine
                        </h3>
                        <div
                            className="
                                    container
                                    flex
                                    items-center
                                    justify-around
                                "
                        >
                            <Link href="/fine">
                                <a
                                    className="
                                        text-white
                                        border border-white
                                        text-2xl
                                        rounded-xl
                                        p-2
                                        hover:bg-white hover:text-black
                                    "
                                    data-nosnippet
                                >
                                    Demo
                                </a>
                            </Link>

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
                                data-nosnippet
                            >
                                GitHub
                            </a>
                        </div>
                    </Fragment>
                </ContainerOverlay>
            </div>
            <div className="items-center justify-center hidden lg:flex">
                <ConfidenceBars
                    confidence={prediction[1] as number[]}
                    textSizeClassName="text-sm"
                    barHeightClassName="h-3"
                />
            </div>
        </div>
    );
}

export default FinePreview;
