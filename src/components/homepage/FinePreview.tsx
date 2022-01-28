import { Fragment, useEffect, useRef } from "react";
import ContainerOverlay from "../overlays/HoverOverlay";
import Terminal from "../terminal/Terminal";

function FinePreview() {
    return (
        <ContainerOverlay>
            <Terminal
                statusBarHTML={
                    <p className="text-center text-xs"> Predictions: -- </p>
                }
            >
                <video autoPlay>{/* TODO: add gifs */}</video>
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
                        href="/fine"
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
