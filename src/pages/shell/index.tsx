import Head from "next/head";
import React, { Fragment } from "react";
import Terminal from "../../components/terminal/Terminal";

function index() {
    const focusOnCmdInput = () => {
        const cmdInput = document.getElementById("cmd-input");
        if (cmdInput) {
            cmdInput.focus();
        }
    };

    return (
        <div
            className="min-h-screen bg-black bg-opacity-75"
            onClick={focusOnCmdInput}
        >
            <Head>
                <title>Moussa Haidous</title>
                <meta
                    name="description"
                    content="Moussa Haidous, Software Engineer"
                />
                <link rel="icon" href="/images/shell-favi.ico" />
            </Head>
            <main className="min-h-screen flex flex-col items-center justify-center font-mac-terminal">
                <div
                    className="h-96 shadow-xl-heavy rounded-md m-4 w-3/4 lg:w-1/2 overflow-hidden border border-mac-gray-74
"
                >
                    <Terminal
                        statusBarHTML={
                            <p className="text-center text-sm">
                                root@haidousm.com{" "}
                                <span className="hidden xl:inline">
                                    -- bash
                                </span>
                            </p>
                        }
                    >
                        <Fragment>
                            <div className="m-1 text-white text-sm"></div>
                            <div className="container m-1 mt-8 text-white text-sm">
                                <label htmlFor="cmd-input">
                                    root
                                    <span className="hidden md:inline">
                                        @haidousm.com
                                    </span>{" "}
                                    ${" "}
                                    <input
                                        type="text"
                                        name="cmd-input"
                                        id="cmd-input"
                                        className="bg-transparent outline-none"
                                    />
                                </label>
                            </div>
                        </Fragment>
                    </Terminal>
                </div>
            </main>
        </div>
    );
}

export default index;
