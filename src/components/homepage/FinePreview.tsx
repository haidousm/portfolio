import { Fragment, useEffect, useRef } from "react";
import ContainerOverlay from "../container-overlay/ContainerOverlay";
import Terminal from "../terminal/Terminal";

function FinePreview() {
    return (
        <ContainerOverlay>
            <Terminal statusBarHTML={<Fragment> Predictions: -- </Fragment>}>
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
