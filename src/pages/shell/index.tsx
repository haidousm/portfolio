import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import Terminal from "../../components/terminal/Terminal";

interface ShellAPIResponse {
    status: string;
    command_output: string;
}

interface Output {
    output: string;
    isCommand: boolean;
}

const SHELL_API_URL = "https://shell.haidousm.com/api/execute";

const Shell: NextPage = () => {
    const [history, setHistory] = useState<Output[]>([]);
    const [output, setOutput] = useState<Output[]>([]);

    const bannedCommands = ["sudo", "rm"];

    const focusOnCmdInput = () => {
        const cmdInput = document.getElementById("cmd-input");
        if (cmdInput) {
            cmdInput.focus();
        }
    };

    const handleEnterClicked = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            const cmd = event.currentTarget.value;
            event.currentTarget.value = "";
            await executeCommand(cmd);
        }
    };

    const executeCommand = async (command: string) => {
        const cmd = command.trim();
        if (executeCustomCommand(cmd)) {
            return;
        }
        const res = await axios.post(SHELL_API_URL, { command: cmd });
        const data: ShellAPIResponse = res.data;
        const commandOutput = data.command_output
            .split("\n")
            .map((output: string) => {
                return { output: output, isCommand: false };
            });

        setHistory((prevHistory) => [
            ...prevHistory,
            { output: `${prevHistory.length} ${cmd}`, isCommand: false },
        ]);
        setOutput((prevOutput) => {
            return [
                ...prevOutput,
                { output: cmd, isCommand: true },
                ...commandOutput,
            ];
        });
    };

    const executeCustomCommand = (command: string) => {
        switch (command) {
            case "clear":
                setOutput([]);
                return true;
            case "history":
                setOutput((prevOutput) => {
                    return [...prevOutput, ...history];
                });
                return true;
            default:
                break;
        }

        const isBanned = bannedCommands.some((bannedCommand) => {
            return command.includes(bannedCommand);
        });
        if (isBanned) {
            console.log("ASDKADS");
        }
        return false;
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
                            <div className="m-1 mt-8 text-white text-sm ">
                                {output.map((outputObj, index) =>
                                    outputObj.isCommand ? (
                                        <p key={index}>
                                            root
                                            <span className="hidden md:inline">
                                                @haidousm.com
                                            </span>{" "}
                                            $ {outputObj.output}
                                        </p>
                                    ) : (
                                        <p key={index}>{outputObj.output}</p>
                                    )
                                )}
                            </div>
                            <div className="container m-1 text-white text-sm">
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
                                        onKeyDown={(e) => {
                                            handleEnterClicked(e);
                                        }}
                                    />
                                </label>
                            </div>
                        </Fragment>
                    </Terminal>
                </div>
            </main>
        </div>
    );
};

export default Shell;
