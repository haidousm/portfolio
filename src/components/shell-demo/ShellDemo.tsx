import axios from "axios";
import React, { Fragment, useState } from "react";
import ContainerOverlay from "../overlays/HoverOverlay";
import Overlay from "../overlays/Overlay";
import Terminal from "../terminal/Terminal";

interface ShellAPIResponse {
    status: string;
    command_output: string;
}

interface Output {
    output: string;
    isCommand: boolean;
}

const SHELL_API_URL = "https://shell.haidousm.com/api/execute";
const BANNED_COMMANDS = ["sudo", "rm", "touch", "wget", "curl"];

function ShellDemo() {
    const [history, setHistory] = useState<Output[]>([]);
    const [output, setOutput] = useState<Output[]>([]);

    const [isRickRollTime, setIsRickRollTime] = useState(false);

    const handleEnterClicked = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            const cmd = event.currentTarget.value;
            event.currentTarget.value = "";
            await executeCommand(cmd);
            const container = document.getElementById("shell-container");
            if (container) {
                container.scrollTop = container.scrollHeight + 1000;
            }
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
                    return [
                        ...prevOutput,
                        { output: command, isCommand: true },
                        ...history,
                    ];
                });
                return true;
            default:
                break;
        }

        const isBanned = BANNED_COMMANDS.some((bannedCommand) => {
            return command.includes(bannedCommand);
        });
        if (isBanned) {
            setIsRickRollTime(true);
        }
        return false;
    };
    return (
        <div
            className="h-96 shadow-xl-heavy rounded-md m-4 w-3/4 lg:w-1/2 border border-mac-gray-74
"
        >
            <Overlay isVisible={isRickRollTime}>
                <Terminal
                    redHandler={() => {
                        window.location.href = "/";
                    }}
                    statusBarHTML={
                        <p className="text-center text-sm">
                            root@haidousm.com{" "}
                            <span className="hidden xl:inline">-- bash</span>
                        </p>
                    }
                >
                    <div
                        id="shell-container"
                        className="h-96 rounded-md bg-mac-gray-30 overflow-auto"
                    >
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
                    </div>
                </Terminal>
                <div className="w-full h-full">
                    <iframe
                        className="border-none pointer-events-none"
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&showinfo=0&controls=0&autohide=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            </Overlay>
        </div>
    );
}

export default ShellDemo;
