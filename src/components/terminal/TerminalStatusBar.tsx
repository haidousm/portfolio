interface Props {
    statusBarHTML: JSX.Element;
    redHandler?: () => void;
    orangeHandler?: () => void;
    greenHandler?: () => void;
}
function TerminalStatusBar({
    statusBarHTML,
    redHandler,
    orangeHandler,
    greenHandler,
}: Props) {
    return (
        <div className="py-1 rounded-t-md bg-mac-gray-44 grid grid-cols-3 absolute top-0 left-0 right-0 z-10">
            <div className="flex items-center">
                <button
                    onClick={() => {
                        if (redHandler) {
                            redHandler();
                        }
                    }}
                    className="
                                w-3
                                h-3
                                rounded-full
                                ml-2
                                bg-red-500
                                hover:bg-red-700
                            "
                ></button>
                <button
                    onClick={() => {
                        if (orangeHandler) {
                            orangeHandler();
                        }
                    }}
                    className="
                                w-3
                                h-3
                                rounded-full
                                ml-4
                                bg-yellow-500
                                hover:bg-yellow-700
                            "
                ></button>
                <button
                    onClick={() => {
                        if (greenHandler) {
                            greenHandler();
                        }
                    }}
                    className="
                                w-3
                                h-3
                                rounded-full
                                ml-4
                                bg-green-600
                                hover:bg-green-700
                            "
                ></button>
            </div>
            <div className="text-mac-gray-176 flex items-center justify-center">
                {statusBarHTML}
            </div>
        </div>
    );
}

export default TerminalStatusBar;
