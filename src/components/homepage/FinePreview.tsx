/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import ContainerOverlay from "../overlays/HoverOverlay";
import Terminal from "../terminal/Terminal";

function FinePreview() {
    const [currentNumber, setCurrentNumber] = useState(1);

    const possibleNumbers = [1, 2, 3, 4, 5, 8];

    let animationIntervalId = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        animationIntervalId.current = setInterval(() => {
            setCurrentNumber(
                possibleNumbers[
                    Math.floor(Math.random() * possibleNumbers.length)
                ]
            );
        }, 2500);
        return () => {
            animationIntervalId && clearInterval(animationIntervalId.current!);
        };
    }, []);

    return (
        <ContainerOverlay>
            <Terminal
                statusBarHTML={
                    <p className="text-center text-xs">
                        {" "}
                        Predictions: {currentNumber}{" "}
                    </p>
                }
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3/4 h-3/4 mt-12 absolute">
                        <Image
                            alt="Fine Preview Gifs"
                            src={`/gifs/${currentNumber}.gif`}
                            layout="fill"
                            objectFit="contain"
                        ></Image>
                    </div>
                </div>
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
                    >
                        GitHub
                    </a>
                </div>
            </Fragment>
        </ContainerOverlay>
    );
}

export default FinePreview;
